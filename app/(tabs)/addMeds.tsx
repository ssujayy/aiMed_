import { useSession, useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { useCallback, useContext, useMemo, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import DropDownPicker from "react-native-dropdown-picker";
import { ScrollView } from "react-native-gesture-handler";
import { strengthMatch } from "../../assets/utils/strengthMatch";
import { synonyms, uniqueNames } from "../../assets/utils/uniqueMeds";
import { localNotify } from "../localNotifications";
import { createSupabase } from "../supabaseClient";
import { FrequencyContext } from "./_layout";

// Frequency options
const FREQUENCIES = [
  { id: "1", label: "Once daily" },
  { id: "2", label: "Twice daily" },
  { id: "3", label: "Three times daily" },
  { id: "4", label: "Four times daily" },
  { id: "5", label: "As needed" },
];

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

const Header = React.memo(
  ({
    medicationName,
    onMedicationChange,
    suggestions,
    onSuggestionSelect,
    openDosage,
    setOpenDosage,
    dosage,
    setDosage,
    openStrength,
    setOpenStrength,
    strength,
    setStrength,
    strengthItems,
    customReminders,
    setCustomReminders,
    selectedFrequency,
    setSelectedFrequency,
    scheduleMode,
    setScheduleMode,
    onOpenDosage,
    onOpenStrength,
    handleAddMed,
    startDate,
    setStartDate,
  }: any) => {
    const [tempDateForTime, setTempDateForTime] = useState<string | null>(null);
    const [tempTimeForDate, setTempTimeForDate] = useState<string | null>(null);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);

    return (
      <View style={styles.container}>
        <Text style={styles.logoText}>
          <Ionicons name={"bulb-outline"} size={30} /> aiMed
        </Text>
        <Text style={styles.heading}>Add your medication</Text>
        <Text style={styles.subHeading}>
          Enter details exactly as shown{"\n"}on your prescription:
        </Text>

        <View style={styles.card}>
          {/* Medication Name */}
          <Text style={styles.label}>Medication Name</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Type medication name"
            placeholderTextColor={"grey"}
            value={medicationName}
            onChangeText={onMedicationChange}
            autoCorrect={false}
            autoCapitalize="none"
          />
          {suggestions.length > 0 && (
            <View style={styles.suggestionsBox}>
              {suggestions.map((item: string, index: number) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => onSuggestionSelect(item)}
                >
                  <Text style={styles.suggestionItem}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Dosage */}
          <View style={{ zIndex: 3000, marginBottom: 15 }}>
            <Text style={styles.label}>Dosage</Text>
            <TextInput
              value={dosage}
              style={styles.dosageInput}
              placeholder="Enter your dosage"
              placeholderTextColor={"grey"}
              onChangeText={setDosage}
            />
          </View>

          {/* Strength */}
          <View style={{ zIndex: 2000, marginBottom: 15 }}>
            <Text style={styles.label}>Strength</Text>
            <DropDownPicker
              open={openStrength}
              value={strength}
              items={strengthItems}
              setOpen={setOpenStrength}
              setValue={setStrength}
              setItems={() => {}}
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              textStyle={styles.dropdownText}
              maxHeight={150}
              onOpen={onOpenStrength}
              onSelectItem={() => setOpenStrength(false)}
              listMode="SCROLLVIEW"
            />
          </View>

          {/* Schedule Mode Toggle Switch */}
          <View style={{ flexDirection: "row", marginBottom: 15 }}>
            <TouchableOpacity
              style={[
                styles.modeButton,
                scheduleMode === "frequency" && styles.selectedModeButton,
              ]}
              onPress={() => setScheduleMode("frequency")}
            >
              <Text
                style={[
                  styles.modeButtonText,
                  scheduleMode === "frequency" && styles.selectedModeButtonText,
                ]}
              >
                Frequency
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.modeButton,
                scheduleMode === "custom" && styles.selectedModeButton,
              ]}
              onPress={() => setScheduleMode("custom")}
            >
              <Text
                style={[
                  styles.modeButtonText,
                  scheduleMode === "custom" && styles.selectedModeButtonText,
                ]}
              >
                Custom Dates
              </Text>
            </TouchableOpacity>
          </View>

          {/* Frequency Modes */}
          {scheduleMode === "frequency" && (
            <View style={{ marginBottom: 15 }}>
              <Text style={styles.label}>Start Date</Text>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowStartDatePicker(true)}
              >
                <Text style={styles.dateButtonText}>
                  Starts {startDate.toLocaleDateString()}
                </Text>
              </TouchableOpacity>

              {showStartDatePicker && (
                <DateTimePicker
                  value={startDate}
                  mode="date"
                  onChange={(event, date) => {
                    setShowStartDatePicker(false);
                    if (date) setStartDate(date);
                  }}
                  display="default"
                  textColor="black"
                />
              )}

              <Text style={styles.label}>Frequency</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {FREQUENCIES.map((freq) => (
                  <TouchableOpacity
                    key={freq.id}
                    style={[
                      styles.frequencyOption,
                      selectedFrequency === freq.label &&
                        styles.selectedFrequencyOption,
                    ]}
                    onPress={() => setSelectedFrequency(freq.label)}
                  >
                    <Text
                      style={[
                        styles.frequencyText,
                        selectedFrequency === freq.label &&
                          styles.selectedFrequencyText,
                      ]}
                    >
                      {freq.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Custom Reminders Mode */}
          {scheduleMode === "custom" && (
            <View style={{ marginBottom: 15 }}>
              <Text style={styles.label}>Select Dates & Times</Text>
              <CalendarPicker
                onDateChange={(date) => {
                  if (!date) return;
                  setTempDateForTime(date.toISOString().split("T")[0]);
                  setShowTimePicker(true);
                }}
                allowRangeSelection={false}
                selectedDayColor="#6E5DD3"
                width={350}
              />

              {showTimePicker && (
                <DateTimePicker
                  value={new Date()}
                  mode="time"
                  is24Hour={false}
                  onChange={(
                    event: DateTimePickerEvent,
                    selectedTime?: Date
                  ) => {
                    setShowTimePicker(false);
                    if (selectedTime && tempDateForTime) {
                      const hours = selectedTime
                        .getHours()
                        .toString()
                        .padStart(2, "0");
                      const minutes = selectedTime
                        .getMinutes()
                        .toString()
                        .padStart(2, "0");
                      setTempTimeForDate(`${hours}:${minutes}`);
                      setShowConfirm(true);
                    }
                  }}
                />
              )}

              {showConfirm && (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginTop: 10,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setCustomReminders((prev: any) => [
                        ...prev,
                        { date: tempDateForTime!, time: tempTimeForDate! },
                      ]);
                      setTempDateForTime(null);
                      setTempTimeForDate(null);
                      setShowConfirm(false);
                    }}
                    style={{
                      padding: 10,
                      backgroundColor: "#6E5DD3",
                      borderRadius: 8,
                    }}
                  >
                    <Text style={{ color: "white" }}>Add</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      setTempDateForTime(null);
                      setTempTimeForDate(null);
                      setShowConfirm(false);
                    }}
                    style={{
                      padding: 10,
                      backgroundColor: "#E5E0FF",
                      borderRadius: 8,
                    }}
                  >
                    <Text style={{ color: "#6E5DD3" }}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* undos for custom */}
              {customReminders.map((r: any, idx: number) => (
                <View
                  key={idx}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 5,
                  }}
                >
                  <Text>
                    {r.date} at {r.time}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      setCustomReminders((prev: any) =>
                        prev.filter((_: any, i: any) => i !== idx)
                      )
                    }
                  >
                    <Ionicons
                      name="close-circle-outline"
                      size={20}
                      color="#1e1358ff"
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          {/* Add Medication Button */}
          <TouchableOpacity
            style={styles.addMedicationBtn}
            onPress={handleAddMed}
          >
            <Text style={styles.addMedicationBtnText}>Add Medication</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
);

// Main Screen
export default function AddMedicationScreen() {
  const {
    once1,
    twice1,
    twice2,
    thrice1,
    thrice2,
    thrice3,
    quad1,
    quad2,
    quad3,
    quad4,
  } = useContext(FrequencyContext);

  const [medicationName, setMedicationName] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [openDosage, setOpenDosage] = useState(false);
  const [dosage, setDosage] = useState("");
  const [openStrength, setOpenStrength] = useState(false);
  const [strength, setStrength] = useState("");
  const strengthItems = useMemo(() => {
    const possStrengths = [...new Set(strengthMatch(medicationName))];
    return possStrengths.map((str) => ({ label: str, value: str }));
  }, [medicationName]);
  const [customReminders, setCustomReminders] = useState<
    { date: string; time: string }[]
  >([]);
  const [selectedFrequency, setSelectedFrequency] = useState("");
  const [scheduleMode, setScheduleMode] = useState<"frequency" | "custom">(
    "frequency"
  );
  const [startDate, setStartDate] = useState(new Date());

  const handleMedicationChange = useCallback((text: string) => {
    setMedicationName(text);
    if (text.length === 0) setSuggestions([]);
    else {
      const filteredNames = uniqueNames.filter((med) =>
        med.toLowerCase().includes(text.toLowerCase())
      );
      const filteredSynonyms = synonyms.filter((med) =>
        med.toLowerCase().includes(text.toLowerCase())
      );
      setSuggestions(
        [...new Set([...filteredNames, ...filteredSynonyms])].slice(0, 10)
      );
    }
  }, []);

  const handleSuggestionSelect = useCallback((item: string) => {
    setMedicationName(item);
    setSuggestions([]);
  }, []);

  const onOpenDosage = useCallback(() => {
    setOpenStrength(false);
    setOpenDosage(true);
  }, []);
  const onOpenStrength = useCallback(() => {
    setOpenDosage(false);
    setOpenStrength(true);
  }, []);

  {
    /* SUPABASE INTEGRATION START */
  }

  const { session } = useSession();
  const supabase = createSupabase(session);
  const { user } = useUser();

  const resetForm = () => {
    setMedicationName("");
    setDosage("");
    setStrength("");
    setScheduleMode("frequency");
    setSelectedFrequency("");
    setStartDate(new Date());
    setCustomReminders([]);
  };

  const insertMed = async () => {
    try {
      const { data, error } = await supabase.from("medications").insert([
        {
          user_id: user!.id,
          medication_name: medicationName,
          dosage,
          strength,
          schedule_mode: scheduleMode,
          selected_frequency: selectedFrequency,
          start_date: startDate,
          custom_reminders: customReminders,
        },
      ]);
      if (error) throw error;
      Alert.alert("Your medication was added!");
      resetForm();
    } catch (err: any) {
      console.log(err);
      Alert.alert(err.message);
    }
  };
  //   const FREQUENCIES = [
  //   { id: "1", label: "Once daily" },
  //   { id: "2", label: "Twice daily" },
  //   { id: "3", label: "Three times daily" },
  //   { id: "4", label: "Four times daily" },
  //   { id: "5", label: "As needed" },
  // ];

  const createNotifications = async () => {
    if (scheduleMode == "frequency") {
      if (selectedFrequency == "Once daily") {
        localNotify(
          "Medication Reminder!",
          "It's time to take " + medicationName,
          once1
        );
      }
      if (selectedFrequency == "Twice daily") {
        localNotify(
          "Medication Reminder!",
          "It's time to take " + medicationName,
          twice1
        );
        localNotify(
          "Medication Reminder!",
          "It's time to take " + medicationName,
          twice2
        );
      }
      if (selectedFrequency == "Three times daily") {
        localNotify(
          "Medication Reminder!",
          "It's time to take " + medicationName,
          thrice1
        );
        localNotify(
          "Medication Reminder!",
          "It's time to take " + medicationName,
          thrice2
        );
        localNotify(
          "Medication Reminder!",
          "It's time to take " + medicationName,
          thrice3
        );
      }
      if (selectedFrequency == "Four times daily") {
        localNotify(
          "Medication Reminder!",
          "It's time to take " + medicationName,
          quad1
        );
        localNotify(
          "Medication Reminder!",
          "It's time to take " + medicationName,
          quad2
        );
        localNotify(
          "Medication Reminder!",
          "It's time to take " + medicationName,
          quad3
        );
        localNotify(
          "Medication Reminder!",
          "It's time to take " + medicationName,
          quad4
        );
      }
    }
    if (scheduleMode === "custom") {
      customReminders.forEach((reminder) => {
        const [year, month, day] = reminder.date.split("-").map(Number);
        const [hours, minutes] = reminder.time.split(":").map(Number);
        const notifyDate = new Date(year, month - 1, day, hours, minutes);

        if (notifyDate > new Date()) {
          localNotify(
            "Medication Reminder!",
            `It's time to take ${medicationName}`,
            notifyDate as any
          );
        }
      });
    }
  };

  const handleAddMed = async () => {
    const { data, error } = await supabase
      .from("medications")
      .select()
      .eq("user_id", user!.id);

    if (
      medicationName.length == 0 ||
      dosage.length == 0 ||
      strength.length == 0 ||
      (scheduleMode == "frequency" &&
        (selectedFrequency.length == 0 || startDate == null)) ||
      (scheduleMode == "custom" && customReminders.length == 0)
    ) {
      Alert.alert("Please fill out all required fields.");
      return;
    }

    const matched = data!.find(
      (item) =>
        medicationName == item.medication_name &&
        dosage == item.dosage &&
        strength == item.strength
    );
    if (matched) {
      Alert.alert(
        "matchedEvent",
        "This medication matches a medication in your list",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Keep both",
            onPress: () => {
              createNotifications();
              insertMed();
            },
          },
          {
            text: "Delete original",
            onPress: async () => {
              const deleted = await supabase
                .from("medications")
                .delete()
                .eq("id", matched.id);
              createNotifications();
              insertMed();
            },
          },
        ]
      );
      return;
    }
    createNotifications();
    insertMed();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <ScrollView
        style={{ flex: 1, backgroundColor: "#ffffffff" }}
        contentContainerStyle={{ paddingBottom: 100 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Header
          medicationName={medicationName}
          onMedicationChange={handleMedicationChange}
          suggestions={suggestions}
          onSuggestionSelect={handleSuggestionSelect}
          openDosage={openDosage}
          setOpenDosage={setOpenDosage}
          dosage={dosage}
          setDosage={setDosage}
          openStrength={openStrength}
          setOpenStrength={setOpenStrength}
          strength={strength}
          setStrength={setStrength}
          strengthItems={strengthItems}
          customReminders={customReminders}
          setCustomReminders={setCustomReminders}
          selectedFrequency={selectedFrequency}
          setSelectedFrequency={setSelectedFrequency}
          scheduleMode={scheduleMode}
          setScheduleMode={setScheduleMode}
          onOpenDosage={onOpenDosage}
          onOpenStrength={onOpenStrength}
          handleAddMed={handleAddMed}
          startDate={startDate}
          setStartDate={setStartDate}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#f8f4fe", padding: 20 },
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
  },
  subHeading: { fontSize: 16, color: "#4B4B4B", marginBottom: 20 },
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
  label: { fontSize: 16, fontWeight: "600", marginBottom: 8, color: "#222222" },
  textInput: {
    borderWidth: 1,
    borderColor: "#C7C3F4",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 5,
  },
  suggestionsBox: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#C7C3F4",
    borderRadius: 8,
    marginBottom: 10,
  },
  suggestionItem: { padding: 10, fontSize: 16, color: "#222222" },
  dropdown: {
    borderColor: "#C7C3F4",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  dropdownContainer: {
    borderColor: "#C7C3F4",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  dropdownText: { color: "#222222", fontSize: 16 },
  dosageInput: {
    borderWidth: 1,
    borderColor: "#C7C3F4",
    borderRadius: 8,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    height: 50,
    fontSize: 16,
    color: "#222222",
  },
  addMedicationBtn: {
    marginTop: 5,
    backgroundColor: "#6E5DD3",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  addMedicationBtnText: { color: "#fff", fontSize: 18, fontWeight: "700" },
  frequencyOption: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#C7C3F4",
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedFrequencyOption: {
    backgroundColor: "#6E5DD3",
    borderColor: "#6E5DD3",
  },
  frequencyText: { color: "#222222" },
  selectedFrequencyText: { color: "#fff", fontWeight: "700" },
  modeButton: {
    flex: 1,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#C7C3F4",
    borderRadius: 8,
    marginRight: 5,
    alignItems: "center",
  },
  selectedModeButton: { backgroundColor: "#6E5DD3", borderColor: "#6E5DD3" },
  modeButtonText: { color: "#222222", fontWeight: "600" },
  selectedModeButtonText: { color: "#fff", fontWeight: "700" },
  dateButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#C7C3F4",
    borderRadius: 8,
    marginBottom: 10,
  },
  dateButtonText: { color: "#222222", fontSize: 16 },
});
