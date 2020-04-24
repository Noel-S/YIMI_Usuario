import React, { Component } from 'react';
//import { Container, Content, Text, Button, Grid, Col, Row, H3, View } from 'native-base';
//import CodeInput from 'react-native-confirmation-code-input';
import { Alert, StyleSheet, View, Text, TouchableOpacity, TouchableNativeFeedback, TextInput, StatusBar, Image } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Globals from '../../constants/Globals';

import axios from 'axios';
import FlechaBlancaIcon from '../../components/FlechaBlancaIcon';
import GearButton from '../../components/GearButton';
import Layout from '../../constants/Layout';

class VerificationCodeAPI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: this.props.navigation.getParam('nombre'),
      apellido: this.props.navigation.getParam('apellido'),
      email: this.props.navigation.getParam('email'),
      curp: this.props.navigation.getParam('curp'),
      telefono: this.props.navigation.getParam('telefono'),
      foto: this.props.navigation.getParam('foto'),
      code: ['', '', '', '', '', ''],
      loading: false,
      isConnected: true,
      typing: false,
      error: ''
    };
  }


  //Método para montar la vista.
  componentDidMount() {
    this.checkConnection();
  }

  //Método para verificar la conexión a internet.
  checkConnection = async () => {
    const state = await NetInfo.fetch();
    this.setState({ isConnected: state.isConnected });
    if (this.state.isConnected == true) {
      this.setState({ loading: true });
    } else {
      Alert.alert('Sin Conexión', 'Verifique su conexión e intente nuevamente.', [{ text: 'OK', onPress: () => this.props.navigation.goBack() }]);
    }
  }

  //Método para validar el código ingresado.
  validateCode = async () => {
    try {
      const res = await axios.post(`${Globals.server}:${Globals.port}/validar_codigo`, { telefono: this.state.telefono, codigo: this.state.code });

      if (res.status == 200) {
        if (res.data.respuesta == 0) {
          this.refs.codeInputRef1.clear();
          this.setState({ error: 'El código de verificación es incorrecto' });
        } else {
          this.refs.codeInputRef1.clear();
          this.props.navigation.navigate('AddPassword', {
            nombre: this.state.nombre, apellido: this.state.apellido,
            email: this.state.email, curp: this.state.curp, telefono: this.state.telefono, foto: this.state.foto
          });
        }
      } else {
        Alert.alert('Error', 'Servicio no disponible, intente más tarde.');
      }
    } catch (error) {
      Alert.alert('Sin Conexión', 'Verifique su conexión e intente nuevamente.');
    }
  }

  //Método para reenviar el código de verificación.
  sendCode = async () => {
    try {
      const res = await axios.post(`${Globals.server}:${Globals.port}/get_codigo_validacion`, { telefono: this.state.telefono });
      if (res.status == 200) {
        Alert.alert('Aviso', 'Se ha enviado un nuevo código de verificación');
      } else {
        Alert.alert('Error', 'Servicio no disponible, intente más tarde.');
      }
    } catch (error) {
      Alert.alert('Sin Conexión', 'Verifique su conexión e intente nuevamente.');
    }
  }

  //Método que recibe el código ingresado.
  _code(code) {
    if (code != '') {
      this.setState({ code: code });
    } else {
      this.setState({ error: 'Ingrese todos los campos' })
    }
  }


  render() {
    return (
<View style={styles.container}>
          <StatusBar hidden={true} />
          <View style={styles.lateral} />
          <View style={styles.content}>
            <View style={styles.title}>
              <Text style={{ fontSize: Layout.isSmallDevice ? 42 : 54 }}>Registro.</Text>
              <Text style={{ fontSize: Layout.isSmallDevice ? 20 : 24 }}>Código de verificación.</Text>
              <Text style={{ fontSize: Layout.isSmallDevice ? 16 : 18, marginTop: 20 }}>El código se ha enviado al número:</Text>
              <Text style={{ fontSize: Layout.isSmallDevice ? 16 : 18 }}>{`${this.state.telefono.slice(0, 3)}*****${this.state.telefono.slice(8, 10)}`}</Text>
            </View>

            <View style={{ alignSelf: 'center', marginTop: Layout.isSmallDevice ? 80 : 0 }}>
              <Text style={{ fontSize: Layout.isSmallDevice ? 16 : 18, marginBottom: 10 }}>Código de 6 dígitos.</Text>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: Layout.window.width - 50 }}>
                <View style={[styles.codeBox, { borderBottomLeftRadius: 20 }]}>
                  <TextInput style={styles.input} keyboardType='phone-pad' maxLength={1}
                    onChangeText={text => this.setState(prev => {
                      let ncode = prev.code;
                      ncode[0] = text;
                      return ({ code: ncode })
                    })} />
                </View>
                <View style={styles.codeBox}>
                  <TextInput style={styles.input} keyboardType='phone-pad' maxLength={1}
                    onChangeText={text => this.setState(prev => {
                      let ncode = prev.code;
                      ncode[1] = text;
                      return ({ code: ncode })
                    })} />
                </View>
                <View style={styles.codeBox}>
                  <TextInput style={styles.input} keyboardType='phone-pad' maxLength={1}
                    onChangeText={text => this.setState(prev => {
                      let ncode = prev.code;
                      ncode[2] = text;
                      return ({ code: ncode })
                    })} />
                </View>
                <View style={styles.codeBox}>
                  <TextInput style={styles.input} keyboardType='phone-pad' maxLength={1}
                    onChangeText={text => this.setState(prev => {
                      let ncode = prev.code;
                      ncode[3] = text;
                      return ({ code: ncode })
                    })} />
                </View>
                <View style={styles.codeBox}>
                  <TextInput style={styles.input} keyboardType='phone-pad' maxLength={1}
                    onChangeText={text => this.setState(prev => {
                      let ncode = prev.code;
                      ncode[4] = text;
                      return ({ code: ncode })
                    })} />
                </View>
                <View style={[styles.codeBox, { borderTopRightRadius: 20 }]}>
                  <TextInput style={styles.input} keyboardType='phone-pad' maxLength={1}
                    onChangeText={text => this.setState(prev => {
                      let ncode = prev.code;
                      ncode[5] = text;
                      return ({ code: ncode })
                    })} />
                </View>
              </View>
              <TouchableOpacity
                onPress={this.sendCode}
                style={{ flexDirection: 'row', marginStart: -3, alignItems: 'center', marginTop: 5 }}
              >
                <Image
                  source={require('../../assets/images/radiobutton_u.png')}
                  style={{ width: 32, height: 32, marginTop: 4 }}
                />
                <Text style={{ fontSize: 16, fontWeight: '400', color: '#000' }}>No recibí código.</Text>
              </TouchableOpacity>
              {/* <Text style={{ fontSize: Layout.isSmallDevice ? 16 : 18, marginTop: 10 }}>Reenviar.</Text> */}

            </View>
          </View>
          <View style={styles.actionButtons}>
            <TouchableOpacity
              onPress={this.validateCode}
            >
              <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#ec6a2c' }}>CONTINUAR</Text>
              <Text style={{ color: "red", fontSize: 11, fontFamily: 'aller-lt' }}>{this.state.error}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
            >
              <Text style={{ fontSize: 18, color: '#a8a8a8', marginBottom: 20 }}>REGRESAR</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.indicator}>
            <View style={[styles.circle, { marginLeft: 20, backgroundColor: '#cacaca' }]} />
            <View style={[styles.circle, { marginLeft: 16, backgroundColor: '#ec6a2c' }]} />
            <View style={[styles.circle, { marginLeft: 16, backgroundColor: '#cacaca' }]} />
            <View style={[styles.circle, { marginLeft: 16, backgroundColor: '#cacaca' }]} />

            <View style={styles.nextButton} >
              <View style={{ height: 44, width: 44, backgroundColor: '#79f7c7', position: 'absolute', top: -44, right: 0 }}>
                <View style={{ height: 44, width: 44, backgroundColor: '#fff', borderBottomRightRadius: 22 }} />
              </View>
              <View style={{ height: 44, width: 44, backgroundColor: '#79f7c7', position: 'absolute', bottom: -44, right: 0 }}>
                <View style={{ height: 44, width: 44, backgroundColor: '#fff', borderTopRightRadius: 22 }} />
              </View>
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple('#fff', true)}
                onPress={this.validateCode}>
                <View style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'flex-end' }} >
                  <FlechaBlancaIcon fill='#000' />
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>

          <GearButton size={46} buttonType='circle' style={{ position: 'absolute', right: 25, top: 25 }} />
        </View>
      /*
      <Container>
        <Content>
          <Grid>
            <Row style={{ marginTop: 90, marginBottom: 10, marginLeft: 10 }}><H3 style={{ fontFamily: 'aller-bd' }}>Código de verificación</H3></Row>
            <Row style={{ marginBottom: 50, marginLeft: 10 }}><Text style={{ fontFamily: 'aller-lt' }}>El código de verificación se ha enviado al: {this.state.telefono}</Text></Row>
            <Row style={{ marginBottom: 10, marginLeft: 10 }}><Text style={{ fontFamily: 'aller-lt' }}>Ingrese el código de 6 dígitos:</Text></Row>
            <Row>
            <Col>
                <CodeInput
                  ref="codeInputRef1"
                  codeLength={6}
                  className={'border-b'}
                  space={3}
                  size={30}
                  activeColor='rgba(0, 0, 0, 1)'
                  inactiveColor='rgba(0, 0, 0, 0.5)'
                  inputPosition='full-width'
                  keyboardType='numeric'
                  style={{ marginLeft: 10, marginRight: 10, width: 45, borderBottomWidth: 2, textAlign: 'center', fontSize: 25, fontFamily: 'aller-lt' }}
                  onFulfill={(code) => this._code(code)}
                />
              </Col>
            </Row>
            <Row style={{ marginTop: 10 }}>
              <Col><Button transparent onPress={this.sendCode}><Text style={{ color: 'black', fontFamily: 'aller-bd' }}>No recibí el código ></Text></Button></Col>
              <Col style={{ marginTop: 15 }}><Text style={{ color: "red", fontSize: 11, fontFamily: 'aller-lt' }}>{this.state.error}</Text></Col>
            </Row>
            <Row style={{ marginTop: 40 }}>
              <Col style={{ display: 'flex', alignContent: 'center', alignItems: 'center', marginLeft: 85, marginRight: 85 }}>
                <Button onPress={this.validateCode} block style={{ backgroundColor: '#ff8834' }}><Text style={{ fontFamily: 'aller-bd' }}>Siguiente</Text></Button>
              </Col>
            </Row>
          </Grid>
        </Content>
      </Container>
      */
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    marginLeft: 20,
    flexDirection: 'row',
  },
  indicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    height: 47,
    width: '100%',
    position: 'absolute',
    bottom: 2,
  },
  circle: {
    height: 8,
    width: 8,
    borderRadius: 4
  },
  title: {
    position: 'absolute',
    top: 70
  },
  subtitle: {
    position: 'absolute',
    top: 95
  },
  actionButtons: {
    position: 'absolute',
    bottom: '13%',
    left: 20
  },
  codeBox: {
    width: 50,
    height: 50,
    borderColor: '#79f7c7',
    backgroundColor: '#f1f1f1',
    borderWidth: 2
  },
  lateral: {
    height: '100%',
    width: 10,
    backgroundColor: '#79f7c7',
    position: 'absolute',
    right: 0
  },
  nextButton: {
    position: 'absolute',
    right: 10,
    backgroundColor: '#79f7c7',
    width: 70,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 22,
    borderBottomLeftRadius: 22
  },
  input: {
    height: 45,
    width: 45,
    textAlign: 'center',
    fontSize: Layout.isSmallDevice ? 16 : 18
  }
});

export default VerificationCodeAPI;