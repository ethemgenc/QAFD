import React, { useContext, useState } from 'react';
import { ImageBackground, View, Text, SafeAreaView, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../navigation/AuthProvider';
import Icons from 'react-native-vector-icons/FontAwesome5';
import { Formik } from 'formik';
import * as yup from 'yup';
import { colors } from '../../utils/Constants';

const LoginScreen = ({ navigation }) => {
    const [isSecurePass, setIsSecurePass] = useState(true);
    const { login } = useContext(AuthContext);
    const validationSchema = yup.object().shape({
        email: yup
            .string()
            .required('Email adresi geçersiz!')
            .email('Geçerli bir emil adresi giriniz!'),
        password: yup
            .string()
            .required('Şifre geçersiz!').min(6, ({ min }) => 'Şifre en az ' + min + ' karakter olmalıdır.'),
    });
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground source={require('../../utils/image/SoruEkranı.png')} style={styles.container}>
                <Text style={styles.title}>Üye Girişi</Text>
                <View style={styles.inputContainer}>
                    <Formik
                        validationSchema={validationSchema}
                        initialValues={{ email: '', password: '' }}
                        onSubmit={(values) => login(values.email, values.password, navigation)}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
                            <>
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
                                        <Icons style={{ marginRight: 10 }} name={isSecurePass ? "eye-slash" : "eye"} size={20} color={colors.grey} />
                                    </TouchableOpacity>
                                </View>
                                {errors.password && (<Text style={styles.error} >{errors.password}</Text>)}
                                <View style={styles.button}>
                                    <Button
                                        onPress={handleSubmit}
                                        disabled={!isValid}
                                        title='Giriş'
                                        style={styles.button}
                                        color={colors.background}
                                    />
                                </View>
                            </>
                        )}
                    </Formik>
                </View>
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
    title: {
        width: '80%',
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
        width: '80%',
        alignItems: 'center',
        padding: 10,
        backgroundColor: colors.secondary,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
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
    button: {
        width: '70%',
        overflow: 'hidden',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: colors.white,
    },
    error: {
        color: colors.red,
        fontSize: 14,
    },
})

export default LoginScreen;
