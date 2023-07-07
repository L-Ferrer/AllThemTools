import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Dimensions } from 'react-native';
import { Audio } from 'expo-av';
import { Sound } from 'expo-av/build/Audio';
import { Foundation } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';

const { height, width } = Dimensions.get('window');

export default function App() {
    const [file, setFile] = useState({ uri: "", name: "", mimeType: "" });
    const [sound, setSound] = useState<Sound>();
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    async function pickAudio() {
        if (sound != null) {
            setIsPlaying(false);
            setIsPaused(false);
            setFile({ uri: "", name: "", mimeType: "" });
            await sound.unloadAsync();
        }
        await DocumentPicker.getDocumentAsync({
            type: "audio/*",
            copyToCacheDirectory: true,
        }).then((result) => {
            if (result.type === "success") {
                setFile({ uri: result.uri, name: result.name, mimeType: result.mimeType });
            } else {
                console.log("No audio picked");
                return null;
            }
        });
    }

    async function playSound() {
        console.log('Loading Sound');
        const sound = new Audio.Sound()
        await sound.loadAsync({
            uri: file.uri,
        });
        setSound(sound);
        console.log('Playing Sound');
        await sound.playAsync();
        setIsPlaying(true);
    }

    async function pauseSound() {
        console.log('Pausing Sound');
        await sound?.pauseAsync();
        setIsPlaying(false);
        setIsPaused(true);
    }

    async function resumeSound() {
        if (isPaused) {
            console.log('Resuming Sound');
            await sound?.playAsync();
            setIsPlaying(true);
        } else {
            playSound();
        }
    }

    useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                setIsPlaying(false);
                setIsPaused(false);
                setFile({ uri: "", name: "", mimeType: "" });
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    return (
        <View style={styles.container}>
            <Button title="Select audio file" onPress={pickAudio} />
            <View style={{ height: 20 }} />
            {(isPlaying && file != null) && <Foundation name="pause" size={width * 0.15} style={{ width: 30 }} color="black" onPress={pauseSound} />}
            {(!isPlaying && file != null) && <Foundation name="play" size={width * 0.15} color="black" onPress={resumeSound} />}
            <View style={{ marginTop: 10 }}>
                <Text style={{ fontSize: 20 }}>{file.uri == "" ? "No Audio loaded" : "Audio loaded: "}</Text>
                <Text style={{ fontSize: 20 }} numberOfLines={3}>{file.uri == "" ? "" : (file.name + " (" + file.mimeType + ")")}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: "center",
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: '#ecf0f1',
        padding: 10,
    },
});
