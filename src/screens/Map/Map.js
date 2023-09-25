import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, PermissionsAndroid } from 'react-native';
import MapView, {
  Callout,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';

import { mapStype } from '../../assets/config/config';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getPreciseDistance, getCenter } from 'geolib';
import Geolocation from '@react-native-community/geolocation'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet from '../../assets/component/BottomSheet';

function Map() {

  const [currentLocation, setCurrentLocation] = useState("")


  const b = getCenter([
    { latitude: 10.796073868914615, longitude: 106.63558936058817 },
    { latitude: 10.795542204312463, longitude: 106.63467995227164 }
  ]);

  useEffect(() => {
    _getLocationPermission()
  }, [])


  const [marketList, setMarketList] = useState([
    {
      id: 1,
      latitude: 37.4262536,
      longitude: -122.093183,
      KH: "Nguyễn Công Tần",
      DC: "Ấp 4",
      No: 123456,
      DanhSo: "54-1515",
      MaKH: "psd554as5",

    },
    {
      id: 2,
      latitude: 37.4249876,
      longitude: -122.0874513,
      KH: "Nguyễn Công Tần 2",
      DC: "Ấp 41",
      No: 1234562,
      DanhSo: "54-15151",
      MaKH: "psd554as51",
    },
  ]);

  const MyCustomMarkerView = () => {
    return (
      <View>
        <Icon name="circle-slice-8" size={30} color="blue" />
      </View>
    );
  };
  const MyCustomMarkerViewNV = (props) => {
    return (
      <View style={{ alignItems: 'center', width: 180 }}>
        <Text>{getDistance(props.marker)}</Text>
        <Icon name="account" size={30} color="black" />
        <Text style={{ color: "red" }}>Nhan viên</Text>
        <Callout >
          <Text>KH:{props.marker.KH}</Text>
          <Text>DC:{props.marker.DC}</Text>
          <Text>Số No:{props.marker.No}</Text>
          <Text>DanhSo:{props.marker.DanhSo}</Text>
          <Text>MaKH:{props.marker.MaKH}</Text>
        </Callout>
      </View>
    );
  };

  const getDistance = (props) => {
    const a = getPreciseDistance(
      { latitude: props.latitude, longitude: props.longitude },
      { latitude: currentLocation.latitude, longitude: currentLocation.longitude }
    );
    return <Text style={{ color: "red" }}>{a} (m)</Text>
  }



  async function _getLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Example App',
          'message': 'Example App access to your location '
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(info => setCurrentLocation(info.coords));
        console.log("You can use the location")
      } else {
        console.log("location permission denied")
        alert("Location permission denied");
      }
    } catch (err) {
      console.warn(err)
    }
  }



  return (
    <GestureHandlerRootView style={styles.container}>

      <View style={styles.map}>
        {currentLocation !== "" ?
          <MapView
            // customMapStyle={mapStype}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}>

            <Marker
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
            >
              <MyCustomMarkerView />
            </Marker>

            {marketList.map(marker => {
              return (
                <Marker
                  key={marker.id}
                  coordinate={{
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                  }}
                >
                  <MyCustomMarkerViewNV marker={marker} />

                </Marker>

              );
            })}
          </MapView>
          : <></>}
      </View>
      <BottomSheet>

      </BottomSheet>
    </GestureHandlerRootView >
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'black',

  },
  map: {
    flex: 1,

  },
  box: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-evenly',

  }
});
export default Map;
