import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Button, Linking} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

class Upload extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
                        <Icon name="arrow-left" style={{marginTop:3}} size={20} color="white" />
                    </TouchableOpacity>
                    <Text style={{fontSize:22, color:'white',textAlign:'center',fontWeight:'bold',flex:1}}>
                        Document Upload
                    </Text> 
                </View>
                <View style={{padding:20}}>
                <Text style={{marginTop:100,fontSize:18,marginBottom:20}}>
                    1. You can send your assignments via Email. Click to send email
                </Text>
                <Button onPress={() => Linking.openURL('mailto:manojarora@rocketmail.com') }
                title="Send Email" />
                <Text style={{marginTop:30,fontSize:18,marginBottom:20}}>
                    2. another way to send your assignment via whatsapp messenger, please send assignments to +91 7597618900
                </Text>
                <Button onPress={() => Linking.openURL('whatsapp://send?phone=+917597618910') }
                title="+91 7597618910" />
                </View>
            </View>
        )
    }
}

export default Upload;

const styles=StyleSheet.create({
    container:{
        flex:1,
    },
    header:{
        padding:10,
        flexDirection:'row',
        backgroundColor:'#4A89DC',
        marginBottom:15,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 4,
      },
})