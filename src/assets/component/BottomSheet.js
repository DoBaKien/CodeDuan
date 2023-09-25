import React, { useRef, useState } from 'react'
import { Dimensions, StyleSheet, View, Text, TouchableOpacity, Pressable } from 'react-native'

import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, interpolate, Extrapolate, withSpring } from 'react-native-reanimated';
import ModalCancel from './ModalCancel';
import ModalDone from './ModalDone';



const { height: SCREEN_HEIGHT } = Dimensions.get('window')
const WIDTH = Dimensions.get('window').width
const max_translateY = -SCREEN_HEIGHT + 50
const BottomSheet = () => {

    const translationY = useSharedValue(0)
    const context = useSharedValue({ y: 0 })
    const active = useSharedValue(false);
    const [type, setType] = useState(<ModalDone />)
    const [typeA, setTypeA] = useState('done')

    const scrollTo = React.useCallback((destination) => {
        'worklet';
        active.value = destination !== 0;
        translationY.value = withSpring(destination, { damping: 50 });
    }, []);

    React.useEffect(() => {
        if (typeA === 'done') {
            scrollTo(-466)
        } else {
            scrollTo(-230)
        }
    })

    const gesture = Gesture.Pan().onStart((e) => {
        context.value = { y: translationY.value }
    }).onUpdate((e) => {
        translationY.value = e.translationY + context.value.y
        translationY.value = Math.max(translationY.value, max_translateY)
    }).onEnd(() => {
        if (translationY.value > -60) {
            scrollTo(-60);
        } else if (translationY.value < -SCREEN_HEIGHT / 1.5) {
            scrollTo(max_translateY);
        }
    })

    const BottomSheetStyle = useAnimatedStyle(() => {
        const borderRadius = interpolate(
            translationY.value,
            [max_translateY + 50, max_translateY],
            [25, 5],
            Extrapolate.CLAMP
        );
        return {
            borderRadius,
            transform: [{ translateY: translationY.value }]
        }
    })

    const onPress = (e) => {
        setTypeA(e)
        if (e === 'done') {
            setType(<ModalDone />)
        } else {
            setType(<ModalCancel />)
        }

    }

    return (
        <GestureDetector gesture={gesture}>
            <Animated.View style={[styles.BottomSheetContainer, BottomSheetStyle]}>
                <View style={styles.line} />
                <View style={{ flex: 1 }}>
                    <View style={styles.warp}>
                        <TouchableOpacity
                            style={typeA === 'done' ? styles.buttonActive : styles.button}
                            onPress={() => onPress('done')}
                        >
                            <Text style={styles.text}>Hoàn thành</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={typeA === 'huy' ? styles.buttonActive : styles.button}
                            onPress={() => onPress('huy')}
                        >
                            <Text style={styles.text}>Hủy</Text>
                        </TouchableOpacity>
                    </View>
                    {type}

                </View>

            </Animated.View>
        </GestureDetector>
    )
}

export default BottomSheet

const styles = StyleSheet.create({
    BottomSheetContainer: {
        height: SCREEN_HEIGHT,
        width: '100%',
        backgroundColor: 'white',
        position: 'absolute',
        top: SCREEN_HEIGHT,
        borderRadius: 25
    },
    line: {
        width: 75,
        height: 4,
        backgroundColor: "gray",
        alignSelf: 'center',
        marginVertical: 15,
        borderRadius: 2
    },
    warp: {
        width: WIDTH,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
        width: 150,
        borderColor: "#0A95FF",
        borderWidth: 3,
        borderRadius: 20
    },
    buttonActive: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
        width: 150,
        borderColor: "#0A95FF",
        borderWidth: 3,
        borderRadius: 20,
        backgroundColor: "#0A95FF"
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
    },

})