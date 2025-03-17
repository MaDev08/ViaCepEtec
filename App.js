import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, View, ScrollView } from 'react-native';
import { PaperProvider, TextInput, Text, Button, List } from 'react-native-paper';
import { useState } from 'react';

export default function App() {

    const [cep, setCep] = useState("");
    const [render, setRender] = useState({});

    const BuscaCep = (x) => {
        const cepRegex = /^[0-9]{8}$/;
        if (!cepRegex.test(x)) {
            Alert.alert("CEP Inválido", "Por favor, insira um CEP válido com 8 dígitos numéricos.");
            return;
        }

        let url = `https://viacep.com.br/ws/${x}/json/`;

        fetch(url)
            .then((resp) => resp.json())
            .then((dados) => {
                if (dados.erro) {
                    Alert.alert("CEP não encontrado", "Verifique se o CEP está correto.");
                } else {
                    setRender(dados);
                }
            })
            .catch((erro) => {
                console.log(erro);
                Alert.alert("Erro", "Ocorreu um erro na busca do CEP.");
            });
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Via Cep</Text>

                <TextInput
                    label={'CEP:'}
                    mode='outlined'
                    keyboardType='numeric'
                    maxLength={8}
                    onChangeText={(value) => setCep(value)}
                    onBlur={() => BuscaCep(cep)}
                    style={styles.input}
                    theme={{ colors: { primary: '#333', background: '#e0e0e0' } }}
                />

                <Button
                    icon="magnify"
                    onPress={() => BuscaCep(cep)}
                    mode="contained"
                    style={{ marginTop: 20 }}
                >
                    Buscar
                </Button>

                <TextInput
                    label={'Endereço'}
                    value={render.logradouro}
                    mode='outlined'
                    disabled
                    style={styles.input}
                    theme={{ colors: { primary: '#333', background: '#e0e0e0' } }}
                />
                <TextInput
                    label={'Bairro'}
                    value={render.bairro}
                    mode='outlined'
                    disabled
                    style={styles.input}
                    theme={{ colors: { primary: '#333', background: '#e0e0e0' } }}
                />
                <TextInput
                    label={'Cidade'}
                    value={render.localidade}
                    mode='outlined'
                    disabled
                    style={styles.input}
                    theme={{ colors: { primary: '#333', background: '#e0e0e0' } }}
                />

                <List.Section title="Estado" >
                    <List.Accordion
                        title='Selecione o Estado'>
                        <List.Item title="AC" />
                        <List.Item title="AL" />
                        <List.Item title="AP" />
                        <List.Item title="AM" />
                        <List.Item title="BA" />
                        <List.Item title="CE" />
                        <List.Item title="DF" />
                        <List.Item title="ES" />
                        <List.Item title="GO" />
                        <List.Item title="MA" />
                        <List.Item title="MS" />
                        <List.Item title="MT" />
                        <List.Item title="MG" />
                        <List.Item title="PA" />
                        <List.Item title="PB" />
                        <List.Item title="PR" />
                        <List.Item title="PE" />
                        <List.Item title="PI" />
                        <List.Item title="RJ" />
                        <List.Item title="RN" />
                        <List.Item title="RS" />
                        <List.Item title="RO" />
                        <List.Item title="RR" />
                        <List.Item title="SC" />
                        <List.Item title="SP" />
                        <List.Item title="SE" />
                        <List.Item title="TO" />
                    </List.Accordion>
                </List.Section>

                <StatusBar style="auto" />

            </View >
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        gap: 10,
    },
    title: {
        fontSize: 24,
        color: '#000',
        fontWeight: 'bold', // Título principal em negrito
        marginBottom: 20
    },
    input: {
        width: '30%',
    }
});
