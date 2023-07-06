import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height, width } = Dimensions.get('window');

export default function Notes() {
    const [data, setData] = useState({
        id: 1,
        title: "",
        text: "",
    });
    

    useEffect(() => {
        getData();
    }, []);
    useEffect(() => {
        saveData();
    }, [data]);

    const saveData = async () => {
        try {
            const dataString = JSON.stringify(data);
            await AsyncStorage.setItem(JSON.stringify(data.id), dataString);
            console.log("Data saved: " + dataString);
        } catch (e) {
            console.error("Error at writing to storage: \n" + e);
        }
    }

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(JSON.stringify(data.id));
            jsonValue != null ? setData(JSON.parse(jsonValue)) : null;
            console.log("Data received");
        } catch (e) {
            console.error("Error at reading from storage: \n" + e);
        }
    };

    return (
        <View>
            <TextInput
                mode='outlined'
                value={data.title}
                onChangeText={title => setData({ ...data, title })}
                placeholder='New Note'
                style={styles.titlefield}
                outlineStyle={{ borderColor: '#ffffff' }}
            />
            <ScrollView
                keyboardDismissMode='on-drag'
            >
                <TextInput
                    mode='outlined'
                    value={data.text}
                    onChangeText={text => setData({ ...data, text })}
                    multiline={true}
                    dense={true}
                    style={styles.inputfield}
                    outlineStyle={{ borderStyle: 'solid', borderWidth: 1, borderColor: '#000000' }}

                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        color: "#000000",
        fontSize: 20,
    },
    titlefield: {
        margin: 5,
        backgroundColor: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    inputfield: {
        flexGrow: 1,
        height: height*0.35,
        margin: 10,
    },
});