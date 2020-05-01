import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Linking } from 'react-native';
import { WebView } from 'react-native-webview';

import Loading from '../../components/Loading';

import { styles } from './styles';

import { apiKeyGoogleMapsEmbed } from '../../secret';

export default function Map() {
    const [ position, setPosition ] = useState({ lat: null, long: null });
    const [ geolocationAvailable, setGeolocationAvailable ] = useState(null);
    const [ googleMapsUrl, setGoogleMapsUrl ] = useState(`<iframe width="100%" height="100%" frameborder="0" style="border:0"
src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJE31N2hAOlwARCOXjardunf4&key=${apiKeyGoogleMapsEmbed}" allowfullscreen></iframe>`);
    const [ routeLink, setRouteLink ] = useState('https://maps.google.com/maps?ll=-22.832806,-42.143218&z=16&t=m&hl=pt-BR&gl=BR&mapclient=embed&daddr=Metodista%20Contagiante%20R.%20Francisco%20de%20Souza%20Beltr%C3%A3o%2C%20318%20-%20Balneario%20das%20Conchas%20S%C3%A3o%20Pedro%20da%20Aldeia%20-%20RJ%2028949-374@-22.8328057,-42.143218');

    useEffect(() => {
        if (position.lat !== undefined
            && position.lat !== null
            && position.long !== undefined
            && position.long !== null) {
            if (Platform.OS === 'ios') {
                setRouteLink(`http://maps.apple.com/?saddr=${position.lat},${position.long}&daddr=Metodista%20Contagiante%20R.%20Francisco%20de%20Souza%20Beltr%C3%A3o%2C%20318%20-%20Balneario%20das%20Conchas%20S%C3%A3o%20Pedro%20da%20Aldeia%20-%20RJ%2028949-374@-22.8328057,-42.143218`);
            }
            if (Platform.OS === 'android') {
                setRouteLink(`https://www.google.com/maps/dir/?api=1&origin=${position.lat},${position.long}&destination=Metodista%20Contagiante%20R.%20Francisco%20de%20Souza%20Beltr%C3%A3o%2C%20318%20-%20Balneario%20das%20Conchas%20S%C3%A3o%20Pedro%20da%20Aldeia%20-%20RJ%2028949-374@-22.8328057,-42.143218&travelmode=driving`);
            }
        }
        if (position.lat === null || position.long === null) {
            navigator.geolocation.watchPosition((pos) => {
                const lat = pos.coords.latitude;
                const long = pos.coords.longitude;
                setPosition({ lat, long });
                setGoogleMapsUrl(`<iframe width="100%" height="100%" frameborder="0" style="border:0"
src="https://www.google.com/maps/embed/v1/directions?zoom=15&center=${lat},${long}&origin=${lat},${long}&destination=Metodista+Contagiante+-+Rua+Francisco+de+Souza+Beltrão+-+Balneario+das+Conchas,+São+Pedro+da+Aldeia+-+RJ,+Brasil&key=${apiKeyGoogleMapsEmbed}" allowfullscreen></iframe>`)
            }, (err) => {
                setGeolocationAvailable(false);
                if (err.code === 'E_LOCATION_UNAUTHORIZED') alert('Permissão para utilizar gps negada.\n\nPara exibir a rota completa você deve permitir o acesso a localização.');
            }, { enableHighAccuracy: true, maximumAge: 30000, timeout: 60000 });
        }
    }, [ position ])

    if (!position.lat && geolocationAvailable === null) return (<Loading message="aguardando localização" />)
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => Linking.openURL(routeLink)}>
                    <Text style={styles.title}>Abrir {Platform.OS === 'ios' && 'Apple Maps'}{Platform.OS === 'android' && 'Google Maps'}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.map}>
                <WebView
                    scalesPageToFit={false}
                    source={{
                        html: googleMapsUrl
                    }} />
            </View>
        </SafeAreaView>
    )
}
