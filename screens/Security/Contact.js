import { Container, Content, Text, Button, Grid, Col, Row, View } from 'native-base';
import { ActivityIndicator, Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { FontAwesome5 } from '@expo/vector-icons';
import Globals from '../../constants/Globals';
import React, { Component } from 'react';
import axios from 'axios';


class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id_usuario: global.id_usuario,
            comprobacion: '', loading: false,
            isConnected: true
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
            this.getContacts();
        } else {
            Alert.alert('Sin Conexión', 'Verifique su conexión e intente nuevamente.', [{ text: 'OK', onPress: () => this.props.navigation.goBack() }]);
        }
    }

    getContacts =  async () => {
        try {
            const res = await axios.post(`${Globals.server}:${Globals.port}/consultar_contacto_confianza`, { id_usuario: this.state.id_usuario });
            if (res.status == 200) {
                res.data.data.forEach(element => {
                    console.log(element['nombre_contacto_out']);
                    this.setState({ comprobacion: element['nombre_contacto_out'], loading: true });
                });
                if (this.state.comprobacion == '') {
                    this.setState({ comprobacion: 1 });
                } else {
                    this.setState({ comprobacion: 0 });
                }
            } else {
                Alert.alert('Error', 'Servicio no disponible, intente más tarde.');
            }
        } catch (error) {
            Alert.alert('Sin Conexión', 'Verifique su conexión e intente nuevamente.');
        }
        this.setState({ loading: true });
    }

    render() {
        if (this.state.loading == true) {
            return (
                <Container>
                    <Content>
                        <Grid>
                            <Row style={{ marginTop: 30 }}><Col style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontFamily: 'aller-bd' }}>Permite con tu familia y amigos sigan tu viaje</Text></Col></Row>
                            <Row style={{ marginLeft: 5, marginRight: 5, marginBottom: 15 }}><Col><Text style={{ textAlign: 'center', fontFamily: 'aller-lt' }}>"Contactos de Confianza" te permite compartir el estatus de tu viaje con familiares y amigos en un sólo clic.</Text></Col></Row>
                            <Row><Col style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><FontAwesome5 name='users' size={210} /></Col></Row>
                            {this.state.comprobacion == 1
                                ? <Row style={{ marginTop: 70 }}><Col><Button block onPress={() => this.props.navigation.navigate('AddContact')} style={{ marginLeft: 20, marginRight: 20, backgroundColor: '#ff8834' }}><Text style={{ fontFamily: 'aller-bd' }}>Agregar Contactos de Confianza</Text></Button></Col></Row>
                                : <Row style={{ marginTop: 70 }}><Col><Button block onPress={() => this.props.navigation.navigate('ListContact')} style={{ marginLeft: 20, marginRight: 20, backgroundColor: '#ff8834' }}><Text style={{ fontFamily: 'aller-bd' }}>Agregar Contactos de Confianza</Text></Button></Col></Row>
                            }

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

export default Contact;