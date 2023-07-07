import { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSearchParams, Stack } from 'expo-router';
import { set } from 'react-native-reanimated';

const { height, width } = Dimensions.get('window');

export default function Note() {
    const { id } = useSearchParams();
    const [data, setData] = useState([]);
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (id) {
            saveData();
        }
    }, [data]);

    useEffect(() => {
        setData([...data[id[0]], { title: title, text: text }]);
    }, [title, text]);

    const saveData = async () => {
        try {
            const dataString = JSON.stringify(data);
            await AsyncStorage.setItem("NotesArray", dataString);
            console.log("Data saved: " + dataString);
        } catch (e) {
            console.error("Error at writing to storage: \n" + e);
        }
    }

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("NotesArray");
            jsonValue != null ? setData(JSON.parse(jsonValue)) : null;
            console.log("Data received from storage: " + jsonValue);
        } catch (e) {
            console.error("Error at reading from storage: \n" + e);
        }
    };

    return (
        <View>
            <Stack.Screen
                options={{
                    title: title ? title : "Unnamed Note",
                }}
            />
            <TextInput
                mode='outlined'
                value={title}
                onChangeText={title => setTitle(title)}
                placeholder='Title'
                style={styles.titlefield}
                outlineStyle={{ borderColor: '#ffffff' }}
            />
            <ScrollView
                keyboardDismissMode='on-drag'
            >
                <TextInput
                    mode='outlined'
                    value={text ? text : ""}
                    onChangeText={text => setText(text)}
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
        height: height * 0.35,
        margin: 10,
    },
});