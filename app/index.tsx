import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

function Index(){
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.text}>Select a tool to get started</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    color: "#000000",
    fontSize: 20,
  },
});

export default Index;