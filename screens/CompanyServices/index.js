import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, FlatList } from 'react-native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import colors from '../../constants/Colors';

import { styles } from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import servicesData from '../../json/services.json';

export default function CompanyServicesScreen({ navigation }) {
    const [ services, setServices ] = useState([ '' ]);

    useEffect(() => {
        const allServices = [];
        servicesData.forEach(service => {
            if (!allServices.find(type => type.type === service.type) && service.iconName) {
                const { iconType, iconName, type } = service;
                allServices.push({ type, iconType, iconName });
            }
        })
        allServices.sort();
        setServices(allServices);
    }, [])

    function navigateToDetail(serviceType) {
        if (serviceType) {
            const servicesFiltered = servicesData.filter(service => service.type === serviceType);
            const serializedServices = servicesFiltered.map(service => {
                if (service.phone) {
                    const whatsapp = 'whatsapp://send?phone=+55' + service.phone.replace(/ /g, '').replace(/-/g, '').replace(/\(/g, '').replace(/\)/g, '');
                    return { ...service, whatsapp, hidden: true }
                }
                return service;
            })
            navigation.navigate('CompanyDetail', serializedServices);
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.title}>Empresas e Serviços</Text>
                <Text style={styles.subTitle}>Metodista Contagiante</Text>
            </View>
            <View style={{ flex: 1, marginTop: 10 }}>
                <FlatList
                    data={services}
                    contentContainerStyle={styles.icons}
                    numColumns={2}
                    renderItem={({ item }) =>
                        (
                            <View>
                                <TouchableOpacity style={styles.ico} onPress={() => navigateToDetail(item.type)}>
                                    {item.iconType === 'Feather' && (<Feather name={item.iconName} size={45} color={colors.tintColor} />)}
                                    {item.iconType === 'FontAwesome5' && (<FontAwesome5 name={item.iconName} size={45} color={colors.tintColor} />)}
                                    <Text style={styles.serviceName}>{item.type}</Text>
                                </TouchableOpacity>
                            </View>)
                    }
                    keyExtractor={(item, index) => (item + (Math.random() * Math.pow(10, index)))} />
            </View>
        </SafeAreaView >
    )



}