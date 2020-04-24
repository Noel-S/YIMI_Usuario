
import React, { Component } from 'react';
import NetInfo from '@react-native-community/netinfo';
import Globals from '../../constants/Globals';
import axios from 'axios';

import { StyleSheet, ActivityIndicator, Alert, View, Text, TouchableOpacity, TouchableNativeFeedback, TextInput, StatusBar } from 'react-native';
import FlechaBlancaIcon from '../../components/FlechaBlancaIcon';
import GearButton from '../../components/GearButton';
import Layout from '../../constants/Layout';

class PersonalInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            apellido: '',
            email: '', 
            respuesta: '',
            curp: '', loading: false, isConnected: true,
            telefono: this.props.navigation.getParam('telefono', '1234569870'),
            typing: false,
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

    //Método para validar los datos ingresados en los inputs.
    onValidateInput = async () => {
        var validateCorreo = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var validateCurp = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/;
        var validateNombres = /^[a-zA-Z\sñáéíóú]+$/;

        if (this.state.nombre.trim() === "") {
            this.setState(() => ({ nombreError: "Ingresa tu nombre" }));
        } else if (!validateNombres.test(this.state.nombre)) {
            this.setState(() => ({ nombreError: "Formato Incorrecto" }));
        } else {
            this.setState(() => ({ nombreError: "" }));
        }

        if (this.state.apellido.trim() === "") {
            this.setState(() => ({ apellidoError: "Ingresa tu apellido" }));
        } else if (!validateNombres.test(this.state.apellido)) {
            this.setState(() => ({ apellidoError: "Formato Incorrecto" }));
        } else {
            this.setState(() => ({ apellidoError: "" }));
        }

        if (validateCorreo.test(this.state.email.replace(/ /g, "")) && this.state.email.trim() != "") {
            try {
                const res = await axios.post(`${Globals.server}:${Globals.port}/validar_cuenta`, { campo: this.state.email });
                if (res.status == 200) {
                    res.data.data.forEach(element => {
                        this.setState({
                            respuesta: element["respuesta"]
                        })
                    });
                    if (this.state.respuesta == 0) {
                        this.setState(() => ({ emailError: "", email: this.state.email.replace(/ /g, "") }));
                    } else {
                        this.setState(() => ({ emailError: "Correo Electrónico Existente" }));
                    }
                } else {
                    Alert.alert('Error', 'Servicio no disponible, intente más tarde.');
                }
            } catch (error) {
                Alert.alert('Sin Conexión', 'Verifique su conexión e intente nuevamente.');
            }
        } else if (this.state.email.trim() == "") {
            this.setState(() => ({ emailError: "Ingresa tu Correo" }));
        } else {
            this.setState(() => ({ emailError: "Formato Incorrecto" }));
        }

        if (this.state.apellido.trim() != "" && validateNombres.test(this.state.apellido) && this.state.nombre.trim() != "" && validateNombres.test(this.state.nombre) && this.state.email.trim() != "" && validateCorreo.test(this.state.email) && this.state.curp == "" && this.state.respuesta == 0) {
            this.props.navigation.navigate('AddPassword', {
                nombre: this.state.nombre, apellido: this.state.apellido,
                email: this.state.email, curp: this.state.curp, telefono: this.state.telefono, foto: 'https://coffschamber.com.au/wp-content/uploads/2019/02/RAY.jpg'
            });
        }

        if (this.state.apellido.trim() != "" && validateNombres.test(this.state.apellido) && this.state.nombre.trim() != "" && validateNombres.test(this.state.nombre) && this.state.email.trim() != "" && validateCorreo.test(this.state.email) && this.state.curp != "" && validateCurp.test(this.state.curp) && this.state.respuesta == 0) {
            this.setState(() => ({ curpError: "" }));
            this.props.navigation.navigate('AddPassword', {
                nombre: this.state.nombre, apellido: this.state.apellido,
                email: this.state.email, curp: this.state.curp, telefono: this.state.telefono, foto: 'https://coffschamber.com.au/wp-content/uploads/2019/02/RAY.jpg'
            });
        } else if (this.state.curp.trim() == "") {
            this.setState(() => ({ curpError: "" }));
        } else if (!validateCurp.test(this.state.curp)) {
            this.setState(() => ({ curpError: "Formato Incorrecto" }));
        }
    }

    render() {
        if (this.state.loading == true) {
            return (
                <View style={styles.container}>
                    <StatusBar hidden={true} />
                <View style={styles.lateral} />
                <View style={styles.content}>
                    <View style={styles.title}>
                        <Text style={{ fontSize: Layout.isSmallDevice? 42:54, marginBottom: Layout.isSmallDevice? -15:-10 }}>Información</Text>
                            <Text style={{ fontSize: Layout.isSmallDevice? 42:54 }}>personal.</Text>
                    </View>
                    <View style={{marginEnd: 30}}>
                        <Text style={{ fontSize: Layout.isSmallDevice? 16:20 }}>Ingresa un correo electrónico</Text>
                        <Text style={{ fontSize: Layout.isSmallDevice? 16:20 }}>válido para la verificación.</Text>

                        <View style={[styles.codeBox, { borderTopRightRadius: 20 }]}>
                                <TextInput style={styles.input} keyboardType='name-phone-pad' placeholder='Nombre(s)' value={this.state.nombre} onChangeText={nombre => this.setState({ nombre })}/>
                                {!!this.state.nombreError && (<Text style={{ color: "red", fontSize: 11, fontFamily: 'aller-lt' }}>{this.state.nombreError}</Text>)}
                            </View>
                            <View style={[styles.codeBox, { borderBottomLeftRadius: 20 }]}>
                                <TextInput style={styles.input} keyboardType='name-phone-pad' placeholder='Apellido(s)' value={this.state.apellido} onChangeText={apellido => this.setState({ apellido })}/>
                                {!!this.state.apellidoError && (<Text style={{ color: "red", fontSize: 11, fontFamily: 'aller-lt' }}>{this.state.apellidoError}</Text>)}
                            </View>
                            <View style={[styles.codeBox, { borderTopRightRadius: 20 }]}>
                                <TextInput style={styles.input} keyboardType='email-address' placeholder='Correo electrónico'  value={this.state.email} onChangeText={email => this.setState({ email })}/>
                                {!!this.state.emailError && (<Text style={{ color: "red", fontSize: 11, fontFamily: 'aller-lt' }}>{this.state.emailError}</Text>)}
                            </View>
                            <View style={[styles.codeBox, { borderBottomLeftRadius: 20 }]}>
                                <TextInput style={styles.input} placeholder='CURP' autoCapitalize='characters' value={this.state.curp} onChangeText={curp => this.setState({ curp })}/>
                                {!!this.state.curpError && (<Text style={{ color: "red", fontSize: 11, fontFamily: 'aller-lt' }}>{this.state.curpError}</Text>)}
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
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Text style={{ fontSize: 18, color: '#a8a8a8', marginBottom: 20 }}>REGRESAR</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.indicator}>
                    <View style={[styles.circle, { marginLeft: 20, backgroundColor: '#cacaca' }]} />
                    <View style={[styles.circle, { marginLeft: 16, backgroundColor: '#cacaca' }]} />
                    <View style={[styles.circle, { marginLeft: 16, backgroundColor: '#ec6a2c' }]} />
                    <View style={[styles.circle, { marginLeft: 16, backgroundColor: '#cacaca' }]} />

                    <View style={styles.nextButton} >
                        <View style={{ height: 44, width: 44, backgroundColor: '#79f7c7', position: 'absolute', top: -44, right: 0 }}>
                            <View style={{ height: 44, width: 44, backgroundColor: '#fff', borderBottomRightRadius: 22}}/>
                        </View>
                        <View style={{ height: 44, width: 44, backgroundColor: '#79f7c7', position: 'absolute', bottom: -44, right: 0 }}>
                            <View style={{ height: 44, width: 44, backgroundColor: '#fff', borderTopRightRadius: 22}}/>
                        </View>
                        <TouchableNativeFeedback 
                            background={TouchableNativeFeedback.Ripple('#fff', true)} 
                            onPress={this.onValidateInput}>
                                <View style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'flex-end'  }} >
                                    <FlechaBlancaIcon />
                                </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>

                <GearButton size={46} buttonType='circle' style={{position: 'absolute', right: 25, top: 25}} />
            </View>
                /*
                <Container>
                    <Content>
                        <KeyboardAvoidingView behavior='position' style={{ flex: 1 }} enabled keyboardVerticalOffset={this.state.extraScrollHeight}>
                            <Grid>
                                <Row><Col style={{ marginTop: 90, marginBottom: 10, marginLeft: 20 }}><H3 style={{ fontFamily: 'aller-bd' }}>Información Personal</H3></Col></Row>
                                <Row><Col style={{ marginLeft: 20, marginRight: 20, marginBottom: 15 }}><Text style={{ fontFamily: 'aller-lt' }}>Por favor, ingrese un correo electrónico valido para su verificación.</Text></Col></Row>
                                <Row style={{ marginBottom: 15 }}>
                                    <Col style={{ marginLeft: 20, marginRight: 20 }}>
                                        <Input value={this.state.nombre} onChangeText={nombre => this.setState({ nombre })} style={{ borderBottomWidth: 0.5, fontFamily: 'aller-lt' }} placeholder='* Nombre (s)' onFocus={() => this.setState({ extraScrollHeight: -500 })}></Input>
                                        {!!this.state.nombreError && (<Text style={{ color: "red", fontSize: 11, fontFamily: 'aller-lt' }}>{this.state.nombreError}</Text>)}
                                    </Col>
                                </Row>
                                <Row style={{ marginBottom: 15 }}>
                                    <Col style={{ marginLeft: 20, marginRight: 20 }}>
                                        <Input value={this.state.apellido} onChangeText={apellido => this.setState({ apellido })} style={{ borderBottomWidth: 0.5, fontFamily: 'aller-lt' }} placeholder='* Apellidos (s)' onFocus={() => this.setState({ extraScrollHeight: -500 })}></Input>
                                        {!!this.state.apellidoError && (<Text style={{ color: "red", fontSize: 11, fontFamily: 'aller-lt' }}>{this.state.apellidoError}</Text>)}
                                    </Col>
                                </Row>
                                <Row style={{ marginBottom: 15 }}>
                                    <Col style={{ marginLeft: 20, marginRight: 20 }}>
                                        <Input value={this.state.email} onChangeText={email => this.setState({ email })} style={{ borderBottomWidth: 0.5, fontFamily: 'aller-lt' }} placeholder='* Correo Eléctronico' onFocus={() => this.setState({ extraScrollHeight: -500 })}></Input>
                                        {!!this.state.emailError && (<Text style={{ color: "red", fontSize: 11, fontFamily: 'aller-lt' }}>{this.state.emailError}</Text>)}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{ marginLeft: 20, marginRight: 20 }}>
                                        <Input value={this.state.curp} onChangeText={curp => this.setState({ curp })} style={{ borderBottomWidth: 0.5, fontFamily: 'aller-lt' }} placeholder='CURP' onFocus={() => this.setState({ extraScrollHeight: 5 })} ></Input>
                                        {!!this.state.curpError && (<Text style={{ color: "red", fontSize: 11, fontFamily: 'aller-lt' }}>{this.state.curpError}</Text>)}
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: 35 }}><Col><Button onPress={this.onValidateInput} block style={{ marginLeft: 20, marginRight: 20, backgroundColor: '#ff8834' }}><Text style={{ fontFamily: 'aller-bd' }}>Siguiente</Text></Button></Col></Row>
                            </Grid>
                        </KeyboardAvoidingView>
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
        flex: 1,
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
        width: '100%',
        marginEnd: 20,
        height: Layout.isSmallDevice? 45:50,
        borderColor: '#79f7c7',
        backgroundColor: '#f1f1f1',
        borderWidth: 2,
        marginTop: Layout.isSmallDevice? 7:10, 
        alignItems: 'center'
    },
    input: { 
        height: Layout.isSmallDevice? 40:45,
        width: '100%',
        fontSize: 18,
        paddingHorizontal: 10
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

export default PersonalInformation;