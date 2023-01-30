import React, { Component } from 'react'
import {
  
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import Item2 from '../Models/Item2';

import ItemComponente from '../Componentes/ItemComponente';
import ItemDatabase from '../Database/ItemDatabase';

export default class Tela1 extends Component {
  constructor(props){
    super(props)
    this.state = {
      investidor: "",
      inicio: '',
      prazo: '',
      valor: 0.0,
      imposto: "S",
      taxapre: 0.0,
      ipca: 0.0,
    //  cdi: 0.0,
    //  cdiperc: 0.0,
      lista: []
    }
    this.Listar();
  }
  
  Listar = () => {
    const banco = new ItemDatabase();
    banco.Listar().then(
      listaCompleta => {
        this.setState({lista: listaCompleta})
      }
    )

  }
  
/*  Cadastrar = (investidor, inicio, prazo, valor, imposto, taxapre, ipca, cdi, cdiperc) => {
    const itemNovo = new Item2(investidor, inicio, prazo, valor, imposto, taxapre, ipca, cdi, cdiperc);*/
  Cadastrar = (investidor, inicio, prazo, valor, imposto, taxapre, ipca) => {
    const itemNovo = new Item2(investidor, inicio, prazo, valor, imposto, taxapre, ipca);
    const banco = new ItemDatabase();
    banco.Inserir(itemNovo);
    this.Listar();
  //  this.state.lista.push(itemNovo);
  //  this.forceUpdate();
  }

  Atualizar = (item2) => {
    const banco = new ItemDatabase();
    banco.Atualizar(item2);
    this.Listar();
  }

  Remover = (id) => {
    const banco = new ItemDatabase();
    banco.Remover(id);
    this.Listar();
  }



  render() {
    return(
      <ScrollView>
        <View style={estilo.corpo}>
          <Text style={estilo.titulo}>CONTROLE INVESTIDOR</Text>
          <View style={estilo.areaBotao}>
            <Text style={{ color: 'blue', margin: 5, justifyContent: 'center'}}>Investidor:</Text> 
            <TextInput placeholder='Nome Investidor' onChangeText={(valorDigitado) => {this.setState({investidor: valorDigitado})}}  style={estilo.entradaTexto}></TextInput>
          </View>
          <View style={estilo.areaBotao}>
            <Text style={{ color: 'blue', margin: 5, justifyContent: 'center'}}>Inicio:</Text>
            <TextInput placeholder='dd/mm/aaaa' onChangeText={(valorDigitado) => {this.setState({inicio: valorDigitado})}} style={estilo.entradaTexto}></TextInput>
          </View>
          <View style={estilo.areaBotao}>
            <Text style={{ color: 'blue', margin: 5, justifyContent: 'center'}}>Prazo:</Text>
            <TextInput placeholder='dd/mm/aaaa' onChangeText={(valorDigitado) => {this.setState({prazo: valorDigitado})}} style={estilo.entradaTexto}></TextInput>
          </View>
          <View style={estilo.areaBotao}>
            <Text style={{ color: 'blue', margin: 5, justifyContent: 'center'}}>Valor:</Text>
            <TextInput placeholder='Ex: 1000.00' onChangeText={(valorDigitado) => {this.setState({valor: valorDigitado})}} style={estilo.entradaTexto}></TextInput>
          </View>
          <View style={estilo.areaBotao}>
            <Text style={{ color: 'blue', margin: 5, justifyContent: 'center'}}>IR:</Text>
            <TextInput placeholder='S' onChangeText={(valorDigitado) => {this.setState({imposto: valorDigitado})}} style={estilo.entradaTexto}></TextInput>
          </View>
          <View style={estilo.areaBotao}>
            <Text style={{ color: 'blue', margin: 5, justifyContent: 'center'}}>Taxa Pré:</Text>
            <TextInput placeholder='Ex: 12.5' onChangeText={(valorDigitado) => {this.setState({taxapre: valorDigitado})}} style={estilo.entradaTexto}></TextInput>
          </View>
          <View style={estilo.areaBotao}>
            <Text style={{ color: 'blue', margin: 5, justifyContent: 'center'}}>IPCA:</Text>
            <TextInput placeholder='Ex: 6.5' onChangeText={(valorDigitado) => {this.setState({ipca: valorDigitado})}} style={estilo.entradaTexto}></TextInput>
          </View>
        </View>
        <View style={estilo.areaBotao}>
          <TouchableOpacity 
            onPress={() => this.Cadastrar(this.state.investidor, this.state.inicio, this.state.prazo,  this.state.valor, this.state.imposto, this.state.taxapre, this.state.ipca)}
            style={estilo.botao}>
            <Text style={{fontWeight: 'bold'}}>SALVAR</Text>
          </TouchableOpacity>
        </View>
        {/*Lista de itens */}
        <View>
        <Text style={estilo.titulo}>Lista de Investidores</Text>
        {
          this.state.lista.map( elementoLista => (
            <ItemComponente 
            id={elementoLista.id}
            item2={elementoLista}
            investidor={elementoLista.investidor}
            inicio={elementoLista.inicio}
            prazo={elementoLista.prazo}
            valor={elementoLista.valor} 
            imposto={elementoLista.imposto}
            taxapre={elementoLista.taxapre}
            ipca={elementoLista.ipca}
            atualizar={this.Atualizar}
            remover={this.Remover} />
              
            
            
          )

          )
        }
        </View>
      
      </ScrollView>
    )
  }

}

const estilo = StyleSheet.create({
  titulo: {
      fontSize: 18,
      margin: 10,
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
    backgroundColor: 'grey',
    color: 'black',
    borderWidth: 2,
    width: 180,
    height: 40,
    margin: 3,
    borderColor: 'green',
    borderRadius: 20
  },
  areaBotao:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    
  }

})

/*
  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 20}}>Inflação atual= 5,8%</Text>
      </View>
    )
  }
}

/* Estilização do projeto */
