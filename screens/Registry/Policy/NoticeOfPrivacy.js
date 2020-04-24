import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TouchableNativeFeedback, TextInput, ScrollView, CheckBox, Alert, Image } from 'react-native';
import FlechaBlancaIcon from '../../../components/FlechaBlancaIcon';
import GearButton from '../../../components/GearButton';
import Layout from '../../../constants/Layout';

export default class NoticeOfPrivacyScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            aviso: this.props.navigation.getParam('estado')
        }
    }

    _aceptar() {
        this.setState(prev => ({ aviso: !prev.aviso }));
    }

    _continuar() {
        if (!this.state.aviso) {
            Alert.alert('Mensaje', 'Acepta antes de avanzar.')
        } else {
            this.props.navigation.state.params.onBack(0, this.state.aviso);
            this.props.navigation.goBack();
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.lateral} />
                <View style={styles.content}>
                    <View style={styles.title}>
                        <Text style={{ fontSize: 32, marginBottom: -10 }}>Aviso de</Text>
                        <Text style={{ fontSize: 32 }}>privacidad vigente.</Text>
                    </View>
                    <View style={{ position: 'absolute', bottom: 200, top: 160 }}>
                        <ScrollView>

                            <Text style={{ textAlign: 'justify' }}>YiMi - Kiotrack S.A. de C.V. (en lo sucesivo denominada como “YiMi” o la “Compañía”), una sociedad debidamente constituida conforme a las leyes de México.</Text>
                            <Text style={{ textAlign: 'justify' }}>El usuario que accede, navega o utiliza YiMi Pasajero y los sitios web de YiMi en lo sucesivo se denominará como el “Pasajero”. YiMi presta al Pasajero servicios en línea de contratación de transporte privado con base en las necesidades de desplazamiento del Pasajero a través de YiMi Pasajero con interacción de información fuera de línea y en línea en tiempo real y una efectiva adecuación de recursos fuera de línea a través del análisis de una gran cantidad de datos (en lo sucesivo denominados como los “Servicios”). El usuario que accede, navega, o utiliza YiMi Conductor y los sitios web de YiMi, en lo sucesivo se denominará como el “Conductor”. El Conductor que sea designado al Pasajero a través de YiMi Pasajero se denominará en lo sucesivo como el “Conductor Designado”.</Text>
                            <Text style={{ textAlign: 'justify' }}>Este Aviso de Privacidad de YiMi Pasajero (en lo sucesivo denominado como el “Aviso de Privacidad”), en conjunto con los Términos y Condiciones de Uso de YiMi Pasajero establecen la base sobre la cual se procesará la Información Personal recabada.</Text>
                            <Text style={{ textAlign: 'justify' }}>Por favor lea este Aviso de Privacidad para entender las consideraciones y prácticas con relación a la Información Personal del Pasajero y el tratamiento que se dará a tales datos. Al acceder o navegar en YiMi Pasajero, el Pasajero en este acto se obliga a aceptar el Aviso de Privacidad.</Text>
                            <Text style={{ textAlign: 'justify', fontWeight: '700' }}> Por favor lea este Aviso de Privacidad cuidadosamente, entiéndalo y acéptelo plenamente antes de utilizar YiMi Pasajero. Si el Pasajero no está de acuerdo con cualquier punto de este Aviso de Privacidad, debe dejar de utilizar YiMi Pasajero inmediatamente. Cuando el Pasajero comienza a utilizar YiMi Pasajero, el Pasajero ha aceptado que YiMi puede recopilar, revelar, almacenar, utilizar, procesar, compartir, transmitir y proteger la Información Personal del Pasajero en cumplimiento con este Aviso de Privacidad.</Text>
                            <Text style={{ textAlign: 'justify', fontWeight: '700' }}> 1.- Procesamiento de la Información Personal</Text>
                            <Text style={{ textAlign: 'justify' }}>YiMi Pasajero es propiedad de YiMi y es operada por dicha compañía. YiMi podrá obtener, revelar utilizar, procesar, almacenar y transmitir la Información Personal del Pasajero y procesará y tratará la Información Personal del Pasajero de conformidad con este Aviso de Privacidad y la Ley.</Text>
                            <Text style={{ textAlign: 'justify', fontWeight: '700' }}> 2.- Recopilación de la Información</Text>
                            <Text style={{ textAlign: 'justify' }}>2.1 YiMi podrá recopilar la Información Personal, incluyendo sin limitación, la siguiente información:</Text>
                            <Text style={{ textAlign: 'justify' }}>2.1.1 Información Personal</Text>
                            <Text style={{ textAlign: 'justify' }}>El Pasajero podrá proporcionar su número de teléfono móvil, nombre, dirección de correo electrónico y toda la Información Personal relevante en YiMi Pasajero. YiMi reconocerá la identidad del Pasajero y prestará al Pasajero los servicios ofrecidos en YiMi Pasajero. YiMi recopila dicha información conforme a las leyes y reglamentos para la seguridad personal y de los bienes del Pasajero. Si el Pasajero no proporciona dicha información, podrá no tener total acceso a los Servicios de YiMi Pasajero.</Text>
                            <Text style={{ textAlign: 'justify' }}>2.1.2 Información que el Pasajero podrá Proporcionar</Text>
                            <Text style={{ textAlign: 'justify' }}>El Pasajero podrá proporcionar, entre otra información, su fotografía, dirección y otra Información Personal a su discreción.</Text>
                            <Text style={{ textAlign: 'justify' }}>2.1.3 Ubicación</Text>
                            <Text style={{ textAlign: 'justify' }}>YiMi recabará la información de ubicación del Pasajero cuando YiMi Pasajero se ejecute en primer plano (aplicación abierta y en pantalla) o en segundo plano (aplicación abierta, pero no en pantalla) en el dispositivo del Pasajero. YiMi obtendrá la ubicación del Pasajero a través de la dirección IP, GPS, y otros sensores que proveen información relevante (como proporcionar información a YiMi sobre dispositivos cercanos, puntos de acceso a Wi-Fi e información de la estación base) para proveer los Servicios de una mejor manera.</Text>
                            <Text style={{ textAlign: 'justify' }}>2.1.4 Viaje</Text>
                            <Text style={{ textAlign: 'justify' }}>YiMi recopilará información sobre el lugar donde inicie el viaje del Pasajero y su destino, su ruta, duración del viaje y kilometraje. YiMi recaba la información antes mencionada con base en los requerimientos de las leyes y reglamentos aplicables, la protección personal y de los bienes del Pasajero, así como la demanda del Pasajero para resolver controversias de conformidad con las reglas de YiMi Pasajero.</Text>
                            <Text style={{ textAlign: 'justify' }}>2.1.5 Información de Llamadas</Text>
                            <Text style={{ textAlign: 'justify' }}>YiMi podrá grabar y recabar el contenido de las llamadas y los mensajes que haga o envíe el Pasajero a través de YiMi Pasajero, incluyendo sin limitación, la duración de la llamada, el número de teléfono móvil de las partes en comunicación. YiMi conserva dicha información a través de la grabación de llamadas, para verificar los hechos y atender las quejas en caso de controversias o accidentes del Pasajero.</Text>
                            <Text style={{ textAlign: 'justify' }}>2.1.6 Estado de Orden y operación</Text>
                            <Text style={{ textAlign: 'justify' }}>YiMi podrá registrar el estado de las órdenes y operaciones del Pasajero. YiMi recaba dicha información conforme las leyes y reglamentos aplicables para la seguridad personal y de los bienes del Pasajero y para contar con pruebas en caso de controversias.</Text>
                            <Text style={{ textAlign: 'justify' }}>2.2 Información de Evaluación</Text>
                            <Text style={{ textAlign: 'justify' }}>El Pasajero podrá evaluar al Conductor Designado de manera anónima en YiMi Pasajero, pero por favor no deje la Información Personal del Pasajero durante dicho proceso, o podrá ser revelada al Conductor Designado.</Text>
                            <Text style={{ textAlign: 'justify' }}>2.3 Datos Financieros</Text>
                            <Text style={{ textAlign: 'justify' }}>YiMi podrá recabar los Datos Financieros del Pasajero para cobrar y distribuir dinero a la cuenta designada del Pasajero, y para cualquier otro efecto relacionado con la prestación de los Servicios.</Text>
                            <Text style={{ textAlign: 'justify' }}>2.4 Servicio al Cliente</Text>
                            <Text style={{ textAlign: 'justify' }}>Cuando el Pasajero contacte al equipo de servicio al cliente, YiMi registrará la información de la llamada del Pasajero, sus comentarios o sugerencias, el nombre y la información de contacto y cualquier otra información proporcionada por el Pasajero mediante la grabación de llamadas y en forma de registro manual, de manera que YiMi pueda manejar las disputas, resolver los problemas o dar retroalimentación al Pasajero. Si el Pasajero se niega a que YiMi recopile dicha información, tal negativa podrá resultar en que nuestro equipo de servicio cliente no podrá ser capaz de solucionar las disputas, pero no afectará el uso de las funciones comerciales centrales de YiMi Pasajero por parte del Pasajero.</Text>
                            <Text style={{ textAlign: 'justify' }}>2.5 Análisis de Datos</Text>
                            <Text style={{ textAlign: 'justify' }}>Para mejorar los servicios de YiMi Pasajero, YiMi recopilará la información de acceso del Pasajero, incluyendo el contenido de búsqueda, dirección IP, información del dispositivo (incluyendo modelo del dispositivo, código de identificación del dispositivo, sistema operativo y operador de telecomunicaciones), ubicación, proporcionando así al Pasajero servicios más personalizados y convenientes. YiMi utilizará un mecanismo de almacenamiento del navegador y la recopilación de datos proporcionados para recabar y recopilar información en el dispositivo del Pasajero.</Text>
                            <Text style={{ textAlign: 'justify' }}>2.6 Servicios de Terceros</Text>
                            <Text style={{ textAlign: 'justify' }}>Durante el curso del uso de servicios de terceros por el Pasajero, YiMi recopilará (incluyendo la información proporcionada por el Pasajero y la información registrada por el sistema) la Información Personal necesaria del Pasajero y la compartirá con el tercero que preste los servicios, de manera que éste pueda proporcionar al Pasajero los servicios apropiados. Si el Pasajero se niega a que se recopile dicha información, puede que no sea capaz de utilizar los servicios de terceros a través de YiMi Pasajero, pero tal negativa no afectará el de las funciones comerciales principales de YiMi Pasajero uso por el Pasajero.</Text>
                            <Text style={{ textAlign: 'justify', fontWeight: '700' }}> 3.- Permisos de Dispositivos</Text>
                            <Text style={{ textAlign: 'justify' }}>3.1 YiMi Pasajero podrá solicitar algunos permisos en el dispositivo del Pasajero. Se considerará que los Pasajeros otorgan permisos de acceso a Internet en el dispositivo cuando accedan a o utilicen YiMi Pasajero.</Text>
                            <Text style={{ textAlign: 'justify' }}>3.2 El Pasajero puede decidir cancelar todos o algunos de los permisos en el dispositivo, para impedir que YiMi recopile la Información Personal correspondiente. En los distintos dispositivos, la forma para otorgar y cancelar permisos puede ser distinta. Póngase en contacto con los desarrolladores del sistema y del dispositivo para obtener información detallada.</Text>
                            <Text style={{ textAlign: 'justify', fontWeight: '700' }}> 4.- Almacenamiento de Información Personal</Text>
                            <Text style={{ textAlign: 'justify' }}>4.1 Periodo de Almacenamiento de la Información Personal</Text>
                            <Text style={{ textAlign: 'justify' }}>4.1.1 YiMi mantendrá la Información Personal del Pasajero continuamente mientras éste utilice los servicios de YiMi Pasajero.</Text>
                            <Text style={{ textAlign: 'justify' }}>4.1.2 El Pasajero podrá cancelar la cuenta en YiMi Pasajero. YiMi conservará la Información Personal del Pasajero para la seguridad personal y de los bienes del Pasajero, salvo que el Pasajero expresamente solicite a YiMi expresamente no hacerlo o en el caso de que que la ley o regulación aplicable establezca lo contrario.</Text>
                            <Text style={{ textAlign: 'justify' }}>4.1.3 Si el Pasajero desea eliminar su Información Personal, podrá contactar al área de servicio al cliente para presentar la solicitud correspondiente. YiMi eliminará su Información Personal de conformidad con lo establecido por las leyes y reglamentos aplicables dentro de un periodo de tiempo razonable, de acuerdo con las prácticas de negocio.</Text>
                            <Text style={{ textAlign: 'justify' }}>4.2 Almacenamiento de Información</Text>
                            <Text style={{ textAlign: 'justify' }}>La Información Personal del Pasajero recabada por YiMi se transmitirá y almacenará en centros de datos en México, los EUA que sean controlados por YiMi y sus filiales o cualquier lugar apropiado y de conformidad con lo establecido por las leyes y reglamentos aplicables.</Text>
                            <Text style={{ textAlign: 'justify', fontWeight: '700' }}> 5.- Uso de la Información Personal</Text>
                            <Text style={{ textAlign: 'justify' }}>5.1 El Pasajero reconoce y acepta que la Información Personal del Pasajero será utilizada para los fines especificados en el apartado “Recopilación de Información Personal”.</Text>
                            <Text style={{ textAlign: 'justify' }}>5.2 El Pasajero reconoce y acepta que la Información Personal del Pasajero puede ser utilizada en los casos que están directa o razonablemente relacionados con los objetivos establecidos en el apartado “Recopilación de Información Personal”:</Text>
                            <Text style={{ textAlign: 'justify' }}>- El Pasajero reconoce y acepta que YiMi podrá analizar Información Personal para brindar al Pasajero un servicio más personalizado y conveniente.</Text>
                            <Text style={{ textAlign: 'justify' }}>- El Pasajero reconoce y acepta que YiMi podrá diseñar, desarrollar y promocionar productos y servicios nuevos basados ​​en las estadísticas de Información Personal del Pasajero.</Text>
                            <Text style={{ textAlign: 'justify' }}>- El Pasajero reconoce y acepta que YiMi podrá analizar la Información Personal del Pasajero y compartir dichas estadísticas con el público o un tercero para el propósito de prestar los Servicios.</Text>
                            <Text style={{ textAlign: 'justify' }}>- El Pasajero reconoce y acepta que YiMi enviará al Pasajero información y avisos por distintos medios, los cuales pueden incluir, entre otros, el código de verificación, las notificaciones necesarias relacionadas con los productos o servicios, noticias sobre los servicios de YiMi Pasajero, así como actividades de mercadotecnia e información promocional especial, e información promocional de un tercero en cooperación con YiMi Pasajero u otro contenido que pueda interesarle al Pasajero. Si el Pasajero no desea continuar recibiendo la información mencionada, puede darse de baja a través de la forma de cancelación de suscripción.</Text>
                            <Text style={{ textAlign: 'justify' }}>5.3  En el supuesto que YiMi utilice la Información Personal del Pasajero más allá del alcance que está directa o razonablemente relacionado con los objetivos establecidos en el presente Aviso de Privacidad, YiMi lo notificará al Pasajero.</Text>
                            <Text style={{ textAlign: 'justify', fontWeight: '700' }}> 6.- Intercambio, transferencia y publicidad de la Información Personal</Text>
                            <Text style={{ textAlign: 'justify' }}>6.1 El Pasajero reconoce y acepta que YiMi mantendrá la confidencialidad de la Información Personal del Pasajero de conformidad con lo establecido en las leyes y reglamentos. YiMi no compartirá la Información Personal del Pasajero con otras personas, excepto en los siguientes casos:</Text>
                            <Text style={{ textAlign: 'justify' }}>6.1.1 El Pasajero reconoce y acepta que YiMi podrá compartir la Información Personal del Pasajero para el propósito de realizar los fines comerciales legítimos de sus afiliadas y subsidiarias.</Text>
                            <Text style={{ textAlign: 'justify' }}>6.1.2 El Pasajero reconoce y acepta que YiMi podrá compartir la Información Personal del Pasajero con terceros para prestar los Servicios a través de YiMi Pasajero al Pasajero. Por ejemplo, YiMi podrá compartir información sobre el Pasajero con el Conductor Designado, podrá incluir el número de teléfono, y la demás Información Personal que requiera YiMi Pasajero.</Text>
                            <Text style={{ textAlign: 'justify' }}>6.1.3 El Pasajero reconoce y acepta que YiMi presta servicios recíprocos a cooperativas externas prestadoras de servicios (en lo sucesivo denominadas como “Cooperativas Externas”). Para mejorar los Servicios, YiMi podrá compartir la Información Personal del Pasajero con sus empresas afiliadas y las Cooperativas Externas.</Text>
                            <Text style={{ textAlign: 'justify' }}>6.1.4 El Pasajero reconoce y acepta que YiMi podrá transmitir la Información Personal del Pasajero a vendedores, prestadores de servicios y otros socios que globalmente apoyan los negocios de YiMi, mediante, por ejemplo, la prestación de servicios de infraestructura técnica, el análisis de cómo se utilizan los servicios de YiMi, la evaluación de la efectividad de los servicios, la prestación de servicios cliente, o facilitando y procesando los pagos. Estos socios tienen estrictas obligaciones de confidencialidad acordes a este Aviso de Privacidad y a los acuerdos que YiMi celebra con ellos.</Text>
                            <Text style={{ textAlign: 'justify' }}>6.1.5 Cuando el Pasajero usa servicios de terceros a través de YiMi Pasajero, el Pasajero reconoce y acepta que YiMi compartirá la Información Personal del Pasajero con el tercero que preste dichos servicios.</Text>
                            <Text style={{ textAlign: 'justify' }}>6.1.6 Con la finalidad de proteger los derechos e intereses legítimos del Pasajero, el Pasajero reconoce y acepta que YiMi podrá proporcionar a los interesados la información necesaria para resolver cualquier controversia relacionada con una operación.</Text>
                            <Text style={{ textAlign: 'justify' }}>6.1.7 El Pasajero reconoce y acepta que YiMi podrá revelar la Información Personal del Pasajero a las autoridades administrativas o judiciales de conformidad con las leyes o reglamentos aplicables.</Text>
                            <Text style={{ textAlign: 'justify' }}>6.1.8 En la medida que lo permitan o requieran las leyes o reglamentos aplicables, el Pasajero reconoce y acepta que se podrá revelar la Información Personal necesaria del Pasajero para proteger el interés público.</Text>
                            <Text style={{ textAlign: 'justify' }}>6.1.9 Otras situaciones que permita el Pasajero.</Text>
                            <Text style={{ textAlign: 'justify' }}>6.2 YiMi no revelará la Información Personal del Pasajero a tercero alguno que no esté contemplado en el presente Aviso de Privacidad, salvo que obtenga el consentimiento del Pasajero. YiMi celebrará un acuerdo de confidencialidad estricto con el tercero con el que comparta la Información Personal del Pasajero, solicitándole tomar las medidas de seguridad y confidencialidad necesarias para procesar la Información Personal del Pasajero.</Text>
                            <Text style={{ textAlign: 'justify' }}>6.3 YiMi mantendrá la Información Personal del Pasajero de manera confidencial de acuerdo con las leyes y reglamentos aplicables. YiMi no revelará públicamente la Información Personal del Pasajero salvo que éste haya previamente otorgado su consentimiento o autorización explícitamente, o de acuerdo con lo que exija la ley.</Text>
                            <Text style={{ textAlign: 'justify' }}>6.4 En el caso de una adquisición, fusión, reestructuración y otros cambios, YiMi exigirá a su sucesor que cumpla con el presente Aviso de Privacidad. Si dicho sucesor necesita cambiar la finalidad de uso de la Información Personal, obtendrá el previo consentimiento explícito del Pasajero.</Text>
                            <Text style={{ textAlign: 'justify', fontWeight: '700' }}> 7.- Uso de Datos Financieros</Text>
                            <Text style={{ textAlign: 'justify' }}>Para efectos de claridad, no obstante, cualquier término y disposición en contrario contenido en este Aviso de Privacidad, YiMi no transmitirá los Datos Financieros del Pasajero a tercero alguno salvo por los proveedores de servicios que lleven a cabo el procesamiento de pagos o cualquier otro servicio financiero aplicable.</Text>
                            <Text style={{ textAlign: 'justify', fontWeight: '700' }}> 8.- Derecho de los Pasajeros</Text>
                            <Text style={{ textAlign: 'justify' }}>8.1.-  Acceso</Text>
                            <Text style={{ textAlign: 'justify' }}>El Pasajero puede acceder a su Información Personal en YiMi Pasajero de las siguientes maneras:</Text>
                            <Text style={{ textAlign: 'justify' }}>- Cuenta</Text>
                            <Text style={{ textAlign: 'justify' }}>El Pasajero puede acceder a su Información Personal y otra información que haya proporcionado a través de su cuenta en YiMi Pasajero.</Text>
                            <Text style={{ textAlign: 'justify' }}>- Viaje</Text>
                            <Text style={{ textAlign: 'justify' }}>El Pasajero podrá acceder al estado del viaje, orden y operación en YiMi Pasajero</Text>
                            <Text style={{ textAlign: 'justify' }}>- Monedero</Text>
                            <Text style={{ textAlign: 'justify' }}>El Pasajero podrá acceder al método de pago, registro de pago y otra información a través de la función de Métodos de pago de YiMi Pasajero.</Text>
                            <Text style={{ textAlign: 'justify' }}>8.2  Rectificación</Text>
                            <Text style={{ textAlign: 'justify' }}>El Pasajero tiene derecho a hacer correcciones y actualizaciones en su Información Personal. El Pasajero podrá corregir o modificar su Información Personal en YiMi Pasajero presentando una solicitud de corrección al equipo de servicio al cliente de YiMi o de las siguientes maneras:</Text>
                            <Text style={{ textAlign: 'justify' }}>- Cuenta</Text>
                            <Text style={{ textAlign: 'justify' }}>El Pasajero podrá corregir o modificar su Información Personal a través de su cuenta en YiMi Pasajero.</Text>
                            <Text style={{ textAlign: 'justify' }}>- Configuración</Text>
                            <Text style={{ textAlign: 'justify' }}>El Pasajero puede corregir o modificar la contraseña y otra información a través de la función de configuración de YiMi Pasajero.</Text>
                            <Text style={{ textAlign: 'justify' }}>- Monedero</Text>
                            <Text style={{ textAlign: 'justify' }}>El Pasajero puede corregir o modificar los Datos Financieros y otra información a través de la función de Métodos de pago y Datos de facturación de YiMi Pasajero.</Text>
                            <Text style={{ textAlign: 'justify' }}>8.3.- Oposición</Text>
                            <Text style={{ textAlign: 'justify' }}>YiMi protegerá el derecho del Pasajero a retirar su consentimiento de las siguientes maneras:</Text>
                            <Text style={{ textAlign: 'justify' }}>- La información comercial enviada por YiMi Pasajero indicará al Pasajero la manera específica para darse de baja, y el Pasajero podrá retirar su consentimiento dándose de baja tal y como se describe en la información comercial.</Text>
                            <Text style={{ textAlign: 'justify' }}>- El Pasajero podrá retirar a YiMi su autorización para acceder a su Información Personal a través de la característica de configuración del dispositivo para cancelar los permisos correspondientes del mismo (incluyendo ubicación, libreta de direcciones, foto, micrófono, cámara, notificación, etc.).</Text>
                            <Text style={{ textAlign: 'justify' }}>- El Pasajero también podrá retirar parte de la autorización cancelando la información de la tarjeta bancaria, eliminando información etc. Cuando el Pasajero retire su consentimiento o autorización, YiMi podrá no continuar prestando al Pasajero los servicios correspondientes a la autorización retirada al Pasajero. Sin embargo, cuando el Pasajero retire su consentimiento o autorización, esto no afectará el procesamiento de la Información Personal con base en el consentimiento que haya otorgado antes de retirarlo.</Text>
                            <Text style={{ textAlign: 'justify' }}>8.4.- Si el Pasajero no puede acceder a, rectificar, cancelar o eliminar su Información Personal y retirar su consentimiento, podrá contactar al equipo de servicio de cliente en línea o vía telefónica a través de la función de “servicio al cliente” de YiMi Pasajero.</Text>
                            <Text style={{ textAlign: 'justify', fontWeight: '700' }}> 9.- Datos Compartidos del Pasajero</Text>
                            <Text style={{ textAlign: 'justify' }}>9.1 El Pasajero puede compartir su ubicación y viaje con otras personas con base en los servicios de YiMi Pasajero.</Text>
                            <Text style={{ textAlign: 'justify' }}>9.2 Cuando el Pasajero comparta su ubicación, viaje o cualquier otra Información Personal con otras personas, con prestadores de servicios externos, o utilice dicha información en conjunto con los servicios de terceros o utilice los enlaces de servicio de terceros, es posible que el Pasajero revele su Información Personal o permita a terceros acceder a la misma.</Text>
                            <Text style={{ textAlign: 'justify' }}>9.3 Recomendamos que el Pasajero lea el aviso de privacidad de dichas redes sociales o prestadores de servicios externos para entender cómo procesan las Información Personal del Pasajero. El Pasajero será responsable de las consecuencias de proporcionar o compartir su Información Personal con dichos terceros u otras personas al utilizar servicios de terceros, y la parte responsable correspondiente asumirá la responsabilidad en la medida permitida por la ley.</Text>
                            <Text style={{ textAlign: 'justify' }}>9.4 Cuando el Pasajero comparta públicamente cualquier información en YiMi Pasajero, cualquier persona podrá ver o acceder a dicha información cuando utilice YiMi Pasajero, tales como las fotos, evaluaciones y otra información que suba el Pasajero a YiMi Pasajero. Como la información que comparta voluntariamente el Pasajero al utilizar nuestros servicios puede implicar la Información Personal del Pasajero u otras personas, el Pasajero debe tener cuidado y asumir su propia responsabilidad.</Text>
                            <Text style={{ textAlign: 'justify', fontWeight: '700' }}> 10.- Cambios</Text>
                            <Text style={{ textAlign: 'justify' }}>10.1 En caso de que ocurra cualquiera de los siguientes cambios en YiMi Pasajero, YiMi hará las modificaciones correspondientes a este Aviso de Privacidad oportunamente:</Text>
                            <Text style={{ textAlign: 'justify' }}>- Cambios de las funciones de negocios de YiMi Pasajero.</Text>
                            <Text style={{ textAlign: 'justify' }}>- Cambios a las reglas de uso de la Información Personal del Pasajero.</Text>
                            <Text style={{ textAlign: 'justify' }}>- Cambios en la información de contacto de YiMi y en sus canales para presentar quejas.</Text>
                            <Text style={{ textAlign: 'justify' }}>- Otros cambios que puedan afectar la seguridad de la Información Personal del Pasajero o los derechos de privacidad del Pasajero.</Text>
                            <Text style={{ textAlign: 'justify' }}>10.2 YiMi no limitará los derechos del Pasajero conforme a este Aviso de Privacidad sin el consentimiento expreso del Pasajero.</Text>
                            <Text style={{ textAlign: 'justify' }}>10.3 Salvo que se especifique lo contrario, el Aviso de Privacidad actualizado entrará en vigor a partir de la fecha de publicación.</Text>
                            <Text style={{ textAlign: 'justify', fontWeight: '700' }}> 11.- Definición y Alcance de la Información Personal</Text>
                            <Text style={{ textAlign: 'justify' }}>11.1.- Datos personales se refiere a toda aquella información que permita identificar la identidad de una persona física, por sí o conjuntamente (en lo sucesivo denominada como “Datos Personales”), en su caso, y en esta Política incluye, entre otra información, el nombre, número de teléfono móvil, fotografía, domicilio postal, ubicación, información de acceso, contenido de búsqueda, información del dispositivo, operador de telecomunicaciones y dirección IP.</Text>
                            <Text style={{ textAlign: 'justify' }}>11.2.- Datos financieros se refiere, sin limitación a información sobre tarjetas de débito o crédito o información sobre cualquier otro método de pago, cuentas bancarias, registros de facturas, registros de pagos, registros de buró de crédito, recibos de pago, información sobre identificación fiscal, registros financieros, registros de ingresos, declaraciones de impuestos y cualquier otra información patrimonial que pueda ser relevante para YiMi para prestar los Servicios (en lo sucesivo denominada como “Datos Financieros” y conjuntamente con los “Datos Personales” se denominarán como “Información Personal”).</Text>
                            <Text style={{ textAlign: 'justify' }}>11.3.- Si el Pasajero no proporciona la Información Personal solicitada, podrá perder el acceso a todo o parte del Servicio.</Text>

                        </ScrollView>
                    </View>
                </View>
                <View style={styles.actionButtons}>
                    <TouchableOpacity
                        onPress={() => this._continuar()}
                    >
                        <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#ec6a2c' }}>CONTINUAR</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Text style={{ fontSize: 18, color: '#a8a8a8', marginBottom: 10 }}>REGRESAR</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => this._aceptar()}
                        style={{ flexDirection: 'row', marginStart: -3, alignItems: 'center'}}
                    >
                        <Image
                            source={this.state.aviso ? require('../../../assets/images/radiobutton_s.png') : require('../../../assets/images/radiobutton_u.png')}
                            style={{ width: 32, height: 32, marginTop: 4 }}
                        />
                        <Text style={{ fontSize: 16, fontWeight: '400', color: '#000' }}>Acepto términos y condiciones</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.indicator}>
                    <View style={[styles.circle, { marginLeft: 20, backgroundColor: '#ec6a2c' }]} />
                    {/* <View style={[styles.circle, { marginLeft: 16, backgroundColor: '#ec6a2c' }]} />
                    <View style={[styles.circle, { marginLeft: 16, backgroundColor: '#cacaca' }]} />
                    <View style={[styles.circle, { marginLeft: 20, backgroundColor: '#cacaca' }]} />
                    <View style={[styles.circle, { marginLeft: 20, backgroundColor: '#cacaca' }]} />
                    <View style={[styles.circle, { marginLeft: 16, backgroundColor: '#cacaca' }]} /> */}

                    <View style={styles.nextButton} >
                        <View style={{ height: 44, width: 44, backgroundColor: '#79f7c7', position: 'absolute', top: -44, right: 0 }}>
                            <View style={{ height: 44, width: 44, backgroundColor: '#fff', borderBottomRightRadius: 22 }} />
                        </View>
                        <View style={{ height: 44, width: 44, backgroundColor: '#79f7c7', position: 'absolute', bottom: -44, right: 0 }}>
                            <View style={{ height: 44, width: 44, backgroundColor: '#fff', borderTopRightRadius: 22 }} />
                        </View>
                        <TouchableNativeFeedback
                            background={TouchableNativeFeedback.Ripple('#fff', true)}
                            onPress={() => this._continuar()}>
                            <View style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'flex-end' }} >
                                <FlechaBlancaIcon fill='#000' />
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>

                {/* <View style={styles.extraButton}>
                    <TouchableOpacity
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                        onPress={() => this._aceptar()}
                    >
                        <CheckBox
                            value={this.state.aviso}
                        />
                        <Text style={{ fontSize: 18, color: '#a8a8a8' }}>Acepto términos y condiciones</Text>
                    </TouchableOpacity>
                </View> */}

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
        marginRight: 33,
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
    extraButton: {
        position: 'absolute',
        bottom: 158,
        marginLeft: 20
    },
    lateral: {
        height: '100%',
        width: 10,
        backgroundColor: '#79f7c7',
        position: 'absolute',
        right: 0
    },
    nextButton: {
        position: 'absolute',
        right: 10,
        backgroundColor: '#79f7c7',
        width: 70,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 22,
        borderBottomLeftRadius: 22
    }
});