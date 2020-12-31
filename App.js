import * as React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'
import Auth from './Screen/Auth';
import Login from './Screen/Login';
import VideoList from './Screen/VideoList';
import Stream from './Screen/Stream';
import Download from './Screen/Download';
import Dashboard from './Screen/Dashboard';
import Upload from './Screen/Upload';
import Links from './Screen/Links';

const StackNavigator = createStackNavigator({
    Auth: { screen: Auth },
    Login: { screen: Login},
    VideoList: { screen: VideoList },
    Stream: { screen: Stream },
    Download:{screen: Download},
    Dashboard:{screen: Dashboard},
    Upload:{screen: Upload},
    Links:{screen:Links}
  },
  {
    headerMode:'none',
    initialRouteName: 'Auth',
  }
);

const AppContainer=createAppContainer(StackNavigator);

class App extends React.Component{
  render(){
    return(
      <View style={{flex:1}}>
        <AppContainer />
      </View>
    );
  }
}

export default App;