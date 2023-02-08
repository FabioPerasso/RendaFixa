// Componentes base
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
import { NativeBaseProvider , Box } from "native-base" ;  

// Telas
import Home from './src/Pages/Home'
import Tela1 from './src/Pages/Tela1'
import Tela2 from './src/Pages/Tela2'
import Tela3 from './src/Pages/Tela3'
import Tela4 from './src/Pages/Tela4'
import Redirect from './src/Pages/Redirect'

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
    
  }
  
  componentDidMount() {
    notificador.configure();
    notificador.createChannel();
    notificador.buildNotificationSchedule();
  }

  onPressSendNotification1 = () => {
    notificador.showNotification(
      1,
      "Renda Fixa",
      "Calcular Pré-fixados",
      
      {}, // data
      {} // options
    )
  }

  onPressSendNotification2 = () => {
    notificador.showNotification(
      2,
      "Renda Fixa",
      "Calcular IPCA+Taxa",
      
      {}, // data
      {} // options
    )
  }

  onPressSendNotification3 = () => {
    notificador.showNotification(
      3,
      "Renda Fixa",
      "Calcular %CDI Pós",
      
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
          <Stack.Screen name="RENDA FIXA">
            {
              ({navigation}) => {
                notificador.setNavegador(navigation)
                return(
                  <Home                 
                    MandarNotificacao1={this.onPressSendNotification1} 
                    MandarNotificacao2={this.onPressSendNotification2} 
                    MandarNotificacao3={this.onPressSendNotification3}
                    CancelarNotificacao={this.onPressCancelAllLocalNotification} 
                  />
                )
              }
            }
          </Stack.Screen>

          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Tela 1" component={Tela1} />
          <Stack.Screen name="Tela 2" component={Tela2} />
          <Stack.Screen name="Tela 3" component={Tela3} />
          <Stack.Screen name="Tela 4" component={Tela4} />

        </Stack.Navigator>
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
    backgroundColor: 'lightblue',
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