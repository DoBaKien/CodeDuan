import {NavigationContainer} from '@react-navigation/native';
import Map from './src/screens/Map/Map';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DashBoard from './src/screens/DashBoard/DashBoard';

import Home from './src/screens/Home/Home';
import Supervision from './src/screens/Supervision/Supervision';
import Assignment from './src/screens/Assignment/Assignment';
import Api from './src/screens/Api/Api';
import Test from './src/screens/Test/Test';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}></Stack.Screen>
        <Stack.Screen
          name="Map"
          component={Map}
          options={{
            headerShown: false,
          }}></Stack.Screen>
        <Stack.Screen
          name="DashBoard"
          component={DashBoard}
          options={{
            headerShown: false,
          }}></Stack.Screen>
        <Stack.Screen
          name="Supervision"
          component={Supervision}
          options={{
            headerShown: false,
          }}></Stack.Screen>
        <Stack.Screen
          name="Assignment"
          component={Assignment}
          options={{
            headerShown: false,
          }}></Stack.Screen>
        <Stack.Screen
          name="Api"
          component={Api}
          options={{
            headerShown: false,
          }}></Stack.Screen>
        <Stack.Screen
          name="Test"
          component={Test}
          options={{
            headerShown: false,
          }}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
