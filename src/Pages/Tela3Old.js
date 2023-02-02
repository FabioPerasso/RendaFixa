import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'

export default class Tela3 extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 20}}>Nunca sei se é fome ou vontade de comer, mas para não ter dúvida, eu sempre como.</Text>
      </View>
    )
  }
}

/* Estilização do projeto */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'grey',
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