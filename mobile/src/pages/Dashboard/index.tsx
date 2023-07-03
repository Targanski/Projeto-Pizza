import React, { useState, useContext } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, StyleSheet} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackParamsList } from "../../routes/app.routes";

import { api } from "../../services/api";
import { AuthContext } from "../../contexts/AuthContext";

export default function Dashboard(){
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();
    const { signOut } = useContext(AuthContext);

    const [number, setNumber] = useState('');

    async function openOrder(){
        if(number === ''){
            return;
        }

        const response = await api.post('/order', {
            table: Number(number) // N assim é para converter o valor direto
        })

        // console.log(response.data);

        // precisa fazer a requisição e abrir a mesa e ir para a proxima tela.
        navigation.navigate('Order', { number: number, order_id: response.data.id })

        setNumber('');

    }

    return(
        <SafeAreaView style={styles.container}>

            <TouchableOpacity style={styles.logout} onPress={signOut}>
                <Feather name="log-out" size={30} color="white" />
            </TouchableOpacity>

            <Text style={styles.title}>Novo pedido</Text>

            <TextInput
                placeholder="Numero da mesa"
                placeholderTextColor="black"
                style={styles.input}
                keyboardType="numeric"
                value={number}
                onChangeText={setNumber}
            />

            <TouchableOpacity style={styles.button} onPress={openOrder}>
                <Text style={styles.buttonText}>Abrir mesa</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: 'cadetblue',

    },

    title:{
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 24,

    },

    input:{
        width: '90%',
        height: 60,
        backgroundColor: "white",
        borderRadius: 4,
        paddingHorizontal: 8,
        textAlign: 'center',
        fontSize: 22,
        color: 'black'

    },

    button:{
        width: '90%',
        height: 40,
        backgroundColor: '#3fffa3',
        borderRadius: 4,
        marginVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText:{
        fontSize: 18,
        color: '#101026',
        fontWeight: 'bold'
    },
    logout:{
        position: 'absolute',
        top: 20,
        right: 20,
    }


})