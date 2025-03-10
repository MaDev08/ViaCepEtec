import React, { useState } from 'react';
import { View } from 'react-native';
import { PaperProvider, TextInput, Text, Button } from 'react-native-paper';

export default function App() {
    let [cep, setCep] = React.useState("");
    let [render, setRender] = useState([]);

    const BuscaCep = (xcep) => {
        let url = `https://viacep.com.br/ws/${xcep}/json/`;
        console.log(url);

        fetch(url)
            .then((resp) => {
                return resp.json();
            })
            .then((dados) => {
                console.log(dados);
                console.log(dados.logradouro);
                console.log(dados['logradouro']);
                setRender(dados);
            })
            
            .catch((erro) => {
                console.log(erro);
            });
    }

    return (
        <PaperProvider>
            <View style={{ marginTop: 50, marginHorizontal: 20 }}>
                <Text style={{ color: '#000' }}>ViaCEP</Text>

                <TextInput label={'CEP:'} mode='outlined' onChangeText={(value) => { setCep(value) }} />

                <Button icon={"tab-search"} onPress={() => { BuscaCep(cep) }}
                    mode='contained' style={{ marginTop: 20 }}>Busca</Button>
            </View>
        </PaperProvider>
    );
};