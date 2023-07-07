import { Drawer } from 'expo-router/drawer';
import React from "react";

export default function Layout() {
  return (
    <Drawer
    screenOptions={({route}) => {
      return {
        headerShown: route.name !== "Notes",
      }}}
    >
      <Drawer.Screen name="index" 
        options={{
          title: "Home",
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          drawerStyle: {
            backgroundColor: '#000',
          },
          drawerInactiveTintColor: '#fff',
        }} />
      <Drawer.Screen name="tool/notes" 
        options={{
          title: "Notes",
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          drawerStyle: {
            backgroundColor: '#000',
          },
          drawerInactiveTintColor: '#fff',
        }} />
        <Drawer.Screen name="tool/compass/index" 
        options={{
          title: "Compass",
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          drawerStyle: {
            backgroundColor: '#000',
          },
          drawerInactiveTintColor: '#fff',
        }} />
        <Drawer.Screen name="tool/audio player/index" 
        options={{
          title: "Audio Player",
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          drawerStyle: {
            backgroundColor: '#000',
          },
          drawerInactiveTintColor: '#fff',
        }} />
    </Drawer>);
}