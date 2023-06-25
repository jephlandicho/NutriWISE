import {StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/app/store';

import Navigation from './src/Navigation/Navigation'
import { ResultProvider } from './src/Components/ResultContext';
const App = () => {
  return (
    <Provider store={store}>
      <Navigation/>
    </Provider>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
export default App;