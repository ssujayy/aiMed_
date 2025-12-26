import { useSession, useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MedCard from "../components/medCard";
import { createSupabase } from "../supabaseClient";

export default function MedList() {
  type Medication = {
    id: string;
    user_id: string;
    medication_name: string;
    dosage: string;
    strength: string;
    schedule_mode: string;
    selected_frequency: string;
    start_date: string;
    custom_reminders: string;
  };

  const { user } = useUser();
  const { session } = useSession();
  const supabase = createSupabase(session);

  const [meds, setMeds] = useState<Medication[]>([]);

  const getMeds = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("medications")
      .select()
      .eq("user_id", user!.id);
    setMeds(data!);
  };

  useEffect(() => {
    if (user) getMeds();
  }, [user]);

  const handleDelete = (id: string) => {
    Alert.alert("Delete", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          setMeds((prev) => prev.filter((m) => m.id !== id));
          const deleted = await supabase
            .from("medications")
            .delete()
            .eq("id", id);
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>
        <Ionicons name={"bulb-outline"} size={30} /> aiMed
      </Text>
      <Text style={styles.heading}>Your medications:</Text>
      <TouchableOpacity
        onPress={getMeds}
        style={{
          backgroundColor: "#e0dae9ff",
          marginBottom: 10,
          marginLeft: 5,
          borderRadius: 8,
          padding: 5,
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            fontWeight: 700,
            color: "#20172bff",
            marginRight: 260,
            marginTop: 2,
            fontSize: 13.5,
          }}
        >
          Refresh
        </Text>
        <Ionicons
          name="refresh-circle-sharp"
          size={20}
          color="#20172bff"
        ></Ionicons>
      </TouchableOpacity>
      <FlatList
        data={meds}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MedCard med={item} onDelete={handleDelete} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f4fe",
    paddingBottom: 100,
  },
  logoText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#464757",
    alignSelf: "center",
    marginBottom: 40,
    marginTop: 50,
  },
  heading: {
    fontSize: 32,
    fontWeight: "700",
    color: "#464757",
    marginBottom: 10,
    marginTop: 0,
  },
});
