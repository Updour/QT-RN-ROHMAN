import { useState, useEffect } from 'react';
import {  View, Text, FlatList, Image } from 'react-native';

export default HomeScreen = () => {
  const [data, setData] = useState([])

  const _handleRetrieveData = async () => {
    let results = await fetch(`https://dummyjson.com/users?limit=100`)
    const data = await results.json();
    const isMap = data.users.filter(items => {
      let { height, age } = items
      if (Number(height.toFixed()) < 170 && Math.max(age) ) return items
      return false
      })
      
    setData(isMap.slice(0, 10));
  }

  useEffect(() => {
    _handleRetrieveData()
  }, [])
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        numColumns='2'
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <View style={styles.wrapStyles}>
              <View style={styles.boxStyles}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.imageStyles}
                  />
                  <Text style={[styles.txtStyles, { fontWeight: 'bold' }]}>Name : {item.firstName} {item.lastName} </Text>
                  <Text style={styles.txtStyles}>Age : {item.age}</Text>
                  <Text style={styles.txtStyles}>Heigh : {item.height}</Text>
              </View>
            </View>
          )
        }}
      />
    </View>
  );
}
const styles = {
  wrapStyles: { 
    flex: 1,
    padding: 8,
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  boxStyles: {  
    borderWidth: 1, 
    borderColor: 'black',
    borderRadius: 8,
    marginLeft: 8, 
    marginRight: 8, 
  },
  imageStyles: {
    height: 200, 
    width: 200
  },
  txtStyles :{
    marginLeft: 12
  }
}