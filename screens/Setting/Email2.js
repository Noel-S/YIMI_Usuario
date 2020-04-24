import { Container, Content, Text, Button, Grid, Col, Row, Input, H3, View } from 'native-base';
import { ActivityIndicator, Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Globals from '../../constants/Globals';
import React, { Component } from 'react';
import axios from 'axios';


class Email2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      telefono: this.props.navigation.getParam('telefono'),
      nombre: this.props.navigation.getParam('nombre'),
      apellido: this.props.navigation.getParam('apellido'),
      curp: this.props.navigation.getParam('curp'),
      id_usuario: this.props.navigation.getParam('id_usuario'),
      foto: this.props.navigation.getParam('foto'),
      email: '', loading: false, isConnected: true, respuesta: ''
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

  //Método para validar el input.
  onValidateInput = async () => {
    var validateCorreo = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (this.state.email.trim() === "") {
      this.setState(() => ({ nameError: "Campo obligatorio" }));
    } else if (!validateCorreo.test(this.state.email)) {
      this.setState(() => ({ nameError: "Formato Incorrecto" }));
    } else {
      try {
        const res = await axios.post(`${Globals.server}:${Globals.port}/validar_cuenta`, { campo: this.state.email });
        if (res.status == 200) {
          console.log(res.data)
          res.data.data.forEach(element => {
            this.setState({
              respuesta: element["respuesta"]
            })
          });
          if (this.state.respuesta == 0) {
            this.setState(() => ({ nameError: "" }));
            this.sendCode();
          } else {
            this.setState(() => ({ nameError: "Correo Electrónico Existente" }));
          }
        } else {
          Alert.alert('Error', 'Servicio no disponible, intente más tarde.');
        }
      } catch (error) {
        Alert.alert('Sin Conexión', 'Verifique su conexión e intente nuevamente.');
      }
    }
  }

  //Método para enviar código de verificación y redireccionar a la pantalla de Código de Verificación.
  sendCode = async () => {
    try {
      const res = await axios.post(`${Globals.server}:${Globals.port}/get_codigo_validacion`, { telefono: this.state.telefono });
      if (res.status == 200) {
        this.props.navigation.navigate('VerficationCodeEmail', {
          id_usuario: this.state.id_usuario, correo: this.state.email, nombre: this.state.nombre, apellido: this.state.apellido,
          curp: this.state.curp, telefono: this.state.telefono, foto: this.state.foto
        });
      } else {
        Alert.alert('Error', 'Servicio no disponible, intente más tarde.');
      }
    } catch (error) {
      Alert.alert('Sin Conexión', 'Verifique su conexión e intente nuevamente.');
    }
  }


  render() {
    if (this.state.loading == true) {
      return (
        <Container>
          <Content>
            <Grid>
              <Row style={{ marginTop: 90, marginBottom: 10, marginLeft: 20 }}><H3 style={{ fontFamily: 'aller-bd' }}>Ingresa correo electrónico nuevo</H3></Row>
              <Row style={{ marginLeft: 20, marginRight: 20 }}><Text style={{ textAlign: 'justify', fontFamily: 'aller-lt' }}>Por favor, ingresa un correo electrónico real como verificación de seguridad. Después te enviaremos un correo para verificar.</Text></Row>
              <Row>
                <Col style={{ marginRight: 20, marginLeft: 20, marginTop:15 }}>
                  <Input value={this.state.email} onChangeText={email => this.setState({ email })} placeholder="Correo Electrónico" style={{ borderBottomWidth: 0.5, fontFamily: 'aller-lt' }} />
                  {!!this.state.nameError && (<Text style={{ color: "red", fontSize: 11 }}>{this.state.nameError}</Text>)}
                </Col>
              </Row>
              <Row style={{ marginTop: 30 }}><Col><Button onPress={this.onValidateInput} block style={{ marginLeft: 20, marginRight: 20, backgroundColor: '#ff8834' }}><Text style={{ fontFamily: 'aller-bd' }}>Confirmar</Text></Button></Col></Row>
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

export default Email2;