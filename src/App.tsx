import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {GalleryScreen, GalleryListScreen} from './modules/gallery';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store} from './store/store';

const Tab = createBottomTabNavigator();

const App = (): React.JSX.Element => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Gallery" component={GalleryScreen} />
          <Tab.Screen name="Gallery list" component={GalleryListScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
