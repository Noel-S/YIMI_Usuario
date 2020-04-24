import React, { Component } from 'react';
import { Container, Content, Text, Button,Grid, Col, Row, Thumbnail} from 'native-base';
import axios from 'axios';
import { FontAwesome5 } from '@expo/vector-icons';

class AddProfilePhoto extends Component {
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
        };
    }

    updatePhoto = () =>{     
        axios.put('http://35.203.57.92:3000/modificar_usuario',{id_usuario:this.state.id_usuario, nombre: this.state.nombre,apellido:this.state.apellido, correo:this.state.email, num_telefono:this.state.telefono, curp:this.state.curp,
        foto: this.state.foto, id_ciudad:null, id_tipo_conductor:null})
        .then(response => {
           this.props.navigation.navigate('Informacion');
        })
        .catch(function (error) {
            console.log(error);
        });  
    }

    backCamara = () =>{
        this.props.navigation.navigate('Informacion');
    }

    render() {
        return (
        <Container>
            <Content>
                <Grid>
                    <Row style={{marginTop:30}}>
                        <Col style={{display:'flex', alignItems:'center',alignContent:'center', marginTop:50}}>
                            <Thumbnail style={{ height: 400, width: 300, borderRadius:5}} square source= {{uri:this.state.foto}} />
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{display:'flex', alignContent:'center', alignItems:'center'}}>
                            <Button onPress={this.backCamara} transparent><FontAwesome5 name='trash-alt' size={30} style={{color:'red', paddingLeft: 150}}/></Button>
                        </Col>
                        <Col style={{display:'flex', alignContent:'center', alignItems:'center'}}>
                            <Button onPress={this.updatePhoto} transparent><FontAwesome5 name='check' size={30} style={{color:'green', paddingLeft: 15}}/></Button>
                        </Col>
                    </Row>
                </Grid> 
            </Content>
        </Container>
        );
    }
}

export default AddProfilePhoto;