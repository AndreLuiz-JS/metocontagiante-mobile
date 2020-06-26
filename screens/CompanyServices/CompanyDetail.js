import React, { useState } from 'react';
import { SafeAreaView, View, Text, FlatList, Linking } from 'react-native';

import { styles } from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function CompanyDetailScreen({ route }) {
    const services = route.params;
    const [ renderAgain, setRenderAgain ] = useState(false);
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.title}>{services[ 0 ].type}</Text>
                <Text style={styles.subTitle}>Metodista Contagiante</Text>
            </View>
            <View style={{ flex: 1, marginTop: 10 }}>
                <FlatList
                    data={services}
                    renderItem={({ item }) =>
                        (
                            <View style={styles.serviceDetailContainer}>
                                <TouchableOpacity onPress={() => {
                                    item.hidden = !item.hidden;
                                    setRenderAgain(!renderAgain);
                                }}>
                                    <Text style={styles.serviceName}>{item.name}</Text>
                                </TouchableOpacity>
                                <View style={styles.serviceContent}>
                                    <View style={[ styles.serviceInfoContainer, item.hidden ? styles.hidden : null ]}>
                                        {item.company && <Text style={styles.serviceDetail}>Empresa: {item.company}</Text>}
                                        {item.whatsapp && (
                                            <TouchableOpacity onPress={() => Linking.openURL(item.whatsapp)}>
                                                <Text style={styles.serviceDetail}>Whatsapp: {item.phone}</Text>
                                            </TouchableOpacity>
                                        )}
                                        {item.mail && (<TouchableOpacity onPress={() => Linking.openURL(`mailto://${item.mail}`)}>
                                            <Text style={styles.serviceDetail}>Email: {item.mail}</Text>
                                        </TouchableOpacity>)}
                                        {item.address && (<TouchableOpacity onPress={() => Linking.openURL(`https://www.google.com/maps/place/${item.address}`)}>
                                            <Text style={styles.serviceDetail}>Endereço: {item.address}</Text>
                                        </TouchableOpacity>)}
                                        {item.info && <Text style={styles.serviceDetailInfo}>{item.info}</Text>}
                                    </View>
                                </View>
                            </View>)
                    }
                    extraData={renderAgain}
                    keyExtractor={(item, index) => (item + (Math.random() * Math.pow(10, index)))} />
            </View>
        </SafeAreaView >
    )



}