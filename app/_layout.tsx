import { Stack } from "expo-router";
import React from "react";

export default function IndexLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#545454",
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Index",
        }}
      />
    </Stack>
  );
}