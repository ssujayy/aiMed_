import React from "react";
import { StyleSheet, Text, View } from "react-native";

type AlertProps = {
  drug1: string;
  drug2: string;
  interaction_level: string;
  simple_explanation: string;
};

export default function AlertCard({
  drug1,
  drug2,
  interaction_level,
  simple_explanation,
}: AlertProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        {drug1} ↔ {drug2}
      </Text>

      {interaction_level !== "None" && (
        <Text style={[styles.level, { color: getColor(interaction_level) }]}>
          Interaction Level: {interaction_level}
        </Text>
      )}

      {simple_explanation && (
        <Text style={styles.explanation}>
          {simple_explanation.split("\n").map((line, i) => (
            <Text key={i}>
              {line}
              {"\n"}
            </Text>
          ))}
        </Text>
      )}
    </View>
  );
}

function getColor(level: string) {
  switch (level) {
    case "Major":
      return "#d80d0dff";
    case "Moderate":
      return "#df6f25ff";
    case "Minor":
      return "#e7da29ff";
    default:
      return "#555";
  }
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
  level: { fontSize: 16, fontWeight: "bold", marginBottom: 8 },
  explanation: { fontSize: 14, color: "#555" },
});
