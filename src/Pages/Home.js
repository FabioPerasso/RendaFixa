import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { NativeBaseProvider , Text, Box, Image, } from "native-base"   


 
export default class Home extends Component {
  
  render() {
    return (
      <View style={styles.container}>
        <NativeBaseProvider>
          
          <Box flex={1}            
            alignItems="center" justifyContent="center" >
              <Text style={{ color: 'blue', margin: 5, justifyContent: 'center'}}>OBJETIVO</Text> 
              <Text>Calcular a rentabilidade de títulos de Renda fixa: CDB´s, LCA´s, ...</Text>
              <TouchableOpacity
                style={styles.button}                
                onPress={this.props.MandarNotificacao1}>
                <Text>Calculadora PRÉ</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}                
                onPress={this.props.MandarNotificacao2}>
                <Text>Calculadora IPCA+</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}                
                onPress={this.props.MandarNotificacao3}>
                <Text>Calculadora PÓS CDI</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={this.props.CancelarNotificacao}>
                <Text>Cancelar notificações</Text>
              </TouchableOpacity>
          </Box> 
          <Image style={styles.imageBack} source={require('./dolar.jpg')}></Image>
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
    marginTop: 10,
    borderRadius: 15,
    borderColor: '#000000',
  },
  imageBack: {
    flex: 1,
    width: 350,
    height: 10,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center"
  },
});