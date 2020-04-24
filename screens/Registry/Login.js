import React, { Component } from 'react';
//import { Container, Content, Text, Input, CheckBox, Button, Grid, Col, Row, H3, Icon, Thumbnail, View } from 'native-base';
import * as GoogleSignIn from 'expo-google-sign-in';
import Globals from '../../constants/Globals';
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';
import axios from 'axios';
import { StyleSheet, View, Text, TouchableOpacity, TouchableNativeFeedback, TextInput, Alert, AsyncStorage, Image, StatusBar } from 'react-native';
import FlechaBlancaIcon from '../../components/FlechaBlancaIcon';
import GearButton from '../../components/GearButton';
import Layout from '../../constants/Layout';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      id_usuario: '',
      telefono: '',
      nombre: '',
      apellido: '',
      email: '',
      foto: '',
      typing: false,
      terminos: false
    };
  }

  componentDidMount() {
    this.getID();
    //this.signOutAsync();
  }

  onBack(terminos) {
    this.setState({terminos})
  }

  signInAsync = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === 'success') {
        this.setState({ nombre: user.firstName, apellido: user.lastName, email: user.email, foto: user.photoURL });

        try {
          const res = await axios.post(`${Globals.server}:${Globals.port}/validar_inicio_sesion_api`, { correo: this.state.email });

          if (res.status == 200) {
            res.data.data.forEach(element => {
              if (element["respuesta"] == 0) {
                this.props.navigation.navigate('AddPersonalInformationAPI', { nombre: this.state.nombre, apellido: this.state.apellido, email: this.state.email, foto: this.state.foto })
              } else {
                this.setState({ id_usuario: element["id_usuario_out"] });
                this.saveID();
                global.id_usuario = this.state.id_usuario;
                this.props.navigation.navigate('Inicio');
              }
            });
          } else {
            Alert.alert('Error', 'Servicio no disponible, intente más tarde.')
          }
        } catch (error) {
          Alert.alert('Sin Conexión', 'Verifique su conexión a internet e intente nuevamente.');
        }
      }
    } catch ({ message }) {
      alert('login: Error:' + message);
    }
  };

  //Método para guadar de manera local el ID del usuario una vez que inicio sesión.
  saveID = async () => {
    let id = this.state.id_usuario.toString();
    console.log(id)
    try {
      await AsyncStorage.setItem('id', id);

    } catch (error) {
      // Error saving data
      console.log(error);
    }
  }

  //Método para obtener el ID del usuario y así iniciar la sesión automáticamente.
  getID = async () => {
    try {
      const id = await AsyncStorage.getItem('id');
      if (id != null) {
        // We have data!!
        this.setState({ id_usuario: id });
        global.id_usuario = this.state.id_usuario;
        this.props.navigation.navigate('Main', { id_usuario: global.id_usuario });
      }

    } catch (error) {
      // Error retrieving data
      console.log("Error al obtener los datos" + error);
    }
  }

  //Método para iniciar sesón mediante Google.
  signInGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: "372701419748-ja7jlf6k03opndc3q6lndomu9a8u77h0.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      })

      if (result.type === "success") {
        this.setState({ nombre: result.user.givenName, apellido: result.user.familyName, email: result.user.email, foto: result.user.photoUrl });

        try {
          const res = await axios.post(`${Globals.server}:${Globals.port}/validar_inicio_sesion_api`, { correo: this.state.email });

          if (res.status == 200) {
            res.data.data.forEach(element => {
              if (element["respuesta"] == 0) {
                this.props.navigation.navigate('AddPersonalInformationAPI', { nombre: this.state.nombre, apellido: this.state.apellido, email: this.state.email, foto: this.state.foto })
              } else {
                global.id_usuario = element["id_usuario_out"]
                this.props.navigation.navigate('Main', { id_usuario: element["id_usuario_out"] })
              }
            });
          } else {
            Alert.alert('Error', 'Servicio no disponible, intente más tarde.')
          }
        } catch (error) {
          Alert.alert('Sin Conexión', 'Verifique su conexión a internet e intente nuevamente.');
        }

      } else {
        console.log("cancelled")
      }
    } catch (e) {
      console.log("error", e)
    }
  }

  //Método para iniciar sesión mediante Facebook.
  signFacebook = async () => {
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync('2600565983332988', {
        permissions: ['public_profile', 'email', 'user_friends'],
      });
      if (type === 'success') {
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=first_name,last_name,email,picture.width(800)`);
        let result = await response.json();
        this.setState({ nombre: result.first_name, apellido: result.last_name, email: result.email, foto: result.picture.data.url });

        try {
          const res = await axios.post(`${Globals.server}:${Globals.port}/validar_inicio_sesion_api`, { correo: this.state.email });

          if (res.status == 200) {
            res.data.data.forEach(element => {
              if (element["respuesta"] == 0) {
                this.props.navigation.navigate('AddPersonalInformationAPI', { nombre: this.state.nombre, apellido: this.state.apellido, email: this.state.email, foto: this.state.foto })
              } else {
                this.setState({ id_usuario: element["id_usuario_out"] });
                this.saveID();
                global.id_usuario = this.state.id_usuario;
                this.props.screenProps.id_propietario = this.state.id_usuario;
                this.props.navigation.navigate('Main');
              }
            });
          } else {
            Alert.alert('Error', 'Servicio no disponible, intente más tarde.')
          }
        } catch (error) {
          Alert.alert('Sin Conexión', 'Verifique su conexión a internet e intente nuevamente.');
        }

      } else {
        // type === 'cancel'
      }
    } catch ({ e }) {
      console.log("error", e)
    }
  }

  //Método para iniciar sesión.
  SignIn = async () => {
    // console.log('SignIn');
    try {
      const res = await axios.post(`${Globals.server}:${Globals.port}/validar_inicio_sesion`, {
        id_rol: 4,
        campo: this.state.telefono, pass: ''
      });

      if (res.status == 200) {
        res.data.data.forEach(element => {
          if (element["respuesta"] == 0) {
            this.sendCode();
            this.props.navigation.navigate('VerificationCode', { telefono: this.state.telefono });
            this.setState({ msgError: "", telefono: '' });
          } else {
            this.setState({ msgError: "", telefono: '', id_usuario: element["id_usuario_out"] });
            this.saveID();
            global.id_usuario = this.state.id_usuario;
            this.props.navigation.navigate('Main');
          }
        });
      } else {
        Alert.alert('Error', 'Servicio no disponible, intente más tarde.')
      }
    } catch (error) {
      Alert.alert('Sin Conexión', 'Verifique su conexión a internet e intente nuevamente.');
    }
  }

  //Método para enviar código de verificación.
  async sendCode() {
    try {
      const res = await axios.post(`${Globals.server}:${Globals.port}/get_codigo_validacion`, { telefono: this.state.telefono });

      if (res.status == 200) {
        console.log('Se envío código de verificación');
      } else {
        Alert.alert('Error', 'Servicio no disponible, intente más tarde.')
      }
    } catch (error) {
      Alert.alert('Sin Conexión', 'Verifique su conexión a internet e intente nuevamente.');
    }
  }

  //Método para redireccionar a la pantalla de Terminos y Condiciones.
  goLegal = () => {
    this.props.navigation.navigate('Legal', { onBack: this.onBack.bind(this) });
    //this.props.navigation.navigate('AddPersonalInformationAPI');
  }

  //Mpetodo para validar el input.
  onValidateInput = () => {
    var validatePhone = /^[0-9]{10}$/;
    if (this.state.telefono.trim() === "") {
      this.setState(() => ({ msgError: "Campo obligatorio" }));
    } else if (!validatePhone.test(this.state.telefono)) {
      this.setState(() => ({ msgError: "Favor de ingresar 10 dígitos" }));
    } else {
      this.SignIn();
    }
  }

  pass = () => {
    this.props.navigation.navigate('ConfigurarContrasena');
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <View style={styles.franja} />
        <View style={styles.content}>
          <View style={styles.title}>
            <Text style={{ fontSize: Layout.isSmallDevice ? 42 : 54 }}>Registro.</Text>
          </View>
          <View >
            <Text style={{ fontSize: Layout.isSmallDevice ? 18 : 20 }}>Ingresa tu número</Text>
            <Text style={{ fontSize: Layout.isSmallDevice ? 18 : 20 }}>de teléfono.</Text>

            <View style={{ borderColor: this.state.typing ? '#ec6a2c' : '#2B5763', borderWidth: 2, height: Layout.isSmallDevice ? 45 : 50, width: Layout.window.width - 50, borderBottomRightRadius: 20, borderTopLeftRadius: 20, backgroundColor: '#f2f2f2', marginTop: 10, alignItems: 'center' }}>
              <TextInput style={{ height: Layout.isSmallDevice ? 40 : 45, width: 200, textAlign: 'center', fontSize: Layout.isSmallDevice ? 16 : 18 }}
                keyboardType='phone-pad' onFocus={() => this.setState({ typing: true })}
                onEndEditing={() => this.setState({ typing: false })}
                onChangeText={telefono => this.setState({ telefono })} />
            </View>
            {!!this.state.msgError && (<Text style={{ color: "red", fontSize: 11, marginBottom: 10, fontFamily: 'aller-lt' }}>{this.state.msgError}</Text>)}
            <Text style={{ fontSize: Layout.isSmallDevice ? 18 : 20, marginTop: 10 }}>Registro por tus redes.</Text>
            <View style={{ flexDirection: 'row', marginTop: 10, marginStart: -5 }}>

              <TouchableOpacity
                style={{ width: 64, height: 64, alignItems: 'center' }}
                onPress={this.signFacebook}
              >
                <Image
                  source={require('../../assets/images/radiobutton_u.png')}
                  style={{ width: '100%', height: '100%' }}
                />
                <Image
                  resizeMode='contain'
                  source={require('../../assets/images/facebook.png')}
                  style={{ width: '40%', height: '40%', position: 'absolute', marginTop: 15 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ width: 64, height: 64, alignItems: 'center' }}
                onPress={this.signInAsync}
              >
                <Image
                  source={require('../../assets/images/radiobutton_u.png')}
                  style={{ width: '100%', height: '100%' }}
                />
                <Image
                  resizeMode='contain'
                  source={require('../../assets/images/google.png')}
                  style={{ width: '40%', height: '40%', position: 'absolute', marginTop: 13 }}
                />
              </TouchableOpacity>
            </View>

          </View>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            onPress={this.onValidateInput}
          >
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#ec6a2c' }}>CONTINUAR</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this.goLegal}
            style={{flexDirection: 'row', marginStart: -3, alignItems: 'center', marginTop: 5}}
          >
            <Image
              source={this.state.terminos ? require('../../assets/images/radiobutton_s.png') : require('../../assets/images/radiobutton_u.png')}
              style={{ width: 32, height: 32, marginTop:4 }}
            />
            <Text style={{ fontSize: 16, fontWeight: '400', color: '#000' }}>Acepto términos y condiciones</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.indicator}>
          <View style={[styles.circle, { marginLeft: 20, backgroundColor: '#ec6a2c' }]} />
          <View style={[styles.circle, { marginLeft: 16, backgroundColor: '#cacaca' }]} />
          <View style={[styles.circle, { marginLeft: 16, backgroundColor: '#cacaca' }]} />
          <View style={[styles.circle, { marginLeft: 20, backgroundColor: '#cacaca' }]} />

          <View style={styles.nextButton} >
            <View style={{ height: 44, width: 44, backgroundColor: '#ADE8BF', position: 'absolute', top: -44, right: 0 }}>
              <View style={{ height: 44, width: 44, backgroundColor: '#fff', borderBottomRightRadius: 22 }} />
            </View>
            <View style={{ height: 44, width: 44, backgroundColor: '#ADE8BF', position: 'absolute', bottom: -44, right: 0 }}>
              <View style={{ height: 44, width: 44, backgroundColor: '#fff', borderTopRightRadius: 22 }} />
            </View>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('#fff', true)}
              onPress={() => this.onValidateInput}>
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
         <View style={styles.franja} />
        <Content>
          <Grid style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Row><Col style={{ marginTop: 150, marginBottom: 35, display: 'flex', justifyContent: 'center', alignItems: 'center' }}><H3 style={{ fontFamily: 'aller-bd' }}>Ingresa tu número de teléfonoo</H3></Col></Row>
            <Row>
              <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                <Input value={this.state.telefono} onChangeText={telefono => this.setState({ telefono })} maxLength={10} style={{ borderBottomWidth: 0.5, textAlign: 'center', fontFamily: 'aller-lt' }} placeholder='Ingresa tu número de teléfono' keyboardType="numeric" />
                {!!this.state.msgError && (<Text style={{ color: "red", fontSize: 11, marginBottom: 10, fontFamily: 'aller-lt' }}>{this.state.msgError}</Text>)}
              </Col>
            </Row>
            <Row>
              <Col style={{ width: 20, marginLeft: 80 }}><CheckBox checked={true} style={{ backgroundColor: '#ff8834', borderColor: '#ff8834' }} /></Col>
              <Col style={{ marginRight: 60 }}><Button onPress={this.goLegal} transparent style={{ height: 20 }}><Text style={{ color: 'gray', fontFamily: 'aller-lt', textTransform: 'capitalize' }}>Acepto términos y condiciones</Text></Button></Col>
            </Row>
            <Button onPress={this.onValidateInput} block style={{ marginLeft: 80, marginRight: 80, marginTop: 20, marginBottom: 120, backgroundColor: '#ff8834' }}><Text style={{ fontFamily: 'aller-bd', textTransform: 'capitalize' }}>Continuar</Text></Button>
            <Row>
              <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Text>─────────────────────</Text>
                <Text style={{ fontFamily: 'aller-lt' }}>Conectate con tus redes sociales</Text>
              </Col>
            </Row>
            <Row>
              <Col marginLeft={120}><Button onPress={this.signFacebook} style={{ height: 90, width: 90 }} transparent><Icon name='logo-facebook' style={{ fontSize: 60 }} /></Button></Col>
              <Col marginRight={100}><Button onPress={this.signInAsync} style={{ height: 90, width: 95 }} transparent><Thumbnail source={require('../../assets/images/google.png')} /></Button></Col>
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
    flexDirection: 'column',
    justifyContent: 'space-around'
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
    bottom: '15%',
    left: 20
  },
  franja: {
    width: 10,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#ADE8BF'
  },
  nextButton: {
    position: 'absolute',
    right: 10,
    backgroundColor: '#ADE8BF',
    width: '22%',
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 22,
    borderBottomLeftRadius: 22
  },
  codeBox: {
    width: '100%',
    height: 45,
    borderColor: '#ADE8BF',
    backgroundColor: '#f1f1f1',
    borderWidth: 2,
    marginTop: 5,
    alignItems: 'flex-start'
  },
  input: {
    // fontSize: Layout.isSmallDevice? 16:18
    position: 'absolute',
    right: 0,
    left: 0,
    height: 40,
    fontSize: 16,
    marginStart: 10,
    marginEnd: 60,
  },

  area: {
    flexDirection: "row",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    backgroundColor: "#fff",
    marginHorizontal: 20
  },
  text: {
    paddingLeft: 15,
    fontSize: 16
  },
  rightArrow: {
    paddingLeft: 190
  }
});

export default Login;
