import React from 'react';
import {Dimensions, Image, FlatList, ActivityIndicator, Text, View, StyleSheet, TouchableOpacity, AsyncStorage, BackHandler} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const height=Dimensions.get('window').height;

export default class About extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true, class:''}
  }

  async componentDidMount()
  {
    let UserDetails = await AsyncStorage.getItem('UserDetails');
    this.setState(
    {
      class:JSON.parse(UserDetails).class,
    });
    this.getVideoList();
  }

  async getVideoList(){  
      fetch('http://3.7.237.203/api/videos1?class='+this.state.class)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.videos,
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
        Videos
        </Text> 
      </View>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => (
              <TouchableOpacity style={styles.news} onPress={() => this.props.navigation.navigate('Stream', {video_url:item.video_url})}>
                <Image style={styles.thumbnail} source={{uri:item.thumbnail_image}} />
                <View style={{paddingLeft:10}}>
                  <Text style={styles.td}>{item.video_title}</Text>
                  <Text style={styles.td}>{item.video_desc}</Text>
                </View>
              </TouchableOpacity>
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
        backgroundColor:'#ffffff'
    },
    td:{
        padding:5,
        color:'white',
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
      shadowOpacity: 1.22,
      shadowRadius: 2.22,
      elevation: 5,
    },
    news:{
      flexDirection:'row',
      backgroundColor:'#4A89DC',
      borderRadius:3,
      borderWidth:1,
      borderColor:'#4A89DC',
      margin:10,
      color:'white',
      marginTop:5,
      fontFamily:'Avenir3',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 4,
    },
    thumbnail:{
      height:70,
      width:120,
    }
})
