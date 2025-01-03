import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState, useEffect } from 'react';


export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [cityName, setCityName] = useState('');

  async function fetchWeatherData() {
    setLoaded(false);
    const API =`http://api.weatherapi.com/v1/current.json?key=d512e0566e594b23b97134708241201&q=${cityName}&aqi=no`
  
    try {
      const response = await fetch(API);
  
      if (response.status === 200) {
        const data = await response.json();
        setWeatherData(data);
      } else {
        setWeatherData(null);
      }
      setLoaded(true);
    } catch (error) {
      console.log(error);
      setLoaded(true);
    }
  }

  useEffect(() => {
    fetchWeatherData('Mumbai');
  }, []);

  useEffect(() => {
    console.log(weatherData);
  }, [weatherData]);

  return (
    <View style={styles.container}>
      <ImageBackground source={require('./assets/weatherbackground.jpg')} style={styles.imageBackground}>
        <TextInput
          placeholder="Search city"
          value={cityName}
          onChangeText={(text) => setCityName(text)}
          onSubmitEditing={() => fetchWeatherData()}
          style={styles.searchInput}
        />
        <StatusBar hidden={false} />
        <Text style={styles.temp}>{weatherData?.current?.temp_c}</Text>
        <Text style={styles.cityName}> {weatherData?.current?.condition.text} </Text>
        <Text style={styles.cityName}> {weatherData?.location?.name} </Text>
        <Text style={styles.cityName}> {weatherData?.location?.region} </Text>
        
        <Text style={styles.cityName}>{weatherData?.location?.localtime}</Text>

        <View style={styles.card}>
          <View style={styles.dir}>
            <View>
              <Text style={styles.humTemp}>{weatherData?.current?.humidity}</Text>
              <Text style={styles.hum}>Humidity</Text>
            </View>
            <View>
              <Text style={styles.preTemp}>{weatherData?.current?.pressure_in}</Text>
              <Text style={styles.pre}>Pressure</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  searchInput: {
    backgroundColor: "lightgrey",
    width: '90%',
    height: 50,
    marginTop: 80,
    borderRadius: 20,
    marginLeft: 20,
    padding: 15,
    fontSize: 17,
  },
  temp: {
    fontSize: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    fontWeight: '200',
    textAlign: 'center'
  },
  cityName: {
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  card: {
    height: 100,
    width: "90%",
    backgroundColor: "#80808089",
    borderWidth: 0.9,
    borderColor: "white",
    margin: 20,
    borderRadius: 20,
    marginTop: 250,
  },
  humTemp: {
    fontSize: 30,
    marginLeft: 70,
    marginTop: 10,
    color: "black",
  },
  hum: {
    fontSize: 30,
    marginLeft: 40
  },
  preTemp: {
    fontSize: 30,
    marginLeft: 75,
    marginTop: 10,
  },
  pre: {
    fontSize: 30,
    marginLeft: 40
  },
  dir: {
    flexDirection: 'row'
  },
});
