import firestore from '@react-native-firebase/firestore'
import React, { useContext, useState, useEffect } from 'react'
import { Alert, View, Text, FlatList, StyleSheet, TextInput, Button, SafeAreaView, ImageBackground, TouchableOpacity, RefreshControl } from 'react-native'
import { AuthContext } from '../../navigation/AuthProvider'
import { colors, SIZES } from '../../utils/Constants'
import HintRow from '../../utils/HintRow'
import Icons from 'react-native-vector-icons/FontAwesome5';
import { ScrollView } from 'react-native-virtualized-view';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const QuizScreen = ({ navigation }) => {

    const CreditController = (id) => {
        if ((currentUser.Credit + 3) >= id) {
            return true
        }
        return false
    }

    const renderItem = ({ item, index }) => {
        return (
            <HintRow name={'İpucu'} id={item.id + 1} key={item.id} style={styles.hint} onPress={() => {
                { CreditController(item.id + 1) ? Alert.alert("İPUCU " + (item.id + 1), item.element) : Alert.alert(" ", "Daha fazla ipucu için lütfen kredi yükleyiniz.") }
            }} />
        )
    }
    const initialValue = [false,];

    const { signout, user } = useContext(AuthContext);
    const [text, onChangeText] = useState("");
    const [currentUser, setCurrentUser] = useState({});
    const [hintList, setHintList] = useState({});
    const [answer, setAnswer] = useState({});
    const [soruNumara, setSoruNumara] = useState("");
    const questionColl = firestore().collection('questions');
    const usersColl = firestore().collection('users');
    const soruColl = firestore().collection('questions');
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getUserColl();
        getHintsNumber();
        wait(2000).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        getHintsNumber();
        getUserColl();
    }, []);

    const getUserColl = () => {
        usersColl
            .doc(user.uid)
            .get()
            .then((data) => {
                setCurrentUser(data.data())
            })
    }

    const getHintsNumber = () => {
        questionColl.doc('soruNumarasi').get()
            .then((data) => {
                setSoruNumara(data.data().Numara)
                getHints(data.data().Numara)
            })
    }

    const getHints = (sNumara) => {
        questionColl
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
                setHintList(list);
                setAnswer(data.data());
            });
    }

    const updatePoint = async (p) => {
        setIsLoading(true)
        await usersColl.doc(user.uid).update({
            Points: p,
        })
        setIsLoading(false)
        Alert.alert("Tebrikler", "Cevabınız doğru. Yeni Soruya Geçildi.")
        getHintsNumber();
    }

    const updateSoruNumarasi = async () => {
        setIsLoading(true)
        await soruColl.doc('soruNumarasi').update({
            Numara: soruNumara + 1,
        })
        setIsLoading(false)
    }

    const updateKalanHak = async (k) => {
        setIsLoading(true)
        await usersColl.doc(user.uid).update({
            DenemeSayisi: k - 1,
        })
        setIsLoading(false)
    }

    const denemeController = (d) => {
        if (d == 0) {
            var kalanZaman = 24;
            Alert.alert(" ", "Deneme hakkiniz doldu lutfen deneme hakki aliniz.");
            return false;
        }
        return true;
    }

    const Controller = () => {
        if (denemeController(currentUser.DenemeSayisi)) {
            var cevap1 = text.toLowerCase();
            if (cevap1 === answer.cevap) {
                var points = currentUser.Points + 1000;
                updatePoint(points);
                updateSoruNumarasi();
            } else {
                updateKalanHak(currentUser.DenemeSayisi)
                Alert.alert("Üzgünüm :(", "Cevabınız yanlış. Tekrar deneyin.")
                getUserColl();
            }
        }
    }

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
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    <View style={{marginTop: 30, width: '100%', height: 130, borderBottomWidth: 2, borderColor: colors.white, justifyContent: 'flex-end', alignItems: 'center' }}>
                        <View style={{}}>
                            <Text style={{ color: 'white', fontSize: 28, }}>SORU : {soruNumara}</Text>
                        </View>
                        <View style={styles.headerContainer}>
                            <Text style={{ color: colors.white, fontSize: 18 }}>Krediniz : {currentUser.Credit}</Text>
                            <Text style={{ color: 'white', fontSize: 18, }}>kalan cevap hakkınız : {currentUser.DenemeSayisi}</Text>
                        </View>

                    </View>
                    <View style={styles.itemContainer}>
                        <FlatList
                            style={styles.flatList}
                            data={hintList}
                            keyExtractor={item => item.id}
                            renderItem={renderItem}
                        >
                        </FlatList>
                    </View>
                </ScrollView>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder='Cevabınız...'
                        onChangeText={onChangeText}
                        value={text}
                    />
                    <TouchableOpacity style={styles.button} onPress={Controller}>
                        <Icons name='chevron-circle-right' size={30} />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
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

export default QuizScreen;
