import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Screen1 from "./views/Screen1.js";
import Screen2 from "./views/Screen2.js";

const Stack = createNativeStackNavigator();
export default function App() {
  return(
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Screen1'>
        <Stack.Screen name="Screen1" component={Screen1}/>
        <Stack.Screen name="Screen2" component={Screen2}/>
      </Stack.Navigator>
    </NavigationContainer>



  );
  
}
