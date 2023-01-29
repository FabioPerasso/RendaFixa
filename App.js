// Componentes base
import React, { Component } from 'react'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import Item2 from './src/Models/Item2';
import ItemComponente from './src/Componentes/ItemComponente';
import ItemDatabase from './src/Database/ItemDatabase';


// Telas
import Home from './src/Pages/Home'
import Redirect from './src/Pages/Redirect'
import Tela1 from './src/Pages/Tela1'
import Tela2 from './src/Pages/Tela2'
import Tela3 from './src/Pages/Tela3'
import Tela4 from './src/Pages/Tela4'

// Navegação
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

// Notificação
import { NotificationManager } from './src/Notification'

// Declaração de constantes
const notificador = NotificationManager
const Stack = createStackNavigator();

export default class App extends Component {
  constructor(props) {
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



  componentDidMount() {
    notificador.configure();
    notificador.createChannel();
    notificador.buildNotificationSchedule();
  }

  onPressSendNotification = () => {
    notificador.showNotification(
      1,
      "Teste de Notificação",
      "Vamos inserir uma mensagem um pouco mais longa para vermos o Android irá se adaptar ao conteúdo na tela?",
      
      {}, // data
      {} // options
    )
  }

  onPressCancelAllLocalNotification = () => {
    notificador.cancelAllLocalNotification()
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="">
            {
              ({navigation}) => {
                notificador.setNavegador(navigation)
                return(
                  <Home 
                    MandarNotificacao={this.onPressSendNotification} 
                    CancelarNotificacao={this.onPressCancelAllLocalNotification} 
                  />
                )
              }
            }
          </Stack.Screen>

          <Stack.Screen name="Redirect" component={Redirect} />
          <Stack.Screen name="Tela 1" component={Tela1} />
          <Stack.Screen name="Tela 2" component={Tela2} />
          <Stack.Screen name="Tela 3" component={Tela3} />
          <Stack.Screen name="Tela 4" component={Tela4} />

        </Stack.Navigator>

     ( <ScrollView>
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

      
        
      </NavigationContainer>
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