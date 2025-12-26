import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

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

type MedCardProps = {
  med: Medication;
  onDelete?: (id: string) => void;
};

export default function MedCard({ med, onDelete }: MedCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{med.medication_name}</Text>
      <Text>Dosage: {med.dosage}</Text>
      <Text>Strength: {med.strength}</Text>
      {med.schedule_mode == "frequency" && (
        <Text>
          {med.selected_frequency}, starting {med.start_date.slice(-10)}
        </Text>
      )}
      {med.schedule_mode == "custom" && (
        <Text>Medication dates: {med.custom_reminders}</Text>
      )}

      <View style={styles.buttons}>
        {onDelete && (
          <TouchableOpacity
            onPress={() => onDelete(med.id)}
            style={styles.deleteButton}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginBottom: 12,
  },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  buttons: { flexDirection: "row", marginTop: 12, gap: 8 },
  editButton: { backgroundColor: "#4CAF50", padding: 8, borderRadius: 8 },
  deleteButton: { backgroundColor: "#F44336", padding: 8, borderRadius: 8 },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
