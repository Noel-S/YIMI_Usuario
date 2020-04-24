import { Container, Content, Text, Button, Grid, Col, H3, Row, View} from 'native-base';
import { ActivityIndicator, Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import React, { Component } from 'react';

class Phone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      telefono: this.props.navigation.getParam('telefono'),
      nombre: this.props.navigation.getParam('nombre'),
      apellido: this.props.navigation.getParam('apellido'),
      curp: this.props.navigation.getParam('curp'),
      email: this.props.navigation.getParam('correo'),
      id_usuario: this.props.navigation.getParam('id_usuario'),
      foto: this.props.navigation.getParam('foto'),
      loading: false, isConnected: true
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

  //Método para redireccionar a la pantalla de Teléfono.
  goPhone2 = () => {
    this.props.navigation.navigate('Phone2', {
      id_usuario: this.state.id_usuario, correo: this.state.email, nombre: this.state.nombre, apellido: this.state.apellido,
      curp: this.state.curp, telefono: this.state.telefono, foto: this.state.foto
    });
  }

  render() {
    if (this.state.loading == true) {
      return (
        <Container>
          <Content>
            <Grid>
              <Row style={{ marginTop: 90, marginBottom: 10, marginLeft: 20 }}><H3 style={{fontFamily: 'aller-bd'}}>Cambiar número de teléfono</H3></Row>
              <Row style={{ marginBottom: 15, marginLeft: 20, marginRight: 20 }}><Text style={{fontFamily: 'aller-lt', fontSize:15}}>Tu número de teléfono actual es: {this.state.telefono}</Text></Row>
              <Row style={{ marginLeft: 20, marginRight: 20 }}><Text style={{fontFamily: 'aller-lt', textAlign: 'justify', fontSize:15}}>Importante: El dinero que hayas aculado queda registrado en la cuenta. Después de modificar tú número de teléfono deberás iniciar sesión con tu nuevo número.</Text></Row>
              <Row style={{ marginTop: 35 }}><Col><Button onPress={this.goPhone2} block style={{ marginLeft: 20, marginRight: 20, backgroundColor: '#ff8834' }}><Text style={{fontFamily: 'aller-bd'}}>Cambiar número de teléfono</Text></Button></Col></Row>
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

export default Phone;