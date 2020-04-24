import * as React from 'react';
import { StyleSheet, Dimensions, View, Text, TouchableOpacity, TouchableNativeFeedback, Image, StatusBar } from 'react-native';
import FlechaBlancaIcon from '../../../components/FlechaBlancaIcon';
import GearButton from '../../../components/GearButton';

export default class LegalScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            aviso_privacidad: false,
            terminos_condiciones: false
        }
    }

    /**
     * Va a la vista siguiente dependiendo que check ya se marcó.
     */
    _siguiente() {
        if (this.state.aviso_privacidad && this.state.terminos_condiciones) {
            this.props.navigation.state.params.onBack(true);
            this.props.navigation.goBack();
        } else if (!this.state.aviso_privacidad && this.state.terminos_condiciones) {
            this.props.navigation.navigate('Privacy', { onBack: this.onBack.bind(this) });
        } else if (this.state.aviso_privacidad && !this.state.terminos_condiciones) {
            this.props.navigation.navigate('Terms', { onBack: this.onBack.bind(this) });
        } else {
            this.props.navigation.navigate('Privacy', { onBack: this.onBack.bind(this) });
        }
    }

    /**
     * Recibe id de la interfaz de la que se volvió y actualiza el estado de el check correspondiente. 
     * @param {number} id - id de la interfaz de la que se volvió.
     * @param {boolean} valor - valor boleano que trae de la vinterfaz que se visitó indicando que se aceptó.
     * @example 0 => Aviso de privacidad.
     * @example 1 => Términos y condiciones.
     */
    onBack(id, valor) {
        id == 1 ? this.setState({ terminos_condiciones: valor }) : this.setState({ aviso_privacidad: valor });
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={true} />
                <View style={styles.lateral} />
                <View style={styles.content}>
                    <View style={styles.title}>
                        <Text style={{ fontSize: 54, marginBottom: -10 }}>Legal.</Text>
                    </View>
                    <View style={{ position: 'absolute', top: 200 }}>
                        <TouchableOpacity
                            style={{ flexDirection: 'row', alignItems: 'center' }}
                            onPress={() => this.props.navigation.navigate('NoticeOfPrivacy', { estado: this.state.aviso_privacidad, onBack: this.onBack.bind(this) })}
                        >
                            <Image
                            source={this.state.aviso_privacidad ? require('../../../assets/images/radiobutton_s.png') : require('../../../assets/images/radiobutton_u.png')}
                            style={{ width: 32, height: 32, marginTop: 4 }}
                        />

                            <Text style={{ fontSize: 20 }}>Aviso de privacidad vigente.</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{ flexDirection: 'row', alignItems: 'center' }}
                            onPress={() => this.props.navigation.navigate('TermsAndConditions', { estado: this.state.terminos_condiciones, onBack: this.onBack.bind(this) })}
                        >
                            <Image
                            source={this.state.terminos_condiciones ? require('../../../assets/images/radiobutton_s.png') : require('../../../assets/images/radiobutton_u.png')}
                            style={{ width: 32, height: 32, marginTop: 4 }}
                        />

                            <Text style={{ fontSize: 20 }}>Términos y condiciones.</Text>
                        </TouchableOpacity>
                        {/* <Text style={{ fontSize: 20, marginBottom: 10 }}>Términos y condiciones.</Text> */}
                    </View>
                </View>
                <View style={styles.actionButtons}>
                    <TouchableOpacity
                        onPress={() => this._siguiente()}
                    >
                        <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#ec6a2c' }}>CONTINUAR</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => alert('Omitir')}
                    >
                        <Text style={{ fontSize: 18, color: '#a8a8a8', marginBottom: 20 }}>OMITIR</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.indicator}>
                    <View style={[styles.circle, { marginLeft: 20, backgroundColor: !this.state.aviso_privacidad && !this.state.terminos_condiciones ? '#ec6a2c' : '#cacaca' }]} />
                    <View style={[styles.circle, { marginLeft: 16, backgroundColor: this.state.aviso_privacidad && !this.state.terminos_condiciones || !this.state.aviso_privacidad && this.state.terminos_condiciones ? '#ec6a2c' : '#cacaca' }]} />
                    <View style={[styles.circle, { marginLeft: 16, backgroundColor: this.state.aviso_privacidad && this.state.terminos_condiciones ? '#ec6a2c' : '#cacaca' }]} />

                    <View style={styles.nextButton} >
                        <View style={{ height: 44, width: 44, backgroundColor: '#ec6a2c', position: 'absolute', top: -44, right: 0 }}>
                            <View style={{ height: 44, width: 44, backgroundColor: '#fff', borderBottomRightRadius: 22 }} />
                        </View>
                        <View style={{ height: 44, width: 44, backgroundColor: '#ec6a2c', position: 'absolute', bottom: -44, right: 0 }}>
                            <View style={{ height: 44, width: 44, backgroundColor: '#fff', borderTopRightRadius: 22 }} />
                        </View>
                        <TouchableNativeFeedback
                            background={TouchableNativeFeedback.Ripple('#fff', true)}
                            onPress={() => this._siguiente()}>
                            <View style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'flex-end' }} >
                                <FlechaBlancaIcon />
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>

                <GearButton size={46} buttonType='circle' style={{ position: 'absolute', right: 25, top: 25 }} />
            </View>
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
        bottom: '13%',
        left: 20
    },
    lateral: {
        height: '100%',
        width: 10,
        backgroundColor: '#ec6a2c',
        position: 'absolute',
        right: 0
    },
    nextButton: {
        position: 'absolute',
        right: 10,
        backgroundColor: '#ec6a2c',
        width: 70,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 22,
        borderBottomLeftRadius: 22
    }
});