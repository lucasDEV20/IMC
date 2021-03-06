import React from 'react';
import { Text, StyleSheet, TextInput, TouchableOpacity, View, Alert } from 'react-native';


export default function App(){

  /* Variables */
  const [weight, setWeight] = React.useState('');
  const [height, setHeight] = React.useState('');
  const [imc, setImc] = React.useState('00.00');

  /* Methods */
  /**
   * 
   * @returns void
   */
  function calculate() {

    if (validate()) {
      return;
    }
//-----------variaveis auxiliares-------------------------
    var auxHeight = height.replace(/,/gi, '.');
    var auxWeight = weight.replace(/,/gi, '.');
    var auxImc = auxWeight / (auxHeight * auxHeight);
    var result = getResult(auxImc);

    setImc(auxImc.toFixed(2));

    Alert.alert(`Resultado - ${result.title}`, `${result.message}`);
  }

  /**
   * 
   * @returns 
   */
  //------------------função de validação de peso e altura--------------------------
  function validate() {
    if (weight.trim().length === 0) {
      Alert.alert("Opa!", `Informe o Peso(kg).`);
      return true;
    }
    if (height.trim().length === 0) {
      Alert.alert("Opa!", `Informe a Altura(m, cm).`);
      return true;
    }
    return false;
  }

  /**
   * 
   * @param {*} auxImc 
   * @returns 
   */
  function getResult(auxImc) {
    const imagem = 'https://www.plasticadosonho.com.br/wp-content/uploads/2017/12/blog-06-como-calcular-o-imc.jpg'
    var result = null;

    var results = [
      {
        title: 'Abaixo do Peso',
        message: `Sinto muito, seu IMC é de ${auxImc.toFixed(2)} kg/m2 e você precisa ganhar peso.`
      },
      {
        title: 'Peso Normal',
        message: `Parabéns, seu IMC é ${auxImc.toFixed(2)} kg/m2 e você está dentro do peso adequado!`
      },
      {
        title: 'Sobrepeso',
        message: `Sinto muito, mas o seu IMC é de ${auxImc.toFixed(2)} kg/m2, por isso você está acima do peso.`
      }
    ];

    switch (true) {
      case (auxImc < 18.5):
        result = results[0];
        break;
      case (auxImc >= 18.5 && auxImc <= 24.9):
        result = results[1];
        break;
      case (auxImc >= 25 && auxImc <= 29.9):
        result = results[2];
        break;
      case (auxImc >= 30 && auxImc <= 34.9):
        result = results[2];
        result.title = 'Obesidade Grau I';
        break;
      case (auxImc >= 35 && auxImc <= 39.9):
        result = results[2];
        result.title = 'Obesidade Grau II';
        break;
      case (auxImc >= 40):
        result = results[2];
        result.title = 'Obesidade Grau III ou Mórbida';
        break;
      default:
        break;
    }
    return result;
  }

  return (
    
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header }> 
          <Text style={styles.titleHeader}>
            Calculadora IMC
          </Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.labelIntput}>Peso(Kg)</Text>
          <TextInput
            style={styles.input}
            fontSize={15}
            value={weight}
            onChangeText={setWeight}
            keyboardType='numeric'
            placeholder='Informe seu peso...'>
          </TextInput>
          <Text style={[{ marginTop: 25 }, styles.labelIntput]}>Altura (m, cm)</Text>
          <TextInput
            style={styles.input}
            fontSize={15}
            value={height}
            keyboardType='numeric'  
            onChangeText={setHeight}
            placeholder='Informe sua altura...'>
          </TextInput>
          <View style={styles.contentResult}>
            <TouchableOpacity
              style={styles.button}
              onPress={calculate}>
              <Text style={styles.labelButton}>Calcular</Text>
            </TouchableOpacity>
            <Text style={styles.labelResult}>{imc}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}



//-------------------------------------------CSS--------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAEAEA',
   justifyContent: 'center'
  },
  content: {
    flex: 1,
    justifyContent: 'center'
  },
  header: {
    backgroundColor: '#001',
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
    border: '143',
    borderColor: '#fff',
   

  },
  titleHeader: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    justifyContent: 'center',
    
  },
  body: {
    padding: 15,
    marginTop: 35
  },
  labelIntput: {
    fontSize: 20,
    color: '#000',
    fontfamily: 'serif'
    
  },
  input: {
    borderWidth: 4,
    borderRadius: 20,
    marginVertical: 10,
    padding: 10,
    borderColor: '#000',
    backgroundColor: '#fff'
  },
  contentButton: {
    flex: 1,
    alignItems: 'center'
  },
  labelButton: {
    fontSize: 20,
    color: '#fff'
    
  },
  button: {
    backgroundColor: '#001',
    height: 50,
    width: 150,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#fff'
  },
  contentResult: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50
  },
  labelResult: {
    fontSize: 50,
    marginTop: 50,
    backgroundimage: {
      
      
      
    }
  }
});