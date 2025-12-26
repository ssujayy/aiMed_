import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React, { createContext, useState } from "react";

export const FrequencyContext = createContext<any>(undefined);

export default function Navigation() {
  const createDefaults = (hour: number) => {
    const rn = new Date();
    return new Date(rn.getFullYear(), rn.getMonth(), rn.getDate(), hour, 0);
  };

  const defaultTimes = {
    once: [createDefaults(8)], // 8am
    twice: [createDefaults(8), createDefaults(20)], // 8am, 8pm
    thrice: [createDefaults(8), createDefaults(14), createDefaults(20)], // 8am, 2pm,, 8pm
    quad: [
      createDefaults(8),
      createDefaults(12),
      createDefaults(16),
      createDefaults(20),
    ], // 8am, 12pm, 4pm, 8pm
  };

  const [once1, setOnce1] = useState(new Date(defaultTimes.once[0]));
  const [twice1, setTwice1] = useState(new Date(defaultTimes.twice[0]));
  const [twice2, setTwice2] = useState(new Date(defaultTimes.twice[1]));
  const [thrice1, setThrice1] = useState(new Date(defaultTimes.thrice[0]));
  const [thrice2, setThrice2] = useState(new Date(defaultTimes.thrice[1]));
  const [thrice3, setThrice3] = useState(new Date(defaultTimes.thrice[2]));
  const [quad1, setQuad1] = useState(new Date(defaultTimes.quad[0]));
  const [quad2, setQuad2] = useState(new Date(defaultTimes.quad[1]));
  const [quad3, setQuad3] = useState(new Date(defaultTimes.quad[2]));
  const [quad4, setQuad4] = useState(new Date(defaultTimes.quad[3]));

  const timeContexts = {
    once1,
    setOnce1,
    twice1,
    setTwice1,
    twice2,
    setTwice2,
    thrice1,
    setThrice1,
    thrice2,
    setThrice2,
    thrice3,
    setThrice3,
    quad1,
    setQuad1,
    quad2,
    setQuad2,
    quad3,
    setQuad3,
    quad4,
    setQuad4,
  };

  return (
    <FrequencyContext.Provider value={timeContexts}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#6A1B9A",
          tabBarInactiveTintColor: "#B0B0B0",
          tabBarStyle: {
            backgroundColor: "#FFFFFF",
            borderTopWidth: 0,
            position: "absolute",
            elevation: 0,
            height: 90,
            paddingBottom: 8,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 600,
          },
        }}
      >
        <Tabs.Screen
          name="addMeds"
          options={{
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="add-circle-outline" size={size} color={color} />
            ),
            tabBarLabel: "Add Meds",
          }}
        />
        <Tabs.Screen
          name="medList"
          options={{
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="medkit-outline" size={size} color={color} />
            ),
            tabBarLabel: "My Meds",
          }}
        />
        <Tabs.Screen
          name="alerts"
          options={{
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="warning-outline" size={size} color={color} />
            ),
            tabBarLabel: "Alerts",
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
            tabBarLabel: "Profile",
          }}
        />
      </Tabs>
    </FrequencyContext.Provider>
  );
}
