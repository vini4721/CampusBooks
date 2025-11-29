import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAppContext } from "../context/AppContext";
import { COLORS } from "../utils/constants";

export default function MyListingScreen({ navigation }) {
  const { books, changeStatus, deleteListing } = useAppContext();

  const myBooks = books;

  const handleToggleStatus = async (bookId) => {
    try {
      await changeStatus(bookId);
    } catch (error) {
      Alert.alert("Error", "Failed to update status");
    }
  };

  const handleDeleteListing = (bookId) => {
    Alert.alert(
      "Delete Listing",
      "Are you sure you want to delete this listing?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteListing(bookId);
            } catch (error) {
              Alert.alert("Error", "Failed to delete listing");
            }
          },
        },
      ]
    );
  };

  const renderBook = ({ item }) => (
    <View style={styles.bookCard}>
      <TouchableOpacity
        style={styles.bookInfo}
        onPress={() => navigation.navigate("BookDetail", { book: item })}
      >
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.author}>{item.author}</Text>
        <View style={styles.badges}>
          <Text style={styles.badge}>{item.listingType}</Text>
          <Text
            style={[
              styles.badge,
              item.status === "Available" ? styles.available : styles.sold,
            ]}
          >
            {item.status}
          </Text>
        </View>
        {item.price > 0 && <Text style={styles.price}>₹{item.price}</Text>}
      </TouchableOpacity>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleToggleStatus(item.id)}
        >
          <Text style={styles.actionText}>
            {item.status === "Available" ? "Mark Sold" : "Mark Available"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDeleteListing(item.id)}
        >
          <Text style={[styles.actionText, styles.deleteText]}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>My Listings</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("CreateListing")}
        >
          <Text style={styles.addButtonText}>+ New</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={myBooks}
        renderItem={renderBook}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No listings yet</Text>
            <TouchableOpacity
              style={styles.emptyButton}
              onPress={() => navigation.navigate("CreateListing")}
            >
              <Text style={styles.emptyButtonText}>
                Create Your First Listing
              </Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.text,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  list: {
    padding: 16,
  },
  bookCard: {
    backgroundColor: COLORS.card,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  bookInfo: {
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 4,
  },
  author: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 8,
  },
  badges: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
  },
  badge: {
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: COLORS.background,
    color: COLORS.text,
  },
  available: {
    color: COLORS.success,
  },
  sold: {
    color: COLORS.danger,
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.success,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  actionText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  deleteButton: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.danger,
  },
  deleteText: {
    color: COLORS.danger,
  },
  empty: {
    alignItems: "center",
    marginTop: 60,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.textLight,
    marginBottom: 20,
  },
  emptyButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
