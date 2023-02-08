import React, {Component} from 'react';
import {
  MaskedViewComponent,
  SafeAreaView,
  ScrollView,
  StatusBar,
  substring,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { NativeBaseProvider , Text, Box, Image } from "native-base"

const getCurrentDate=()=>{
  var day = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();

  if (month < 10) {
    var mes = "0" + month
  } else {
    var mes = month
  }
  if (day < 10) {
    var dia = "0" + day
  } else {
    var dia = day
  }
  return dia + '/' + mes + '/' + year;  //format: dd/mm/aaaa;
 
}

const getDias=()=> {
var day2 = new Date().getDate();
var month2 = new Date().getMonth() + 1;
var year2 = new Date().getFullYear();
return year2 * 365 + month2 * 30 + day2;

}
  

export default class ItemComponenteIPCA extends Component {
  
  getEstilo() {
    diasPrazo = this.props.prazo.substring(0,2);
    mesPrazo = this.props.prazo.substring(3,5)*30;
    AnoPrazo = this.props.prazo.substring(6,10)*365;
    totPrazo = parseInt(diasPrazo) + parseInt(mesPrazo) + parseInt(AnoPrazo);
    diasInicio = this.props.inicio.substring(0,2);
    mesInicio = this.props.inicio.substring(3,5)*30;
    AnoInicio = this.props.inicio.substring(6,10)*365;
    totInicio = parseInt(diasInicio) + parseInt(mesInicio) + parseInt(AnoInicio);
    taxapre = ((1 + parseFloat(this.props.taxaipca/100)*(1 + parseFloat(this.props.ipca/100)))-1)*100;
   
    difDias = totPrazo - totInicio;
    Anos = difDias / 365;
    ir= 0.0;
    if ( this.props.imposto == "N" ) {{ir = 0.0}}
    else {
      if ( difDias < 180) {ir = 0.225}      
      else { if ( difDias < 360) {ir = 0.2} 
            else { if ( difDias < 720) {ir = 0.175}
                  else {{ir = 0.15}} }}}
    
  //  Juros = (Math.pow((1 + parseFloat(this.props.taxapre/100)),Anos)-1) * parseFloat(this.props.valor) * (1-ir);
    Juros = (Math.pow((1 + parseFloat(this.props.taxaipca/100))*(1 + parseFloat(this.props.ipca/100)),Anos)-1) * parseFloat(this.props.valor) * (1-ir);
    Retorno = parseFloat(this.props.valor) + Juros;
    TaxaEfetiva = (Math.pow(Retorno / parseFloat(this.props.valor),(1/Anos)) - 1)*100;
    TaxaReal = (((1 + TaxaEfetiva/100) / (1 + parseFloat(this.props.ipca) / 100)) - 1)*100;

    if ( totPrazo < totInicio)  {
      return {color: 'red', fontSize: 12, borderWidth: 2, height: 40, backgroundColor: 'yellow'}
    } else {
      return {color: 'black',fontSize: 12, borderWidth: 2, height: 40}
    }
  }
      
   
  render() {
    return(
      <NativeBaseProvider>
        <View>
            <View style={{padding: 17, margin: 5}}>
            <Text style={estilo.titulo}>Cálculo(id): {this.props.id}</Text>
            <TextInput style={estilo.entradaTexto}>Investidor: {this.props.investidor}        Hoje: {getCurrentDate()}</TextInput>
            <TextInput style={this.getEstilo()}>Inicio: {this.props.inicio} </TextInput>
            <TextInput style={this.getEstilo()}>Prazo: {this.props.prazo} </TextInput>
            <TextInput style={estilo.entradaTexto}>Dias: {difDias}     Anos: {Math.round(Anos*100)/100}</TextInput>
            <TextInput style={estilo.entradaTexto}>IR: {this.props.imposto}   Valor IR: {Math.round(ir*1000)/10}%</TextInput>
            <TextInput style={estilo.entradaTexto}>Taxa IPCA+: {this.props.taxaipca}% </TextInput>
            <TextInput style={estilo.entradaTexto}>IPCA......: {this.props.ipca}% </TextInput>
            <TextInput style={estilo.entradaTexto}>Valor: R$ {this.props.valor} </TextInput>
            <TextInput style={estilo.entradaTexto}>Juros: R$ {Math.round(Juros*100)/100}</TextInput>
            <TextInput style={estilo.entradaTexto}>Retorno: R$ {Math.round(Retorno*100)/100} </TextInput>
            <TextInput style={estilo.entradaTexto}>Taxa Anual Efetiva.........: {Math.round(TaxaEfetiva*100)/100} % </TextInput>
            <TextInput style={estilo.entradaTexto}>Taxa Real sobre Inflação: {Math.round(TaxaReal*100)/100} % </TextInput>
            </View>
            <View style={estilo.areaBotao}>
              <TouchableOpacity 
                  onPress={() => this.props.rever(this.props.item3)}
                  style={estilo.botao}>
                  <Text style={{}}>IR</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                  onPress={() => this.props.atualizar(this.props.item3)}
                  style={estilo.botao}>
                  <Text style={{}}>ISENTO IR</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                  onPress={() => this.props.remover(this.props.id)}
                  style={estilo.botao}>
                  <Text style={{}}>REMOVER</Text>
              </TouchableOpacity>
            </View>
        </View>
      </NativeBaseProvider>
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
    justifyContent: 'center'
  },
  botao: {
    backgroundColor: '#F5BCA9',
    width: 100,
    height:30,
    margin: 5,
    borderRadius:30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  entradaTexto: {
    fontSize: 12,
    borderWidth: 2,
    height: 40,
    color: 'black',
    backgroundColor: '#A9E2F3'   
  },
  areaBotao:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }

})