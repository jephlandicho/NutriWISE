import {StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/App/store';

import Navigation from './src/Navigation/Navigation'
import { ResultProvider } from './src/Components/ResultContext';
const App = () => {
  return (
    <ResultProvider>
      <Navigation/>
    </ResultProvider>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
export default App;