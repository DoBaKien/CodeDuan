import React, { useRef, useState } from 'react'
import { Dimensions, StyleSheet, ScrollView, View, SafeAreaView, Text, FlatList } from 'react-native'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')
const WIDTH = Dimensions.get('window').width

function Test() {
    const onchange = (e) => {
        const xOffset = e.nativeEvent.contentOffset.x;

    }
    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'First Item',
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Second Item',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Third Item',
        },
    ];

    let flatListRef = useRef();

    const Item = ({ title }) => (
        <View style={styles.warp}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
    const [activeView, setActiveView] = useState(0)
    return (
        <SafeAreaView>
            <View style={styles.warp}>
                <FlatList
                    data={DATA}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    renderItem={({ item }) => <Item title={item.title} />}
                    keyExtractor={item => item.id}
                    ref={(ref) => { flatListRef.current = ref }}
                    style={styles.carousel}
                />
                {/* <ScrollView
                    onScroll={onchange}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    horizontal
                    style={styles.warp}
                >
                    {
                        Array(2).fill().map((_, i) => (
                            <View style={styles.warp} key={i}>
                                <Text key={i}>Hello, Item {i}</Text>
                            </View>

                        ))
                    }

                </ScrollView> */}
                <View style={styles.warpDot}>
                    {
                        Array(2).fill().map((_, i) => (
                            <Text
                                key={i}
                                style={activeView === i ? styles.dotActive : styles.dot}
                            >●</Text>
                        ))
                    }
                </View>
            </View>
        </SafeAreaView>
    );
}

export default Test;
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
        backgroundColor: 'red',
        height: SCREEN_HEIGHT * 0.25,
    },
    warpDot: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        alignSelf: 'center',
    },
    dotActive: {
        margin: 3,
        color: 'black'
    },
    dot: {
        margin: 3,
        color: "white"
    }

})