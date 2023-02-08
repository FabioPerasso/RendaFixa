import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'

export default class Tela4 extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 20, color: 'white'}}>IPCA 12 meses = 5,8%</Text>
        <Text style={{fontSize: 20, color: 'white'}}>Selic ............ = 13,75%</Text>
        <Text style={{fontSize: 20, color: 'white'}}>CDI .............. = 13,65%</Text>
        <Text style={{fontSize: 20, color: 'white'}}>Dolar ........... = R$ 5,10</Text>
      </View>
    )
  }
}

/* Estilização do projeto */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#0404B4',
    justifyContent: 'center'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 200,
    marginTop: 10
  }
});