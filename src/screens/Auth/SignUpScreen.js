import React, { useContext, useState } from 'react';
import { View, ImageBackground, Text, SafeAreaView, StyleSheet, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { AuthContext } from '../../navigation/AuthProvider';
import Icons from 'react-native-vector-icons/FontAwesome5';
import { Formik } from 'formik';
import * as yup from 'yup';
import { colors } from '../../utils/Constants';

const SignUpScreen = ({ navigation }) => {
    const [isSecurePass, setIsSecurePass] = useState(true);
    const [isSecurePassConfirm, setIsSecurePassConfirm] = useState(true);
    const { signup } = useContext(AuthContext);
    const validationSchema = yup.object().shape({
        email: yup
            .string()
            .required('Email adresi geçersiz!')
            .email('Geçerli bir emil adresi giriniz!'),
        password: yup
            .string()
            .required('Şifre geçersiz!')
            .min(6, ({ min }) => 'Şifre en az ' + min + ' karakter olmalıdır.')
            .matches(/\w*[a-z]\w*/, 'En az 1 adet küçük harf kullanmalısınız!')
            .matches(/\w*[A-Z]\w*/, 'En az 1 adet büyük harf kullanmalısınız!')
            .matches(/\d/, 'En az 1 adet rakam kullanmalısınız!')
            .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, 'En az 1 adet özel karakter kullanmalısınız!'),
        passwordConfirm: yup
            .string()
            .required('Email adresi geçersiz!')
            .oneOf([yup.ref('password')], 'Şifreler Uyumsuz!'),
    });
    return (
        <SafeAreaView style={{ flex: 1 , justifyContent: 'center'}}>
            <ImageBackground source={require('../../utils/image/SoruEkranı.png')} style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <Text style={styles.title}>Kayıt Ol</Text>
                    <View style={styles.inputContainer}>
                        <Formik
                            validationSchema={validationSchema}
                            initialValues={{
                                name: '',
                                lastName: '',
                                phone: '',
                                userName: '',
                                email: '',
                                password: '',
                                passwordConfirm: '',
                            }}
                            onSubmit={(values) => signup(values.email, values.password, values.name, values.lastName, values.phone, values.userName, navigation)}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
                                <>
                                    <TextInput
                                        name="name"
                                        placeholder='Adınız'
                                        style={styles.input}
                                        onChangeText={handleChange('name')}
                                        onBlur={handleBlur('name')}
                                        value={values.name}
                                        keyboardType='email-address'
                                    />
                                    <TextInput
                                        name="lastName"
                                        placeholder='Soyadınız'
                                        style={styles.input}
                                        onChangeText={handleChange('lastName')}
                                        onBlur={handleBlur('lastName')}
                                        value={values.lastName}
                                        keyboardType='email-address'
                                    />
                                    <TextInput
                                        name="phone"
                                        placeholder='Telefon Numaranız(5554443322)'
                                        style={styles.input}
                                        onChangeText={handleChange('phone')}
                                        onBlur={handleBlur('phone')}
                                        value={values.phone}
                                        keyboardType='phone-pad'
                                    />
                                    <TextInput
                                        name="userName"
                                        placeholder='Kullanıcı Adınız'
                                        style={styles.input}
                                        onChangeText={handleChange('userName')}
                                        onBlur={handleBlur('userName')}
                                        value={values.userName}
                                        keyboardType='email-address'
                                    />
                                    <TextInput
                                        name="email"
                                        placeholder='Email Adresiniz'
                                        style={styles.input}
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                        keyboardType='email-address'
                                    />
                                    {errors.email && (<Text style={styles.error} >{errors.email}</Text>)}
                                    <View style={styles.passInput}>
                                        <TextInput
                                            name="password"
                                            placeholder='Şifreniz'
                                            style={{ height: 50, borderWidth: 0, fontSize: 16, }}
                                            onChangeText={handleChange('password')}
                                            onBlur={handleBlur('password')}
                                            value={values.password}
                                            secureTextEntry={isSecurePass}
                                        />
                                        <TouchableOpacity style={{ position: "absolute", right: 0 }} onPress={() => {
                                            setIsSecurePass(!isSecurePass)
                                        }} >
                                            <Icons style={{ marginRight: 10 }} name={isSecurePass ? "eye-slash" : "eye"} size={20} color="#aaa" />
                                        </TouchableOpacity>
                                    </View>
                                    {errors.password && (<Text style={styles.error} >{errors.password}</Text>)}
                                    <View style={styles.passInput}>
                                        <TextInput
                                            name="passwordConfirm"
                                            placeholder='Şifrenizi Doğrulayın'
                                            style={{ height: 50, borderWidth: 0, fontSize: 16, }}
                                            onChangeText={handleChange('passwordConfirm')}
                                            onBlur={handleBlur('passwordConfirm')}
                                            value={values.passwordConfirm}
                                            secureTextEntry={isSecurePassConfirm}
                                        />
                                        <TouchableOpacity style={{ position: "absolute", right: 0 }} onPress={() => {
                                            setIsSecurePassConfirm(!isSecurePassConfirm)
                                        }} >
                                            <Icons style={{ marginRight: 10 }} name={isSecurePassConfirm ? "eye-slash" : "eye"} size={20} color="#aaa" />
                                        </TouchableOpacity>
                                    </View>
                                    {errors.passwordConfirm && (<Text style={styles.error} >{errors.passwordConfirm}</Text>)}
                                    <View style={styles.button}>
                                        <Button
                                            onPress={handleSubmit}
                                            disabled={!isValid}
                                            title='Kaydol'
                                            style={styles.button}
                                            color={colors.background}
                                        />
                                    </View>
                                </>
                            )}
                        </Formik>
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollView: {
        marginTop: 150,
        width: '80%',
    },
    title: {
        textAlign: 'center',
        backgroundColor: colors.background,
        color: colors.white,
        fontSize: 32,
        borderWidth: 2,
        borderColor: colors.secondary,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    inputContainer: {
        width: '100%',
        alignItems: 'center',
        padding: 10,
        backgroundColor: colors.secondary,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    passInput: {
        width: '90%',
        borderColor: colors.black,
        borderWidth: 1,
        borderRadius: 20,
        flexDirection: 'row',
        margin: 10,
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.white,
    },
    input: {
        backgroundColor: colors.white,
        height: 50,
        width: '90%',
        padding: 10,
        margin: 10,
        borderWidth: 1,
        borderColor: colors.black,
        borderRadius: 20,
        fontSize: 16,
    },
    button: {
        width: '70%',
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: colors.white,
        borderRadius: 20,
    },
    error: {
        color: colors.red,
        fontSize: 14
    },
})

export default SignUpScreen;
