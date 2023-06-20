import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomTab from "../HomeScreen";

import AnthroComputation from "./AnthroComputation";
import MealPlanning from "./MealPlanning";

const Stack = createNativeStackNavigator();

export default function Stacknav() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="Home"
				screenOptions={{
					headerShown: false,
				}}
			>
				<Stack.Screen name="Drawer" component={Drawernav} />
				<Stack.Screen
					name="Details"
					component={Details}
					options={{
						headerShown: true,
						headerTitle: "Details Page",
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
