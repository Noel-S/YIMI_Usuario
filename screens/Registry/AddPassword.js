// import { Container, Content, Text, Input, Button, Grid, Col, Row, H3, View } from 'native-base';
import { Text, View, StyleSheet, TextInput, TouchableNativeFeedback, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ActivityIndicator, Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Globals from '../../constants/Globals';
import { Ionicons } from '@expo/vector-icons';
import React, { Component } from 'react';
import axios from 'axios';
import Layout from '../../constants/Layout';
import FlechaBlancaIcon from '../../components/FlechaBlancaIcon';
import GearButton from '../../components/GearButton';
class AddPassword extends Component {

  constructor(props) {
    super(props);
    global.ID = '';
    this.state = {
      secureTextEntry1: true,
      secureTextEntry2: true,
      contrasena: '',
      contrasena2: '',
      id_usuario: '', loading: false, isConnected: true,
      nombre: this.props.navigation.getParam('nombre'),
      apellido: this.props.navigation.getParam('apellido'),
      email: this.props.navigation.getParam('email'),
      curp: this.props.navigation.getParam('curp'),
      telefono: this.props.navigation.getParam('telefono', '1234567890'),
      foto: this.props.navigation.getParam('foto'),
      typing: false,
    };
  }

  //Método para montar la vista.
  componentDidMount() {
    console.log(this.state)
    this.checkConnection();
  }

  _cambiarIcono(input) {
    if (input == 1) {
      this.setState(prev => ({
        secureTextEntry1: !prev.secureTextEntry1,
      }));
    } else {
      this.setState(prev => ({
        secureTextEntry2: !prev.secureTextEntry2,
      }));
    }
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

  //Método para registrar el usuario.
  insertUser = async () => {
    try {
      const res = await axios.post(`${Globals.server}:${Globals.port}/registrar_usuario`,
        {
          id_rol: 4, nombre: this.state.nombre, apellido: this.state.apellido, correo: this.state.email,
          num_telefono: this.state.telefono, pass: this.state.contrasena2, curp: this.state.curp, foto: this.state.foto, id_ciudad: null, id_tipo_conductor: null
        });

      if (res.status == 200) {
        res.data.data.forEach(element => {
          this.sendEmailConfirmation();
          this.setState({ id_usuario: element["id_usuario_out"] });
          global.id_usuario = this.state.id_usuario;
          this.props.navigation.navigate('Inicio', { id_usuario: this.state.id_usuario });
        });
      } else {
        Alert.alert('Error', 'Servicio no disponible, intente más tarde.');
      }
    } catch (error) {
      Alert.alert('Sin Conexión', 'Verifique su conexión e intente nuevamente.');
    }
  }

  async sendEmailConfirmation() {
    try {
      const res = await axios.post(`${Globals.server}:${Globals.port}/mail`, { correo: this.state.email });
      if (res.status == 200) {
        console.log('Se envío correo de confirmación')
      } else {
        Alert.alert('Error', 'Servicio no disponible, intente más tarde.');
      }
    } catch (error) {
      Alert.alert('Sin Conexión', 'Verifique su conexión e intente nuevamente.');
    }
  }

  //Método para validar la contraseña.
  onValidateInput = () => {
    var validateContrasena = /^(?=\w*\d)(?=\w*[a-zA-Z])\S{6}$/;

    if (this.state.contrasena.trim() == "") {
      this.setState(() => ({ contrasenaError: "Ingresa tu contraseña" }));
    } else if (!validateContrasena.test(this.state.contrasena)) {
      this.setState(() => ({ contrasenaError: "Formato Incorrecto" }));
    } else {
      this.setState(() => ({ contrasenaError: "" }));
    }

    if (this.state.contrasena2.trim() == "") {
      this.setState(() => ({ contrasena2Error: "Ingresa tu contraseña" }));
    } else if (!validateContrasena.test(this.state.contrasena2)) {
      this.setState(() => ({ contrasena2Error: "Formato Incorrecto" }));
    } else {
      this.setState(() => ({ contrasena2Error: "" }));
    }

    if (this.state.contrasena.trim() != this.state.contrasena2.trim() && validateContrasena.test(this.state.contrasena) && validateContrasena.test(this.state.contrasena2)) {
      this.setState(() => ({ contrasena2Error: "La contraseña no coincide" }));
    } else if (this.state.contrasena != "" && validateContrasena.test(this.state.contrasena) && this.state.contrasena2 && validateContrasena.test(this.state.contrasena2)) {
      this.insertUser();
    }
  }

  //Método para mostrar la contraseña.
  showPass1 = () => {
    this.setState({
      secureTextEntry1: !this.state.secureTextEntry1
    });
  }

  //Método para mostrar la contraseña.
  showPass2 = () => {
    this.setState({
      secureTextEntry2: !this.state.secureTextEntry2
    });
  }

  render() {
    if (this.state.loading == true) {
      return (
        <View style={styles.container}>
          <StatusBar hidden={true}/>
          <View style={styles.lateral} />
          <View style={styles.content}>
            <View style={styles.title}>
              <Text style={{ fontSize: Layout.isSmallDevice ? 42 : 54, marginBottom: Layout.isSmallDevice ? -15 : -10 }}>Configurar</Text>
              <Text style={{ fontSize: Layout.isSmallDevice ? 42 : 54 }}>contraseña.</Text>
            </View>
            <View>
              <Text style={{ fontSize: Layout.isSmallDevice ? 18 : 20 }}>Puedes iniciar la sesión</Text>
              <Text style={{ fontSize: Layout.isSmallDevice ? 18 : 20 }}>de {`${this.state.telefono.slice(0, 3)}*****${this.state.telefono.slice(8, 10)}`}.</Text>

              <View style={[styles.codeBox, { borderTopRightRadius: 20 }]}>
                <TextInput style={styles.input} secureTextEntry={this.state.secureTextEntry1} placeholder='Contraseña de 6 dígitos' value={this.state.contrasena} onChangeText={contrasena => this.setState({ contrasena })} />
                {!!this.state.contrasenaError && (<Text style={{ color: "red", fontSize: 11, fontFamily: 'aller-lt' }}>{this.state.contrasenaError}</Text>)}
                <TouchableOpacity style={{ position: 'absolute', right: 10, top: Layout.isSmallDevice ? 10 : 13 }}
                  onPress={() => this._cambiarIcono(1)}
                >
                  <Ionicons name={this.state.secureTextEntry1 ? 'ios-eye' : 'ios-eye-off'} size={24} />
                </TouchableOpacity>
              </View>
              <View style={[styles.codeBox, { borderBottomLeftRadius: 20 }]}>
                <TextInput style={styles.input} secureTextEntry={this.state.secureTextEntry2} placeholder='Contraseña de 6 dígitos' value={this.state.contrasena2} onChangeText={contrasena2 => this.setState({ contrasena2 })} />
                {!!this.state.contrasena2Error && (<Text style={{ color: "red", fontSize: 11, fontFamily: 'aller-lt' }}>{this.state.contrasena2Error}</Text>)}
                <TouchableOpacity style={{ position: 'absolute', right: 10, top: Layout.isSmallDevice ? 10 : 13 }}
                  onPress={() => this._cambiarIcono(2)}
                >
                  <Ionicons name={this.state.secureTextEntry2 ? 'ios-eye' : 'ios-eye-off'} size={24} />
                </TouchableOpacity>
              </View>
              <Text style={{ fontSize: Layout.isSmallDevice ? 16 : 18, marginTop: 20, textAlign: 'justify', marginRight: 45 }}>Deberá ser de 6 dígitos y contener al menos una letra y un número.</Text>

            </View>
          </View>
          <View style={styles.actionButtons}>
            <TouchableOpacity
              onPress={this.onValidateInput}
            >
              <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#ec6a2c' }}>CONFIRMAR</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
            >
              <Text style={{ fontSize: 18, color: '#a8a8a8', marginBottom: 20 }}>REGRESAR</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.indicator}>
            <View style={[styles.circle, { marginLeft: 20, backgroundColor: '#cacaca' }]} />
            <View style={[styles.circle, { marginLeft: 16, backgroundColor: '#cacaca' }]} />
            <View style={[styles.circle, { marginLeft: 16, backgroundColor: '#cacaca' }]} />
            <View style={[styles.circle, { marginLeft: 16, backgroundColor: '#ec6a2c' }]} />

            <View style={styles.nextButton} >
              <View style={{ height: 44, width: 44, backgroundColor: '#79f7c7', position: 'absolute', top: -44, right: 0 }}>
                <View style={{ height: 44, width: 44, backgroundColor: '#fff', borderBottomRightRadius: 22 }} />
              </View>
              <View style={{ height: 44, width: 44, backgroundColor: '#79f7c7', position: 'absolute', bottom: -44, right: 0 }}>
                <View style={{ height: 44, width: 44, backgroundColor: '#fff', borderTopRightRadius: 22 }} />
              </View>
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple('#fff', true)}
                onPress={this.onValidateInput}>
                <View style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'flex-end' }} >
                  <FlechaBlancaIcon />
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
              <Row style={{ marginTop: 90, marginBottom: 10, marginLeft: 20 }}><H3 style={{ fontFamily: 'aller-bd' }}>Configurar Contraseña</H3></Row>
              <Row><Col style={{ marginLeft: 20, marginBottom: 15 }}><Text style={{ fontFamily: 'aller-bd' }}>* Campos requeridos</Text></Col></Row>
              <Row style={{ marginBottom: 15 }}>
                <Col style={{ marginLeft: 20, marginRight: 20 }}>
                  <Input value={this.state.contrasena} onChangeText={contrasena => this.setState({ contrasena })} secureTextEntry={this.state.secureTextEntry1} style={{ borderBottomWidth: 0.5, fontFamily: 'aller-lt' }} placeholder='* Contraseña'></Input>
                  {!!this.state.contrasenaError && (<Text style={{ color: "red", fontSize: 11, fontFamily: 'aller-lt' }}>{this.state.contrasenaError}</Text>)}
                </Col>
                <Col style={{ marginTop: 20, position: 'absolute', marginLeft: 350 }}>
                  <TouchableOpacity onPress={this.showPass1} style={{ height: 30 }}>
                    <FontAwesome5 name='eye' size={20} style={{ color: 'gray' }} />
                  </TouchableOpacity>
                </Col>
              </Row>
              <Row>
                <Col style={{ marginLeft: 20, marginRight: 20 }}>
                  <Input value={this.state.contrasena2} onChangeText={contrasena2 => this.setState({ contrasena2 })} secureTextEntry={this.state.secureTextEntry2} style={{ borderBottomWidth: 0.5, fontFamily: 'aller-lt' }} placeholder='* Confirmar Contraseña'></Input>
                  {!!this.state.contrasena2Error && (<Text style={{ color: "red", fontSize: 11, fontFamily: 'aller-lt' }}>{this.state.contrasena2Error}</Text>)}
                </Col>
                <Col style={{ marginTop: 20, position: 'absolute', marginLeft: 350 }}>
                  <TouchableOpacity onPress={this.showPass2} style={{ height: 30 }}>
                    <FontAwesome5 name='eye' size={20} style={{ color: 'gray' }} />
                  </TouchableOpacity>
                </Col>
              </Row>
              <Row><Col style={{ marginLeft: 20, marginTop: 5 }}><Text style={{ fontSize: 12, fontFamily: 'aller-bd' }}>La contraseña debe ser de 6 dígitos e incluir al menos una letra y un número.</Text></Col></Row>
              <Row style={{ marginTop: 35 }}><Col><Button onPress={this.onValidateInput} block style={{ marginLeft: 20, marginRight: 20, backgroundColor: '#ff8834' }}><Text style={{ fontFamily: 'aller-bd' }}>Siguiente</Text></Button></Col></Row>
            </Grid>
          </Content>
        </Container>
        */
      );
    } else {
      return (
        <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
          <ActivityIndicator size='large' color="#ff8834" />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    height: Layout.window.height,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    marginLeft: 20,
    flexDirection: 'column',
    justifyContent: 'center'
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
    marginEnd: 30,
    height: Layout.isSmallDevice ? 45 : 50,
    borderColor: '#79f7c7',
    backgroundColor: '#f1f1f1',
    borderWidth: 2,
    marginTop: 10,
  },
  input: {
    height: '100%',
    width: '100%',
    paddingHorizontal: 15,
    fontSize: Layout.isSmallDevice ? 16 : 18
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
  }
});

export default AddPassword