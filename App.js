import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { TextInput, Text, Button, List, Appbar, Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

// Tema personalizado
const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#6200ee', // Roxo para destaques
        accent: '#03dac4', // Verde para contrastes
        background: '#f4f4f4', // Fundo suave
    },
};

export default function App() {
    const [cep, setCep] = useState('');
    const [render, setRender] = useState({});
    const [selectedValue, setSelectedValue] = useState('');
    const [dados, setDados] = useState({});
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false); // Indicador de carregamento

    const BuscaCep = async (cep) => {
        const cepRegex = /^[0-9]{8}$/;
        if (!cepRegex.test(cep)) {
            Alert.alert('CEP Inválido', 'Por favor, insira um CEP válido com 8 dígitos numéricos.');
            return;
        }

        setLoading(true); // Mostrar indicador de carregamento
        const url = `https://viacep.com.br/ws/${cep}/json/`;

        try {
            const response = await fetch(url);
            const dados = await response.json();
            setRender({
                logradouro: dados.logradouro,
                bairro: dados.bairro,
                localidade: dados.localidade,
            });
            setSelectedValue(dados.uf);
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível buscar o CEP. Tente novamente.');
        } finally {
            setLoading(false); // Esconder indicador de carregamento
        }
    };

    return (
        <PaperProvider theme={theme}>
            {/* Barra superior */}
            <Appbar.Header>
                <Appbar.Content title="Buscar Endereço" />
            </Appbar.Header>

            {/* Layout principal */}
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.subtitle}>Preencha seus dados pessoais</Text>

                    {/* Campo Nome */}
                    <TextInput
                        label="Nome"
                        value={nome}
                        mode="outlined"
                        onChangeText={setNome}
                        style={styles.input}
                    />

                    {/* Campo Email */}
                    <TextInput
                        label="Email"
                        value={email}
                        mode="outlined"
                        keyboardType="email-address"
                        onChangeText={setEmail}
                        style={styles.input}
                    />

                    {/* Campo CEP */}
                    <TextInput
                        label="CEP"
                        value={cep}
                        mode="outlined"
                        keyboardType="numeric"
                        maxLength={8}
                        onChangeText={setCep}
                        style={styles.input}
                    />
                    <Button
                        icon="magnify"
                        mode="contained"
                        onPress={() => BuscaCep(cep)}
                        style={styles.button}
                        disabled={loading} // Desativa botão enquanto carrega
                    >
                        {loading ? 'Buscando...' : 'Buscar CEP'}
                    </Button>

                    {/* Loader durante busca */}
                    {loading && <ActivityIndicator size="large" color="#6200ee" style={styles.loader} />}

                    <Text style={styles.subtitle}>Informações do Endereço</Text>

                    {/* Resultados do CEP */}
                    <TextInput
                        label="Endereço"
                        value={render.logradouro || ''}
                        mode="outlined"
                        editable={false}
                        style={styles.input}
                    />
                    <TextInput
                        label="Bairro"
                        value={render.bairro || ''}
                        mode="outlined"
                        editable={false}
                        style={styles.input}
                    />
                    <TextInput
                        label="Cidade"
                        value={render.localidade || ''}
                        mode="outlined"
                        editable={false}
                        style={styles.input}
                    />

                    {/* Seletor de Estado */}
                    <Picker
                        selectedValue={selectedValue}
                        style={styles.picker}
                        onValueChange={(itemValue) => setSelectedValue(itemValue)}
                    >
                        {[
                            'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
                            'MA', 'MS', 'MT', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
                            'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
                        ].map((estado) => (
                            <Picker.Item key={estado} label={estado} value={estado} />
                        ))}
                    </Picker>

                    <Button icon="check" mode="contained" onPress={()=> console.log("")} style={styles.button}>
                        Finalizar Cadastro
                    </Button>
                </View>
            </ScrollView>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        alignItems: 'center',
        padding: 20,
    },
    subtitle: {
        fontSize: 18,
        color: '#333',
        marginBottom: 20,
    },
    input: {
        width: '90%',
        marginBottom: 15,
    },
    button: {
        width: '90%',
        marginVertical: 10,
        padding: 10,
    },
    loader: {
        marginVertical: 10,
    },
    picker: {
        width: '90%',
        height: 50,
        marginVertical: 10,
    },
});
