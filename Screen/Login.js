import * as React from 'react';
import {Text, View, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, AsyncStorage, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { getDeviceId } from 'react-native-device-info';

class Login extends React.Component{

    state={user_name:'',password:'',isLoading: false,error:''}

    _scrollToInput() 
    {
        this.scrollView.scrollTo({y: 0, animated: true});
    }

    _login =async()=>{
        let id=getDeviceId();
        this.setState({error:''});
        if(this.state.user_name!='' && this.state.password!='')
        {
        this.setState({ isLoading: true });
        return fetch('http://3.7.237.203/api/login?user_name='+this.state.user_name+'&password='+this.state.password+'&device='+id)
          .then((response) => response.json())
          .then((responseJson) => {
            if(responseJson.Result==true)
            {
                AsyncStorage.setItem('login', 'Done');
                AsyncStorage.setItem('UserDetails', JSON.stringify(responseJson.user_info));
                this.setState({isLoading:false});
                this.props.navigation.navigate('Dashboard');
            }
            else
            {
                this.setState({isLoading:false});
                this.setState({error:responseJson.msg})
            }
          })
          .catch((error) =>{
            console.error(error);
          });
        }
        else
        {
            this.setState({error:'Please input all fields'});
        }
    }

    render()
    {
        return(
            <ScrollView style={styles.container} ref={ref => { this.scrollView = ref; }}>
                <View style={styles.logo_area}>
                    <Image style={styles.image_logo} source={require('../assets/output-onlinepngtools.png')} />
                </View>
                <View style={styles.form_area}>
                    <View style={styles.form_controls}>
                        <Text style={styles.login_text}>Login Here</Text>
                        <View style={styles.input_box1}>
                            <Icon name="user" style={{padding:8}} size={18} color="#4A89DC" />
                            <TextInput style={{width:250,height:40,fontSize:16,color:'gray'}} onChangeText={(user_name) => this.setState({user_name})} placeholder="User Name" />
                        </View>
                        <View style={[styles.input_box1,styles.input_box2]}>
                            <Icon name="lock" style={{padding:8}} size={18} color="#4A89DC" />
                            <TextInput ref="pass" style={{width:250,height:40,fontSize:16,color:'gray'}} onChangeText={(password) => this.setState({password})} onFocus={this._scrollToInput.bind(this)} secureTextEntry={true} placeholder="Password" />
                        </View>
                        <TouchableOpacity onPress={() => this._login()}><Text style={styles.login}>Start Learning</Text></TouchableOpacity>
                        <Text style={{textAlign:'center',color:'#4A89DC',marginTop:10,}}>{this.state.error}</Text>
                    </View>
                </View>
                <ActivityIndicator style={styles.loading} size='large' animating={this.state.isLoading} />
            </ScrollView>
        )
    }
}

export default Login;

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ffffff'
    },
    logo_area:{
        flex:1,
    },
    form_area:{
        flex:2,
    },
    image_logo:{
        width:200,
        height:200,
        marginTop:60,
        alignSelf:'center'
    },
    form_controls:{
        padding:30,
    },
    login_text:{
        fontSize:22,
        fontWeight:'bold',
        color:'#4A89DC',
    },
    input_box1:{
        flexDirection:'row',
        marginTop:35,
        width:300,
        fontSize:16,
        borderColor:'#4A89DC',
        borderWidth:0.5,
        borderRadius:5,
    },
    input_box2:{
        marginTop:25,
    },
    login:{
        marginTop:40,
        width:300,
        height:40,
        borderRadius:50,
        backgroundColor:'#4A89DC',
        textAlign:'center',
        fontSize:18,
        padding:5,
        color:'white',
        fontWeight:'bold'
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