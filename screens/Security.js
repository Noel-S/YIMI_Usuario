import React, { Component } from 'react';
import { Container, Content, Text, Button, Grid, Col, Row, Icon, ListItem, Left, Right, Header, Body, Title, Card, CardItem } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons'

class Security extends Component {

    render() {
        return (
            <Container>
                <Content>
                    <Header style={{ marginTop: 24, backgroundColor: 'white', borderBottomColor: 'lightgray', borderBottomWidth: 0.5 }}>
                        <Left>
                            <Button transparent style={{ width: 40, height: 40 }}>
                                <FontAwesome5 onPress={() => this.props.navigation.navigate('Inicio')} name='times' size={20} style={{ color: 'black' }} />
                            </Button>
                        </Left>
                        <Body>
                            <Title style={{ color: 'black', fontFamily: 'aller-bd' }}>Centro de Seguridad</Title>
                        </Body>
                    </Header>
                    <Grid>
                        <Row>
                            <Col>
                                <Card>
                                    <CardItem>
                                        <Body>
                                            <Row style={{ marginLeft: 18 }}><Col><Text style={{ fontFamily: 'aller-bd' }}>Contactos de Confianza</Text></Col></Row>
                                            <Row>
                                                <Col>
                                                    <ListItem style={{ borderBottomWidth: 0 }}>
                                                        <Left style={{ margin: 0, padding: 0 }}>
                                                            <Text style={{ fontFamily: 'aller-lt' }}>Comparte el estatus de tu viaje con tus familiares y amigos con un sólo clic.</Text>
                                                        </Left>
                                                        <Right>
                                                            <Button onPress={() => this.props.navigation.navigate('Contact')} transparent style={{ height: 30 }}><Icon style={{ color: 'black' }} name="arrow-forward" /></Button>
                                                        </Right>
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

export default Security;