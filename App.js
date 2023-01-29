// Componentes base
import React, { Component } from 'react'

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
          <Stack.Screen name="ComerBem">
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
      </NavigationContainer>
    )
  }
}
