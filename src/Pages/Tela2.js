import React, { Component } from 'react'
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { NativeBaseProvider , extendTheme, Text, Box, Image } from "native-base"

import Item3 from '../Models/Item2IPCA';

import ItemComponente2 from '../Componentes/ItemComponenteIPCA';
import ItemDatabase2 from '../Database/ItemDatabaseIPCA';

export default class Tela2 extends Component {
  constructor(props){
    super(props)
    this.state = {
      investidor: "",
      inicio: '',
      prazo: '',
      valor: 0.0,
      imposto: "S",
      taxaipca: 0.0,
      ipca: 0.0,
    //  cdi: 0.0,
    //  cdiperc: 0.0,
      lista: []
    }
    this.Listar();
  }
  
  Listar = () => {
    const banco = new ItemDatabase2();
    banco.Listar().then(
      listaCompleta => {
        this.setState({lista: listaCompleta})
      }
    )

  }
  
  Cadastrar = (investidor, inicio, prazo, valor, imposto, taxaipca, ipca) => {
    const itemNovo = new Item3(investidor, inicio, prazo, valor, imposto, taxaipca, ipca);
    const banco = new ItemDatabase2();
    banco.Inserir(itemNovo);
    this.Listar();
    }

  Atualizar = (item3) => {
    const banco = new ItemDatabase2();
    banco.Atualizar(item3);
    this.Listar();
  }

  Rever = (item3) => {
    const banco = new ItemDatabase2();
    banco.Rever(item3);
    this.Listar();
  }

  Remover = (id) => {
    const banco = new ItemDatabase2();
    banco.Remover(id);
    this.Listar();
  }



  render() {
    return(
      <NativeBaseProvider>
        <ScrollView>
          <View style={estilo.corpo}>
            <Text style={estilo.titulo}>Calculadora IPCA+</Text>
            <View style={estilo.areaBotao}>
              <Text style={{ color: 'blue', margin: 5, justifyContent: 'center'}}>Investidor..:</Text> 
              <TextInput placeholder='Nome Investidor' onChangeText={(valorDigitado) => {this.setState({investidor: valorDigitado})}}  style={estilo.entradaTexto}></TextInput>
            </View>
            <View style={estilo.areaBotao}>
              <Text style={{ color: 'blue', margin: 5, justifyContent: 'center'}}>Inicio.........:</Text>
              <TextInput placeholder='dd/mm/aaaa' onChangeText={(valorDigitado) => {this.setState({inicio: valorDigitado})}} style={estilo.entradaTexto}></TextInput>
            </View>
            <View style={estilo.areaBotao}>
              <Text style={{ color: 'blue', margin: 5, justifyContent: 'center'}}>Prazo.........:</Text>
              <TextInput placeholder='dd/mm/aaaa' onChangeText={(valorDigitado) => {this.setState({prazo: valorDigitado})}} style={estilo.entradaTexto}></TextInput>
            </View>
            <View style={estilo.areaBotao}>
              <Text style={{ color: 'blue', margin: 5, justifyContent: 'center'}}>Valor..........:</Text>
              <TextInput placeholder='Ex: 1000.00' onChangeText={(valorDigitado) => {this.setState({valor: valorDigitado})}} style={estilo.entradaTexto}></TextInput>
            </View>
            
            <View style={estilo.areaBotao}>
              <Text style={{ color: 'blue', margin: 5, justifyContent: 'center'}}>Taxa IPCA+:</Text>
              <TextInput placeholder='Ex: 5.5' onChangeText={(valorDigitado) => {this.setState({taxaipca: valorDigitado})}} style={estilo.entradaTexto}></TextInput>
            </View>
            <View style={estilo.areaBotao}>
              <Text style={{ color: 'blue', margin: 5, justifyContent: 'center'}}>IPCA...........:</Text>
              <TextInput placeholder='Ex: 6.5' onChangeText={(valorDigitado) => {this.setState({ipca: valorDigitado})}} style={estilo.entradaTexto}></TextInput>
            </View>
            <View style={estilo.areaBotao}>
              <Text style={{ color: 'blue', margin: 5, justifyContent: 'center'}}>IR.............:</Text>
              <TextInput placeholder='S ou N' onChangeText={(valorDigitado) => {this.setState({imposto: valorDigitado})}} style={estilo.entradaTexto1}></TextInput>
            </View>
          </View>
          <View style={estilo.areaBotao}>
            <TouchableOpacity 
              onPress={() => this.Cadastrar(this.state.investidor, this.state.inicio, this.state.prazo,  this.state.valor, this.state.imposto, this.state.taxaipca, this.state.ipca)}
              style={estilo.botao}>
              <Text style={{fontWeight: 'bold'}}>SALVAR</Text>
            </TouchableOpacity>
          </View>
          {/*Lista de itens */}
          <View>
          <Text style={{textAlign: 'center'}}>==============================</Text>
          <Text style={estilo.titulo}>Lista de Cálculos IPCA</Text>
          {
            this.state.lista.map( elementoLista => (
              <ItemComponente2 
              id={elementoLista.id}
              item3={elementoLista}
              investidor={elementoLista.investidor}
              inicio={elementoLista.inicio}
              prazo={elementoLista.prazo}
              valor={elementoLista.valor} 
              imposto={elementoLista.imposto}
              taxaipca={elementoLista.taxaipca}
              ipca={elementoLista.ipca}
              atualizar={this.Atualizar}
              rever={this.Rever}
              remover={this.Remover} />
            )
            )
          }
          </View>
        
        </ScrollView>
      </NativeBaseProvider>
    )
  }

}

const estilo = StyleSheet.create({
  titulo: {
      fontSize: 18,
      margin: 10,
      textAlign: 'center',
      color: 'black'
  },
  corpo: {
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  botao: {
    backgroundColor: 'green',
    width: 150,
    height:30,
    margin: 5,
    borderRadius:30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  entradaTexto: {
    backgroundColor: '#A9BCF5',
    color: 'black',
    borderWidth: 2,
    width: 180,
    height: 40,
    margin: 3,
    textAlign: 'center',
    borderColor: 'green',
    borderRadius: 20
  },
  entradaTexto1: {
    backgroundColor: 'grey',
    color: 'black',
    borderWidth: 2,
    width: 60,
    height: 40,
    margin: 3,
    borderColor: 'green',
    borderRadius: 20
  },
  areaBotao:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'left'
    
  }

})


