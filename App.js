import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as firebase from 'firebase/app';
import LoadingScreen from './screens/LoadingScreen';
import AuthScreen from './screens/users/AuthScreen';
import JobScreen from './screens/jobs/JobsScreen';
import UsersJobsScreen from './screens/users/UsersJobsScreen';
import TabBarIcon from './components/TabBarIcon';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

var firebaseConfig = {
  apiKey: "AIzaSyAdTPlKV_segOogfit90M4V4Zi74mSCleM",
  authDomain: "plugged-6cec5.firebaseapp.com",
  databaseURL: "https://plugged-6cec5.firebaseio.com",
  projectId: "plugged-6cec5",
  storageBucket: "plugged-6cec5.appspot.com",
  messagingSenderId: "65313385227",
  appId: "1:65313385227:web:4048248873ba66aba9100e",
  measurementId: "G-1ZXT4G2DHS"
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const HomeTabs = ({navigation, route}) =>{
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  function getHeaderTitle(route) {
    const routeName = route.state?.routes[route.state.index]?.name ?? 'Home';
  
    switch (routeName) {
      case 'Home':
        return 'Recently Added';
      case 'UsersJobs':
        return 'My Jobs';
    }
  }

  return (
    <BottomTab.Navigator>
      <BottomTab.Screen 
            name='Home' 
            component={JobScreen} 
            options={{
              title: 'Home',
              tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="home"/>,}} 
            />
      <BottomTab.Screen 
            name='UsersJobs' 
            component={UsersJobsScreen} 
            options={{
              title: 'My Jobs',
              tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name='book'/>,
            }}/>
    </BottomTab.Navigator>
  );
}


export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen 
            name="Loading" 
            component={LoadingScreen} 
            options={{ title: 'Plugged' }}></Stack.Screen>
        <Stack.Screen 
            name="Login" 
            component={AuthScreen} 
            options={{ headerLeft: (props) => (<View></View>)}}></Stack.Screen>
        <Stack.Screen 
            name="Home" 
            component={HomeTabs}
            options={{ headerLeft: (props) => (<View></View>)}}></Stack.Screen>
    </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
