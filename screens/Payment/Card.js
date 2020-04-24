import { Container, Content, Text, Grid, Col, Row, Input, Button } from 'native-base';
import { Alert, ActivityIndicator } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Globals from '../../constants/Globals';
import React, { Component } from 'react';
import axios from 'axios';


class Tarjeta extends Component {
    constructor(props) {
        super(props);
        this.state = {
            num_tarjeta: '',
            fecha_vencimiento: '',
            ccv: '', loading:false, isConnected:true
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

    addCard = async () => {
        try {
            const res = await axios.post(`${Globals.server}:${Globals.port}/registrar_cuenta_bancaria`,
                {
                    id_rol: 4, clabe: '', num_cuenta: '', num_tarjeta: this.state.num_tarjeta, nombre_propietario: '',
                    apellido_propietario: '', fecha_vencimiento: this.state.fecha_vencimiento, ccv: this.state.ccv, tipo_pago: null, tipo: 2, id_banco: null, id_usuario: global.id_usuario
                });
            if (res.status == 200) {
                Alert.alert('Aviso', 'Se registro tu tarjeta!', [{ text: 'OK', onPress: () => this.props.navigation.navigate('Payment') },]);
            } else {
                Alert.alert('Error', 'Servicio no disponible, intente más tarde.');
            }
        } catch (error) {
            Alert.alert('Sin Conexión', 'Verifique su conexión e intente nuevamente.');
        }
    }

    //Método para validar los inputs ingresados.
    onValidateInput = () => {
        var validateNumTarjeta = /^[0-9]{16}$/;
        var validateDate = /^(0?[1-9]|1[0-2])[/]([2-4][0-9])$/;

        if (this.state.num_tarjeta.trim() == "") {
            this.setState(() => ({ num_tarjetaError: "Ingresa tu Número de Tarjeta" }));
        } else if (!validateNumTarjeta.test(this.state.num_tarjeta)) {
            this.setState(() => ({ num_tarjetaError: "El Número de Tarjeta debe contener 16 dígitos" }));
        } else {
            this.setState(() => ({ num_tarjetaError: "" }));
        }

        if (this.state.fecha_vencimiento.trim() == "") {
            this.setState(() => ({ fechaError: "Ingresa tu Fecha de Vencimiento" }));
        } else if (!validateDate.test(this.state.fecha_vencimiento)) {
            this.setState(() => ({ fechaError: "Formato Incorrecto (MM/YY)" }));
        } else {
            this.setState(() => ({ fechaError: "" }));
        }

        if (this.state.ccv.trim() == "") {
            this.setState(() => ({ ccvError: "Ingresa tu CCV" }));
        } else {
            this.setState(() => ({ ccvError: "" }));
        }

        if (this.state.num_tarjeta.trim() != "" && this.state.fecha_vencimiento.trim() != "" && this.state.ccv.trim() != ""
            && validateDate.test(this.state.fecha_vencimiento) && validateNumTarjeta.test(this.state.num_tarjeta)) {
            this.addCard();
        }
    }

    render() {
        if (this.state.loading == true) {
            return (
                <Container>
                    <Content>
                        <Grid style={{ marginTop: 10 }}>
                            <Row>
                                <Col style={{ marginRight: 20, marginLeft: 20 }}>
                                    <Input value={this.state.num_tarjeta} onChangeText={num_tarjeta => this.setState({ num_tarjeta })} keyboardType='numeric' maxLength={16} placeholder="Número de tarjeta" style={{ borderBottomWidth: 0.5, fontFamily: 'aller-lt' }} />
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{ marginBottom: 5 }}>
                                    {!!this.state.num_tarjetaError && (<Text style={{ color: "red", fontSize: 11, marginLeft: 20, fontFamily: 'aller-lt' }}>{this.state.num_tarjetaError}</Text>)}
                                </Col>
                            </Row>
                            <Row style={{ marginTop: 10 }}>
                                <Col style={{ marginRight: 20, marginLeft: 20 }}>
                                    <Input value={this.state.fecha_vencimiento} onChangeText={fecha_vencimiento => this.setState({ fecha_vencimiento })} keyboardType='numbers-and-punctuation' placeholder="Fecha de Vencimiento (MM/YY)" style={{ borderBottomWidth: 0.5, fontFamily: 'aller-lt' }} />
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{ marginBottom: 5 }}>
                                    {!!this.state.fechaError && (<Text style={{ color: "red", fontSize: 11, marginLeft: 20, fontFamily: 'aller-lt' }}>{this.state.fechaError}</Text>)}
                                </Col>
                            </Row>
                            <Row style={{ marginTop: 10 }}>
                                <Col style={{ marginRight: 20, marginLeft: 20 }}>
                                    <Input value={this.state.ccv} onChangeText={ccv => this.setState({ ccv })} keyboardType='numeric' placeholder="CCV" maxLength={3} style={{ borderBottomWidth: 0.5, fontFamily: 'aller-lt' }} />
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{ marginBottom: 5 }}>
                                    {!!this.state.ccvError && (<Text style={{ color: "red", fontSize: 11, marginLeft: 20, fontFamily: 'aller-lt' }}>{this.state.ccvError}</Text>)}
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{ marginTop: 11, marginRight: 20, marginLeft: 20 }}>
                                    <Text style={{ fontSize: 11, fontFamily: 'aller-bd' }}>
                                        Para su seguridad, preautorizaremos un cargo de hasta MX$10.00 en su tarjeta.
                                        No se preocupe, solo se trata de una verificación y el dinero no se debitara de su cuenta.
                                </Text>
                                </Col>
                            </Row>
                            <Row style={{ marginTop: 35 }}><Col><Button block onPress={this.onValidateInput} style={{ marginLeft: 20, marginRight: 20, backgroundColor: '#ff8834' }}><Text style={{ fontFamily: 'aller-bd' }}>Agregar</Text></Button></Col></Row>
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

export default Tarjeta;