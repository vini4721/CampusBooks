import { useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { getBookStats, getListings } from "../../utils/storage";
import { COLORS } from "../utils/constants";

export default function StatsScreen() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const listings = await getListings();
      const statsData = await getBookStats(listings);
      setStats(statsData);
    } catch (error) {
      console.error("Error loading stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading statistics...</Text>
      </View>
    );
  }

  if (!stats) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No data available</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>📊 Marketplace Insights</Text>

      {/* Overview Cards */}
      <View style={styles.overviewGrid}>
        <StatCard
          title="Total Listings"
          value={stats.totalListings}
          icon="📚"
          color={COLORS.primary}
        />
        <StatCard
          title="Available"
          value={stats.availableBooks}
          icon="✅"
          color={COLORS.success}
        />
        <StatCard
          title="Sold"
          value={stats.soldBooks}
          icon="💰"
          color={COLORS.secondary}
        />
        <StatCard
          title="Avg Price"
          value={`₹${stats.avgPrice}`}
          icon="💵"
          color={COLORS.warning}
        />
      </View>

      {/* Category Distribution */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📑 Category Distribution</Text>
        {stats.categoryBreakdown.map((cat, index) => (
          <View key={index} style={styles.barContainer}>
            <Text style={styles.barLabel}>{cat.category}</Text>
            <View style={styles.barWrapper}>
              <View
                style={[
                  styles.bar,
                  {
                    width: `${cat.percentage}%`,
                    backgroundColor: getBarColor(index),
                  },
                ]}
              />
              <Text style={styles.barValue}>{cat.count}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Listing Type Breakdown */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🏷️ Listing Types</Text>
        <View style={styles.typeGrid}>
          {stats.listingTypeBreakdown.map((type, index) => (
            <View key={index} style={styles.typeCard}>
              <Text style={styles.typeLabel}>{type.type}</Text>
              <Text style={styles.typeValue}>{type.count}</Text>
              <Text style={styles.typePercentage}>{type.percentage}%</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Price Insights */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💰 Price Insights</Text>
        <View style={styles.priceGrid}>
          <PriceCard label="Lowest" value={`₹${stats.lowestPrice}`} />
          <PriceCard label="Average" value={`₹${stats.avgPrice}`} />
          <PriceCard label="Highest" value={`₹${stats.highestPrice}`} />
        </View>
      </View>

      {/* Condition Analysis */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⭐ Book Conditions</Text>
        {stats.conditionBreakdown.map((cond, index) => (
          <View key={index} style={styles.conditionRow}>
            <Text style={styles.conditionLabel}>{cond.condition}</Text>
            <View style={styles.conditionValue}>
              <Text style={styles.conditionCount}>{cond.count} books</Text>
              <Text style={styles.conditionPercentage}>
                ({cond.percentage}%)
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

// Stat Card Component
const StatCard = ({ title, value, icon, color }) => (
  <View style={[styles.statCard, { borderLeftColor: color }]}>
    <Text style={styles.statIcon}>{icon}</Text>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statTitle}>{title}</Text>
  </View>
);

// Price Card Component
const PriceCard = ({ label, value }) => (
  <View style={styles.priceCard}>
    <Text style={styles.priceLabel}>{label}</Text>
    <Text style={styles.priceValue}>{value}</Text>
  </View>
);

// Helper function for bar colors
const getBarColor = (index) => {
  const colors = [
    COLORS.primary,
    COLORS.secondary,
    COLORS.success,
    COLORS.warning,
    "#9B59B6",
    "#E67E22",
    "#1ABC9C",
    "#34495E",
  ];
  return colors[index % colors.length];
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },
  loadingText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: COLORS.textLight,
  },
  errorText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: COLORS.danger,
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 20,
  },
  overviewGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    width: (Dimensions.get("window").width - 48) / 2,
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    color: COLORS.textLight,
    textTransform: "uppercase",
  },
  section: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 16,
  },
  barContainer: {
    marginBottom: 12,
  },
  barLabel: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 6,
    fontWeight: "500",
  },
  barWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  bar: {
    height: 24,
    borderRadius: 4,
    minWidth: 30,
  },
  barValue: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
  },
  typeGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  typeCard: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  typeLabel: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 6,
  },
  typeValue: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 2,
  },
  typePercentage: {
    fontSize: 12,
    color: COLORS.secondary,
    fontWeight: "600",
  },
  priceGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  priceCard: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  priceLabel: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 6,
  },
  priceValue: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.success,
  },
  conditionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  conditionLabel: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: "500",
  },
  conditionValue: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  conditionCount: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
  },
  conditionPercentage: {
    fontSize: 12,
    color: COLORS.textLight,
  },
});
