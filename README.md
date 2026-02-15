# Arizona Trip Map

An interactive map-based itinerary viewer for planning a family road trip from Phoenix to Sedona to the Grand Canyon.

## Features

- **Interactive Map**: View all trip locations on an interactive Leaflet map
- **Routing**: Calculate driving routes between locations with distance and time estimates
- **Day Planner**: Organize locations into daily itineraries
- **Multiple Themes**: Light, terrain, and dark map views
- **Custom Locations**: Add your own stops and attractions

## Usage

Simply open `map.html` in a web browser. No build process or server required!

## Routing Configuration

The app supports two routing providers:

### OSRM (Default - Free)
- No API key required
- Uses OpenStreetMap data
- **Note**: Distance and time calculations may differ from Google Maps
- Works out of the box

### Google Maps Directions API (Optional - More Accurate)
For routing that matches Google Maps results exactly:

1. Get a Google Maps API key:
   - Visit [Google Cloud Console](https://console.cloud.google.com/google/maps-apis/)
   - Enable the "Directions API"
   - Create an API key with appropriate restrictions

2. Configure the app:
   - Open `map.js`
   - Find the `routingConfig` section at the top
   - Set `provider: 'google'`
   - Add your API key: `googleMapsApiKey: 'YOUR_API_KEY_HERE'`

Example configuration:
```javascript
const routingConfig = {
  provider: 'google',  // Changed from 'osrm'
  googleMapsApiKey: 'AIza...YOUR_KEY...', // Add your key
  osrmServer: 'https://router.project-osrm.org'
};
```

**Important**: Google Maps Directions API requires billing to be enabled, though it includes a free tier for most personal use.

## Why the Difference?

OSRM (Open Source Routing Machine) and Google Maps use different:
- Road network data sources
- Routing algorithms
- Speed profiles and assumptions
- Traffic models

For the specific route mentioned in testing (Drury Inn → Montezuma Castle → Montezuma Well → Los Abrigados):
- **Google Maps**: 180 miles, 3 hours 8 minutes
- **OSRM**: Results may vary based on current data

If precise distance/time matching with Google Maps is important for your trip planning, use the Google Maps provider option.

## Tech Stack

- **HTML5** - Structure
- **CSS3** - Styling with custom themes
- **Vanilla JavaScript** - No frameworks
- **Leaflet.js** - Interactive mapping
- **OSRM** - Default routing provider
- **Google Maps Directions API** - Optional routing provider

## Project Structure

```
/
├── map.html        # Main HTML page
├── map.css         # Styles and themes
├── map.js          # Application logic and routing
├── Planning.md     # Trip planning notes
├── EvelynsPlan.md  # Detailed timed itinerary
└── images/         # Location images
```

## Contributing

This is a personal family trip planner. Feel free to fork and adapt for your own trips!

## License

Personal use only.
