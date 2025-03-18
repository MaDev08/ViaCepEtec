import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, View, ScrollView } from 'react-native';
import { PaperProvider, TextInput, Text, Button, List } from 'react-native-paper';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';


export default function App() {

    const [cep, setCep] = useState("");
    const [render, setRender] = useState({});
    const [selectedValue, setSelectedValue] = useState('');

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

                <Text style={styles.Text}> </Text>
                <List.Section title="Estado" >
                    <List.Accordion
                        title='Selecione o Estado' onPress={()=> console.log('')}>
                        <List.Item title="AC" onPress={()=> console.log('')}/>
                        <List.Item title="AL" onPress={()=> console.log('')}/>
                        <List.Item title="AP" onPress={()=> console.log('')}/>
                        <List.Item title="AM" onPress={()=> console.log('')}/>
                        <List.Item title="BA" onPress={()=> console.log('')}/>
                        <List.Item title="CE" onPress={()=> console.log('')}/>
                        <List.Item title="DF" onPress={()=> console.log('')}/>
                        <List.Item title="ES" onPress={()=> console.log('')}/>
                        <List.Item title="GO" onPress={()=> console.log('')}/>
                        <List.Item title="MA" onPress={()=> console.log('')}/>
                        <List.Item title="MS" onPress={()=> console.log('')}/>
                        <List.Item title="MT" onPress={()=> console.log('')}/>
                        <List.Item title="MG" onPress={()=> console.log('')}/>
                        <List.Item title="PA" onPress={()=> console.log('')}/>
                        <List.Item title="PB" onPress={()=> console.log('')}/>
                        <List.Item title="PR" onPress={()=> console.log('')}/>
                        <List.Item title="PE" onPress={()=> console.log('')}/>
                        <List.Item title="PI" onPress={()=> console.log('')}/>
                        <List.Item title="RJ" onPress={()=> console.log('')}/>
                        <List.Item title="RN" onPress={()=> console.log('')}/>
                        <List.Item title="RS" onPress={()=> console.log('')}/>
                        <List.Item title="RO" onPress={()=> console.log('')}/>
                        <List.Item title="RR" onPress={()=> console.log('')}/>
                        <List.Item title="SC" onPress={()=> console.log('')}/>
                        <List.Item title="SP" onPress={()=> console.log('')}/>
                        <List.Item title="SE" onPress={()=> console.log('')}/>
                        <List.Item title="TO" onPress={()=> console.log('')}/>
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
