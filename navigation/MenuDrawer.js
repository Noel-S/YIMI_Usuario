import { TouchableOpacity } from 'react-native-gesture-handler';
import { View, Text, Thumbnail } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import Globals from '../constants/Globals';
import { Dimensions } from 'react-native';
import React from 'react';
import axios from 'axios';

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

export default class MenuDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          nombre: '',
          apellido:'',
          foto: ''
        }
    }

    navLink(nav, text, icon){
        return(
            <TouchableOpacity style={{height:50}} onPress={() => this.props.navigation.navigate(nav)}>
                <Text style={{flex:1, fontSize:20, padding:6, paddingLeft:14, margin:5, textAlign:'left'}}><Text style={{color:'#ff8834'}}>{icon}</Text>{text}</Text>
            </TouchableOpacity>
        )
    }

    componentDidMount(){
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            axios.post(`${Globals.server}:${Globals.port}/consultar_usuario`,{id_usuario: global.id_usuario})
            .then(response => {
                response.data.data.forEach(element => {
                    this.setState({
                        nombre: element["nombre_out"], 
                        apellido: element["apellido_out"],
                        foto: element["fotografia_out"],
                    });        
                });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
        });
    }

    componentWillUnmount(){
        this.focusListener.remove();
    }

    render() {
        const uri = this.state.foto 
        return (  
            <View style={{flex:1, backgroundColor:'lightgray'}}>
                <View style={{height:160, backgroundColor:'#ff8834'}}>
                    <View style={{flex:1, flexDirection:'row', alignItems:'center', paddingTop:25, borderBottomWidth:1, borderBottomColor:'#ff8834'}}>
                        <View style={{flex:1, paddingLeft:20, paddingRight:20}}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Informacion')}>
                                <Thumbnail style={{height:100, width:100, borderRadius:50}}  source={uri ? {uri: uri + '?' + new Date() } : null}/>
                            </TouchableOpacity>
                            <Text style={{fontSize:0}}> {this.state.id_usuario = global.id_usuario} </Text>
                        </View>
                        <View style={{flex:2, flexDirection:'column', justifyContent:'center'}}>
                            <Text onPress={() => this.props.navigation.navigate('PersonalInformation')} style={{fontSize:20, paddingBottom:5, color:'white', textAlign:'left', fontFamily:'aller-bd'}}>{this.state.nombre}{"\n"}{this.state.apellido}</Text>
                        </View>
                    </View>
                </View>
            
                <View style={{flex:1, backgroundColor:'white', paddingTop:10, paddingBottom:450}}>
                    {/*this.navLink('Inicio','  Inicio',<FontAwesome5 name='home' size={20} syle={{color:'#ff8834'}}/>)*/}
                    {this.navLink('Pago',<Text style={{fontFamily: 'aller-lt', fontSize: 18}}>  Pago</Text>,<FontAwesome5 name='credit-card' size={20} syle={{color:'#ff8834'}}/>)}
                    {this.navLink('',<Text style={{fontFamily: 'aller-lt', fontSize: 18}}>  Mis Viajes</Text>,<FontAwesome5 name='suitcase' size={20} syle={{color:'#ff8834'}}/>)}
                    {this.navLink('',<Text style={{fontFamily: 'aller-lt', fontSize: 18}}>  Datos de Facturación</Text>,<FontAwesome5 name='file-alt' size={20} syle={{color:'#ff8834'}}/>)}
                    {this.navLink('',<Text style={{fontFamily: 'aller-lt', fontSize: 18}}>  Ayuda</Text>,<FontAwesome5 name='question-circle' size={20} syle={{color:'#ff8834'}}/>)}
                    {this.navLink('Centro de Seguridad',<Text style={{fontFamily: 'aller-lt', fontSize: 18}}>  Centro de Seguridad</Text>,<FontAwesome5 name='lock' size={20} syle={{color:'#ff8834'}}/>)}
                    {this.navLink('Configuración',<Text style={{fontFamily: 'aller-lt', fontSize: 18}}>  Configuración</Text>, <FontAwesome5 name='cog' size={20} syle={{color:'#ff8834'}}/>)}
                    {this.navLink('',<Text style={{fontFamily: 'aller-lt', fontSize: 18}}>  Mis cupones</Text>, <FontAwesome5 name='ticket-alt' size={20} syle={{color:'#ff8834'}}/>)}
                </View>
            </View>
        )
    }
}
