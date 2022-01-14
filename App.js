import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux'
import store from './src/Redux/store';
import IndexPage from './src/IndexPage';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
         <IndexPage/>
      </NavigationContainer>
    </Provider> 
  );
}


