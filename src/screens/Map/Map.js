import {useEffect, useState} from 'react';
import {View, StyleSheet, Text, PermissionsAndroid} from 'react-native';
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {mapStype} from '../../assets/config/config';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconI from 'react-native-vector-icons/Ionicons';
import {getPreciseDistance} from 'geolib';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import Test from '../Test/Test';

function Map() {
  const [currentLocation, setCurrentLocation] = useState('');
  const [KH, setKH] = useState('');

  useEffect(() => {
    _getLocationPermission();
    axios
      .get(
        `https://khachhang.evnspc.vn:5001/APIKTGS/KHANG?madvi=PB0101&ma_tram=01010089`,
      )
      .then(function (response) {
        setKH(response.data.find(mA_KHANG => mA_KHANG > 'PB01010026937'));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const [marketList, setMarketList] = useState([
    {
      id: 1,
      latitude: 11.5780472,
      longitude: 106.7961041,
      KH: 'Nguyễn Công Tần',
      DC: 'Ấp 4',
      No: 123456,
      DanhSo: '54-1515',
      MaKH: 'psd554as5',
    },
    {
      id: 2,
      latitude: 11.5636949,
      longitude: 106.7940244,
      KH: 'Nguyễn Công Tần 2',
      DC: 'Ấp 41',
      No: 1234562,
      DanhSo: '54-15151',
      MaKH: 'psd554as51',
    },
  ]);

  const MyCustomMarkerView = () => {
    return (
      <View>
        <Icon name="circle-slice-8" size={30} color="blue" />
      </View>
    );
  };
  const MyCustomMarkerViewNV = props => {
    return (
      <View style={{alignItems: 'center', width: 180}}>
        <Text>{getDistance(props.marker)}</Text>
        <Icon name="account" size={30} color="black" />
        <Text style={{color: 'red'}}>Nhan viên</Text>
        <Callout>
          <Text>KH:{props.marker.KH}</Text>
          <Text>DC:{props.marker.DC}</Text>
          <Text>Số No:{props.marker.No}</Text>
          <Text>DanhSo:{props.marker.DanhSo}</Text>
          <Text>MaKH:{props.marker.MaKH}</Text>
        </Callout>
      </View>
    );
  };

  const ad = () => {
    return (
      <View>
        <Text>KH: {item.teN_KHANG}</Text>
        <Text>ĐC: {item.sO_NHA + item.duonG_PHO}</Text>
        <Text>Số No: {item.sO_TBI}</Text>
        <Text>Danh số: {item.doanH_SO}</Text>
        <Text>Mã KH: {item.mA_KHANG}</Text>
        <Text>Vị trí treo: {item.vtrI_TREO}</Text>
        <Text>
          Tọa độ: (lng: '{item.toA_DO.longitude}',lat:'{item.toA_DO.latitude}')
        </Text>
        {item.dieN_TTHU !== null
          ? item.dieN_TTHU.map(i => {
              return (
                <Text>
                  Tháng {i.thang}/{i.nam}: {i.dieN_TTHU} (kWh)
                </Text>
              );
            })
          : null}
        <Text>Áp giá: {item.chuoI_GIA}</Text>
        <Text>Mã sổ ghi điện {item.mA_SOGCS}</Text>
        <Text>Điện thoại liên hệ: {item.dieN_THOAI}</Text>
        <Text>Chủng loại công tơ: {item.loaI_CTO}</Text>
        <Text>Số hộ: {item.sO_HO}</Text>
        {item.chI_SO_MOI !== null &&
        item.chI_SO_MOI !== undefined &&
        item.chI_SO_MOI.length !== 0 ? (
          <>
            <Text>Kỳ: {item.chI_SO_MOI[0].ky}</Text>
            <Text>
              Tháng: {item.chI_SO_MOI[0].thang}/{item.chI_SO_MOI[0].nam}{' '}
            </Text>
            <Text>Bộ chỉ số: {item.chI_SO_MOI[0].bcs}</Text>
            <Text>Ngày ghi điện: {item.chI_SO_MOI[0].ngaY_GHIDIEN}</Text>
            <Text style={{fontWeight: 'bold'}}>
              Chỉ số mới: {item.chI_SO_MOI[0].chisO_MOI}{' '}
            </Text>
          </>
        ) : null}
      </View>
    );
  };

  const MyCustomMarkerViewKH = () => {
    return (
      <View style={{alignItems: 'center', width: 180}}>
        <IconI name="location" size={30} color="red" />
        <Text style={{color: 'red'}}>{KH.teN_KHANG}</Text>
        <Callout>
          <Text>KH: {KH.teN_KHANG}</Text>
          <Text>DC: {KH.sO_NHA + ' ' + KH.duonG_PHO}</Text>
          <Text>Số No: {KH.sO_TBI}</Text>
          <Text>Danh số: {KH.doanH_SO}</Text>
          <Text>Mã KH: {KH.mA_KHANG}</Text>
          <Text>Vị trí treo: {KH.vtrI_TREO}</Text>
          <Text>
            Tọa độ:(Lng: {KH.toA_DO.longitude}, Lat: {KH.toA_DO.latitude})
          </Text>
          {KH.dieN_TTHU.map((dien, i) => (
            <Text key={i}>
              Tháng {dien.thang}/{dien.nam}: {dien.dieN_TTHU} (kWh)
            </Text>
          ))}
          <Text>Áp giá:{KH.chuoI_GIA}</Text>
          <Text>Mã sổ ghi điện: {KH.mA_SOGCS}</Text>
          <Text>Điện thoại liên hệ: {KH.dieN_THOAI}</Text>
          <Text>Chủng loại công tơ: {KH.loaI_CTO}</Text>
          <Text>Số hộ: {KH.sO_HO}</Text>
          {KH.chI_SO_MOI !== null &&
          KH.chI_SO_MOI !== undefined &&
          KH.chI_SO_MOI.length !== 0 ? (
            <View>
              <Text>Kỳ: {KH.chI_SO_MOI[0].ky}</Text>
              <Text>Tháng: {KH.chI_SO_MOI.thang}</Text>
              <Text>Bộ chỉ số: {KH.chI_SO_MOI[0].bcs}</Text>
              <Text>Ngày ghi điện: {KH.chI_SO_MOI[0].ngaY_GHIDIEN}</Text>
              <Text>Chỉ số mới: {KH.chI_SO_MOI[0].chisO_MOI}</Text>
            </View>
          ) : null}
        </Callout>
      </View>
    );
  };

  const getDistance = props => {
    const a = getPreciseDistance(
      {latitude: props.latitude, longitude: props.longitude},
      {
        latitude: KH.toA_DO.latitude,
        longitude: KH.toA_DO.longitude,
      },
    );
    return <Text style={{color: 'red'}}>{a} (m)</Text>;
  };

  async function _getLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Example App',
          message: 'Example App access to your location ',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(info => setCurrentLocation(info.coords));
        console.log('You can use the location');
      } else {
        console.log('location permission denied');
        alert('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.map}>
        {KH !== '' ? (
          <View style={{flex: 1}}>
            <View style={styles.direction}>
              <Text style={styles.textDirection}>
                {getDistance({latitude: 10.7964895, longitude: 106.6352591})}
              </Text>
            </View>
            <MapView
              // customMapStyle={mapStype}
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              region={{
                longitude: parseFloat(KH.toA_DO.longitude),
                latitude: parseFloat(KH.toA_DO.latitude),

                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}>
              {/* <Marker
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}>
              <MyCustomMarkerView />
            </Marker> */}

              <Marker
                coordinate={{
                  longitude: parseFloat(KH.toA_DO.longitude),
                  latitude: parseFloat(KH.toA_DO.latitude),
                }}>
                <MyCustomMarkerViewKH />
              </Marker>

              {marketList.map(marker => {
                return (
                  <Marker
                    key={marker.id}
                    coordinate={{
                      latitude: marker.latitude,
                      longitude: marker.longitude,
                    }}>
                    <MyCustomMarkerViewNV marker={marker} />
                  </Marker>
                );
              })}
            </MapView>
          </View>
        ) : (
          <></>
        )}
      </View>
      <Test />
    </View>
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
  },
  direction: {
    position: 'absolute',
    top: 0,
    zIndex: 2,
    right: 10,
  },
  textDirection: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
export default Map;
