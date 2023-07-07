import { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSearchParams, Stack } from 'expo-router';

const { height, width } = Dimensions.get('window');

export default function Note() {
    const { id } = useSearchParams();
    const [readData, setReadData] = useState([]);
    const [writeData, setWriteData] = useState([]);
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (readData[id[0]]) {
            setTitle(readData[id[0]].title);
            setText(readData[id[0]].text);
        } else {
            setTitle("");
            setText("");
        }
    }, [readData]);

    const saveData = async () => {
        try {
            const buffer = readData;
            buffer[id[0]] = { id: id, title: title, text: text };
            const dataString = JSON.stringify(buffer);
            await AsyncStorage.setItem("NotesArray", dataString);
            console.log("Data saved: " + dataString);
        } catch (e) {
            console.error("Error at writing to storage: \n" + e);
        }
    }

    const getData = async () => {
        try {
            await AsyncStorage.getItem("NotesArray").then((value) => {
                if (value != null) {
                    setReadData(JSON.parse(value));
                    console.log("Data received from storage: " + value);
                }
            });

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
            <Button
                title="Save"
                onPress={() => {
                    setWriteData([...writeData, { id: readData.length, title: title, text: text }]);
                    saveData();
                }}
            />
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