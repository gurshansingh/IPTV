import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Button, Linking, FlatList, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

class Links extends React.Component{

    constructor(props){
        super(props);
        this.state ={ isLoading: false,}
      }

    componentDidMount()
    {
      this.getVideoList();
    }
  
  
    async getVideoList(){  
      this.setState({isLoading:true});
        fetch('http://3.7.237.203/api/links')
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            isLoading: false,
            dataSource: responseJson.links,
          }, function(){
  
          });
  
        })
        .catch((error) =>{
          console.error(error);
        });
    }

    render(){
        if(this.state.isLoading){
            return(
              <View style={{flex: 1, padding: 20}}>
                <ActivityIndicator size="large"/>
              </View>
            )
          }
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
                        <Icon name="arrow-left" style={{marginTop:3}} size={20} color="white" />
                    </TouchableOpacity>
                    <Text style={{fontSize:22, color:'white',textAlign:'center',fontWeight:'bold',flex:1}}>
                        Important Links
                    </Text> 
                </View>
                <View style={{padding:20}}>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={({item}) => (
                        <View style={{padding:5}}>
                        <Button onPress={() => Linking.openURL(item.link_url) }
                        title={item.title} />
                        </View>
                        )}
                    keyExtractor={({id}, index) => id}
                />
                </View>
            </View>
        )
    }
}

export default Links;

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