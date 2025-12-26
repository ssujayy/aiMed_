import { useSession, useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AlertCard from "../components/alertCard"; // Note uppercase
import { createSupabase } from "../supabaseClient";

type AlertType = {
  drug1: string;
  drug2: string;
  interaction_level: string;
  simple_explanation: string;
};

export default function Alerts() {
  const { user } = useUser();
  const { session } = useSession();
  const supabase = createSupabase(session);

  const [meds, setMeds] = useState<string[]>([]);
  const [alerts, setAlerts] = useState<AlertType[]>([]);
  const [loading, setLoading] = useState(false);

  const getMeds = async () => {
    if (!user) return [];
    const { data } = await supabase
      .from("medications")
      .select("medication_name")
      .eq("user_id", user.id);
    return data?.map((med) => med.medication_name) || [];
  };

  const sendToFlask = async () => {
    const userMeds = await getMeds();
    setMeds(userMeds);

    if (userMeds.length === 0) {
      setAlerts([
        {
          interaction_level: "None",
          simple_explanation: "No medications provided.",
          drug1: "",
          drug2: "",
        },
      ]);
      return;
    }

    setLoading(true);
    setAlerts([]);

    try {
      const response = await fetch("http://192.168.254.174:5000/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userMeds),
      });

      const parsedAlerts: AlertType[] = await response.json();
      setAlerts(Array.isArray(parsedAlerts) ? parsedAlerts : [parsedAlerts]);
    } catch (err) {
      console.error(err);
      setAlerts([
        {
          interaction_level: "Error",
          simple_explanation: "Failed to fetch interactions.",
          drug1: "",
          drug2: "",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredAlerts = alerts.filter(
    (alert) => alert.interaction_level !== "None"
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.logoText}>
        <Ionicons name="bulb-outline" size={30} /> aiMed
      </Text>
      <Text style={styles.heading}>Alerts</Text>

      <TouchableOpacity style={styles.button} onPress={sendToFlask}>
        <Text style={styles.buttonText}>Get Feedback</Text>
      </TouchableOpacity>

      {loading && <Text style={{ marginVertical: 20 }}>Loading...</Text>}

      {!loading && filteredAlerts.length === 0 && alerts.length > 0 && (
        <View style={styles.noAlertsContainer}>
          <Text style={styles.noAlertsText}>
            Your drugs do not have harmful interactions!
          </Text>
        </View>
      )}

      {filteredAlerts.map((alert, index) => (
        <AlertCard key={index} {...alert} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#f8f4fe", padding: 20, flexGrow: 1 },
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
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#552ca1ff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  noAlertsContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 10,
    alignItems: "center",
  },
  noAlertsText: { fontSize: 18, color: "#555", fontWeight: "500" },
});
