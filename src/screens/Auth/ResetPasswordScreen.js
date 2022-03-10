import React, { useContext } from 'react';
import { View, ImageBackground, Text, SafeAreaView, StyleSheet, TextInput, Button } from 'react-native';
import { AuthContext } from '../../navigation/AuthProvider';
import { Formik } from 'formik';
import * as yup from 'yup';
import { colors } from '../../utils/Constants';

const ResetPasswordScreen = ({ navigation }) => {
    const { resetPassword } = useContext(AuthContext);
    const validationSchema = yup.object().shape({
        email: yup
            .string()
            .required('Email adresi boş bırakılamaz!')
            .email('Geçerli bir emil adresi giriniz!'),
    });
    return (
        <SafeAreaView style={{ flex: 1,}}>
            <ImageBackground source={require('../../utils/image/SoruEkranı.png')} style={styles.container}>
                <Text style={styles.title}>Şifre Sıfırlama</Text>
                <View style={styles.inputContainer}>
                    <Formik
                        validationSchema={validationSchema}
                        initialValues={{ email: '' }}
                        onSubmit={(values) => resetPassword(values.email)}
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
                                <View style={styles.button}>
                                    <Button
                                        onPress={handleSubmit}
                                        disabled={!isValid}
                                        title='Sıfırla'
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
        justifyContent: 'center'
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
        height: 50,
        width: '90%',
        padding: 10,
        margin: 10,
        borderWidth: 1,
        borderColor: colors.black,
        borderRadius: 20,
        fontSize: 16,
        backgroundColor: colors.white,
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

export default ResetPasswordScreen;
