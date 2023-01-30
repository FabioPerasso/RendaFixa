import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'

export default class Tela11 extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 20}}>Inflação atual= 5,8%</Text>
      </View>
    )
  }
}

/* Estilização do projeto */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "grey"
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 200,
    marginTop: 10
  }
});