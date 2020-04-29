import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons, Feather, FontAwesome5 } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import useLinking from './navigation/useLinking';

import HomeScreen from './screens/HomeScreen';
import BibleScreen from './screens/BibleScreen';
import BibleScreenChangeBook from './screens/BibleScreen/ChangeBook';
import BibleScreenChangeChapter from './screens/BibleScreen/ChangeChapter';
import DevotionalScreen from './screens/Devotional';

import colors from './constants/Colors';

const Stack = createStackNavigator();

export default function App(props) {
  const [ isLoadingComplete, setLoadingComplete ] = React.useState(false);
  const [ initialNavigationState, setInitialNavigationState ] = React.useState();
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

    loadResourcesAndDataAsync();
  }, []);

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