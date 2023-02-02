import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { NativeBaseProvider , extendTheme, Text, Box, Image } from "native-base"   


 
export default class Home extends Component {
  
  render() {
    return (
      <View style={styles.container}>
        <NativeBaseProvider>
          <Image widht={100} source={require('./Renda3.jpg')}></Image>
          <Box flex={1} bg={{linearGradient: {
              colors: ['#58D3F7', '#0040FF'],
              start: [0, 0],
              end: [1, 0]
            }}} 
            alignItems="center" justifyContent="center" >
      
              <TouchableOpacity
                style={styles.button}                
                onPress={this.props.MandarNotificacao}
              >
                <Text>Calculadora</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={this.props.CancelarNotificacao}>
                <Text>Cancelar notificações</Text>
              </TouchableOpacity>
          </Box> 
        </NativeBaseProvider>
      </View>
      

    )

  }
}


/* Estilização do projeto */
/*<Box flex={1} bg="#013ADF" alignItems="center" justifyContent="center">   
</Box>*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    alignItems: 'center',
    fontWeight: 'bold',
    backgroundColor: '#40FF00',
    padding: 10,
    width: 200,
    marginTop: 10
  }
});