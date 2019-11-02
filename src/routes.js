import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import User from './pages/User';
import MyWebView from './pages/MyWebView';

const Routes = createAppContainer(
    createStackNavigator({
        Main,
        User,
        MyWebView,
    },{
        headerLayoutPreset: 'center',
        headerBackTitleVisible: false,
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#7159c1',
            },
            headerTintColor: '#fff'
        }
    })
);

export default Routes;