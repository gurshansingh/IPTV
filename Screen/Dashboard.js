import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image, Linking, AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

class Dashboard extends React.Component{

    _logout=()=>{
        AsyncStorage.clear();
        this.props.navigation.navigate('Login');
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.logo_area}>
                    <Image style={styles.image_logo} source={require('../assets/output-onlinepngtools.png')} />
                </View>
                <View style={{flex:2}}>
                <TouchableOpacity style={styles.button_con} onPress={() => this.props.navigation.navigate('VideoList')}>
                    <View style={styles.click_btn}>
                        <Icon name="camera" size={28} color="white" style={{flex:1}} />
                        <Text style={{flex:4,textAlignVertical: 'center',fontSize:28,color:'white'}}>
                            Tutorials
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button_con} onPress={() => this.props.navigation.navigate('Download',{type:'Assignments'})}>
                    <View style={styles.click_btn}>
                        <Icon name="book" size={28} color="white" style={{flex:1}} />
                        <Text style={{flex:4,textAlignVertical: 'center',fontSize:28,color:'white'}}>
                            Assignments
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button_con} onPress={() => Linking.openURL('whatsapp://send?phone=+917597618900') }>
                    <View style={styles.click_btn}>
                        <Icon name="whatsapp" size={28} color="white" style={{flex:1}} />
                        <Text style={{flex:4,textAlignVertical: 'center',fontSize:28,color:'white'}}>
                            Send Assignment
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button_con} onPress={() => this.props.navigation.navigate('Download',{type:'Notes'})}>
                    <View style={styles.click_btn}>
                        <Icon name="file" size={28} color="white" style={{flex:1}} />
                        <Text style={{flex:4,textAlignVertical: 'center',fontSize:28,color:'white'}}>
                            Notes
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button_con} onPress={() => this.props.navigation.navigate('Links')}>
                    <View style={styles.click_btn}>
                        <Icon name="link" size={28} color="white" style={{flex:1}} />
                        <Text style={{flex:4,textAlignVertical: 'center',fontSize:28,color:'white'}}>
                            Important Links
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button_con} onPress={() => this._logout() }>
                    <View style={styles.click_btn}>
                        <Icon name="power-off" size={28} color="white" style={{flex:1}} />
                        <Text style={{flex:4,textAlignVertical: 'center',fontSize:28,color:'white'}}>
                            Logout
                        </Text>
                    </View>
                </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default Dashboard;

const styles=StyleSheet.create({
    container:{
        flex:1,
        padding:30,
        backgroundColor:'#ffffff'
    },
    logo_area:{
        flex:1,
    },
    image_logo:{
        width:150,
        height:150,
        marginTop:15,
        alignSelf:'center'
    },
    button_con:{
        flex:1,
        padding:6,
        paddingRight:10,
        paddingLeft:10,
    },
    click_btn:{
        flex:1,
        borderRadius:5,
        backgroundColor:'#4A89DC',
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:15
    }
})