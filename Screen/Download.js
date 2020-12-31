import React from 'react';
import {Linking, Dimensions, Image, FlatList, ActivityIndicator, Text, View, StyleSheet, TouchableOpacity, AsyncStorage, BackHandler} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const height=Dimensions.get('window').height;
const width=Dimensions.get('window').width;

export default class Download extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true,class:'',type:''}
  }

  async componentDidMount()
  {
    let UserDetails = await AsyncStorage.getItem('UserDetails');
    this.setState(
    {
      class:JSON.parse(UserDetails).class,
      type:this.props.navigation.state.params.type
    });
    this.getDownloadList();
  }


  async getDownloadList(){  
      fetch('http://3.7.237.203/api/download?type='+this.state.type+'&class='+this.state.class)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.download,
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
      <View style={{flex:1}}>
      <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
          <Icon name="arrow-left" style={{marginTop:3}} size={20} color="white" />
        </TouchableOpacity>
        <Text style={{fontSize:22, color:'white',textAlign:'center',fontWeight:'bold',flex:1}}>
        Download Assignment
        </Text> 
      </View>
        <View style={styles.news}>
          <Text style={styles.td}>Title</Text>
          <Text style={styles.td}>Description</Text>
          <Text style={[styles.td,{textAlign:'center'}]}>View</Text>
        </View>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => (
              <View style={styles.news}>
                <Text style={styles.td}>{item.title}</Text>
                <Text style={styles.td}>{item.description}</Text>
                <TouchableOpacity  style={styles.td} onPress={ ()=>{ Linking.openURL(item.url)}}>
                  <Text style={{color:'white',borderWidth:1,textAlign:'center', borderColor:'#4A89DC', backgroundColor:'#4A89DC',borderRadius:3,paddingTop:5,paddingBottom:5}}>View</Text>
                </TouchableOpacity>
              </View>
            )}
          keyExtractor={({id}, index) => id}
        />
      </View>
      </View>
    );
  }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        height:height,
        textAlign:'center',
        width:width,
    },
    td:{
        flex:1,
        padding:5,
        color:'#4A89DC',
        fontFamily:'Avenir3',
    },
    news:{
      flexDirection:'row',
      borderRadius:3,
      borderWidth:1,
      borderColor:'#4A89DC',
      margin:3,
      color:'white',
      marginTop:10,
      fontFamily:'Avenir3',
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
