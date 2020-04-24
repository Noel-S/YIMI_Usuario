import { Container, Content, Text, Button, Grid, Col, Row, Icon, ListItem, Left, Right, Header, Body, Card, CardItem, Title, View } from 'native-base';
import * as GoogleSignIn from 'expo-google-sign-in';
import { FontAwesome5 } from '@expo/vector-icons';
import { AsyncStorage } from 'react-native';
import React, { Component } from 'react';

class Setting extends Component {

    //Método para cerrar la sesión de la cuenta.
    Logout = async () => {

        try {
            await AsyncStorage.removeItem('id');
            this.signOutAsync();
            this.props.navigation.navigate('Login');
        } catch (error) {
            // Error saving data
            console.log(error);
        }
    }

    //Método para cerrar la sesión de Google.
    signOutAsync = async () => {
        await GoogleSignIn.signOutAsync();
    };

    //Método para redireccionar a la pantalla de Informacion Personal
    goPersonalInformation = () => {
        this.props.navigation.navigate('PersonalInformation');
    }

    render() {
        return (
            <Container>
                <Content>
                    <Header style={{ marginTop: 24, backgroundColor: 'white', borderBottomColor: 'lightgray', borderBottomWidth: 0.5 }}>
                        <Left>
                            <Button transparent onPress={() => this.props.navigation.navigate('Principal')}>
                                <FontAwesome5  name='times' size={20} style={{ color: 'black' }} />
                            </Button>
                        </Left>
                        <Body>
                            <Title style={{ color: 'black', fontFamily: 'aller-bd', marginLeft:15 }}>Configuración</Title>
                        </Body>
                    </Header>
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
                                                            <Text style={{ fontFamily: 'aller-bd' }}> Información Personal</Text>
                                                        </Left>
                                                        <Right>
                                                            <Button onPress={this.goPersonalInformation} transparent style={{ height: 30 }}><Icon style={{ color: 'black' }} name="arrow-forward" /></Button>
                                                        </Right>
                                                    </ListItem>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <ListItem>
                                                        <Left>
                                                            <Text style={{ fontFamily: 'aller-bd' }}> Destinos Favoritos</Text>
                                                        </Left>
                                                        <Right>
                                                            <Button transparent style={{ height: 30 }}><Icon style={{ color: 'black' }} name="arrow-forward" /></Button>
                                                        </Right>
                                                    </ListItem>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <ListItem style={{ borderBottomWidth: 0}}>
                                                        <Left>
                                                            <Text style={{ fontFamily: 'aller-bd' }}> Idioma</Text>
                                                        </Left>
                                                        <Right>
                                                            <Button transparent style={{ height: 30 }}><Icon style={{ color: 'black' }} name="arrow-forward" /></Button>
                                                        </Right>
                                                    </ListItem>
                                                </Col>
                                            </Row>
                                        </Body>
                                    </CardItem>
                                </Card>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 10 }}>
                            <Col>
                                <Card>
                                    <CardItem>
                                        <Body>
                                            <Row>
                                                <Col>
                                                    <ListItem style={{ borderBottomWidth: 0, height: 0 }} onPress={this.Logout}>
                                                        <Left>
                                                            <Text style={{ fontFamily: 'aller-bd' }} >Cerrar Sesión</Text>
                                                        </Left>
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
        );
    }
}

export default Setting;