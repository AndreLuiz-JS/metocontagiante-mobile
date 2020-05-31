import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View, Vibration, AsyncStorage } from 'react-native';
import { SplashScreen, Notifications, Linking } from 'expo';
import * as Permissions from 'expo-permissions';
import * as Font from 'expo-font';
import Constants from 'expo-constants';
import { Ionicons, Feather, FontAwesome5 } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import useLinking from './navigation/useLinking';
import api from './services/api';

import HomeScreen from './screens/Home';
import BibleScreen from './screens/Bible';
import BibleScreenChangeBook from './screens/Bible/ChangeBook';
import BibleScreenChangeChapter from './screens/Bible/ChangeChapter';
import DevotionalScreen from './screens/Devotional';
import PodcastScreen from './screens/Podcast';
import MapScreen from './screens/Map';
import PrayOrderScreen from './screens/PrayOrder';
import ScheduleScreen from './screens/Schedule';
import PhotoScreen from './screens/Photo';
import PhotoDetailScreen from './screens/Photo/Detail';
import SocialMediaScreen from './screens/SocialMedia';
import CellScreen from './screens/Cell';
import ShepherdsScreen from './screens/Shepherds';
import AboutUsScreen from './screens/AboutUs';

import colors from './constants/Colors';

const Stack = createStackNavigator();

export default function App(props) {
  const [ isLoadingComplete, setLoadingComplete ] = React.useState(false);
  const [ initialNavigationState, setInitialNavigationState ] = React.useState();
  const [ notificationState, setNotificationState ] = React.useState({});
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          ...Feather.font,
          ...FontAwesome5.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    async function registerForPushNotificationsAsync() {
      const localStorageToken = await AsyncStorage.getItem('expoPushToken');
      if (Constants.isDevice) {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          return;
        }
        try {
          const token = await Notifications.getExpoPushTokenAsync();
          if (localStorageToken === null || localStorageToken !== token) {
            await api.post('/registerExpoPushToken', { token });
            await AsyncStorage.setItem('expoPushToken', token);

          }
        } catch (err) {
          console.log(err || err.response.data);
          await AsyncStorage.removeItem('expoPushToken');
        }
      }

      if (Platform.OS === 'android') {
        Notifications.createChannelAndroidAsync('default', {
          name: 'default',
          sound: true,
          priority: 'max',
          vibrate: [ 0, 250, 250, 250 ],
        });
      }
    };

    loadResourcesAndDataAsync();
    registerForPushNotificationsAsync();
    Notifications.addListener(notification => setNotificationState(notification));
  }, []);

  React.useEffect(() => {
    if (notificationState.origin === 'received') Vibration.vibrate();
    if (notificationState.origin === 'selected') Linking.openURL(Linking.makeUrl('/') + notificationState.data.page);
  }, [ isLoadingComplete, props.skipLoadingScreen, notificationState ])

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <NavigationContainer initialState={initialNavigationState} ref={containerRef}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Bible" component={BibleScreen} />
            <Stack.Screen name="ChangeBook" component={BibleScreenChangeBook} />
            <Stack.Screen name="ChangeChapter" component={BibleScreenChangeChapter} />
            <Stack.Screen name="Devotional" component={DevotionalScreen} />
            <Stack.Screen name="Podcast" component={PodcastScreen} />
            <Stack.Screen name="Map" component={MapScreen} />
            <Stack.Screen name="PrayOrder" component={PrayOrderScreen} />
            <Stack.Screen name="Schedule" component={ScheduleScreen} />
            <Stack.Screen name="Photo" component={PhotoScreen} />
            <Stack.Screen name="PhotoDetail" component={PhotoDetailScreen} />
            <Stack.Screen name="SocialMedia" component={SocialMediaScreen} />
            <Stack.Screen name="Cell" component={CellScreen} />
            <Stack.Screen name="Shepherds" component={ShepherdsScreen} />
            <Stack.Screen name="AboutUs" component={AboutUsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});