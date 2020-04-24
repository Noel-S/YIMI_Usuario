import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TouchableNativeFeedback, TextInput, ScrollView, CheckBox, Alert, Image } from 'react-native';
import FlechaBlancaIcon from '../../../components/FlechaBlancaIcon';
import GearButton from '../../../components/GearButton';
import Layout from '../../../constants/Layout';

export default class TermsAndConditionsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            terminos: this.props.navigation.getParam('estado')
        }
    }

    _aceptar() {
        this.setState(prev => ({ terminos: !prev.terminos }));
    }

    _continuar() {
        if (!this.state.terminos) {
            Alert.alert('Mensaje', 'Acepta antes de avanzar.')
        } else {
            this.props.navigation.state.params.onBack(1, this.state.terminos);
            this.props.navigation.goBack();
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.lateral} />
                <View style={styles.content}>
                    <View style={styles.title}>
                        <Text style={{ fontSize: 32, marginBottom: -10 }}>Términos y</Text>
                        <Text style={{ fontSize: 32 }}>condiciones.</Text>
                    </View>
                    <View style={{ position: 'absolute', bottom: 200, top: 160 }}>
                        <ScrollView>
                            <Text style={{ textAlign: 'justify' }}>Se denominará Pasajero al usuario que acceda, navegue o utilice la App YiMi y el sitio web YiMi</Text>
                            <Text style={{ textAlign: 'justify' }}>El usuario que acceda, navegue o utilice YiMi Conductor en lo sucesivo se le denominara como el Conductor</Text>
                            <Text style={{ textAlign: 'justify' }}>El conductor que sea designado al Pasajero a través de YiMi se denominará en lo sucesivo como Conductor designado.</Text>
                            <Text style={{ textAlign: 'justify' }}>Antes de usar la app de YiMi usuario de servicios, favor lea los términos y condiciones con atención.</Text>
                            <Text style={{ textAlign: 'justify' }}>Tenga en cuenta que el Pasajero no podrá acceder, ni tener pleno acceso a los servicios hasta que no haya proporcionado toda la información que sea requerida.</Text>
                            <Text style={{ textAlign: 'justify' }}>Si el usuario de servicios elige y utiliza los servicios, se considerará que el usuario de servicios ha leído y aceptado todos y cada uno de los términos establecidos en este documento y acordado que los presentes términos y condiciones son legalmente vinculantes para el usuario de servicios y la Compañía.</Text>
                            <Text style={{ textAlign: 'justify' }}>El usuario de servicios debe visitar frecuentemente la página web o YiMi usuario de servicios para mantenerse al tanto de términos vigentes</Text>
                            <Text style={{ textAlign: 'justify' }}>Las notificaciones, términos u otros requerimientos expresamente específicos o integrados en la página web y/o YiMi usuario de servicios, formarán parte integral de los presentes términos y condiciones.Al aceptar los términos y condiciones, el usuario de servicios también habrá leído con atención y aceptado dichos términos sustituidos o referidos. Si el usuario de servicios sigue utilizando los servicios de la compañía, se considerará que el usuario de servicios ha aceptado los términos y condiciones actualizados</Text>
                            <Text style={{ textAlign: 'justify', fontWeight: '700' }}> 1.- Registro del pasajero</Text>
                            <Text style={{ textAlign: 'justify' }}>1.1 Para utilizar el servicio en línea de transporte privado, el pasajero debe descargar YiMi Pasajero, instalarla en su dispositivos móvil y completar exitosamente los procesos de registro. Al registrarse, el pasajero deberá asegurarse que toda la información que haya proporcionado sea precisa, completa y válida</Text>
                            <Text style={{ textAlign: 'justify' }}>1.2  El pasajero reconoce y acuerda que una vez que el Pasajero sea usuario registrado de YiMi, la cuenta de servicio del Pasajero en la Compañía se abrirá de forma predeterminada. La cuenta y contraseña predeterminadas deberán ser la cuenta y contraseña de la cuenta YiMi del pasajero.</Text>
                            <Text style={{ textAlign: 'justify' }}>1.3 El Pasajero tendrá plena capacidad de ejercicio de conformidad con el Código Civil Federal. En caso de que el Pasajero es una persona con capacidad de ejercicio limitada, el Pasajero deberá viajar con su tutor, y dicho tutor asumirá cualquier responsabilidad y consecuencia derivada de o relacionada con los presentes términos y condiciones.</Text>
                            <Text style={{ textAlign: 'justify', fontWeight: '700' }}> 2.- Servicios</Text>
                            <Text style={{ textAlign: 'justify' }}>2.1 Los servicios en línea de transporte privado se prestan al Pasajero a través de YiMi  Pasajero. El pasajero podrá elegir y utilizar los servicios a través de YiMi Pasajero, descargada e instalada en el dispositivo móvil del Pasajero. Los servicios permiten al pasajero solicitar y programar servicios de transporte prestados por el Conductor designado, quien no es un empleado, funcionario ni representante de la Compañía</Text>
                            <Text style={{ textAlign: 'justify' }}>2.2 El pasajero reconoce que su capacidad de obtener servicios de transporte y/o logística a través del uso de los servicios no constituye a la Compañía como un proveedor de servicios de transporte, logística o mensajería ni como un operador de transporte.</Text>
                            <Text style={{ textAlign: 'justify' }}>2.3 A menos que la Compañía acuerde lo contrario en un contrato por escrito adicional con el pasajero los servicios están disponibles únicamente para el uso personal y no comercial del pasajero.</Text>
                            <Text style={{ textAlign: 'justify' }}>2.4 Para utilizar los servicios, el pasajero deberá proporcionar a la compañía cierta información personal. El pasajero se obliga a mantener la información personal que requiera YiMi en forma precisa, completa y actualizada. Si no cumple con dicha obligación, se podrá impedir al pasajero acceder a o utilizar los servicios.</Text>
                            <Text style={{ textAlign: 'justify', fontWeight: '700' }}> 3.- Uso de los servicios</Text>
                            <Text style={{ textAlign: 'justify' }}>3.1 Una orden de contratación de servicios de transporte privado en automóvil comenzará cuando el sistema vincule exitosamente una orden tras recibir una solicitud del pasajero.</Text>
                            <Text style={{ textAlign: 'justify' }}>3.2 YiMi hará esfuerzos razonables para prestar los servicios al pasajero sujeto a la disponibilidad de vehículos en el momento y lugar en que el pasajero haga solicitud.</Text>
                            <Text style={{ textAlign: 'justify' }}>3.3 YiMi no será responsable por pérdida o daño alguno cuando un pasajero solicite a un conductor designado transportar únicamente artículos, sin que el pasajero viaje en el vehículo, y dicho conductor acepte la solicitud, ya que YiMi no puede garantizar que dichos artículos no serán dañados por el conductor designado o cualquier tercero cuando los artículos sean transportados. Si el pasajero insiste en encargar al conductor que transporte artículos para el pasajero, el encargo se considerará como una conducta privada entre pasajero y conductor.</Text>
                            <Text style={{ textAlign: 'justify' }}>3.4 El pasajero no viaja con artículos peligrosos, que estén prohibidos o sean considerados inapropiados por alguna ley, norma o reglamento aplicable: de lo contrario, el conductor tendrá derecho a rehusarse a prestar el servicio y el pasajero asumirá cualquier consecuencia y responsabilidad que resulte de transportar de dichos artículos.</Text>
                            <Text style={{ textAlign: 'justify' }}>3.5 El pasajero no incurrirá en conducta incivilizada alguna (incluyendo fumar, beber alcohol, escupir u otras conductas) al utilizar los servicios.</Text>
                            <Text style={{ textAlign: 'justify' }}>3.6 El pasajero no pedirá a los conductores, ni hará que estos lleven a cabo, acto alguno que viole cualquier reglamento de tránsito u otra ley o reglamento aplicable. En el caso de una sanción administrativa, lesión, accidente de tráfico, daños al vehículo u otras pérdidas derivadas de tales actos prohibidos por parte del pasajero, el pasajero indemnizará a la parte que haya sufrido la (s) pérdida (s).</Text>
                            <Text style={{ textAlign: 'justify' }}>3.7 El pasajero no publicará ni revelará información personal de cualquier otro pasajero o conductor obtenida al utilizar los servicios a persona alguna para efecto alguno distinto a disfrutar del servicio, salvo que dicha información haya sido obtenido a través de otro canal legítimo o según se permita conforme a las leyes aplicables.</Text>
                            <Text style={{ textAlign: 'justify' }}>3.8 El pasajero será responsable de todas la actividades que ocurran en su cuenta, y se obliga a mantener la seguridad y confidencialidad del nombre de usuario y contraseña de la cuenta del pasajero en todo momento. Salvo que la Compañía permita lo contrario por escrito, el pasajero únicamente podrá tener una cuenta.</Text>
                            <Text style={{ textAlign: 'justify' }}>3.9 Al utilizar los servicios, el pasajero acepta que la compañía podrá contactarlo vía telefónica o por mensaje de texto en cualquier de los números telefónicos que haya proporcionado o a nombre del pasajero en relación con su cuenta, incluyendo para fines de marketing.</Text>
                            <Text style={{ textAlign: 'justify' }}>3.10 La recopilación y uso de información personal en relación con los servicios se describe en el Aviso de privacidad YiMi.</Text>
                            <Text style={{ textAlign: 'justify' }}>3.11 El pasajero acepta y reconoce que no existe una relación de subordinación o laboral entre el conductor, o cualquier persona o entidad que administre las actividades del conductor, y YiMi o cualquiera  de sus afiliadas derivadas de cualquiera y toda  las actividades realizadas por el Conductor, sujetas a los que se aplican los Términos y Condiciones, mencionadas en las leyes y regulaciones laborales, de seguridad social y fiscales de México aplicables. El pasajero reconoce que cualquier individuo o entidad que administre o esté relacionado con las actividades relacionadas por el conductor no está empleado, ni es propiedad ni está bajo el control de YiMi.</Text>
                            <Text style={{ textAlign: 'justify', fontWeight: '700' }}> 4.- Obligaciones y Garantías</Text>
                            <Text style={{ textAlign: 'justify' }}>4.1 El pasajero garantiza que la información proporcionada a YiMi, será cierta, precisa y completa. En relación con los servicios, YiMi se reserva el derecho de verificar la información del Pasajero.</Text>
                            <Text style={{ textAlign: 'justify' }}>4.2 Al utilizar los Servicios o YiMi pasajero, el pasajero también se obliga a lo siguiente:</Text>
                            <Text style={{ textAlign: 'justify' }}> a. El pasajero utilizará los servicios o descargar YiMi Pasajero para uso personal y no revenderá los mismos a tercero alguno:</Text>
                            <Text style={{ textAlign: 'justify' }}> b. El pasajero no utilizará los servicios ni YiMi Pasajero para fin legítimo alguno, incluyendo sin limitación, transmitir o almacenar materiales ilegales o para fines fraudulentos;</Text>
                            <Text style={{ textAlign: 'justify' }}> c. El pasajero no utilizará lo servicios ni YiMi pasajero para acosar u obstaculizar a otros ni para causarles inconvenientes.</Text>
                            <Text style={{ textAlign: 'justify' }}> d. El pasajero no afectará la operación normal de la red;</Text>
                            <Text style={{ textAlign: 'justify' }}> e. El pasajero no intentará dañar los servicios ni a YiMi Pasajero</Text>
                            <Text style={{ textAlign: 'justify' }}> f. El pasajero proporcionará la documentación a identificar que solicite YiMi razonable:</Text>
                            <Text style={{ textAlign: 'justify' }}> g. El pasajero efectuará todos los pagos por los servicios solicitados; y</Text>
                            <Text style={{ textAlign: 'justify' }}> h. El pasajero cumplirá con todas las leyes aplicables del país/región, provincia y/o ciudad en donde utilice la aplicación o los servicios.</Text>
                            <Text style={{ textAlign: 'justify' }}>4.3 Es obligación del pasajero mantener todo el hardware o software del dispositivo móvil actualizado para que soporte los requerimientos vigentes de YiMi Pasajero. La compañía  no será responsable de problema alguno que puede surgir cuando el pasajero no utilice la versión más reciente y actualizada de YiMi pasajero y/o utilice YiMi pasajero en cualquier dispositivo móvil que no alcance los requerimientos relevantes vigentes de YiMi Pasajero. El pasajero acepta que la compañía podrá actualizar los requerimientos de software y hardware del teléfono móvil de YiMi Pasajero de tiempo en tiempo. </Text>
                            <Text style={{ textAlign: 'justify', fontWeight: '700' }}> 5.- Pago</Text>
                            <Text style={{ textAlign: 'justify' }}>5.1 El pasajero está de acuerdo y acepta los precios correspondientes  por los servicios vigentes a la fecha o conforme se actualicen en YiMi pasajero. El pasajero podrá verificar los precios por los servicios de YiMi pasajero.</Text>
                            <Text style={{ textAlign: 'justify' }}>5.2 Después de utilizar los servicios tras enviar una orden de viaje, el pasajero pagará inmediatamente el cargo total de la orden presentada por YiMi pasajero. Si hay cualquier cargo vencido, la compañía tendrá derecho a negarse a prestar servicios al pasajero. El pasajero entiende y acepta que la Compañía tendrá  derecho a enviar información con respecto al incumplimiento de contrato por parte del Pasajero a una sociedad de información crediticia externa.</Text>
                            <Text style={{ textAlign: 'justify' }}>5.3 El pasajero reconoce que YiMi funge como una agencia de pago respecto a los servicios.</Text>
                            <Text style={{ textAlign: 'justify' }}>5.4 El pasajero podrá pagar en YiMi Pasajero a través de su cuenta de pago electrónico externa y sistemas de pago bancario en línea. El procesamiento de los pagos estará sujeto a los presentes términos y condiciones</Text>
                            <Text style={{ textAlign: 'justify' }}>5.5 El pasajero reconoce y acepta que todos y cada uno de los comprobantes fiscales que el pasajero requiera por los servicios de transportación serán emitidos por el conductor u otro individuo o entidad que administra las actividades del Conductor,  según sea aplicable conforme a las leyes y reglamentos aplicable. El pasajero será responsable por (i) solicitar todos y cada uno de los comprobantes fiscales e (ii) enviar toda la información personal requerida por YiMi pasajero y sitios web relevantes a partir de la fecha en que los medios para solicitar los comprobantes fiscales y para enviar dicha información están disponibles en YiMi pasajero o en el sitio web relevante de YiMi, o cualquier otro medio que YiMi considere adecuado para tal propósito. Aunque YiMi podrá facilitarles a los conductores la emisión de comprobantes, YiMi no será responsable por la emisión de cualquier comprobante requerido por los pasajeros por los servicios de transportación prestados, toda vez que YiMi no presta dicho servicio, ni será responsable de cualquier error o falla en la entrega de los comprobantes fiscales correspondientes. De ninguna manera YiMi será responsable por cualquier error, incoherencia o mal funcionamiento de YiMi pasajero o sitios web relevantes que puedan afectar la emisión de comprobantes fiscales. El pasajero reconoce que es responsabilidad exclusiva del Conductor o de la persona o entidad  que presta el servicio de transporte, quien corresponda, entregar debidamente los comprobantes fiscales al pasajero.</Text>
                            <Text style={{ textAlign: 'justify' }}>5.6 El conductor reconoce y acepta que YiMi podrá facilitar la emisión de los comprobantes fiscales que el conductor u otro individuo o entidad que administra las actividades del conducto están obligados a emitir de conformidad con la leyes y reglamentos aplicables. El pasajero reconoce que dicha facilidad podrá consistir en la emisión de dichos comprobantes fiscales por parte de YiMi, o cualquier tercero designado por YiMi para tales efectos, a nombre y por cuenta del Conductor, en los términos de la regla 2.7.1.3 de la Resolución Miscelánea Fiscal para 2018 (o cualquier disposición que la sustituya), o mediante cualquier otro mecanismo que YiMi considere. El pasajero reconoce que ni YiMi ni cualquier tercero designado por YiMi para dicho propósito serán responsables por la emisión de los comprobantes fiscales derivados de la aplicación de dicha regla 2.7.1.3, requeridos por los pasajeros por los servicios de transportación. Ni YiMi ni cualquier tercero designado por YiMi para tales efectos no serán responsables por cualquier error o falla en la emisión de los comprobantes aplicables.</Text>
                            <Text style={{ textAlign: 'justify' }}>5.7 El pasajero podrá gestionar sus viajes. El pasajero podrá verificar el estado de su orden de YiMi pasajero.</Text>
                            <Text style={{ textAlign: 'justify' }}>5.8 El pasajero verificará el monto que efectivamente pagará por la orden inmediatamente después de completar cada orden. Si el pasajero tiene cualquier objeción en cuanto al monto del pago, contactará a YiMi.</Text>
                            <Text style={{ textAlign: 'justify' }}>5.9 Los servicios de telecomunicaciones y los cobros relacionados con estos, en los que se incurra por el uso de YiMi pasajero, son prestados por los operadores de telecomunicaciones y no por YiMi.</Text>
                            <Text style={{ textAlign: 'justify', fontWeight: '700' }}> 6.- Indemnización</Text>
                            <Text style={{ textAlign: 'justify' }}>6.1 Al utilizar los servicios de YiMi pasajero, el pasajero se obliga a indemnizar a YiMi por todas y cada una de las reclamaciones, costos, compensación, pérdidas, deudas y gastos, incluyendo sin limitación, honorarios de abogados y gastos y costos judiciales, derivadas de o relacionadas con lo siguiente (en lo sucesivo denominadas como un 'Acto ilícito'):</Text>
                            <Text style={{ textAlign: 'justify' }}> a. El pasajero incumple o viola cualquier término de los presentes términos y condiciones o cualquier ley o reglamento aplicable (ya sea o no que se menciona en este instrumento):</Text>
                            <Text style={{ textAlign: 'justify' }}> b. El pasajero infringe cualquier derecho de cualquier tercero;</Text>
                            <Text style={{ textAlign: 'justify' }}> c. El pasajero abusa de YiMi pasajero o los servicios;</Text>
                            <Text style={{ textAlign: 'justify' }}> d. El pasajero causa daños al vehículo o su equipo interno debido a negligencia grave o dolo.</Text>
                            <Text style={{ textAlign: 'justify', fontWeight: '700' }}> 7.- Restricciones Regulatorias Locales</Text>
                            <Text style={{ textAlign: 'justify' }}>YiMi pasajero no está dirigido a persona alguna en cualquier jurisdicción en la que (debido a la nacionalidad, residencia u otro motivo) el acceso a o disponibilidad a YiMi pasajero esté prohibido o estaría sujeto a cualquier restricción, incluyendo requerimientos de registro u otros requerimientos dentro de dicha jurisdicción. YiMi se reserva el derecho de limitar el acceso a YiMi pasajero a cualquiera de estas personas. Las personas que accedan a YiMi pasajero lo hacen por iniciativa propia y serán responsables de cumplir con las leyes y reglamentos locales aplicables. YiMi no será responsable frente a ningún usuario por pérdida o daño alguno, ya sea conforme a una disposición contractual, por responsabilidad civil (incluyendo negligencia), incumplimiento de una deber conforme a la ley o por otro motivo, aun cuando sea previsible, derivado de o relacionado con el uso por una persona en una jurisdicción donde el acceso a la disponibilidad de YiMi pasajero esté prohibido o sujeto cualquier restricción En caso de duda, el pasajero deberá obtener asesoría legal independiente.</Text>
                            <Text style={{ textAlign: 'justify', fontWeight: '700' }}> 8.- Ausencia de Garantías.</Text>
                            <Text style={{ textAlign: 'justify' }}>8.1 YiMi pasajero se ofrece 'en el estado en que se encuentra'. Ninguna garantía es dada ni expresa ni implícita, con respecto a todo el contenido de YiMi pasajero y en el material publicado en la aplicación, incluyendo sin limitación, el contenido.</Text>
                            <Text style={{ textAlign: 'justify' }}>8.2 Salvo por lo expresamente establecido en los presentes Términos y condiciones, todas las garantías, condiciones y declaraciones, expresas o implícitas por ley o de otra manera establecidas por YiMi (incluyendo, sin limitación, garantías en cuanto a calidad satisfactoria, idoneidad para un fin o pericia y cuidado) quedan excluidas por esta disposición cuando la ley lo permita.</Text>
                            <Text style={{ textAlign: 'justify', fontWeight: '700' }}> 9.- Limitación de la Responsabilidad YiMi</Text>
                            <Text style={{ textAlign: 'justify' }}>9.1 La información proporcionada y los servicios recomendados al pasajero en los sitios web de YiMi o YiMi pasajero. YiMi hará esfuerzos razonables para garantizar la precisión de dicha información, en el entendido de que YiMi no garantiza que dicha información esté libre de cualquier error, defecto, software malicioso o virus.</Text>
                            <Text style={{ textAlign: 'justify' }}>9.2 YiMi no será responsable por daño alguno que resulte del uso del (o cualquier imposibilidad de usar el) sitio web de YiMi o YiMi pasajero. Asimismo, YiMi no será responsable por daño alguno que resulte del uso de (o cualquier imposibilidad de usar) las herramientas de comunicación electrónica de los sitios web de YiMi o YiMi pasajero, incluyendo, sin limitación, daños causado por fallas de transmisión, mal funcionamiento de internet o retraso en las comunicaciones electrónica, interceptación o manipulación de comunicaciones electrónicas por un tercero o programas de cómputo utilizados para la comunicación electrónica y transmisión del virus, falta de energía, huelgas u otras disputas laborales, disturbios, insurrecciones revueltas; terremotos, incendios, inundación, tormentas, explosiones, guerras; actos del gobierno, órdenes de autoridades judiciales o administrativas o cualquier otra causa de fuerza mayor u omisión de terceros.</Text>
                            <Text style={{ textAlign: 'justify' }}>9.3 YiMi no será responsable por cualquier daño indirecto, emergente, especial, ejemplar, punitivo o incidental, incluyendo pérdida de utilidades, pérdida de información, lesiones o daños materiales relacionados con o que de otra manera resulten de cualquier uso de los servicios, independientemente de la negligencia (que sea activa, afirmativa, única o concurrente) de YiMi, aún si YiMi ha sido advertida de la posibilidad de tales daños.</Text>
                            <Text style={{ textAlign: 'justify' }}>9.4 YiMi no asume responsabilidad alguna con respecto a la precisión, integridad suficiencia y confiabilidad de la información y contenido incluido en YiMi pasajero o en los sitios web de YiMi, incluyendo sin limitación textos, imágenes, datos, opiniones, página web o enlaces, a pesar de sus esfuerzos de proporcionar información precisa y exhaustiva en la medida posible. YiMi se deslinda de cualquier responsabilidad por cualquier error u omisión y no otorga garantía expresa o implícita alguna.</Text>
                            <Text style={{ textAlign: 'justify' }}>9.5 El pasajero entiende y reconoce que cuando solicita servicios de transporte en automóvil en línea en YiMi pasajero, la compañía procesa una gran cantidad de información en el servidor interno con base en dicha solicitud y proporciona información sobre los vehículos disponibles al dispositivo móvil del pasajero, después de lo cual el conductor exitosamente vinculado provee servicios de transporte fuera de línea al pasajero.</Text>
                            <Text style={{ textAlign: 'justify', fontWeight: '700' }}> 10. Autorización y licencia</Text>
                            <Text style={{ textAlign: 'justify' }}>10.1 Sujeto al cumplimiento por parte del pasajero con los presentes términos y condiciones, YiMi otorga al pasajero una licencia limitada, no exclusiva y no transferible para descargar e instalar una copia de las aplicaciones en un solo dispositivo móvil que el pasajero posea o controle para utilizar dicha copia de las aplicaciones únicamente para el uso personal del propio pasajero.</Text>
                            <Text style={{ textAlign: 'justify' }}>10.2 El pasajero no podrá: (1) otorgar licencias o sublicencias, vender, revender, transmitir, ceder, distribuir o de otra manera explotar comercialmente o poner a disposición de terceros los servicios o aplicaciones en forma alguna; (2) modificar o crear obras derivadas basadas en los servicios o las aplicaciones; (3) crear 'enlaces' de internet a los servicios, o 'enmarcar' o 'reproducir' cualquier aplicación en cualquier otro servidor o dispositivo inalámbrico o basado en el internet; (4) llevar a cabo ingeniería de reversa o acceder a las aplicaciones con el fin de diseñar o crear un producto  utilizando ideas o gráficos similares a los servicios o las aplicaciones, o copias cualesquier ideas, características, funciones o gráficos de los servicios o aplicaciones; o (5) lanzar un programa o script automatizado, o cualquier programa que pueda hacer múltiples solicitudes a servidores por segundo, o que dificulte u obstaculice indebidamente la operación y/o desempeño de los servicios o las aplicaciones.</Text>
                            <Text style={{ textAlign: 'justify' }}>10.3 Asimismo, el pasajero no deberá; (1) enviar spam, o mensajes duplicados o no solicitados en violación de las leyes aplicables; (2) enviar o almacenar material violatorio, obsceno, amenazante, difamatorio o que de otra manera sea ilegal o ilícito, incluyendo material que infrinja los derechos de privacidad de terceros; (3) enviar o almacenar material que contenga virus de software, gusanos, caballos troyanos u otro código informático, archivos, scripts, agentes o programas perjudiciales; (4) interferir con o afectar la integridad o el funcionamiento de los sitios web de YiMi, sus aplicaciones o los servicios o los datos contenidos en los mismo; ni (5) intentar obtener acceso no autorizado al sitios web de YiMi, sus aplicaciones, los servicios o sistemas o redes relacionado.</Text>
                            <Text style={{ textAlign: 'justify' }}>10.4 YiMi tendrá derecho a investigar y promover un juicio por cualquiera de los incumplimientos antes mencionados en la mayor medida permitida por la ley. YiMi podrá participar en asistir a las autoridades encargadas del orden público en las demandas en contra de cualquier pasajero que haya incumplido los presentes términos y condiciones. Si YiMi determina que cualquier contenido infringe los presentes términos y condiciones o de otra manera perjudica a los sitios web de YiMi, YiMi pasajero y/o los servicios o aplicaciones relacionadas, YiMi se reserva el derecho de eliminar o prohibir el acceso a dicho contenido en cualquier momento sin previa notificación.</Text>
                            <Text style={{ textAlign: 'justify', fontWeight: '700' }}> 11.- Política de propiedad intelectual</Text>
                            <Text style={{ textAlign: 'justify' }}>11.1 YiMi y sus filiales son titulares de los derechos de propiedad intelectual de todo el contenido distribuido en YiMi pasajero, incluyendo, sin limitación, el software proporcionado y los productos o servicios relacionado, y tales derechos de propiedad intelectual están protegidos por las leyes. La falta de una declaración de titularidad en cierto contenido no implica que YiMi no tenga la titularidad del mismo o no pueda hacer valer sus derechos sobre el mismo y el pasajero respetara los legítimos derechos o intereses del titular y utilizará dicho contenido legalmente de conformidad con las leyes y reglamentos aplicables y el principio de buena fe.</Text>
                            <Text style={{ textAlign: 'justify' }}>11.2 Sin el consentimiento por escrito de YiMi, ninguna persona física o moral utilizará, copiará, modificará, hará extractos de, incluirá con otros productos para su uso o venta, circulará ni transmitirá vía un hipervínculo, almacenará en un sistema de recuperación de información ni utilizará para ningún otro fin comercial cualquier parte del software, de los productos o servicios, de la información o las palabras antes mencionadas en forma alguna bajo ninguna circunstancia, excepto para la descarga o impresión para uso personal no comercial, en el entendido de que no se realizará modificación alguna a lo anterior, y que la declaración de derechos de autor u otra titularidad contenida en los mismos se conservará.</Text>
                            <Text style={{ textAlign: 'justify' }}>11.3 Las marcas registradas y logotipos (en los sucesivo conjuntamente denominadas como 'marcas comerciales') utilizadas y mostradas en dicho software constituirán las marcas comerciales, registradas o no registradas, de YiMi y sus filiales en la industria de contratación de servicios de transporte terrestre y otros campos relacionados, mismas que están protegidas por las leyes. Ninguna persona utilizará contenido alguno de dicho software, 'YiMi',  y nombre similares, así como las marcas comerciales en forma alguna sin el consentimiento por escrito de YiMi.</Text>
                            <Text style={{ textAlign: 'justify' }}>11.4 Si el pasajero imprime, copia, descarga, modifica o vincula cualquier parte del contenido disponible a través de las páginas web o las aplicaciones, en incumplimiento de los presentes terminos y condiciones, el derecho del pasajero de utilizar los sitios web de la compañía y las aplicaciones podrán suspenderse inmediatamente y el pasajero deberá, a discreción de la compañía, devolver o destruir cualesquiera copias (electrónicas o en otro formato) de los materiales que haya utilizado.</Text>
                            <Text style={{ textAlign: 'justify', fontWeight: '700' }}> 12.- Servicios y Enlaces de Terceros</Text>
                            <Text style={{ textAlign: 'justify' }}>12.1 Durantes el uso  de las páginas web y aplicaciones relevantes, YiMi podrá, de tiempo en tiempo, proporcionar al pasajero enlaces a sitios web o acceso a otros servicios propiedad de y controlados por terceros, para facilitar la comunicación del pasajero con, la compra de productos o servicios a o para participar en actividades promocionales ofertadas por dichos terceros. Al hacer clic en dichos enlaces o acceder a otros servicios, al pasajero abandonará el sitio web de YiMi o YiMi pasajero y visitará sitios web o de servicios alojados por dichos terceros han elaborado sus propios términos, condiciones y políticas de privacidad. Por lo tanto, YiMi no será responsable del contenido y las actividades de dichas páginas web y YiMi no asumirá obligación alguna al respecto. El pasajero entenderá plenamente el contenido y las actividades de dichos sitios web y asumirá plenamente la responsabilidad legal y los riesgos derivados de la navegación o acceso a dichos sitios web por parte del pasajero.</Text>
                            <Text style={{ textAlign: 'justify', fontWeight: '700' }}> 13.- Término</Text>
                            <Text style={{ textAlign: 'justify' }}>13.1 Los presentes términos y condiciones entre el pasajero y YiMi no tendrán un término de vigencia establecido.</Text>
                            <Text style={{ textAlign: 'justify' }}>13.2 La compañía determinará a su entera discreción, si ha ocurrido un acto ilícito. Si el pasajero comete cualquier acto ilícito, la compañía podrá, a su entera discreción, tomar las medidas que considere convenientes, incluyendo sin limitación, dar por terminados los presentes términos y condiciones con el pasajero y dejar de prestar servicios al pasajero, según requiera el caso. Un acto ilícito podrá resultar en las siguientes medidas:</Text>
                            <Text style={{ textAlign: 'justify' }}> a. La compañía tendrá derecho a cobrar a la parte responsable cualquier cantidad que supere el monto de indemnización que corresponda conforme a la ley, así como a tomar medidas en contra de las partes incumplidas o infractoras.</Text>
                            <Text style={{ textAlign: 'justify' }}> b. El pasajero tendrá derecho a dar por terminados los convenidos en cualquier momento cancelando la cuenta de usuario del pasajero en cualquier momento de conformidad con las instrucciones publicadas en el sitio web YiMi. Después de dicha cancelación, el pasajero no podrá utilizar YiMi pasajero ni los servicios correspondientes hasta que el pasajero se registre nuevamente y vuelva a instalar YiMi pasajero exitosamente.</Text>
                            <Text style={{ textAlign: 'justify' }}>13.3 Aunque YiMi de por terminados los presentes términos y condiciones, el pasajero cumplirá con sus obligaciones de pago y será responsable por cualquier daño o perjuicio que pueda derivar de dicho incumplimiento.</Text>
                            <Text style={{ textAlign: 'justify' }}>13.4 YiMi no estará obligada a notificar la terminación de los presentes términos  y condiciones</Text>
                            <Text style={{ textAlign: 'justify', fontWeight: '700' }}> 14.- Fuerza Mayor</Text>
                            <Text style={{ textAlign: 'justify' }}>En caso de que se presente una fuerza mayor, la parte afectada podrá suspender temporalmente el cumplimiento de sus obligaciones conforme a presente instrumento hasta que el afectado de dicha causa mayor cese, y no incurrirá en incumplimiento de contrato; en el entendido, no obstante que dicha parte hará su mejor esfuerzo para resolver dicha causa y mitigar las pérdidas. Fuerza mayor significa cualquier causa impredecible e inevitable (aún cuando sea predecible) fuera de control de las parte que impida, afecte o demore el cumplimiento por una parte de todas o cualquiera de sus obligaciones conforme al presente instrumento. Dichas causas incluyen, sin limitación, terremotos, guerra, modificación del gobierno, de las leyes reglamento y políticas gubernamentales, virus de cómputo, ataques de hackers o suspensión de servicios prestados por empresas de telecomunicación.</Text>
                            <Text style={{ textAlign: 'justify', fontWeight: '700' }}> 15.- Disposiciones Generales</Text>
                            <Text style={{ textAlign: 'justify' }}>15.1 Si se declara la nulidad de ciertos términos de los presentes Términos y Condiciones, pero los demás términos pueden seguir siendo válidos y su exigibilidad no se ve afectada, YiMi determinará si continuará cumpliendo o no con tales términos.</Text>
                            <Text style={{ textAlign: 'justify' }}>15.2 YiMi podrá entregar una notificación publicando una notificación general en su sitio web y/o en YiMi Pasajero o enviando un correo electrónico o mensaje de texto a la dirección de correo electrónico o número de teléfono móvil registrado en la información de la cuenta del pasajero . Las notificaciones, que podrán publicarse de tiempo en tiempo, constituirán parte de los presentes Términos y Condiciones.</Text>
                            <Text style={{ textAlign: 'justify' }}>15.3 El Pasajero no cederá ninguno de los derechos conforme a los presentes Términos y Condiciones sin el previo consentimiento por escrito de YiMi.</Text>
                            <Text style={{ textAlign: 'justify', fontWeight: '700' }}> 16.- Otros Términos Aplicables</Text>
                            <Text style={{ textAlign: 'justify' }}>Los presentes Términos y Condiciones hacen referencia a los siguientes términos adicionales, los cuales también serán aplicables al uso de los sitios web, contenido, productos, servicios y aplicaciones de la Compañía por el Pasajero, mismos que, al utilizarlos, el Pasajero se obliga a cumplir:</Text>
                            <Text style={{ textAlign: 'justify' }}> i.-  Aviso de Privacidad de YiMi Pasajero establece los términos conforme a los cuales los datos personales y otra información recopiladas o proporcionada por el Pasajero deberá ser tratada.</Text>
                            <Text style={{ textAlign: 'justify', fontWeight: '700' }}> 17.- Ley Aplicable</Text>
                            <Text style={{ textAlign: 'justify' }}>Los presentes Términos y Condiciones se regirán por las leyes aplicables en México. Cualquier conflicto, reclamación o controversia derivada de o relacionada con el incumplimiento, terminación, cumplimiento, interpretación o validez de los presentes Términos y Condiciones o el uso de nuestro sitio web o YiMi Pasajero, se someterá a la jurisdicción de un tribunal competente de la Ciudad de México, México y las partes en este acto expresa e irrevocablemente renuncian a cualquier otra jurisdicción que pueda corresponderles en virtud de sus domicilios respectivos, presentes o futuros.</Text>
                            <Text style={{ textAlign: 'justify', fontWeight: '700' }}> 18.- Subsistencia</Text>
                            <Text style={{ textAlign: 'justify' }}>Aun cuando los presentes Términos y Condiciones se den por terminados o anulen, las disposiciones relacionadas con la responsabilidad por incumplimiento, propiedad industrial, obligación de confidencialidad del Pasajero, ley aplicable y jurisdicción subsistirán.</Text>
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
                            source={this.state.terminos ? require('../../../assets/images/radiobutton_s.png') : require('../../../assets/images/radiobutton_u.png')}
                            style={{ width: 32, height: 32, marginTop: 4 }}
                        />
                        <Text style={{ fontSize: 16, fontWeight: '400', color: '#000' }}>Acepto términos y condiciones</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.indicator}>
                    <View style={[styles.circle, { marginLeft: 20, backgroundColor: '#ec6a2c' }]} />

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
                    {/* <View style={{ position: 'absolute', right: 25, backgroundColor: '#79f7c7', width: 45, height: 45, justifyContent: 'center', alignItems: 'center' }} >
                        <TouchableNativeFeedback
                            background={TouchableNativeFeedback.Ripple('#000', true)}
                            onPress={() => this._continuar()}>
                            <View style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }} >
                                <FlechaBlancaIcon fill='#000' />
                            </View>
                        </TouchableNativeFeedback>
                    </View> */}
                </View>

                {/* <View style={styles.extraButton}>
                <TouchableOpacity
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                        onPress={() => this._aceptar()}
                    >
                        <CheckBox
                                value={this.state.terminos}
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
        bottom: 90,
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