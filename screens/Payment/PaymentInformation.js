import React, { Component } from 'react';
import { Container, Content, Text, Button, Grid, Col, Row, Icon, ListItem, Left, Right, Header, Body, Title, CardItem, Card} from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons'


class Pago extends Component {

    render() {
        return (
            <Container>
                <Content>
                    <Grid>
                        <Row><Col style={{marginLeft:10, marginRight:10, marginTop:10}}><Text style={{fontFamily: 'aller-lt'}}>Pagar sin contraseña es un servicio ofrecido por YiMi y terceros, permitiendo a los usuarios tener una mejor experiencia.</Text></Col></Row>
                        <Row><Col style={{marginLeft:10, marginRight:10, marginTop:5}}><Text style={{fontFamily: 'aller-bd'}}>Q: ¿Cuáles son los métodos de pago que se pueden usar sin contraseña?</Text></Col></Row>
                        <Row><Col style={{marginLeft:10, marginRight:10, marginTop:5}}><Text><Text style={{fontFamily: 'aller-bd'}}>A:</Text> Por ahora, esta función soporta tarjetas de crédito y débito.</Text></Col></Row>
                        <Row><Col style={{marginLeft:10, marginRight:10, marginTop:5}}><Text style={{fontFamily: 'aller-bd'}}>Q: ¿Qué se necesita para usar el pago sin contraseña?</Text></Col></Row>
                        <Row><Col style={{marginLeft:10, marginRight:10, marginTop:5}}><Text><Text style={{fontFamily: 'aller-bd'}}>A:</Text> Puedes conectar una tarjeta de crédito y débito con tu cuenta.</Text></Col></Row>
                        <Row><Col style={{marginLeft:10, marginRight:10, marginTop:5}}><Text style={{fontFamily: 'aller-bd'}}>Q: ¿Cómo funciona el pago sin contraseña después de activarlo?</Text></Col></Row>
                        <Row><Col style={{marginLeft:10, marginRight:10, marginTop:5}}><Text><Text style={{fontFamily: 'aller-bd'}}>A:</Text> Después de activar tu pago, los usuarios YiMi pagan automáticamente mediante terceros o cuenta bancaria después de terminar su servicio.</Text></Col></Row>
                        <Row><Col style={{marginLeft:10, marginRight:10, marginTop:5}}><Text style={{fontFamily: 'aller-bd'}}>Q: ¿Cómo se resuelve si existe alguna disputa sobre el pago?</Text></Col></Row>
                        <Row><Col style={{marginLeft:10, marginRight:10, marginTop:5}}><Text><Text style={{fontFamily: 'aller-bd'}}>A:</Text> Si existe una disputa sobre la tarifa, puedes hacer clic en "Comentarios" en la aplicación "Pago Finalizado" para hacer una reclamación. Después, nuestro Soporte Técnico se contactará contigo cuanto antes.</Text></Col></Row>
                        <Row><Col style={{marginLeft:10, marginRight:10, marginTop:5}}><Text style={{fontFamily: 'aller-lt'}}>Adicionalmente, puedes llamar directamente a Soporte Técnico para realizar tus comentarios.</Text></Col></Row>

                    </Grid> 
                </Content>
            </Container>
        );
    }
}

export default Pago;