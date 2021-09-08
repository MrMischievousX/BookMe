import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';
import reduxStore from './reduxConfig/reduxStore';
import OrderScreen from './screens/OrderScreen';
import PurchaseScreen from './screens/PurchaseScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LoginScreen from "./screens/LoginScreen"
import BookDetailScreen from "./screens/BookDetailScreen"
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { StatusBar } from 'react-native';

const HomeTab = createBottomTabNavigator();
const HomeNavigator = () => {
  const { purchaseList } = useSelector((state) => state);
  return (
    <HomeTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarBadgeStyle: { fontFamily: "sans-serif", color: "white", backgroundColor: "red" },
      }}
    >
      <HomeTab.Screen
        options={{
          tabBarIcon: ({ focused, size }) => {
            return (
              <FontAwesome
                style={[{
                  borderBottomWidth: 2, padding: 5,
                  borderColor: focused ? 'orange' : "white"
                }]}
                name="home"
                size={size}
                color={focused ? 'orange' : '#C0C0C0'}
              />
            )
          }
        }}
        name="OrderScreen"
        component={OrderScreen} />
      <HomeTab.Screen
        options={{
          tabBarIcon: ({ focused, size }) => {
            return (
              <FontAwesome
                style={[{
                  borderBottomWidth: 2, padding: 5,
                  borderColor: focused ? 'orange' : "white"
                }]}
                name="cart-plus"
                size={size}
                color={focused ? 'orange' : '#C0C0C0'}
              />
            )
          },
          tabBarBadge: purchaseList.length >= 1 ? purchaseList.length : null
        }}
        name="PurchaseScreen"
        component={PurchaseScreen} />
    </HomeTab.Navigator>
  );
};

const LoginStack = createStackNavigator();
function Navigation() {
  const { user } = useSelector((state) => state);
  return (
    <NavigationContainer>
      <LoginStack.Navigator
        initialRouteName={user ? 'Home' : 'Login'}
        screenOptions={{
          headerShown: false,
        }}
      >
        <LoginStack.Screen name="Login" component={LoginScreen} />
        <LoginStack.Screen name="Home" component={HomeNavigator} />
        <LoginStack.Screen name="BookDetails" component={BookDetailScreen} />
      </LoginStack.Navigator>
    </NavigationContainer>);
}


export default function App() {
  const { store, persistor } = reduxStore();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '139665802954-sgtmunavh4r3kqd18eimggqriqdre6pd.apps.googleusercontent.com',
      offlineAccess: true,
      scopes: ['profile', 'email', 'openid'],
    });
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar
          animated={true}
          backgroundColor="white"
          barStyle='dark-content'
          showHideTransition='fade' />
        <Navigation />
      </PersistGate>
    </Provider>
  );
}