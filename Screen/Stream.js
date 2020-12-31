import React from "react";
import {Text,View,StyleSheet, TouchableOpacity, ActivityIndicator} from "react-native";
import Orientation from 'react-native-orientation';
import Video from 'react-native-video';


export default class Stream extends React.Component {

  constructor(props){
    super(props);
    this.state ={screenType:'contain',fullscreentext:'Full Screen', opacity: 0}
  }

  onBackScreen = () => {
    this.props.navigation.navigate('VideoList');
    Orientation.lockToPortrait();
     
  };

  onLoadStart = () => {
    this.setState({opacity: 1});
}

onLoad = () => {
    this.setState({opacity: 0});
}

onBuffer = ({isBuffering}) => {
  console.log(isBuffering);
    this.setState({opacity: isBuffering ? 1 : 0});
}


  onFullScreen = () => {
    if(this.state.screenType=='contain')
    {
      Orientation.lockToLandscape();
      this.setState({screenType:'cover',fullscreentext:'Normal Screen'});
    }
    else
    {
      Orientation.lockToPortrait();
      this.setState({screenType:'contain',fullscreentext:'Full Screen'});
    }
  };

  render(){
    return(
      <View style={styles.container}>
        <Video source={{uri: this.props.navigation.getParam('video_url')}}   // Can be a URL or a localfile.
        ref={(ref) => {
          this.player = ref
        }}                                      // Store reference
        onBuffer={this.onBuffer}                // Callback when remote video is buffering
        onEnd={this.onEnd}                      // Callback when playback finishes
        onError={this.videoError}            // Callback when video cannot be loaded
        onLoadStart={this.onLoadStart}
        onLoad={this.onLoad}
        style={{...StyleSheet.absoluteFill}}
        resizeMode={this.state.screenType}
        controls={true}
        />
        <TouchableOpacity onPress={() => this.onBackScreen()} style={{position:'absolute',top:10,left:10}}>
          <Text style={{padding:8,backgroundColor:'#4A89DC',borderRadius:5,color:'white',borderColor:'#4A89DC',borderWidth:1}}>{'<<'} Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onFullScreen()} style={{position:'absolute',top:10,right:10}}>
          <Text style={{padding:8,backgroundColor:'#4A89DC',borderRadius:5,color:'white',borderColor:'#4A89DC',borderWidth:1}}>{this.state.fullscreentext}</Text>
        </TouchableOpacity>
        <ActivityIndicator
                animating
                size="large"
                color="#4A89DC"
                style={[styles.activityIndicator, {opacity: this.state.opacity}]}
            />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{ flex: 1, justifyContent: "center", backgroundColor:'white'},
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  activityIndicator: {
    position: 'absolute',
    left: 50,
    right: 50,
    top: 100,
    bottom: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
});