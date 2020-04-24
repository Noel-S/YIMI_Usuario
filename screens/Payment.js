import { Container, Content, Text, Button, Grid, Col, Row, Icon, ListItem, Left, Right, Header, Body, Title, CardItem, Card} from 'native-base';
import React, { Component } from 'react';

import { FontAwesome5 } from '@expo/vector-icons'


class Payment extends Component {

    addCash = () =>{
        this.props.navigation.navigate('Cash');
    }

    backHome = () =>{
        this.props.navigation.navigate('Principal')
    }

    addCard = () =>{
        this.props.navigation.navigate('Card');
    }

    aboutPay = () =>{
        this.props.navigation.navigate('InformacionPago');
    }

    render() {
        return (
            <Container>
                <Content>
                    <Header style={{marginTop:24, backgroundColor: 'white', borderBottomColor:'lightgray' ,borderBottomWidth:0.5}}>
                        <Left>
                            <Button transparent style={{width:40, height:40}}>
                                <FontAwesome5 onPress={this.backHome} name='times' size={20} style={{color:'black'}}/>
                            </Button>
                        </Left>
                        <Body>
                            <Title style={{color:'black', fontFamily: 'aller-bd'}}>Métodos de Pago</Title>
                        </Body>
                    </Header>
                    <Grid>
                        <Row>
                            <Col>
                                <Card>
                                    <CardItem>
                                        <Body>
                                            <Row style={{marginLeft:18}}>
                                                <Col style={{width:130, marginTop:11}}>
                                                    <Text style={{fontFamily: 'aller-bd'}}>Métodos de pago</Text>
                                                </Col>
                                                <Col>
                                                    <Button onPress={this.aboutPay} transparent><FontAwesome5 name='question-circle' size={15} style={{color:'#ff8834'}} /></Button>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <ListItem>
                                                        <Left>
                                                            <FontAwesome5 name='money-bill-alt' size={25} style={{color:'#ff8834'}}/>
                                                            <Text style={{fontFamily: 'aller-lt'}}>   Efectivo</Text>
                                                        </Left>
                                                        <Right>
                                                            <Button onPress={() => this.props.navigation.navigate('Cash')} transparent style={{height:30}}><Icon style={{color:'black'}} name="arrow-forward" /></Button>
                                                        </Right>
                                                    </ListItem>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <ListItem style={{borderBottomWidth:0}}>
                                                        <Left>
                                                            <Button transparent><FontAwesome5 name='plus' size={25} style={{color:'#ff8834'}}/></Button>
                                                            <Text style={{fontFamily: 'aller-lt'}}>   Agrega método de pago {"\n"}<Text style={{color:'gray', fontFamily: 'aller-lt'}}>   Tarjeta crédito / débito</Text></Text>
                                                        </Left>
                                                        <Right>
                                                            <Button onPress={this.addCard} transparent style={{height:30}}><Icon style={{color:'black'}} name="arrow-forward" /></Button>
                                                        </Right>
                                                    </ListItem>
                                                </Col>
                                            </Row>
                                        </Body>
                                    </CardItem>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card>
                                    <CardItem>
                                        <Body>
                                            <Row style={{marginLeft:18, marginTop:15}}>
                                                <Col>
                                                    <Text style={{fontFamily: 'aller-bd'}}>Promoción</Text>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <ListItem style={{borderBottomWidth:0}}>
                                                        <Left>
                                                            <FontAwesome5 name='ticket-alt' size={25} style={{color:'#ff8834'}}/>
                                                            <Text style={{fontFamily: 'aller-lt'}}>   Cupones</Text>
                                                        </Left>
                                                        <Right>
                                                            <Button transparent style={{height:30}}><Icon style={{color:'black'}} name="arrow-forward" /></Button>
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

export default Payment;


