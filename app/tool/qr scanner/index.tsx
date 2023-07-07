import { Stack } from "expo-router";
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Vibration } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function QRScanner() {
    
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [qrData, setQrData] = useState("");

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    const qr_data = ({ data }) => {
        setQrData(data);
        setScanned(true);
        Vibration.vibrate(100);
        alert(qrData);
    };

    if (hasPermission === false) {
        alert("Allow All Them Tools to access your Camera for the QR-Scanner to function.");
        return <Text> Allow camera access and restart the App... </Text>
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: "QR Scanner", headerShown: true }} />
            <BarCodeScanner
                barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                onBarCodeScanned={scanned? undefined : qr_data}
                style={StyleSheet.absoluteFillObject}
            />
            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}    
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    }
});