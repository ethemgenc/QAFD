import React, { useState, useEffect, createContext } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const usersColl = firestore().collection("users");
    const [user, setUser] = useState(null);
    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login: async (email, password, navigation) => {
                    try {
                        await auth()
                            .signInWithEmailAndPassword(email, password)
                            .then(async result => {
                                if (!result.user.emailVerified) {
                                    result.user.sendEmailVerification();
                                    alert("Lütfen email adresinize gelen maili onaylayınız.");
                                }
                            });
                    } catch (error) {
                        console.log(error)
                        alert(error);
                    }
                },
                signup: async (email, password, name, lastName, phone, userName, navigation) => {
                    try {
                        await auth().createUserWithEmailAndPassword(email, password)
                            .then(async result => {
                                var uid = result.user.uid;
                                result.user.sendEmailVerification();
                                result.user.updateProfile({
                                    displayName: userName,
                                })
                                await usersColl.doc(uid).set({
                                    CreatedDate: new Date(),
                                    Credit: 0,
                                    Email: email,
                                    ImageURL: "https://firebasestorage.googleapis.com/v0/b/designproject-c93b3.appspot.com/o/Uploads%2FUsers%2Fuser-undefined-pp.jpg?alt=media&token=9cd61e38-d99b-4990-bf23-a7a1e8886f4b",
                                    LastName: lastName,
                                    Name: name,
                                    Password: password,
                                    Phone: phone,
                                    Points: 1000,
                                    UserName: userName,
                                    DenemeSayisi: 3,
                                });
                                alert("Üyelik oluşturuldu! Lütfen email adresinize gelen maili onaylayınız.");
                            });
                    } catch (error) {
                        console.log(error);
                        alert(error);
                    }
                },
                resetPassword: async email => {
                    try {
                        await auth().sendPasswordResetEmail(email);
                        alert("Şifre Sıfırlama Linki Mail Adresinize Gönderildi!");
                    } catch (error) {
                        console.log(error);
                        alert(error);
                    }
                },
                signout: async () => {
                    try {
                        await auth().signOut();
                    } catch (error) {
                        console.log(error)
                        alert(error);
                    }
                },
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
