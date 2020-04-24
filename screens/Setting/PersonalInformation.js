import { Root, Container, Content, Text, Grid, Col, Row, ListItem, Left, Right, Button, Icon, Card, CardItem, Body, Thumbnail, ActionSheet, View } from 'native-base';
import { ActivityIndicator, Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Globals from '../../constants/Globals';
import * as ImagePicker from 'expo-image-picker';
import React, { Component } from 'react';
import axios from 'axios';

var BUTTONS = [
    { text: <Text style={{ color: 'black', fontSize: 15, fontFamily: 'aller-bd' }}>                             Tomar Foto</Text>,},
    { text: <Text style={{ color: 'black', fontSize: 15, fontFamily: 'aller-bd' }}>       Seleccionar desde álbum de fotos</Text> },
    { text: <Text style={{ color: 'black', fontSize: 15, fontFamily: 'aller-bd' }}>                              Cancelar</Text> }
];
var CANCEL_INDEX = 4;

class PersonalInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loanding: false, isConnected: true,
            nombre: '', apellido: '', curp: '',
            telefono: '', email: '', id_usuario: '',
            foto: ''
        }
    }

    //Método para montar la vista.
    componentDidMount() {
        this.checkConnection();
    }

    //Método para desmontar la vista.
    componentWillUnmount() {
        if (this.state.isConnected == true) {
            this.focusListener.remove();
        }
    }

    //Método para verificar la conexión a internet.
    checkConnection = async () => {
        const state = await NetInfo.fetch();
        this.setState({ isConnected: state.isConnected });
        if (this.state.isConnected == true) {
            const { navigation } = this.props;
            this.focusListener = navigation.addListener('didFocus', () => {
                this.getData();
            })
        } else {
            Alert.alert('Sin Conexión', 'Verifique su conexión e intente nuevamente.', [{ text: 'OK', onPress: () => this.props.navigation.goBack() }]);
        }
    }

    //Método para obtener las peteciones.
    async getData() {

        try {
            const res = await axios.post(`${Globals.server}:${Globals.port}/consultar_usuario`, { id_usuario: global.id_usuario });
            if (res.status == 200) {
                res.data.data.forEach(element => {
                    this.setState({
                        id_usuario: element["id_usuario_out"],
                        foto: element["fotografia_out"],
                        nombre: element["nombre_out"],
                        apellido: element["apellido_out"],
                        curp: element["curp_out"],
                        telefono: element["telefono_out"],
                        email: element["correo_out"],
                        loanding: true
                    });
                });
            } else {
                Alert.alert('Error', 'Servicio no disponible, intente más tarde.');
            }
        } catch (error) {
            Alert.alert('Sin Conexión', 'Verifique su conexión e intente nuevamente.');
        }
    }

    //Método que proporciona acceso a la interfaz de usuario del sistema para seleccionar imágenes.
    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, aspect: [4, 3], quality: 0.5 });

        if (!result.cancelled) {
            this.props.navigation.navigate('UploadPhoto', {id_usuario: this.state.id_usuario, image: result.uri});
        } else {
            //this.props.navigation.navigate('Informacion');
        }
    }

    //Método para abrir la cámara.
    openCamera = async () => {
        let result = await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [4, 3], quality: 0.5 });

        if (!result.cancelled) {
            this.props.navigation.navigate('UploadPhoto', {id_usuario: this.state.id_usuario, image: result.uri});
        } else {
            //this.props.navigation.navigate('Informacion');
        }
    }

    //Método para redireccionar a la pantalla de Eliminar Cuenta.
    goDeleteAccount = () => {
        this.props.navigation.navigate('DeleteAccount', { id_usuario: this.state.id_usuario, telefono: this.state.telefono })
    }

    //Método para redireccionar a la pantalla de Contraseña.
    goPassword = () => {
        this.props.navigation.navigate('Password', { id_usuario: this.state.id_usuario, telefono: this.state.telefono });
    }

    //Método para redireccionar a la pantalla de Cuentas en Redes Sociales.
    goSocial = () => {
        this.props.navigation.navigate('Social');
    }

    //Método para redireccionar a la pantalla de Correo Electrónico.
    goEmail = () => {
        this.props.navigation.navigate('Email', {
            id_usuario: this.state.id_usuario, correo: this.state.email, nombre: this.state.nombre, apellido: this.state.apellido,
            curp: this.state.curp, telefono: this.state.telefono, foto: this.state.foto
        });
    }

    //Método para redireccionar a la pantalla de Teléfono.
    goPhone = () => {
        this.props.navigation.navigate('Phone', {
            id_usuario: this.state.id_usuario, correo: this.state.email, nombre: this.state.nombre, apellido: this.state.apellido,
            curp: this.state.curp, telefono: this.state.telefono
        });
    }

    render() {
        if (this.state.loanding == true) {
            return (
                <Root>
                    <Container>
                        <Content>
                            <Grid>
                                <Row>
                                    <Col>
                                        <Card>
                                            <CardItem>
                                                <Body>
                                                    <Row>
                                                        <Col>
                                                            <ListItem>
                                                                <Left>
                                                                    <Thumbnail style={{ height: 50, width: 50, borderRadius: 50 }} source={this.state.foto ? { uri: this.state.foto + '?' + new Date(), cache:'force-cache' } : null} />
                                                                    <Text style={{ fontFamily: 'aller-lt', marginLeft: 130, fontSize: 12 }}>Editar foto de perfil</Text>
                                                                </Left>
                                                                <Right>
                                                                    <Button onPress={() =>
                                                                        ActionSheet.show(
                                                                            {
                                                                                options: BUTTONS,
                                                                                cancelButtonIndex: CANCEL_INDEX
                                                                            },
                                                                            buttonIndex => {
                                                                                if (buttonIndex === 0) {
                                                                                    { this.openCamera()}

                                                                                }
                                                                                if (buttonIndex === 1) {

                                                                                    { this.pickImage()}
                                                                                }
                                                                            }
                                                                        )} transparent style={{ height: 30 }}><Icon style={{ color: 'black' }} name="arrow-forward" /></Button>
                                                                </Right>
                                                            </ListItem>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <ListItem>
                                                                <Left>
                                                                    <Text style={{ fontFamily: 'aller-bd' }}>Nombres (s):  </Text>
                                                                    <Text style={{ fontFamily: 'aller-lt' }}>{this.state.nombre}</Text>
                                                                </Left>
                                                            </ListItem>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <ListItem>
                                                                <Left>
                                                                    <Text style={{ fontFamily: 'aller-bd' }}>Apellido (s):  </Text>
                                                                    <Text style={{ fontFamily: 'aller-lt' }}>{this.state.apellido}</Text>
                                                                </Left>
                                                            </ListItem>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <ListItem style={{ borderBottomWidth: 0 }}>
                                                                <Left>
                                                                    <Text style={{ fontFamily: 'aller-bd' }}>CURP:   </Text>
                                                                    <Text style={{ fontFamily: 'aller-lt' }}>{this.state.curp}</Text>
                                                                </Left>
                                                            </ListItem>
                                                        </Col>
                                                    </Row>
                                                </Body>
                                            </CardItem>
                                        </Card>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Card>
                                            <CardItem>
                                                <Body>
                                                    <Row>
                                                        <Col>
                                                            <ListItem>
                                                                <Left style={{ maxWidth: 170 }}>
                                                                    <Text style={{ fontFamily: 'aller-bd' }}>Número de teléfono</Text>
                                                                </Left>
                                                                <Right>
                                                                    <Text style={{ fontSize: 12, fontFamily: 'aller-lt' }}>{this.state.telefono}</Text>
                                                                </Right>
                                                                <Right style={{ maxWidth: 50 }}>
                                                                    <Button onPress={this.goPhone} transparent style={{ height: 30 }}><Icon style={{ color: 'black' }} name="arrow-forward" /></Button>
                                                                </Right>
                                                            </ListItem>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <ListItem>
                                                                <Left>
                                                                    <Text style={{ fontFamily: 'aller-bd' }}>Cambiar la contraseña</Text>
                                                                </Left>
                                                                <Right>
                                                                    <Button onPress={this.goPassword} transparent style={{ height: 30 }}><Icon style={{ color: 'black' }} name="arrow-forward" /></Button>
                                                                </Right>
                                                            </ListItem>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <ListItem>
                                                                <Left style={{ maxWidth: 115 }}>
                                                                    <Text style={{ fontFamily: 'aller-bd' }}>Correo</Text>
                                                                </Left>
                                                                <Right>
                                                                    <Text style={{ fontSize: 12, fontFamily: 'aller-lt' }}>{this.state.email}</Text>
                                                                </Right>
                                                                <Right style={{ maxWidth: 50 }}>
                                                                    <Button onPress={this.goEmail} transparent style={{ height: 30 }}><Icon style={{ color: 'black' }} name="arrow-forward" /></Button>
                                                                </Right>
                                                            </ListItem>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <ListItem>
                                                                <Left>
                                                                    <Text style={{ fontFamily: 'aller-bd' }}>Cuentas en redes sociales</Text>
                                                                </Left>
                                                                <Right>
                                                                    <Button onPress={this.goSocial} transparent style={{ height: 30 }}><Icon style={{ color: 'black' }} name="arrow-forward" /></Button>
                                                                </Right>
                                                            </ListItem>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <ListItem style={{ borderBottomWidth: 0 }}>
                                                                <Left>
                                                                    <Text style={{ fontFamily: 'aller-bd' }}>Eliminar mi cuenta</Text>
                                                                </Left>
                                                                <Right>
                                                                    <Button onPress={this.goDeleteAccount} transparent style={{ height: 30 }}><Icon style={{ color: 'black' }} name="arrow-forward" /></Button>
                                                                </Right>
                                                            </ListItem>
                                                        </Col>
                                                    </Row>
                                                </Body>
                                            </CardItem>
                                        </Card>
                                    </Col>
                                </Row>
                            </Grid>
                        </Content>
                    </Container>
                </Root>
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

export default PersonalInformation;