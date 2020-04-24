
import { ActivityIndicator, Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Globals from '../../constants/Globals';
import React, { Component } from 'react';
import { View, Text } from 'native-base';
import axios from 'axios';


class UploadPhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loanding: false, isConnected: true,
            id_usuario: this.props.navigation.getParam('id_usuario'), 
            image: this.props.navigation.getParam('image')
        }
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
            this.uploadPhoto();
        } else {
            Alert.alert('Sin Conexión', 'Verifique su conexión e intente nuevamente.', [{ text: 'OK', onPress: () => this.props.navigation.goBack() }]);
        }
    }

    //Método para actualizar la foto de perfil.
    uploadPhoto = async () =>{
        try{
            let localUri = this.state.image;
            let filename = localUri.split('/').pop();
            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;
            var formData = new FormData();

            formData.append('id_usuario', this.state.id_usuario);
            formData.append('file', { uri: localUri, name: filename, type });

            const res = await axios({
                url: 'http://35.203.57.92:3001/upload_foto_perfil',
                method: 'POST',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (res.status == 200) { 
                Alert.alert('Exito','Se ha actualizado tu foto de perfil.',[{text: 'OK', onPress: () =>this.props.navigation.navigate('PersonalInformation')}]);
            }else{
                Alert.alert('Error', 'Servicio no disponible, intente más tarde.');
            }

        }catch(error){
           Alert.alert('Sin Conexión', 'Verifique su conexión e intente nuevamente.');
        }
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignContent:'center', alignItems:'center', alignSelf:'center'}}>
                <ActivityIndicator size='large' color="#ff8834" />
                <Text style={{fontFamily:'aller-lt'}}>Actualizando</Text>
            </View>
        );
    }
}

export default UploadPhoto;


