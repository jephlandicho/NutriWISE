import { DefaultTheme } from 'react-native-paper';
 const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#78B878', // Set your primary color
    accent: '#FFC107', // Set your accent color
    background: 'white', // Change the background color to white
    // Add any other custom colors you want to define
  },
  // Add other custom theme properties if needed
};
 export default MyTheme;