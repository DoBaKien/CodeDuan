import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
  TouchableOpacity,
  Text,
} from 'react-native';
import ModalDone from '../../assets/component/ModalDone';
import ModalCancel from '../../assets/component/ModalCancel';

const {width: WINDOW_WIDTH, height: WINDOW_HEIGHT} = Dimensions.get('window');
const bottom_sheet_max_height = WINDOW_HEIGHT * 0.64;
const bottom_sheet_min_height = WINDOW_HEIGHT * 0.04;
const max_upward_translateY = bottom_sheet_min_height - bottom_sheet_max_height;

const max_down_translateY = 0;
const drag_hold = 50;
const Test = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const lastGestureDy = useRef(0);
  const [typeA, setTypeA] = useState('done');
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        animatedValue.setOffset(lastGestureDy.current);
      },
      onPanResponderMove: (e, gesture) => {
        animatedValue.setValue(gesture.dy);
      },
      onPanResponderRelease: (e, gesture) => {
        animatedValue.flattenOffset();
        if (gesture.dy > 0) {
          if (gesture.dy <= drag_hold) {
            springAnimated('up');
          } else {
            springAnimated('down');
          }
        } else {
          if (gesture.dy >= -drag_hold) {
            springAnimated('down');
          } else {
            springAnimated('up');
          }
        }
      },
    }),
  ).current;

  const springAnimated = direction => {
    lastGestureDy.current =
      direction === 'down' ? max_down_translateY : max_upward_translateY;
    Animated.spring(animatedValue, {
      toValue: lastGestureDy.current,
      useNativeDriver: true,
    }).start();
  };

  const bottomAnimted = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [max_upward_translateY, max_down_translateY],
          outputRange: [max_upward_translateY, max_down_translateY],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  const [type, setType] = useState(<ModalDone />);
  const onPress = e => {
    setTypeA(e);
    if (e === 'done') {
      setType(<ModalDone />);
    } else {
      setType(<ModalCancel />);
    }
  };

  return (
    <Animated.View style={[styles.bottomSheet, bottomAnimted]}>
      <View style={styles.draggable} {...panResponder.panHandlers}>
        <View style={styles.dragHandle} />
      </View>
      <View style={{flex: 1}}>
        <View style={styles.warp}>
          <TouchableOpacity
            style={typeA === 'done' ? styles.buttonActive : styles.button}
            onPress={() => onPress('done')}>
            <Text style={typeA === 'done' ? styles.textActive : styles.text}>
              Hoàn thành
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={typeA === 'huy' ? styles.buttonActive : styles.button}
            onPress={() => onPress('huy')}>
            <Text style={typeA === 'huy' ? styles.textActive : styles.text}>
              Hủy
            </Text>
          </TouchableOpacity>
        </View>
        {type}
      </View>
    </Animated.View>
  );
};

export default Test;

const styles = StyleSheet.create({
  bottomSheet: {
    position: 'absolute',
    width: '100%',
    height: bottom_sheet_max_height,
    bottom: bottom_sheet_min_height - bottom_sheet_max_height,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 1.0,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  dragHandle: {
    width: 100,
    height: 6,
    backgroundColor: '#DCDCDC',
    borderRadius: 10,
  },
  draggable: {
    width: 132,
    height: 32,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  warp: {
    marginTop: 10,
    width: WINDOW_WIDTH,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    width: 150,
  },
  buttonActive: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    width: 150,
    backgroundColor: '#2196F3',
    borderRadius: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: 'black',
  },
  textActive: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
