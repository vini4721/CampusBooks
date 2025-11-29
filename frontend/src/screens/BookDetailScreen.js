import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAppContext } from "../context/AppContext";
import { COLORS } from "../utils/constants";

export default function BookDetailScreen({ route, navigation }) {
  const { book } = route.params;
  const { wishlist, addWishlistItem, removeWishlistItem } = useAppContext();
  const [inWishlist, setInWishlist] = useState(false);
  const similarBooks = [
    { id: "3", title: "Design Patterns", author: "Gang of Four" },
    { id: "4", title: "Clean Code", author: "Robert Martin" },
  ];

  useEffect(() => {
    setInWishlist(wishlist.some((item) => item.id === book.id));
  }, [wishlist, book.id]);

  const handleContact = () => {
    Alert.alert(
      "Contact Seller",
      `Email: ${book.contact}\n\nYou can reach out to discuss this book!`,
      [{ text: "OK" }]
    );
  };

  const toggleWishlist = async () => {
    try {
      if (inWishlist) {
        await removeWishlistItem(book.id);
      } else {
        await addWishlistItem(book);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to update wishlist");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>by {book.author}</Text>
      </View>

      <View style={styles.details}>
        <View style={styles.row}>
          <Text style={styles.label}>Category:</Text>
          <Text style={styles.value}>{book.category}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Condition:</Text>
          <Text style={styles.value}>{book.condition}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Type:</Text>
          <Text style={[styles.value, styles.typeBadge]}>
            {book.listingType}
          </Text>
        </View>

        {book.price > 0 && (
          <View style={styles.row}>
            <Text style={styles.label}>Price:</Text>
            <Text style={styles.price}>₹{book.price}</Text>
          </View>
        )}

        <View style={styles.row}>
          <Text style={styles.label}>Status:</Text>
          <Text
            style={[
              styles.value,
              book.status === "Available" ? styles.available : styles.sold,
            ]}
          >
            {book.status}
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.primaryButton} onPress={handleContact}>
          <Text style={styles.buttonText}>Contact Seller</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.secondaryButton, inWishlist && styles.inWishlist]}
          onPress={toggleWishlist}
        >
          <Text style={styles.secondaryButtonText}>
            {inWishlist ? "💚 In Wishlist" : "🤍 Add to Wishlist"}
          </Text>
        </TouchableOpacity>
      </View>

      {similarBooks.length > 0 && (
        <View style={styles.similarSection}>
          <Text style={styles.sectionTitle}>Similar Books</Text>
          {similarBooks.map((similar) => (
            <TouchableOpacity key={similar.id} style={styles.similarCard}>
              <Text style={styles.similarTitle}>{similar.title}</Text>
              <Text style={styles.similarAuthor}>{similar.author}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: 20,
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 8,
  },
  author: {
    fontSize: 16,
    color: COLORS.textLight,
  },
  details: {
    padding: 20,
    backgroundColor: COLORS.card,
    marginTop: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: COLORS.textLight,
    fontWeight: "500",
  },
  value: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: "600",
  },
  typeBadge: {
    color: COLORS.secondary,
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.success,
  },
  available: {
    color: COLORS.success,
  },
  sold: {
    color: COLORS.danger,
  },
  actions: {
    padding: 20,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  inWishlist: {
    borderColor: COLORS.success,
    backgroundColor: "#E8F5E9",
  },
  secondaryButtonText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "600",
  },
  similarSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 12,
  },
  similarCard: {
    backgroundColor: COLORS.card,
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  similarTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
  },
  similarAuthor: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 4,
  },
});
