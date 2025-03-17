import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, View } from 'react-native';
import { PaperProvider, TextInput, Text, Button } from 'react-native-paper';
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
      <TextInput
        label={'Estado'}
        value={render.uf}
        mode='outlined'
        disabled
        style={styles.input}
        theme={{ colors: { primary: '#333', background: '#e0e0e0' } }}
      />

      <StatusBar style="auto" />
    </View>
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
