# GitHub Copilot Instructions for Arizona Trip

## Project Overview

This is an Arizona road trip planning application featuring an interactive map-based itinerary viewer. The project helps visualize a family trip from Phoenix to Sedona to the Grand Canyon, with various stops and attractions marked along the route.

**Purpose:** Provide an interactive, user-friendly interface to explore trip destinations, view detailed information about each location, calculate driving routes, and plan daily activities.

## Tech Stack

- **HTML5** - Semantic markup for structure
- **CSS3** - Custom styling with CSS variables for theming
- **Vanilla JavaScript** - No frameworks, pure ES6+ JavaScript
- **Leaflet.js** (v1.9.4) - Interactive mapping library
- **Google Fonts** - Inter font family
- **No build tools** - Direct browser execution, no compilation needed

## Project Structure

```
/
├── .github/
│   └── copilot-instructions.md (this file)
├── map.html                     # Main HTML page with map container
├── map.css                      # All styles including themes and responsive design
├── map.js                       # All JavaScript logic for map, markers, routing
├── Planning.md                  # Original trip planning document
├── EvelynsPlan.md              # Detailed timed itinerary
├── images/                      # (Optional) Image assets
└── .agent/                      # Agent-specific configurations (do not modify)
```

## Coding Standards

### HTML
- Use semantic HTML5 elements
- Keep markup clean and minimal
- Include accessibility attributes (ARIA labels, alt text)
- Use descriptive IDs and classes with kebab-case

### CSS
- Use CSS custom properties (variables) for theming
- Follow mobile-first responsive design principles
- Organize styles by component/section with clear comments
- Use consistent spacing (multiples of 4px)
- Keep selectors specific but not overly nested
- Support light, terrain, and dark themes via CSS variables

### JavaScript
- Write modern ES6+ JavaScript (const/let, arrow functions, template literals)
- Use descriptive variable and function names in camelCase
- Keep functions small and focused on a single responsibility
- Add comments for complex logic, not obvious code
- Avoid global namespace pollution - use IIFE or modules where appropriate
- Handle errors gracefully with try-catch and user feedback
- Use Leaflet.js API conventions for map interactions

### Leaflet.js Patterns
- Initialize map with `L.map()`
- Use tile layers from OpenStreetMap or similar providers
- Create custom markers with `L.marker()` or `L.circleMarker()`
- Implement popups for location details
- Use GeoJSON for route polylines
- Handle map events (click, zoom, move) appropriately

## Development Guidelines

### When Adding Features
1. **Maintain simplicity** - This is a lightweight travel planning tool, not a complex web app
2. **Preserve existing functionality** - Don't break the interactive map, markers, or routing
3. **Test across themes** - Ensure changes work with light, terrain, and dark themes
4. **Mobile-first** - Always consider mobile/tablet views
5. **Keep it fast** - No heavy dependencies or unnecessary API calls

### When Modifying map.js
- The file contains all application logic including:
  - Map initialization and configuration
  - Location data (hotels, attractions, stops)
  - Marker creation and management
  - Routing functionality
  - Event handlers for UI interactions
  - Theme switching logic
  - Sidebar and panel management
- When adding new locations, follow the existing data structure
- Preserve the location categorization system (hotels, flights, parks, attractions, etc.)

### When Modifying map.css
- Maintain the existing CSS variable structure for theming
- Preserve responsive breakpoints
- Keep animations smooth and subtle
- Ensure sufficient color contrast for accessibility
- Test in both light and dark modes

### When Modifying map.html
- Keep the structure minimal and semantic
- Maintain existing IDs and classes used by JavaScript
- Preserve Leaflet.js CDN links and versions
- Keep accessibility features (ARIA attributes, semantic elements)

## Testing and Validation

### Before Committing
1. **Visual testing** - Open `map.html` in a browser and verify:
   - Map loads correctly
   - All markers appear in correct positions
   - Popups display proper information
   - Routing between markers works
   - Theme switching functions properly
   - Sidebar and panels behave correctly
   - Mobile view is functional
2. **Browser console** - Check for JavaScript errors
3. **Cross-browser** - Test in Chrome, Firefox, and Safari if possible
4. **Responsive design** - Test on mobile and tablet screen sizes

### No Build Process
- This project runs directly in the browser
- No npm/build tools are required
- Simply open `map.html` in a browser to test changes
- No linting or testing frameworks currently configured

## Important Constraints

### Do Not
- Add unnecessary dependencies or frameworks
- Introduce a build process unless absolutely required
- Remove or modify existing location data without discussion
- Break the single-page application architecture
- Add server-side code (this is a static site)
- Modify files in `.agent/` directory (agent-specific configs)

### Do
- Keep the codebase simple and maintainable
- Add comments for non-obvious logic
- Consider mobile users in all changes
- Preserve the family-friendly nature of the content
- Maintain fast page load times
- Follow existing code patterns and conventions

## Data Structure

### Location Object Format
```javascript
{
  name: "Location Name",
  lat: latitude,
  lng: longitude,
  category: "hotels|flights|parks|attractions|suggested|evelyn|food|custom",
  description: "Detailed description with HTML",
  day: dayNumber, // optional
  time: "timeString", // optional
  address: "Full address", // optional
  confirmation: "confirmationNumber" // optional for hotels
}
```

## Contributing

When making changes:
1. Understand the existing code structure first
2. Make minimal, focused changes
3. Test thoroughly in browser
4. Ensure responsive design is maintained
5. Verify all themes work correctly
6. Check for console errors
7. Validate HTML/CSS if adding new markup

## Resources

- [Leaflet.js Documentation](https://leafletjs.com/reference.html)
- [OpenStreetMap Tile Servers](https://wiki.openstreetmap.org/wiki/Tile_servers)
- [MDN Web Docs](https://developer.mozilla.org/) - For HTML/CSS/JS references

## Questions?

For questions about trip planning content, refer to `Planning.md` and `EvelynsPlan.md`.
For technical questions, check the inline code comments or Leaflet.js documentation.
