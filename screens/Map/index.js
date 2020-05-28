import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';

import Loading from '../../components/Loading';

import { styles } from './styles';

import { apiKeyGoogleMapsEmbed } from '../../secret';

export default function MapScreen() {
    const [ position, setPosition ] = useState({ lat: null, long: null });
    const [ geolocationAvailable, setGeolocationAvailable ] = useState(false);
    const [ gpsOn, setGpsOn ] = useState(false);
    const [ routeLink, setRouteLink ] = useState('https://maps.google.com/maps?ll=-22.832806,-42.143218&z=16&t=m&hl=pt-BR&gl=BR&mapclient=embed&daddr=Metodista%20Contagiante%20R.%20Francisco%20de%20Souza%20Beltr%C3%A3o%2C%20318%20-%20Balneario%20das%20Conchas%20S%C3%A3o%20Pedro%20da%20Aldeia%20-%20RJ%2028949-374@-22.8328057,-42.143218');
    const [ googleMapsUrl, setGoogleMapsUrl ] = useState();
    const googleMapsNoGpsUrl = `<iframe width="100%" height="100%" frameborder="0" style="border:0"
src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJE31N2hAOlwARCOXjardunf4&key=${apiKeyGoogleMapsEmbed}" allowfullscreen></iframe>`;

    useEffect(() => {
        async function getLocation() {
            const { status, mocked } = await Location.requestPermissionsAsync();
            if (status === 'granted' && !mocked) {
                setGpsOn(true);
                try {
                    const location = await Location.getCurrentPositionAsync({});
                    const { latitude, longitude } = location.coords;
                    setPosition({ lat: latitude, long: longitude });
                } catch (err) {
                    console.log(err);
                    setGpsOn(false);
                }
            } else {
                setGeolocationAvailable(false);
            }
        }
        getLocation();
    }, [])

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
            setGoogleMapsUrl(`<iframe width="100%" height="100%" frameborder="0" style="border:0"
src="https://www.google.com/maps/embed/v1/directions?zoom=15&center=${position.lat},${position.long}&origin=${position.lat},${position.long}&destination=Metodista+Contagiante+-+Rua+Francisco+de+Souza+Beltrão+-+Balneario+das+Conchas,+São+Pedro+da+Aldeia+-+RJ,+Brasil&key=${apiKeyGoogleMapsEmbed}" allowfullscreen></iframe>`)
            setGeolocationAvailable(true);
        }
    }, [ position ])

    if (!position.lat && gpsOn) return (<Loading message="aguardando localização" />)
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Como Chegar</Text>
            <Text style={styles.subTitle}>Metodista Contagiante</Text>
            <View style={styles.map}>
                {!geolocationAvailable && (<WebView
                    scalesPageToFit={false}
                    source={{
                        html: googleMapsNoGpsUrl
                    }} />)}
                {geolocationAvailable && (<WebView
                    scalesPageToFit={false}
                    source={{
                        html: googleMapsUrl
                    }} />)}
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.button} onPress={() => Linking.openURL(routeLink)}>
                    <Text style={styles.buttonText}>navegar com {Platform.OS === 'ios' && 'Apple Maps'}{Platform.OS === 'android' && 'Google Maps'}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
