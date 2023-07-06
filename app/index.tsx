import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Index(){
  return (
    <View style={styles.container}>
      <Text>Index</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#676767',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    color: "#fafafa",
    fontSize: 20,
  },
});

export default Index;