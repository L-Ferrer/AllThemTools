import { Drawer } from 'expo-router/drawer';
import React from "react";

export default function Layout() {
  return (
    <Drawer>
      <Drawer.Screen name="index" 
        options={{
          title: "All Them Tools",
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
      <Drawer.Screen name="tool/notes/index" 
        options={{
          title: "Notes",
        }} />
    </Drawer>);
}