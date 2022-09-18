import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha'
import { firebaseConfig } from '../src/configFirebase'
import firebase from 'firebase/compat/app'

export default function Screen() {

    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');
    const [verificationId, setVerificationId] = useState(null);
    const recaptchaVerifier = useRef(null);

    const sendVerification = () => {
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        phoneProvider
            .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
            .then(setVerificationId);
            setPhoneNumber('');
    };


    const confirmCode = () => {
        const credential = firebase.auth.PhoneAuthProvider.credential(
            verificationId,
            code
        );
        firebase.auth().signInWithCredential(credential)
            .then(() => {
                setCode('')
    })
        .catch ((error) => {
        //Mostrando alerta em caso de erro
        alert(error);
    })
    Alert.alert('Login Succesful');
}



return (
    <View style={styles.container}>

        <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={firebaseConfig}
        />

        <Text style={styles.otpText}>
            Login com SMS
        </Text>

        <TextInput
            placeholder='Numero do telefone'
            onChangeText={setPhoneNumber}
            keyboardType='phone-pad'
            autoComplete='tel'
            style={styles.textInput}
        />

        <TouchableOpacity
            style={styles.sendVerification}
            onPress={sendVerification}
        >
            <Text style={styles.buttonText}>
                Enviar código
            </Text>
        </TouchableOpacity>


        <TextInput
            placeholder='Inrira o código'
            onChangeText={setCode}s
            keyboardType='number-pad'
            style={styles.textInput}
        />

        <TouchableOpacity
            style={styles.sendCode}
            onPress={confirmCode}
        >
            <Text style={styles.buttonText}>
                Confirme o código
            </Text>
        </TouchableOpacity>

    </View>
)}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInput:{
        paddingTop: 40,
        paddingBottom: 20,
        paddingHorizontal: 20,
        fontSize: 24,
        borderBottomColor: '#fff',
        borderBottomWidth: 2,
        marginBottom: 20,
        textAlign: 'center',
        color: '#fff'
    },
    sendVerification:{
        padding: 20,
        backgroundColor: '#3498db',
        borderRadius: 10,
    },
    sendCode:{
        padding: 20,
        backgroundColor: '#9b59b6',
        borderRadius: 10
    },
    buttonText:{
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold'
    },
    otpText:{
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
        margin: 20

    }
})