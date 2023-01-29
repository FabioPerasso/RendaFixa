import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native'

export default class Home extends Component {
  
  render() {
    return (
      <View style={styles.container}>
        <Image style={{ width: 250, height: 200}}  source={require('./ComerBem.jpg')}></Image>
        <TouchableOpacity
          style={styles.button}
          onPress={this.props.MandarNotificacao}
        >
          <Text>Testar notificação</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={this.props.CancelarNotificacao}>
          <Text>Cancelar notificações</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

/* Estilização do projeto */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'grey',
    padding: 10,
    width: 200,
    marginTop: 10
  }
});