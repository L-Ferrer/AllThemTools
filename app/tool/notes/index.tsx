import { Link, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

export default function Notes() {
    const [notes, setNotes] = useState([]);
    const isFocused = useIsFocused();

    // Reads storage on focus (when returning to screen)
    useEffect(() => {
        getData();
    }, [isFocused]);

    const getData = async () => {
        try {
            // Set notes to data from storage if it exists
            const jsonValue = await AsyncStorage.getItem("NotesArray");
            jsonValue != null ? setNotes(JSON.parse(jsonValue)) : null;
            console.log("Data received from storage: " + jsonValue);
        } catch (e) {
            console.error("Error at reading from storage: \n" + e);
        }
    };

    const saveData = async () => {
        try {
            // Save notes to storage
            const dataString = JSON.stringify(notes);
            await AsyncStorage.setItem("NotesArray", dataString);
            console.log("Data saved: " + dataString);
        } catch (e) {
            console.error("Error at writing to storage: \n" + e);
        }
    }

    // Render each note as a link to the note
    const renderItem = ({ item }: { item: any }) => (
        <Link href={`/tool/notes/${item.id}`} asChild>
            <Pressable style={styles.itemContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.nameText}>{item.title ? item.title : "Unnamed Note"}</Text>
                    <Text style={styles.previewText}>{item.text}</Text>
                </View>
            </Pressable>
        </Link>
    );

    return (
        <View>
            <Stack.Screen options={{ title: "Your Notes" }} />
            <FlatList
                data={notes}
                keyExtractor={({ id }) => id}
                renderItem={renderItem}
                style={{ marginBottom: 20 }}
            />
            <Button
                title="Add Note"
                onPress={() => {
                    // Add new note to notes array
                    setNotes([...notes, { id: notes.length, title: "", text: "" }]);
                    saveData();
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#000000",
    },
    textContainer: {
        marginLeft: 16,
    },
    nameText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    previewText: {
        fontSize: 12,
        maxHeight: 20,
    },
});