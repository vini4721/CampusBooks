import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAppContext } from "../context/AppContext";
import { CATEGORIES, COLORS, LISTING_TYPES } from "../utils/constants";

export default function CreateListingScreen({ navigation }) {
  const { createListing } = useAppContext();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("Computer Science");
  const [condition, setCondition] = useState("Good");
  const [listingType, setListingType] = useState("Sale");
  const [price, setPrice] = useState("");
  const [contact, setContact] = useState("");

  const conditions = ["Like New", "Good", "Fair", "Poor"];

  const handleSubmit = async () => {
    if (!title || !author || !contact) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    try {
      await createListing({
        title,
        author,
        category,
        condition,
        listingType,
        price: listingType === "Sale" ? parseFloat(price) || 0 : 0,
        contact,
      });
      Alert.alert("Success", "Listing created!", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert("Error", "Failed to create listing");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Create New Listing</Text>

      <View style={styles.field}>
        <Text style={styles.label}>Title *</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter book title"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Author *</Text>
        <TextInput
          style={styles.input}
          value={author}
          onChangeText={setAuthor}
          placeholder="Enter author name"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Category</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.pills}
        >
          {CATEGORIES.filter((c) => c !== "All").map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.pill, category === cat && styles.pillActive]}
              onPress={() => setCategory(cat)}
            >
              <Text
                style={[
                  styles.pillText,
                  category === cat && styles.pillTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Condition</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.pills}
        >
          {conditions.map((cond) => (
            <TouchableOpacity
              key={cond}
              style={[styles.pill, condition === cond && styles.pillActive]}
              onPress={() => setCondition(cond)}
            >
              <Text
                style={[
                  styles.pillText,
                  condition === cond && styles.pillTextActive,
                ]}
              >
                {cond}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Listing Type</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.pills}
        >
          {LISTING_TYPES.filter((t) => t !== "All").map((type) => (
            <TouchableOpacity
              key={type}
              style={[styles.pill, listingType === type && styles.pillActive]}
              onPress={() => setListingType(type)}
            >
              <Text
                style={[
                  styles.pillText,
                  listingType === type && styles.pillTextActive,
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {listingType === "Sale" && (
        <View style={styles.field}>
          <Text style={styles.label}>Price (₹)</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            placeholder="Enter price"
            keyboardType="numeric"
          />
        </View>
      )}

      <View style={styles.field}>
        <Text style={styles.label}>Contact Info *</Text>
        <TextInput
          style={styles.input}
          value={contact}
          onChangeText={setContact}
          placeholder="Email or phone number"
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Create Listing</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 20,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: COLORS.text,
  },
  pills: {
    flexDirection: "row",
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 8,
  },
  pillActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  pillText: {
    fontSize: 14,
    color: COLORS.text,
  },
  pillTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
