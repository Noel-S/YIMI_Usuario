import React, { Component } from 'react';
import { Container, Content, Text, Grid, Col, Row} from 'native-base';

class Efectivo extends Component {
    render() {
        return (
            <Container>
                <Content>
                    <Grid>
                        <Row style={{marginTop:15, marginLeft:5}}><Col><Text style={{fontFamily: 'aller-lt'}}>1. Puedes pagar con efectivo.</Text></Col></Row>
                        <Row style={{marginLeft:5}}><Col><Text style={{fontFamily: 'aller-lt'}}>2. Si usas cupones, por favor, confirma con el conductor la tarifa actual.</Text></Col></Row>
                    </Grid> 
                </Content>
            </Container>
        );
    }
}

export default Efectivo;