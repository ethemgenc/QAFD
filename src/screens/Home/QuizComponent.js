import React, { Component, useState } from 'react';
import { AuthContext } from '../../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore'
import Cell from '../../utils/Cell';
import { Avatar, Subheading, Title } from 'react-native-paper';
import { Alert, View, Text, FlatList, StyleSheet, TextInput, Button, SafeAreaView, ImageBackground, TouchableOpacity, RefreshControl } from 'react-native'
import { colors, SIZES } from '../../utils/Constants'
import HintRow from '../../utils/HintRow'
import Icons from 'react-native-vector-icons/FontAwesome5';
import { ScrollView } from 'react-native-virtualized-view';

export class QuizComponent extends Component {

    state = {
        currentUser: {},
        usersColl: firestore().collection('users'),
        questionColl: firestore().collection('questions'),
        soruColl: firestore().collection('questions'),
        text: "",
        soruNumara: 0,
        hintList: [],
        answer: "",
    };

    static contextType = AuthContext

    componentDidMount() {
        this.getUser()
        this.getAll()
    }

    componentDidUpdate() {
        this.getUser()
        this.getAll()
    }

    getAll() {
        var n;
        this.state.soruColl.doc('soruNumarasi').get()
            .then((data) => {
                n = data.data().Numara
                this.setState({ soruNumara: n })
                this.state.questionColl
                    .doc('soru' + n)
                    .get()
                    .then((data) => {
                        let list = [];
                        let i = 0;
                        data.data().hints.forEach(element => {
                            list.push({
                                id: i,
                                element,
                            })
                            i = i + 1;
                        });
                        this.setState({ hintList: list })
                        this.setState({ answer: data.data() })
                    });
            })
    }

    getUser() {
        const { user } = this.context;
        this.state.usersColl
            .doc(user.uid)
            .get()
            .then((data) => {
                this.setState({ currentUser: (data.data()) })
            })
    }

    updateKalanHak = async (k, uid) => {
        await this.state.usersColl.doc(uid).update({
            DenemeSayisi: k - 1,
        })
    }

    updateSoruNumarasi = async () => {
        await this.state.soruColl.doc('soruNumarasi').update({
            Numara: soruNumara + 1,
        })
    }

    getHints() {
        var sNumara = this.state.soruNumara
        console.log(sNumara + "sn")
        this.state.questionColl
            .doc('soru' + sNumara)
            .get()
            .then((data) => {
                let list = [];
                let i = 0;
                data.data().hints.forEach(element => {
                    list.push({
                        id: i,
                        element,
                    })
                    i = i + 1;
                });
                this.setState({ hintList: list })
                this.setState({ answer: data.data() })
            });
        console.log("hints")
    }

    getHintsNumber = () => {
        var n;
        this.state.questionColl.doc('soruNumarasi').get()
            .then((data) => {
                n = data.data().Numara
                this.setState({ soruNumara: n })
                this.getHints()
            })
        console.log("number")
    }

    updatePoint = async (p, uid) => {
        await this.state.usersColl.doc(uid).update({
            Points: p,
        })
        Alert.alert("Tebrikler", "Cevabınız doğru. Yeni Soruya Geçildi.")
    }

    denemeController = (d) => {
        if (d == 0) {
            Alert.alert(" ", "Deneme hakkiniz doldu lutfen deneme hakki aliniz.");
            return false;
        }
        return true;
    }

    Controller = () => {
        const { user } = this.context;
        const uid = user.uid;
        if (this.denemeController(this.state.currentUser.DenemeSayisi)) {
            var cevap1 = this.state.text.toLowerCase();
            if (cevap1 === answer.cevap) {
                var points = this.state.currentUser.Points + 1000;
                this.updatePoint(points, uid);
                this.updateSoruNumarasi();
            } else {
                this.updateKalanHak(this.state.currentUser.DenemeSayisi, uid)
                Alert.alert("Üzgünüm :(", "Cevabınız yanlış. Tekrar deneyin.")
            }
        }
    }

    CreditController = (id) => {
        if ((this.state.currentUser.Credit + 3) >= id) {
            return true
        }
        return false
    }

    renderItem = ({ item, index }) => {
        return (
            <HintRow name={'İpucu'} id={item.id + 1} key={item.id} style={styles.hint} onPress={() => {
                { this.CreditController(item.id + 1) ? Alert.alert("İPUCU " + (item.id + 1), item.element) : Alert.alert(" ", "Daha fazla ipucu için lütfen kredi yükleyiniz.") }
            }} />
        )
    }

    handleChange(e) {
        //setName(e.target.value);
    }

    render() {
        const { signout } = this.context;
        return (
            <SafeAreaView
                style={styles.container}
            >
                <ImageBackground source={require('../../utils/image/SoruEkranı.png')} style={styles.image} >
                    <ScrollView
                        style={{
                            flex: 1,
                            width: '100%',
                        }}
                    >
                        <View style={{ marginTop: 30, width: '100%', height: 130, borderBottomWidth: 2, borderColor: colors.white, justifyContent: 'flex-end', alignItems: 'center' }}>
                            <View style={{}}>
                                <Text style={{ color: 'white', fontSize: 28, }}>SORU : {this.state.soruNumara}</Text>
                            </View>
                            <View style={styles.headerContainer}>
                                <Text style={{ color: colors.white, fontSize: 18 }}>Krediniz : {this.state.currentUser.Credit}</Text>
                                <Text style={{ color: 'white', fontSize: 18, }}>kalan cevap hakkınız : {this.state.currentUser.DenemeSayisi}</Text>
                            </View>

                        </View>
                        <View style={styles.itemContainer}>
                            <FlatList
                                style={styles.flatList}
                                data={this.state.hintList}
                                keyExtractor={item => item.id}
                                renderItem={this.renderItem}
                            >
                            </FlatList>
                        </View>
                    </ScrollView>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder='Cevabınız...'
                            onChangeText={this.handleChange}
                            value={this.state.text}
                        />
                        <TouchableOpacity style={styles.button} onPress={this.Controller}>
                            <Icons name='chevron-circle-right' size={30} />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    itemContainer: {
        flex: 1,
    },
    image: {
        width: SIZES.width,
        height: '100%',
    },
    text: {
        fontSize: 56,
        textAlign: 'center',
        color: colors.white,
    },
    hint: {
        marginTop: 30,
        marginBottom: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        marginBottom: 5,
    },
    input: {
        backgroundColor: colors.white,
        fontSize: 18,
        height: 45,
        borderBottomWidth: 3,
        borderTopWidth: 3,
        borderLeftWidth: 3,
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        borderColor: colors.hintAvatarLabel,
        padding: 10,
        width: '85%',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 45,
        width: 40,
        borderBottomWidth: 3,
        borderTopWidth: 3,
        borderRightWidth: 3,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        borderColor: colors.hintAvatarLabel,
        backgroundColor: 'white',
    },
    flatListContainer: {
        flex: 3,
    },
    flatList: {
        marginStart: 10,
    },
})

export default QuizComponent;