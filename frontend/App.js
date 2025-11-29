import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import StatsScreen from "./src/screens/StatsScreen";
import {
  addListing,
  addToWishlist,
  clearAllData,
  getListings,
  getWishlist,
} from "./utils/storage";

export default function App() {
  const [logs, setLogs] = useState([]);
  const [showStats, setShowStats] = useState(false);

  const addLog = (msg) => setLogs((prev) => [...prev, msg]);

  useEffect(() => {
    const runTests = async () => {
      addLog("Starting Storage Tests...");

      try {
        await clearAllData();
        addLog("Cleared existing data");

        const listings = await getListings();
        addLog(`Fetched ${listings.length} listings (seeded)`);

        const newBook = {
          title: "Test Book",
          author: "Test Author",
          price: "999",
          status: "Available",
        };
        const added = await addListing(newBook);
        addLog(`Added book: ${added.title} (ID: ${added.id})`);

        const updatedListings = await getListings();
        addLog(`Total listings after add: ${updatedListings.length}`);

        await addToWishlist(added.id);
        const wishlist = await getWishlist();
        addLog(
          `Wishlist size: ${wishlist.length} (Contains ${
            added.id
          }: ${wishlist.includes(added.id)})`
        );

        addLog("Tests Completed Successfully!");
      } catch (e) {
        addLog(`Test Failed: ${e.message}`);
        console.error(e);
      }
    };

    runTests();
  }, []);

  if (showStats) {
    return (
      <View style={styles.container}>
        <View style={styles.navBar}>
          <TouchableOpacity onPress={() => setShowStats(false)}>
            <Text style={styles.backButton}>← Back to Tests</Text>
          </TouchableOpacity>
        </View>
        <StatsScreen />
        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Storage Verification</Text>
      <TouchableOpacity
        style={styles.statsButton}
        onPress={() => setShowStats(true)}
      >
        <Text style={styles.statsButtonText}>📊 View Statistics Dashboard</Text>
      </TouchableOpacity>
      <ScrollView style={styles.logs}>
        {logs.map((log, i) => (
          <Text key={i} style={styles.logText}>
            • {log}
          </Text>
        ))}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
  },
  navBar: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  backButton: {
    fontSize: 16,
    color: "#4A90E2",
    fontWeight: "600",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  statsButton: {
    backgroundColor: "#4A90E2",
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  statsButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  logs: {
    flex: 1,
    paddingHorizontal: 20,
  },
  logText: {
    fontSize: 14,
    marginBottom: 5,
    fontFamily: "monospace",
  },
});
