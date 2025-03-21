import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, View, ScrollView } from 'react-native';
import { TextInput, Text, Button, List } from 'react-native-paper';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';

export default function App() {
  const [cep, setCep] = useState("");
  const [render, setRender] = useState({});
  const [selectedValue, setSelectedValue] = useState("");

  const BuscaCep = (x) => {
    const cepRegex = /^[0-9]{8}$/;
    if (!cepRegex.test(x)) {
      Alert.alert(
        "CEP Inválido",
        "Por favor, insira um CEP válido com 8 dígitos numéricos."
      );
      return;
    }

    const url = `https://viacep.com.br/ws/${x}/json/`;

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
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Via Cep</Text>

        <TextInput
          label={"CEP:"}
          mode="outlined"
          keyboardType="numeric"
          maxLength={8}
          onChangeText={(value) => setCep(value)}
          onBlur={() => BuscaCep(cep)}
          style={styles.input}
          theme={{ colors: { primary: "#333", background: "#e0e0e0" } }}
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
          label={"Endereço"}
          value={render.logradouro || ""}
          mode="outlined"
          disabled
          style={styles.input}
          theme={{ colors: { primary: "#333", background: "#e0e0e0" } }}
        />
        <TextInput
          label={"Bairro"}
          value={render.bairro || ""}
          mode="outlined"
          disabled
          style={styles.input}
          theme={{ colors: { primary: "#333", background: "#e0e0e0" } }}
        />
        <TextInput
          label={"Cidade"}
          value={render.localidade || ""}
          mode="outlined"
          disabled
          style={styles.input}
          theme={{ colors: { primary: "#333", background: "#e0e0e0" } }}
        />

        <List.Section title="Estado">
          <List.Accordion title="Selecione o Estado">
            {[
              "AC", 
              "AL",
              "AP",
              "AM",
              "BA",
              "CE",
              "DF",
              "ES",
              "GO",
              "MA",
              "MS",
              "MT",
              "MG",
              "PA",
              "PB",
              "PR",
              "PE",
              "PI",
              "RJ",
              "RN",
              "RS",
              "RO",
              "RR",
              "SC",
              "SP",
              "SE",
              "TO",
            ].map((estado) => (
              <List.Item
                key={estado}
                title={estado}
                onPress={() => console.log(estado)}
              />
            ))}
          </List.Accordion>
        </List.Section>

        <Text style={styles.Text}>Escolha o Estado</Text>
        <Picker
          selectedValue={selectedValue}
          style={styles.selectedValue}
          onValueChange={(itemValue) => setSelectedValue(itemValue)}
        >
          {[
            "AC",
            "AL",
            "AP",
            "AM",
            "BA",
            "CE",
            "DF",
            "ES",
            "GO",
            "MA",
            "MS",
            "MT",
            "MG",
            "PA",
            "PB",
            "PR",
            "PE",
            "PI",
            "RJ",
            "RN",
            "RS",
            "RO",
            "RR",
            "SC",
            "SP",
            "SE",
            "TO",
          ].map((estado) => (
            <Picker.Item key={estado} label={estado} value={estado} />
          ))}
        </Picker>
        <Text>Escolha: {selectedValue}</Text>

        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 10,
  },
  title: {
    fontSize: 24,
    color: "#000",
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    marginBottom: 10,
  },
  selectedValue: {
    height: 50,
    width: 150,
  },
  Text: {
    fontSize: 16,
    marginVertical: 10,
  },
});
