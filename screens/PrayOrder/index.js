import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';

import Loading from '../../components/Loading';

import { styles } from './styles';

export default function PrayOrderScreen() {
    const [ loading, setLoading ] = useState(true);

    return (
        <SafeAreaView style={styles.container}>
            {loading && <Loading message="carregando" />}
            <WebView
                style={styles.form}
                onLoadEnd={() => setLoading(false)}

                source={{
                    uri: 'https://docs.google.com/forms/d/e/1FAIpQLSdqqOY-pPNUE68Yy20ubvC3BZvtjHJbQuD4RMU_DsK5RqDn-A/viewform?usp=sf_link'
                }} />
        </SafeAreaView>
    )
} 