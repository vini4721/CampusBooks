# CampusBooks - Statistics Dashboard Feature

## 🎯 Feature Overview
Added a comprehensive **Statistics Dashboard** that provides real-time marketplace analytics for the CampusBooks app. This dashboard helps students understand market trends, pricing insights, and book availability at a glance.

## 📊 What's New

### Statistics Screen (`src/screens/StatsScreen.js`)
A visually appealing analytics dashboard displaying:

#### 1. **Overview Cards**
- Total number of listings
- Available books count
- Sold books count
- Average price across all listings

#### 2. **Category Distribution**
- Horizontal bar chart showing top 5 book categories
- Visual representation of category popularity
- Book count and percentage for each category

#### 3. **Listing Type Breakdown**
- Distribution of Sale, Exchange, and Donation listings
- Percentage breakdown for each type
- Helps users understand marketplace dynamics

#### 4. **Price Insights**
- Lowest price in the marketplace
- Average price calculation
- Highest price listing
- Useful for price comparison and budgeting

#### 5. **Book Condition Analysis**
- Distribution of book conditions (Like New, Good, Fair, Poor)
- Count and percentage for each condition
- Helps buyers find books in their preferred condition

## 🔧 Technical Implementation

### New Files Created
1. **`frontend/src/screens/StatsScreen.js`** - Main statistics screen component with responsive design
2. **Statistics utility function** added to `frontend/utils/storage.js`

### Key Functions Added

#### `getBookStats(listings)`
Located in `utils/storage.js`, this function analyzes listing data and returns:
```javascript
{
  totalListings: number,
  availableBooks: number,
  soldBooks: number,
  avgPrice: number,
  lowestPrice: number,
  highestPrice: number,
  categoryBreakdown: Array<{category, count, percentage}>,
  listingTypeBreakdown: Array<{type, count, percentage}>,
  conditionBreakdown: Array<{condition, count, percentage}>
}
```

### Features
- **Real-time calculations** - Stats update based on current listings
- **Responsive design** - Works on all screen sizes
- **Visual components** - Color-coded cards and progress bars
- **Error handling** - Graceful fallbacks for empty data
- **Performance optimized** - Efficient data processing

## 🎨 Design Highlights
- Clean, modern card-based layout
- Color-coded statistics for quick visual scanning
- Horizontal bar charts for category distribution
- Shadow effects and rounded corners for depth
- Consistent with existing app design language

## 🚀 Usage

### Running the App
```bash
cd frontend
npm install
npx expo start
```

### Accessing the Dashboard
1. Launch the app
2. Click the **"📊 View Statistics Dashboard"** button
3. Browse through various statistics sections
4. Use the back button to return to the main screen

## 📱 Screenshots Description
The dashboard includes:
- 4 overview stat cards at the top
- Category distribution with color-coded bars
- Listing type breakdown in grid layout
- Price insights showing min/avg/max
- Condition analysis with percentages

## 💡 Future Enhancements
Potential improvements for future commits:
- Time-based trends (weekly/monthly statistics)
- Search history analytics
- Popular authors ranking
- Price trend graphs over time
- Export statistics as PDF/CSV
- Wishlist statistics integration
- User engagement metrics

## 🧪 Testing
The feature has been tested with:
- Mock data from `mockBooks.js`
- Empty data scenarios
- Various listing counts
- All book categories and conditions

## 📝 Commit Message
```
feat: Add Statistics Dashboard with marketplace analytics

- Created StatsScreen with comprehensive book marketplace insights
- Added getBookStats utility function for data analysis
- Implemented visual analytics including:
  * Category distribution charts
  * Listing type breakdown
  * Price insights (min/avg/max)
  * Book condition analysis
- Integrated stats button in main App.js for easy access
- Responsive design with color-coded stat cards
```

## 👨‍💻 Developer Notes
- Uses AsyncStorage for data persistence
- Calculations handle edge cases (empty lists, zero prices)
- Component is fully self-contained and reusable
- Follows existing code style and conventions
- No external dependencies required

---

**Created by:** Vinayak Singh  
**Date:** November 29, 2025  
**Feature Type:** Analytics & Insights
