import axios from 'axios';
import {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import React from 'react';
import Geolocation from '@react-native-community/geolocation';
const url = 'http://10.170.232.98:8000/';
function Api() {
  const [currentLocation, setCurrentLocation] = useState('');
  const [location, setLocation] = useState('');
  const [countdown1, setCountDown1] = useState(60);

  useEffect(() => {
    axios
      .get(`${url}Api/SangTaiChuyenLuoi/find?id=${2}`)
      .then(function (response) {
        console.log(response.data);
        setLocation(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    Geolocation.getCurrentPosition(info => setCurrentLocation(info.coords));
  }, []);

  useEffect(() => {
    const time1 = setTimeout(() => {
      if (countdown1 > 0) {
        setCountDown1(countdown1 - 1);
      } else {
        setCountDown1(60);
      }
    }, 1000);
    return () => clearInterval(time1);
  }, [countdown1]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      Geolocation.getCurrentPosition(position => {
        axios
          .post(`${url}Api/SangTaiChuyenLuoi/update`, {
            CUSTOMER_ID: 2,
            LATITUDE: position.coords.latitude,
            LONGITUDE: position.coords.longitude,
          })
          .then(function (response) {
            setLocation(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      });
    }, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
      }}>
      <Text>{countdown1}</Text>
      <Text style={{fontSize: 30, color: 'black', marginTop: 50}}>
        Vị trí lấy từ database
      </Text>
      <Text style={{fontSize: 30, color: 'black'}}>
        latitude: {location.LATITUDE}
      </Text>
      <Text style={{fontSize: 30, color: 'black'}}>
        longitude: {location.LONGITUDE}
      </Text>

      <Text style={{fontSize: 30, color: 'black', marginTop: 50}}>
        Vị trí hiện tại
      </Text>
      <Text style={{fontSize: 30, color: 'black'}}>
        latitude: {currentLocation.latitude}
      </Text>
      <Text style={{fontSize: 30, color: 'black'}}>
        longitude: {currentLocation.longitude}
      </Text>
    </View>
  );
}

export default Api;
