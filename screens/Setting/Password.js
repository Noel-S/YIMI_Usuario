import { Container, Content, Text, Input, Button, Grid, Col, Row, H3, View } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ActivityIndicator, Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { FontAwesome5 } from '@expo/vector-icons';
import Globals from '../../constants/Globals';
import React, { Component } from 'react';
import axios from 'axios';

class Password extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secureTextEntry1: true,
      secureTextEntry2: true,
      secureTextEntry3: true,
      respuesta: '', loading: false,
      contrasenaold: '', isConnected: true,
      contrasenanew: '',
      contrasenanew2: '',
      id_usuario: this.props.navigation.getParam('id_usuario'),
      telefono: this.props.navigation.getParam('telefono')
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

  //Método para actualizar la contraseña del usuario.
  updatePassword = async () => {
    try {
      const res = await axios.put(`${Globals.server}:${Globals.port}/modificar_contrasena`, { id_usuario: this.state.id_usuario, pass: this.state.contrasenanew2 });
      if (res.status == 200) {
        Alert.alert('Aviso', 'Se ha actualizado tu contraseña con éxito!', [{ text: 'OK', onPress: () => this.props.navigation.navigate('PersonalInformation') }]);
      } else {
        Alert.alert('Error', 'Servicio no disponible, intente más tarde.');
      }
    } catch (error) {
      Alert.alert('Sin Conexión', 'Verifique su conexión e intente nuevamente.');
    }
  }

  //Método para validar la contraseña.
  onValidateInput = async () => {
    var validateContrasena = /^(?=\w*\d)(?=\w*[a-zA-Z])\S{6}$/;

    if (this.state.contrasenaold.trim() == "") {
      this.setState(() => ({ contrasenaError1: "Ingresa tu contraseña" }));
    } else if (!validateContrasena.test(this.state.contrasenaold)) {
      this.setState(() => ({ contrasenaError1: "Formato Incorrecto" }));
    } else {
      try {
        const res = await axios.post(`${Globals.server}:${Globals.port}/validar_contrasena`, { id_usuario: this.state.id_usuario, pass: this.state.contrasenaold });
        if (res.status == 200) {
          res.data.data.forEach(element => {
            this.setState({ respuesta: element["respuesta"] });
          });
          if (this.state.respuesta != 0) {
            this.setState(() => ({ contrasenaError1: "" }));
          } else {
            this.setState(() => ({ contrasenaError1: "La contraseña es incorrecta" }));
          }
        } else {
          Alert.alert('Error', 'Servicio no disponible, intente más tarde.');
        }
      } catch (error) {
        Alert.alert('Sin Conexión', 'Verifique su conexión e intente nuevamente.');
      }
    }

    if (this.state.contrasenanew.trim() == "") {
      this.setState(() => ({ contrasenaError2: "Ingresa tu contraseña" }));
    } else if (!validateContrasena.test(this.state.contrasenanew)) {
      this.setState(() => ({ contrasenaError2: "Formato Incorrecto" }));
    } else {
      this.setState(() => ({ contrasenaError2: "" }));
    }

    if (this.state.contrasenanew2.trim() == "") {
      this.setState(() => ({ contrasenaError3: "Ingresa tu contraseña" }));
    } else if (!validateContrasena.test(this.state.contrasenanew2)) {
      this.setState(() => ({ contrasenaError3: "Formato Incorrecto" }));
    } else {
      this.setState(() => ({ contrasenaError3: "" }));
    }

    if (this.state.contrasenanew != this.state.contrasenanew2 && validateContrasena.test(this.state.contrasenanew) && validateContrasena.test(this.state.contrasenanew2)) {
      this.setState(() => ({ contrasenaError3: "La contraseña no coindice" }));
    }

    if (this.state.contrasenaold.trim() != "" && this.state.contrasenanew.trim() != "" && this.state.contrasenanew2.trim() != ""
      && validateContrasena.test(this.state.contrasenaold) && validateContrasena.test(this.state.contrasenanew) && validateContrasena.test(this.state.contrasenanew2)
      && this.state.respuesta != 0 && this.state.contrasenanew == this.state.contrasenanew2) {
        this.setState(() => ({ contrasenaError1: "", contrasenaError2: "", contrasenaError3: ""  }));
      this.updatePassword();
    }

  }

  //Método para enviar el código de verificación.
  sendCode = async () => {
    try {
      const res = await axios.post(`${Globals.server}:${Globals.port}/get_codigo_validacion`, { telefono: this.state.telefono });
      if (res.status == 200) {
        this.props.navigation.navigate('VerficationCodePassword', { id_usuario: this.state.id_usuario, telefono: this.state.telefono });
      } else {
        Alert.alert('Error', 'Servicio no disponible, intente más tarde.');
      }
    } catch (error) {
      Alert.alert('Sin Conexión', 'Verifique su conexión e intente nuevamente.');
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

  //Método para mostrar la contraseña.
  showPass3 = () => {
    this.setState({
      secureTextEntry3: !this.state.secureTextEntry3
    });
  }

  render() {
    if (this.state.loading == true) {
      return (
        <Container>
          <Content>
            <Grid>
              <Row style={{ marginTop: 90, marginBottom: 10, marginLeft: 20 }}><H3 style={{fontFamily: 'aller-bd'}}>Cambiar Contraseña</H3></Row>
              <Row style={{ marginBottom: 1, marginLeft: 20, marginRight: 20 }}>
                <Text style={{ textAlign: 'justify', fontFamily: 'aller-lt'}}>Ingrese la contraseña anterior. La nueva contraseña deberá tener 6 dígitos e incluir al menos una letra o un número.</Text>
              </Row>
              <Row style={{marginBottom:10}}>
                <Col style={{ marginLeft: 20, marginRight: 20 }}>
                  <Input value={this.state.contrasenaold} onChangeText={contrasenaold => this.setState({ contrasenaold })} secureTextEntry={this.state.secureTextEntry1} style={{ borderBottomWidth: 0.5, fontFamily: 'aller-lt' }} placeholder='Contraseña Anterior'></Input>
                  {!!this.state.contrasenaError1 && (<Text style={{ color: "red", fontSize: 13, marginLeft: 10, fontFamily: 'aller-lt'}}>{this.state.contrasenaError1}</Text>)}
                </Col>
                <Col style={{ marginTop: 20, position: 'absolute', marginLeft: 350 }}>
                  <TouchableOpacity onPress={this.showPass1} style={{ height: 30 }}>
                    <FontAwesome5 name='eye' size={20} style={{ color: 'gray' }} />
                  </TouchableOpacity>
                </Col>
              </Row>
              <Row>
                <Col style={{ marginLeft: 20, marginRight: 20 }}>
                  <Input value={this.state.contrasenanew} onChangeText={contrasenanew => this.setState({ contrasenanew })} secureTextEntry={this.state.secureTextEntry2} style={{ borderBottomWidth: 0.5, fontFamily: 'aller-lt' }} placeholder='Contraseña Nueva'></Input>
                  {!!this.state.contrasenaError2 && (<Text style={{ color: "red", fontSize: 13, marginLeft: 10, fontFamily: 'aller-lt' }}>{this.state.contrasenaError2}</Text>)}
                </Col>
                <Col style={{ marginTop: 20, position: 'absolute', marginLeft: 350 }}>
                  <TouchableOpacity onPress={this.showPass2} style={{ height: 30 }}>
                    <FontAwesome5 name='eye' size={20} style={{ color: 'gray' }} />
                  </TouchableOpacity>
                </Col>
              </Row>
              <Row style={{marginTop:10}}>
                <Col style={{ marginLeft: 20, marginRight: 20 }}>
                  <Input value={this.state.contrasenanew2} onChangeText={contrasenanew2 => this.setState({ contrasenanew2 })} secureTextEntry={this.state.secureTextEntry3} style={{ borderBottomWidth: 0.5, fontFamily: 'aller-lt' }} placeholder='Confirmar Contraseña Nueva'></Input>
                  {!!this.state.contrasenaError3 && (<Text style={{ color: "red", fontSize: 13, marginLeft: 10, fontFamily: 'aller-lt' }}>{this.state.contrasenaError3}</Text>)}
                </Col>
                <Col style={{ marginTop: 20, position: 'absolute', marginLeft: 350 }}>
                  <TouchableOpacity onPress={this.showPass3} style={{ height: 30 }}>
                    <FontAwesome5 name='eye' size={20} style={{ color: 'gray' }} />
                  </TouchableOpacity>
                </Col>
              </Row>
              <Row>
                <Col style={{ marginTop: 10, marginLeft: 20}}>
                  <Text onPress={this.sendCode} style={{ color: 'gray', fontSize: 14, fontFamily: 'aller-lt' }}>Olvidé mi contraseña ></Text>
                </Col>
              </Row>
              <Row style={{ marginTop: 35 }}><Col><Button onPress={this.onValidateInput} block style={{ marginLeft: 20, marginRight: 20, backgroundColor: '#ff8834' }}><Text style={{fontFamily: 'aller-bd'}}>Confirmar</Text></Button></Col></Row>
            </Grid>
          </Content>
        </Container>
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

export default Password;