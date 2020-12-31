import * as React from 'react';
import {View, ActivityIndicator,TouchableOpacity,Text,Image,StyleSheet,PermissionsAndroid, AsyncStorage} from 'react-native';
import RNFS from 'react-native-fs'
import RNApkInstallerN from 'react-native-apk-installer-n';
import { version } from '../version.json';

class Auth extends React.Component{

    state={
        update:0,
        process:0,
        download:false,
    }

    _update=()=>{
        const filePath = RNFS.ExternalStorageDirectoryPath + '/TheShapers.apk';
        const download = RNFS.downloadFile({
            fromUrl: 'http://mobileshop18.com/FTL/TheShapers.apk',
            toFile: filePath,
            progress: res => {
                //console.log((res.bytesWritten / res.contentLength).toFixed(2));
                this.setState({download:true,process:(res.bytesWritten / res.contentLength).toFixed(2)*100})
            },
            progressDivider: 1
        });
        download.promise.then(result => {
            if(result.statusCode == 200){
                RNApkInstallerN.install(filePath)
            }
            console.log(filePath);
        });
    }

    async downloadFile() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('hhh');
          } else {
            Alert.alert(
              "Permission Denied!",
              "You need to give storage permission to download the file"
            );
          }
        } catch (err) {
          console.warn(err);
        }
      }

    async componentDidMount(){
        this.downloadFile();
        let Login = await AsyncStorage.getItem('Login');
        await fetch('http://mobileshop18.com/FTL/index.php/api/Version1')
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson.version[0].version > version)
            {
                this.setState({update:1})
            }
            else
            {
                if(Login=='Done')
                {
                    this.props.navigation.navigate('Dashboard');
                }
                else
                {
                    this.props.navigation.navigate('Login');
                }
            }
        })
        .catch((error) =>{
          console.error(error);
        });
    }

     /*async componentDidMount(){
        let Login = await AsyncStorage.getItem('login');
        if(Login=='Done')
        {
            this.props.navigation.navigate('Dashboard');
        }
        else
        {
            this.props.navigation.navigate('Login');
        }
      }*/
    

    render(){
        if(this.state.update==1)
        {
        return(
            <View style={{flex: 1, justifyContent:'center',alignItems:'center'}}>
                <View style={styles.logo_area}>
                    <Image style={styles.image_logo} source={require('../assets/output-onlinepngtools.png')} />
                </View>
                {this.state.download==true ? (<Text style={{marginTop:20,fontSize:20}}>Downloading... {this.state.process} %</Text>) : (<TouchableOpacity style={{marginTop:50,marginBottom:10}} onPress={() => this._update()}>
                    <Text style={{color:'white',textAlign:'center',padding:20,backgroundColor:'#44CBAD',fontSize:20,borderRadius:6}}>Update</Text>
                </TouchableOpacity>)}
            </View>
        );
        }
        else
        {
            return(
                <View style={{flex: 1, justifyContent:'center',alignItems:'center'}}>
                    <ActivityIndicator size="large" />
                </View>
            );  
        }
    }
}

export default Auth;

const styles=StyleSheet.create({    
    image_logo:{
        width:200,
        height:200,
        marginTop:60,
        alignSelf:'center'
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})