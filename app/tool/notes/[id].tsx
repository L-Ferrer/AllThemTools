import { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSearchParams, Stack } from 'expo-router';
import {NotificationFeedbackType, notificationAsync} from 'expo-haptics';

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
        // Update title and text when readData has been received
        if (readData[id[0]]) {
            setTitle(readData[id[0]].title);
            setText(readData[id[0]].text);
        } else {
            setTitle("");
            setText("");
        }
    }, [readData]);

    // Save data to storage
    const saveData = async () => {
        try {
            const buffer = readData; // Copy readData to buffer
            buffer[id[0]] = { id: id, title: title, text: text }; // Update buffer with new data
            const dataString = JSON.stringify(buffer); // Convert buffer (JSON Object) to string
            await AsyncStorage.setItem("NotesArray", dataString); // Save string to storage
            console.log("Data saved: " + dataString);
        } catch (e) {
            console.error("Error at writing to storage: \n" + e);
        }
    }

    // Get data from storage
    const getData = async () => {
        try {
            // Read data from storage if it exists
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
                    title: title ? title : "Unnamed Note", // If title is empty, display "Unnamed Note"
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
                    value={text ? text : ""} // If text is empty, display nothing
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
                    // Saves data to storage and updates writeData
                    setWriteData([...writeData, { id: readData.length, title: title, text: text }]);
                    saveData();
                    notificationAsync(NotificationFeedbackType.Success);
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