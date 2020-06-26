import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import TouchID from 'react-native-touch-id';

export default function App() {
  const [supported, setSupported] = useState(null);
  const [nome, setNome] = useState('Usuário anônimo');

  useEffect(() => {
    TouchID.isSupported()
    .then(success => {
      setSupported(true);
      alert('Touch ID habilitado'); 
    })
    .catch(error => {
      console.log('Erro touch: ' + error);
      alert('Touch ID não suportado/habilitado'); 
    })
  }, []);

  function handleLogin() {
    const configs = {
      title: 'Autenticação Touch ID',
      color: '#FF0000',
      sensorErrorDescription: 'Touch ID inválido'
    };

    TouchID.authenticate("Login App", configs)
    .then(success => {
      console.log('Seja bem vindo');
      setNome('Usuário Autenticado');
    })
    .catch(error => {
      console.log('Falha na autenticação: ' + error);
    });
  }

  return (
    <View style={styles.container}>
      <TouchableHighlight style={styles.btn} onPress={handleLogin}>
        <Text style={{color: '#FFF', fontWeight: 'bold'}}>Entrar</Text>
      </TouchableHighlight>
    <Text style={{fontSize: 30, fontWeight: 'bold'}}>{nome}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn: {
    borderRadius: 3,
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#0391D7'
  }
});
