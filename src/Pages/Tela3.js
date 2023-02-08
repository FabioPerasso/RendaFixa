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
import { NativeBaseProvider , Text, Box, Image } from "native-base"

import Item4 from '../Models/Item2CDI';

import ItemComponente3 from '../Componentes/ItemComponenteCDI';
import ItemDatabase3 from '../Database/ItemDatabaseCDI';

export default class Tela3 extends Component {
  constructor(props){
    super(props)
    this.state = {
      investidor: "",
      inicio: '',
      prazo: '',
      valor: 0.0,
      imposto: "S",
      taxacdi: 0.0,
      cdi: 0.0,
      ipca: 0.0,
      lista: []
    }
    this.Listar();
  }
  
  Listar = () => {
    const banco = new ItemDatabase3();
    banco.Listar().then(
      listaCompleta => {
        this.setState({lista: listaCompleta})
      }
    )

  }
  
  Cadastrar = (investidor, inicio, prazo, valor, imposto, taxacdi, cdi, ipca) => {
    const itemNovo = new Item4(investidor, inicio, prazo, valor, imposto, taxacdi, cdi, ipca);
    const banco = new ItemDatabase3();
    banco.Inserir(itemNovo);
    this.Listar();
    }

  Atualizar = (item4) => {
    const banco = new ItemDatabase3();
    banco.Atualizar(item4);
    this.Listar();
  }

  Rever = (item4) => {
    const banco = new ItemDatabase3();
    banco.Rever(item4);
    this.Listar();
  }

  Remover = (id) => {
    const banco = new ItemDatabase3();
    banco.Remover(id);
    this.Listar();
  }



  render() {
    return(
      <NativeBaseProvider>
        <ScrollView>
          <View style={estilo.corpo}>
            <Text style={estilo.titulo}>Calculadora CDI+</Text>
            <View style={estilo.areaBotao}>
              <Text style={{ color: 'blue', margin: 5, justifyContent: 'center'}}>Investidor:</Text> 
              <TextInput placeholder='Nome Investidor' onChangeText={(valorDigitado) => {this.setState({investidor: valorDigitado})}}  style={estilo.entradaTexto}></TextInput>
            </View>
            <View style={estilo.areaBotao}>
              <Text style={{ color: 'blue', margin: 5, justifyContent: 'center'}}>Inicio.......:</Text>
              <TextInput placeholder='dd/mm/aaaa' onChangeText={(valorDigitado) => {this.setState({inicio: valorDigitado})}} style={estilo.entradaTexto}></TextInput>
            </View>
            <View style={estilo.areaBotao}>
              <Text style={{ color: 'blue', margin: 5, justifyContent: 'center'}}>Prazo.......:</Text>
              <TextInput placeholder='dd/mm/aaaa' onChangeText={(valorDigitado) => {this.setState({prazo: valorDigitado})}} style={estilo.entradaTexto}></TextInput>
            </View>
            <View style={estilo.areaBotao}>
              <Text style={{ color: 'blue', margin: 5, justifyContent: 'center'}}>Valor........:</Text>
              <TextInput placeholder='Ex: 1000.00' onChangeText={(valorDigitado) => {this.setState({valor: valorDigitado})}} style={estilo.entradaTexto}></TextInput>
            </View>
            
            <View style={estilo.areaBotao}>
              <Text style={{ color: 'blue', margin: 5, justifyContent: 'center'}}>Taxa CDI...:</Text>
              <TextInput placeholder='Ex: 100' onChangeText={(valorDigitado) => {this.setState({taxacdi: valorDigitado})}} style={estilo.entradaTexto}></TextInput>
            </View>
            <View style={estilo.areaBotao}>
              <Text style={{ color: 'blue', margin: 5, justifyContent: 'center'}}>CDI........:</Text>
              <TextInput placeholder='Ex: 12.65' onChangeText={(valorDigitado) => {this.setState({cdi: valorDigitado})}} style={estilo.entradaTexto}></TextInput>
            </View>
            <View style={estilo.areaBotao}>
              <Text style={{ color: 'blue', margin: 5, justifyContent: 'center'}}>IPCA.........:</Text>
              <TextInput placeholder='Ex: 6.5' onChangeText={(valorDigitado) => {this.setState({ipca: valorDigitado})}} style={estilo.entradaTexto}></TextInput>
            </View>
            <View style={estilo.areaBotao}>
              <Text style={{ color: 'blue', margin: 5, justifyContent: 'center'}}>IR.............:</Text>
              <TextInput placeholder='S ou N' onChangeText={(valorDigitado) => {this.setState({imposto: valorDigitado})}} style={estilo.entradaTexto1}></TextInput>
            </View>
          </View>
          <View style={estilo.areaBotao}>
            <TouchableOpacity 
              onPress={() => this.Cadastrar(this.state.investidor, this.state.inicio, this.state.prazo,  this.state.valor, this.state.imposto, this.state.taxacdi, this.state.cdi, this.state.ipca)}
              style={estilo.botao}>
              <Text style={{fontWeight: 'bold'}}>SALVAR</Text>
            </TouchableOpacity>
          </View>
          {/*Lista de itens */}
          <View>
          <Text style={{textAlign: 'center'}}>==============================</Text>
          <Text style={estilo.titulo}>Lista de Cálculos CDI</Text>
          {
            this.state.lista.map( elementoLista => (
              <ItemComponente3 
              id={elementoLista.id}
              item4={elementoLista}
              investidor={elementoLista.investidor}
              inicio={elementoLista.inicio}
              prazo={elementoLista.prazo}
              valor={elementoLista.valor} 
              imposto={elementoLista.imposto}
              taxacdi={elementoLista.taxacdi}
              cdi={elementoLista.cdi}
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


