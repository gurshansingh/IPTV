import * as React from 'react';
import {Text, View, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, AsyncStorage, ActivityIndicator} from 'react-native';
import Orientation from 'react-native-orientation';

class Login extends React.Component{

    state={user_name:'',password:'',isLoading: false,error:''}

    _scrollToInput() 
    {
        this.scrollView.scrollTo({y: 0, animated: true});
    }

    componentDidMount(){
        Orientation.lockToPortrait();
    }

    _login =async()=>{
        this.setState({error:''});
        if(this.state.user_name!='' && this.state.password!='')
        {
        this.setState({ isLoading: true });
        return fetch('https://slipsin.com/MPS/api/login?user_name='+this.state.user_name+'&password='+this.state.password)
          .then((response) => response.json())
          .then((responseJson) => {
            if(responseJson.Result==true)
            {
                AsyncStorage.setItem('login', 'Done');
                this.setState({isLoading:false});
                this.props.navigation.navigate('VideoList');
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

    render(){
        return(
            <ScrollView style={{backgroundColor:'#ffffff'}} ref={ref => { this.scrollView = ref; }}>
            <View style={styles.container}>
                <Image style={styles.image_logo} source={require('../assets/logo.png')} />
                <View style={styles.form_box}>
                    <Text style={styles.label1}>User Name</Text>
                    <TextInput style={styles.input_box} onChangeText={(user_name) => this.setState({user_name})} placeholder="User Name" />
                    <Text style={styles.label2}>Password</Text>
                    <TextInput ref="pass" style={styles.input_box} onChangeText={(password) => this.setState({password})} onFocus={this._scrollToInput.bind(this)} secureTextEntry={true} placeholder="Password" />
                    <TouchableOpacity onPress={() => this._login()}><Text style={styles.login}>Log in</Text></TouchableOpacity>
                </View>
                <Text style={{textAlign:'center',color:'red',marginTop:10,}}>{this.state.error}</Text>
                <ActivityIndicator style={styles.loading} size='large' animating={this.state.isLoading} />
            </View>
            </ScrollView>
        )
    }
}

export default Login;

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        backgroundColor:'#ffffff'
    },
    image_logo:{
        marginTop:50,
        width:200,
        height:110
    },
    form_box:{
        flex:1,
        alignItems:'center',
        backgroundColor:'#03A9F4',
        width:300,
        marginTop:30,
        borderRadius:5,
        padding:25,    
    },
    label1:{
        fontSize:20,
        marginTop:20,
        color:'white'
    },
    label2:{
        fontSize:20,
        marginTop:10,
        color:'white'
    },
    input_box:{
        paddingLeft:15,
        marginTop:10,
        width:250,
        padding:3,
        borderColor:'white',
        borderWidth:1,
        borderRadius:5,
        color:'white',
        fontSize:16,
    },
    login:{
        marginTop:40,
        width:250,
        height:40,
        borderRadius:5,
        backgroundColor:'white',
        textAlign:'center',
        fontSize:20,
        padding:5,
        color:'#03A9F4'
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