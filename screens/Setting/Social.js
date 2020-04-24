import { Container, Content, Text, Grid, Col, Row, ListItem, Left, Right, Button, Icon, Thumbnail } from 'native-base';
import * as GoogleSignIn from 'expo-google-sign-in';
import { FontAwesome5 } from '@expo/vector-icons'
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';
import React, { Component } from 'react';
import { Alert } from 'react-native';


class Social extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusGoogle: 0,
            statusFacebook: 0
        };
    }

    signInGoogle = async () => {
        try {
          await GoogleSignIn.askForPlayServicesAsync();
          const { type } = await GoogleSignIn.signInAsync();
          if (type === 'success') {
            this.setState({ statusGoogle: 1 });
          }
        } catch ({ message }) {
          alert('login: Error:' + message);
        }
      };

    signInGoogle2 = async () => {
        try {
            const result = await Google.logInAsync({
                androidClientId: "372701419748-ja7jlf6k03opndc3q6lndomu9a8u77h0.apps.googleusercontent.com",
                scopes: ["profile", "email"]
            })

            if (result.type === "success") {
                this.setState({ statusGoogle: 1 });
            } else {
                console.log("cancelled")
            }
        } catch (e) {
            console.log("error", e)
        }
    }

    signFacebook = async () => {
        try {
            const {
                type,
                token,
                expires,
                permissions,
                declinedPermissions,
            } = await Facebook.logInWithReadPermissionsAsync('2600565983332988', {
                permissions: ['public_profile', 'email', 'user_friends'],
            });
            if (type === 'success') {
                // Get the user's name using Facebook's Graph API
                const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=first_name,last_name,email,picture`);
                //console.log((await response.json()).first_name);
                let result = await response.json();

                this.setState({ statusFacebook: 1 });

            } else {
                // type === 'cancel'
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    }

    alertGoogle = () => {
        Alert.alert(
            '¿Quiere desconectarse?',
            'No puedes iniciar sesión con cuenta de Google después de desconectarse',
            [
                { text: 'Cancelar' },
                { text: 'Desconectarse', onPress: () => this.setState({ statusGoogle: 2 }) }
            ]
        );
    }

    alertFacebook = () => {
        Alert.alert(
            '¿Quiere desconectarse?',
            'No puedes iniciar sesión con cuenta de Facebook después de desconectarse',
            [
                { text: 'Cancelar' },
                { text: 'Desconectarse', onPress: () => this.setState({ statusFacebook: 2 }) }
            ]
        );
    }

    render() {
        return (
            <Container>
                <Content>
                    <Grid>
                        <Row>
                            <Col>
                                <ListItem>
                                    <Left>
                                        <FontAwesome5 name='facebook-square' size={20} style={{ color: '#3b5998' }} />
                                        <Text style={{ fontFamily: 'aller-lt' }}> Facebook</Text>
                                    </Left>
                                    {this.state.statusFacebook == 0
                                        ? <Text style={{ fontFamily: 'aller-lt' }}>Conectarse</Text>
                                        : this.state.statusFacebook == 1
                                            ? <Text onPress={this.alertFacebook} style={{ fontFamily: 'aller-lt' }}>Conectado</Text>
                                            : <Text style={{ fontFamily: 'aller-lt' }}>Desconectado</Text>
                                    }
                                    <Right>
                                        <Button onPress={this.signFacebook} transparent style={{ height: 30 }}><Icon style={{ color: 'black' }} name="arrow-forward" /></Button>
                                    </Right>
                                </ListItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <ListItem>
                                    <Left>
                                        <Thumbnail source={require('../../assets/images/google.png')} style={{ height: 20, width: 20 }} />
                                        <Text style={{ fontFamily: 'aller-lt' }}> Google</Text>
                                    </Left>
                                    {this.state.statusGoogle == 0
                                        ? <Text style={{ fontFamily: 'aller-lt' }}>Conectarse</Text>
                                        : this.state.statusGoogle == 1
                                            ? <Text onPress={this.alertGoogle} style={{ fontFamily: 'aller-lt' }}>Conectado</Text>
                                            : <Text style={{ fontFamily: 'aller-lt' }}>Desconectado</Text>
                                    }
                                    <Right>
                                        <Button onPress={this.signInGoogle} transparent style={{ height: 30, fontFamily: 'aller-lt' }}><Icon style={{ color: 'black' }} name="arrow-forward" /></Button>
                                    </Right>
                                </ListItem>
                            </Col>
                        </Row>
                    </Grid>
                </Content>
            </Container>
        );
    }
}

export default Social;