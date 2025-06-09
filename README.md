# Skip Size Selector - Redesign Challenge

## Overview
This is a complete redesign of the "Choose Your Skip Size" page for WeWantWaste. The original page has been reimagined with a modern, user-friendly interface while maintaining all core functionality.

## Design Approach

### Visual Design Philosophy
- **Light & Bright**: Moved from dark theme to a clean, light design with blue-to-green gradients
- **Card-Based Layout**: Each skip option is presented as an individual card for better visual separation
- **3D Skip Visualization**: Custom CSS-based skip containers instead of product photos
- **Progressive Enhancement**: Subtle animations and hover effects for better user engagement

### Key Features
- **Responsive Design**: Fully responsive grid layout that works on mobile and desktop
- **Real-time API Integration**: Fetches live data from the WeWantWaste API with fallback handling
- **Smart Selection**: Visual feedback with checkmarks and border highlighting
- **Comprehensive Information**: Each skip shows capacity, restrictions, and pricing breakdown
- **User Guidance**: Help section with contact options and size recommendations

### Technical Implementation
- **React Hooks**: Uses useState and useEffect for state management
- **Error Handling**: Graceful fallback to mock data if API fails
- **Loading States**: Smooth loading experience with spinners
- **Accessibility**: Proper ARIA labels and keyboard navigation support

## API Integration
The component fetches skip data from:
```
https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft
```

With automatic fallback to mock data if the API is unavailable.

## Installation & Setup

```bash
# Clone the repository
git clone https://github.com/yvesP123/Skip-Size-Selector.git

# Navigate to project directory
cd skip-size-selector

# Install dependencies
npm install

# Start development server
npm start
```

## Technologies Used
- React 18+ with Hooks
- Tailwind CSS for styling
- Lucide React for icons
- Responsive CSS Grid and Flexbox

## Browser Support
- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Mobile Responsiveness
The design is fully responsive with:
- Adaptive grid layouts (1 column on mobile, 2 on tablet, 3 on desktop)
- Touch-friendly interaction areas
- Optimized typography scaling
- Fixed bottom action bar for easy mobile navigation

## Design Decisions

### Why This Approach?
1. **User-Centric**: Prioritized clarity and ease of selection
2. **Modern Aesthetics**: Clean, contemporary design that feels trustworthy
3. **Information Hierarchy**: Clear pricing, features, and recommendations
4. **Visual Consistency**: Cohesive color scheme and typography throughout
5. **Performance**: Efficient rendering with minimal re-renders

### Improvements Over Original
- Better visual hierarchy and readability
- More intuitive selection process
- Enhanced mobile experience
- Clearer pricing breakdown
- Better error handling and loading states

