import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import { Magnetometer } from 'expo-sensors';

const { height, width } = Dimensions.get('window');

export default function Compass() {
    useEffect(() => {
        _subscribe();
        return () => _unsubscribe();
    }, []);
    const [subscription, setSubscription] = useState(null);
    const [data, setData] = useState({
        x: 0,
        y: 0,
        z: 0,
    });

    const _subscribe = () => {
        setSubscription(
            Magnetometer.addListener(result => {
                setData(result);
            })
        );
        Magnetometer.setUpdateInterval(50);
    };

    const _unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
    };

    const bearing = Math.round((Math.atan2(data.y, data.x) * 180 / Math.PI)-90);
    const degree = bearing < 0 ? bearing + 360 : bearing;
    
    const _direction = (degree) => {
        if (degree >= 22.5 && degree < 67.5) {
            return 'NE';
        }
        else if (degree >= 67.5 && degree < 112.5) {
            return 'E';
        }
        else if (degree >= 112.5 && degree < 157.5) {
            return 'SE';
        }
        else if (degree >= 157.5 && degree < 202.5) {
            return 'S';
        }
        else if (degree >= 202.5 && degree < 247.5) {
            return 'SW';
        }
        else if (degree >= 247.5 && degree < 292.5) {
            return 'W';
        }
        else if (degree >= 292.5 && degree < 337.5) {
            return 'NW';
        }
        else {
            return 'N';
        }
    };


    return (
        <View style={styles.container}>
            <Text
                style={{
                    fontSize: height / 26,
                    fontWeight: 'bold'
                }}>
                {_direction(degree)}
            </Text>
            <Text style={{
                fontSize: height / 27,
            }}>
                {degree}°
            </Text>
            <Image source={require('../../../assets/compass/top_triangle.png')} style={{
                height: height / 26,
                resizeMode: 'contain'
            }} />
            <Image source={require("../../../assets/compass/compass.png")} style={{
                height: width - 80,
                resizeMode: 'contain',
                transform: [{ rotate: 360 - bearing + 'deg' }]
            }} />
            <Text>
                {}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
});