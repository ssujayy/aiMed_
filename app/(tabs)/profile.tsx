import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import SignOutButton from "../components/SignOutButton";
import { FrequencyContext } from "./_layout";

export default function Profile() {
  const {
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
  } = useContext(FrequencyContext);
  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>
        <Ionicons name={"bulb-outline"} size={30} /> aiMed
      </Text>
      <View style={styles.card}>
        <Text style={styles.label}>Once daily</Text>
        <View style={{ flexDirection: "row" }}>
          <DateTimePicker
            value={once1}
            mode="time"
            is24Hour={false}
            onChange={(event: DateTimePickerEvent, dateChosen) => {
              if (dateChosen) setOnce1(dateChosen);
            }}
          />
        </View>

        <Text style={styles.label}>Twice daily</Text>
        <View style={{ flexDirection: "row" }}>
          <DateTimePicker
            value={twice1}
            mode="time"
            is24Hour={false}
            onChange={(event: DateTimePickerEvent, dateChosen) => {
              if (dateChosen) setTwice1(dateChosen);
            }}
          />
          <DateTimePicker
            value={twice2}
            mode="time"
            is24Hour={false}
            onChange={(event: DateTimePickerEvent, dateChosen) => {
              if (dateChosen) setTwice2(dateChosen);
            }}
          />
        </View>

        <Text style={styles.label}>Three times daily</Text>
        <View style={{ flexDirection: "row" }}>
          <DateTimePicker
            value={thrice1}
            mode="time"
            is24Hour={false}
            onChange={(event: DateTimePickerEvent, dateChosen) => {
              if (dateChosen) setThrice1(dateChosen);
            }}
          />
          <DateTimePicker
            value={thrice2}
            mode="time"
            is24Hour={false}
            onChange={(event: DateTimePickerEvent, dateChosen) => {
              if (dateChosen) setThrice2(dateChosen);
            }}
          />
          <DateTimePicker
            value={thrice3}
            mode="time"
            is24Hour={false}
            onChange={(event: DateTimePickerEvent, dateChosen) => {
              if (dateChosen) setThrice3(dateChosen);
            }}
          />
        </View>

        <Text style={styles.label}>Four times daily</Text>
        <View style={{ flexDirection: "row" }}>
          <DateTimePicker
            value={quad1}
            mode="time"
            is24Hour={false}
            onChange={(event: DateTimePickerEvent, dateChosen) => {
              if (dateChosen) setQuad1(dateChosen);
            }}
          />
          <DateTimePicker
            value={quad2}
            mode="time"
            is24Hour={false}
            onChange={(event: DateTimePickerEvent, dateChosen) => {
              if (dateChosen) setQuad2(dateChosen);
            }}
          />
          <DateTimePicker
            value={quad3}
            mode="time"
            is24Hour={false}
            onChange={(event: DateTimePickerEvent, dateChosen) => {
              if (dateChosen) setQuad3(dateChosen);
            }}
          />
        </View>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <DateTimePicker
            value={quad4}
            mode="time"
            is24Hour={false}
            onChange={(event: DateTimePickerEvent, dateChosen) => {
              if (dateChosen) setQuad4(dateChosen);
            }}
          />
        </View>
      </View>
      <SignOutButton />
    </View>
  );
}

const styles = StyleSheet.create({
  logoText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#464757",
    alignSelf: "center",
    marginBottom: 30,
    marginTop: 50,
  },
  container: {
    backgroundColor: "#f8f4fe",
    padding: 20,
    flex: 1,
    marginTop: 0,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#222222",
    marginTop: 10,
  },
});
