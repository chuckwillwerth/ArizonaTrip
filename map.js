// ── Routing Configuration ──
// This app supports two routing providers:
// 
// 1. OSRM (Open Source Routing Machine) - FREE, no API key required
//    - Default provider
//    - May show different distances/times compared to Google Maps
//    - Uses OpenStreetMap data
//
// 2. Google Maps Directions API - Requires API key and billing
//    - More accurate, matches Google Maps results
//    - To use: Set provider to 'google' and add your API key below
//    - Get key at: https://console.cloud.google.com/google/maps-apis/
//    - Uses Google Maps JavaScript SDK (client-side compatible)
//
const routingConfig = {
  provider: localStorage.getItem('routingProvider') || 'osrm', // 'osrm' (free) or 'google' (requires API key)
  googleMapsApiKey: 'AIzaSyCExmLKD8OHFGuRnGdGt4Vtu7NlDECDvjU', // Add your Google Maps API key here for more accurate routing
  osrmServer: 'https://router.project-osrm.org'
};

// ── Location Data ──
const locations = [
  // Itinerary stops
  {
    id: 'phoenix-airport',
    name: 'Phoenix Sky Harbor Airport',
    day: 'Saturday, Feb 14',
    type: 'flight',
    lat: 33.4373, lng: -112.0078,
    color: '#6366f1',
    image: 'images/phoenix_airport.png',
    details: `<strong>Arrival:</strong> AA2134, 7:28pm<br><strong>Confirmation:</strong> OTVVOR<br><em>BOS → PHL → PHX</em>`
  },
  {
    id: 'drury-inn',
    name: 'Drury Inn & Suites Phoenix Airport',
    day: 'Saturday, Feb 14',
    type: 'hotel',
    lat: 33.4225, lng: -111.9877,
    color: '#f59e0b',
    image: 'images/drury_inn.png',
    details: `<strong>Confirmation:</strong> #5034228860<br><strong>Phone:</strong> +1 800-378-7946<br><strong>Address:</strong> 3333 E University Dr, Phoenix, AZ 85034`
  },
  {
    id: 'los-abrigados',
    name: 'Hilton Los Abrigados Resort & Spa',
    day: 'Sunday–Monday, Feb 15–16',
    type: 'hotel',
    lat: 34.8558, lng: -111.7617,
    color: '#f59e0b',
    image: 'images/los_abrigados.png',
    details: `<strong>Confirmation:</strong> #3410286177<br><strong>Phone:</strong> +1 928-282-1777<br><strong>Address:</strong> 160 Portal Ln, Sedona, AZ 86336`
  },
  {
    id: 'kachina-lodge',
    name: 'Kachina Lodge (Grand Canyon)',
    day: 'Tuesday, Feb 17',
    type: 'hotel',
    lat: 36.0544, lng: -112.1401,
    color: '#f59e0b',
    image: 'images/kachina_lodge.png',
    details: `<strong>Confirmation:</strong> #20216358<br><strong>Address:</strong> 1 El Tovar Rd, Grand Canyon Village, AZ 86023<br><strong>Check-in:</strong> 4pm`
  },
  {
    id: 'phoenix-depart',
    name: 'Phoenix Airport (Departure)',
    day: 'Friday, Feb 20',
    type: 'flight',
    lat: 33.4373, lng: -112.0078,
    color: '#6366f1',
    image: 'images/phoenix_airport.png',
    details: `<strong>Flight:</strong> AA1385<br><strong>Departs:</strong> 4:50pm → Boston 11:35pm`
  },

  // Possible stops: Phoenix → Sedona
  {
    id: 'montezuma-castle',
    name: 'Montezuma Castle',
    day: null,
    type: 'nature',
    lat: 34.6115, lng: -111.8350,
    color: '#10b981',
    image: 'images/montezuma_castle.png',
    details: `<strong>Route:</strong> Between Phoenix & Sedona<br>National Monument — ancient cliff dwelling`
  },
  {
    id: 'usery-mountain',
    name: 'Usery Mountain Regional Park',
    day: null,
    type: 'nature',
    lat: 33.4784, lng: -111.6147,
    color: '#10b981',
    image: 'images/usery_mountain.png',
    details: `<strong>Route:</strong> Between Phoenix & Sedona<br>On Evelyn's itinerary — hikes among cacti<br><em>Note: Adds driving — save for way back?</em>`
  },

  // Possible stops: Sedona / GC / After
  {
    id: 'williams-bearizona',
    name: 'Bearizona Wildlife Park (Williams)',
    day: null,
    type: 'attraction',
    lat: 35.2495, lng: -112.1871,
    color: '#10b981',
    image: 'images/bearizona.png',
    details: `<strong>Route:</strong> Near Grand Canyon<br>Drive-through wildlife park<br><em>Nora really wants to go!</em>`
  },
  {
    id: 'jerome',
    name: 'Jerome',
    day: null,
    type: 'attraction',
    lat: 34.7489, lng: -112.1138,
    color: '#10b981',
    image: 'images/jerome.png',
    details: `<strong>Route:</strong> Between Sedona & Prescott<br>Historic ghost town — Papa recommended`
  },
  {
    id: 'flagstaff',
    name: 'Flagstaff',
    day: null,
    type: 'attraction',
    lat: 35.1983, lng: -111.6513,
    color: '#10b981',
    image: 'images/flagstaff.png',
    details: `<strong>Route:</strong> Between Sedona & Grand Canyon<br>Mountain town with shops & restaurants`
  },
  {
    id: 'meteor-crater',
    name: 'Meteor Crater',
    day: null,
    type: 'nature',
    lat: 35.0275, lng: -111.0228,
    color: '#10b981',
    image: 'images/meteor_crater.png',
    details: `<strong>Route:</strong> East of Flagstaff<br>Best-preserved meteorite impact site on Earth`
  },
  {
    id: 'prescott',
    name: 'Prescott (Watson Lake & Courthouse Square)',
    day: null,
    type: 'nature',
    lat: 34.5400, lng: -112.4685,
    color: '#10b981',
    image: 'images/prescott.png',
    details: `<strong>Route:</strong> Southwest of Sedona<br>Watson Lake, Courthouse Square`
  },
  {
    id: 'white-tank',
    name: 'White Tank Mountain Regional Park',
    day: null,
    type: 'nature',
    lat: 33.5764, lng: -112.5460,
    color: '#10b981',
    image: 'images/white_tank.png',
    details: `<strong>Route:</strong> West of Phoenix<br>Similar to Usery Mountain Park`
  },

  // ⭐ Suggested family-friendly sites
  {
    id: 'desert-botanical',
    name: 'Desert Botanical Garden',
    day: null,
    type: 'suggested',
    lat: 33.4617, lng: -111.9446,
    color: '#f97316',
    image: 'images/desert_botanical.png',
    details: `<strong>Area:</strong> Phoenix<br>Stunning cacti trails, desert light exhibits, great photo ops. Easy walk, fun for all ages.`
  },
  {
    id: 'mim',
    name: 'Musical Instrument Museum (MIM)',
    day: null,
    type: 'suggested',
    lat: 33.6678, lng: -111.9780,
    color: '#f97316',
    image: 'images/musical_instrument_museum.png',
    details: `<strong>Area:</strong> Phoenix<br>World-class interactive museum — play instruments from around the globe. Teens love it!`
  },
  {
    id: 'out-of-africa',
    name: 'Out of Africa Wildlife Park',
    day: null,
    type: 'suggested',
    lat: 34.5639, lng: -111.8541,
    color: '#f97316',
    image: 'images/out_of_africa.png',
    details: `<strong>Area:</strong> Camp Verde (between Phoenix & Sedona)<br>Up-close animal encounters, zip lines, safari rides. Right on the route!`
  },
  {
    id: 'slide-rock',
    name: 'Slide Rock State Park',
    day: null,
    type: 'suggested',
    lat: 34.9087, lng: -111.7512,
    color: '#f97316',
    image: 'images/slide_rock.png',
    details: `<strong>Area:</strong> Sedona (Oak Creek Canyon)<br>Natural water slide & red rock swimming hole. <em>Note: February may be cold for swimming, but the hike and scenery are worth it.</em>`
  },
  {
    id: 'chapel-holy-cross',
    name: 'Chapel of the Holy Cross',
    day: null,
    type: 'suggested',
    lat: 34.8383, lng: -111.7638,
    color: '#f97316',
    image: 'images/chapel_holy_cross.png',
    details: `<strong>Area:</strong> Sedona<br>Dramatic chapel built into the red rocks, stunning views. Quick stop, very photogenic.`
  },
  {
    id: 'walnut-canyon',
    name: 'Walnut Canyon National Monument',
    day: null,
    type: 'suggested',
    lat: 35.1715, lng: -111.5107,
    color: '#f97316',
    image: 'images/walnut_canyon.png',
    details: `<strong>Area:</strong> Near Flagstaff<br>Cliff dwelling ruins along a canyon rim trail. Kids love exploring the rooms. Easy-moderate loop hike.`
  },
  {
    id: 'lowell-observatory',
    name: 'Lowell Observatory',
    day: null,
    type: 'suggested',
    lat: 35.2027, lng: -111.6649,
    color: '#f97316',
    image: 'images/lowell_observatory.png',
    details: `<strong>Area:</strong> Flagstaff<br>Where Pluto was discovered! Telescope viewing, interactive exhibits, great for curious teens.`
  },
  {
    id: 'desert-view-watchtower',
    name: 'Desert View Watchtower',
    day: null,
    type: 'suggested',
    lat: 36.0426, lng: -111.8265,
    color: '#f97316',
    image: 'images/desert_view_watchtower.png',
    details: `<strong>Area:</strong> Grand Canyon East Rim<br>Historic stone watchtower with 360° panoramic views. Less crowded than the main rim.`
  },

  // 🟢 Evelyn's suggestions
  {
    id: 'papago-park',
    name: 'Papago Park / Hole-in-the-Rock',
    day: null,
    type: 'evelyn',
    lat: 33.4556, lng: -111.9486,
    color: '#22c55e',
    image: 'images/papago_park.png',
    details: `<strong>Area:</strong> Phoenix<br>Easy hike to a natural rock formation with panoramic views. Great photo spot.`
  },
  {
    id: 'old-town-scottsdale',
    name: 'Old Town Scottsdale',
    day: null,
    type: 'evelyn',
    lat: 33.4942, lng: -111.9261,
    color: '#22c55e',
    image: 'images/old_town_scottsdale.png',
    details: `<strong>Area:</strong> Scottsdale<br>Shopping, galleries, and dining in Scottsdale's charming historic district.`
  },
  {
    id: 'montezuma-well',
    name: 'Montezuma Well',
    day: null,
    type: 'evelyn',
    lat: 34.6118, lng: -111.7582,
    color: '#22c55e',
    image: 'images/montezuma_well.png',
    details: `<strong>Area:</strong> Near Montezuma Castle<br>Natural limestone sinkhole fed by underground springs. Quick stop.`
  },
  {
    id: 'tuzigoot',
    name: 'Tuzigoot National Monument',
    day: null,
    type: 'evelyn',
    lat: 34.7702, lng: -112.0297,
    color: '#22c55e',
    image: 'images/tuzigoot.png',
    details: `<strong>Area:</strong> Verde Valley<br>Ancient Sinagua pueblo ruins on a hilltop with valley views. 30 min stop.`
  },
  {
    id: 'cottonwood',
    name: 'Cottonwood Old Town',
    day: null,
    type: 'evelyn',
    lat: 34.7392, lng: -112.0099,
    color: '#22c55e',
    image: 'images/cottonwood_old_town.png',
    details: `<strong>Area:</strong> Verde Valley<br>Charming wine-tasting town with shops and restaurants. 30 min stroll.`
  },
  {
    id: 'red-rock-state-park',
    name: 'Red Rock State Park',
    day: null,
    type: 'evelyn',
    lat: 34.8400, lng: -111.8174,
    color: '#22c55e',
    image: 'images/red_rock_state_park.png',
    details: `<strong>Area:</strong> Sedona<br>Scenic hikes through red rock country with creek crossings. 1–1.5 hr hike.`
  },
  {
    id: 'bell-rock',
    name: 'Bell Rock',
    day: null,
    type: 'evelyn',
    lat: 34.8072, lng: -111.7631,
    color: '#22c55e',
    image: 'images/bell_rock.png',
    details: `<strong>Area:</strong> Sedona<br>Iconic Sedona landmark with easy trail access. Great for photos and a quick hike.`
  },
  {
    id: 'airport-mesa',
    name: 'Airport Mesa Overlook',
    day: null,
    type: 'evelyn',
    lat: 34.8548, lng: -111.7844,
    color: '#22c55e',
    image: 'images/airport_mesa.png',
    details: `<strong>Area:</strong> Sedona<br>360° panoramic views of red rock formations. 20 min stop.`
  },
  {
    id: 'devils-bridge',
    name: "Devil's Bridge Trail",
    day: null,
    type: 'evelyn',
    lat: 34.9024, lng: -111.8135,
    color: '#22c55e',
    image: 'images/devils_bridge.png',
    details: `<strong>Area:</strong> Sedona<br>Famous natural sandstone arch bridge. ~1 hr total hike.`
  },
  {
    id: 'west-fork-oak-creek',
    name: 'West Fork Oak Creek Trail',
    day: null,
    type: 'evelyn',
    lat: 34.9617, lng: -111.7436,
    color: '#22c55e',
    image: 'images/west_fork_oak_creek.png',
    details: `<strong>Area:</strong> Oak Creek Canyon<br>Beautiful canyon walk through fall colors and creek crossings. 30 min scenic walk.`
  },
  {
    id: 'boynton-canyon',
    name: 'Boynton Canyon',
    day: null,
    type: 'evelyn',
    lat: 34.9041, lng: -111.8454,
    color: '#22c55e',
    image: 'images/boynton_canyon.png',
    details: `<strong>Area:</strong> Sedona<br>Stunning box canyon with golden hour views. Spiritual energy vortex site.`
  },
  {
    id: 'oak-creek-vista',
    name: 'Oak Creek Vista',
    day: null,
    type: 'evelyn',
    lat: 35.0131, lng: -111.7358,
    color: '#22c55e',
    image: 'images/oak_creek_vista.png',
    details: `<strong>Area:</strong> Between Sedona & Flagstaff<br>Scenic overlook with sweeping canyon views. 15 min photo stop.`
  },
  {
    id: 'cameron-trading-post',
    name: 'Cameron Trading Post',
    day: null,
    type: 'evelyn',
    lat: 35.8530, lng: -111.4252,
    color: '#22c55e',
    image: 'images/cameron_trading_post.png',
    details: `<strong>Area:</strong> Between Grand Canyon & Flagstaff<br>Historic Navajo trading post with crafts and Little Colorado River gorge views.`
  },
  {
    id: 'buffalo-park',
    name: 'Buffalo Park',
    day: null,
    type: 'evelyn',
    lat: 35.2172, lng: -111.6530,
    color: '#22c55e',
    image: 'images/buffalo_park.png',
    details: `<strong>Area:</strong> Flagstaff<br>Easy walking trail with views of the San Francisco Peaks. 20–30 min.`
  },
  {
    id: 'sunset-crater',
    name: 'Sunset Crater Volcano NM',
    day: null,
    type: 'evelyn',
    lat: 35.3651, lng: -111.5009,
    color: '#22c55e',
    image: 'images/sunset_crater.png',
    details: `<strong>Area:</strong> North of Flagstaff<br>Volcanic cinder cone and lava flows. 45 min stop.`
  },
  {
    id: 'wupatki',
    name: 'Wupatki National Monument',
    day: null,
    type: 'evelyn',
    lat: 35.5185, lng: -111.3690,
    color: '#22c55e',
    image: 'images/wupatki.png',
    details: `<strong>Area:</strong> North of Flagstaff<br>Ancient pueblo ruins in a striking red desert landscape. 45 min stop.`
  },

  // 🟢 Additional Evelyn's Plan Locations
  {
    id: 'usery-mountain',
    name: 'Usery Mountain Regional Park',
    day: null,
    type: 'evelyn',
    lat: 33.4781, lng: -111.6058,
    color: '#22c55e',
    image: 'images/usery_mountain.png',
    details: `<strong>Area:</strong> Mesa (East Phoenix)<br>Desert hiking with saguaro cacti and Superstition Mountain views. 20 min stretch & photos.`
  },
  {
    id: 'sunset-point',
    name: 'Sunset Point Rest Area',
    day: null,
    type: 'evelyn',
    lat: 34.2964, lng: -112.0332,
    color: '#22c55e',
    image: 'images/sunset_point_rest_area.png',
    details: `<strong>Area:</strong> I-17 (Between Phoenix & Sedona)<br>Scenic highway overlook with panoramic Bradshaw Mountain views. 15 min stop.`
  },
  {
    id: 'rock-springs-cafe',
    name: 'Rock Springs Café',
    day: null,
    type: 'food',
    lat: 34.0590, lng: -112.0870,
    color: '#d97706',
    image: 'images/rock_springs_cafe.png',
    details: `<strong>Area:</strong> Black Canyon City (I-17)<br>Famous for legendary pies since 1918. Classic roadside café stop. 45–60 min lunch.`
  },
  {
    id: 'jerome',
    name: 'Jerome',
    day: null,
    type: 'evelyn',
    lat: 34.7491, lng: -112.1138,
    color: '#22c55e',
    image: 'images/jerome.png',
    details: `<strong>Area:</strong> Verde Valley Hillside<br>Historic copper mining ghost town turned artsy hillside village. Shops, galleries & views. 45 min exploring.`
  },
  {
    id: 'hampton-inn-sedona',
    name: 'Hampton Inn Sedona',
    day: null,
    type: 'hotel',
    lat: 34.8697, lng: -111.7610,
    color: '#3b82f6',
    image: 'images/hampton_inn_sedona.png',
    details: `<strong>Area:</strong> Sedona<br>Nights 2–3 hotel. Surrounded by red rock formations. Complimentary breakfast.`
  },
  {
    id: 'hideaway-house',
    name: 'Hideaway House',
    day: null,
    type: 'food',
    lat: 34.8445, lng: -111.7640,
    color: '#d97706',
    image: 'images/hideaway_house.png',
    details: `<strong>Area:</strong> Sedona (AZ-179)<br>Casual Italian with scenic red rock patio views. Day 3 lunch. 45–60 min.`
  },
  {
    id: 'turquoise-mcdonalds',
    name: "Turquoise McDonald's",
    day: null,
    type: 'food',
    lat: 34.8622, lng: -111.7848,
    color: '#d97706',
    image: 'images/turquoise_mcdonalds.png',
    details: `<strong>Area:</strong> Sedona<br>World's only turquoise arches! City required teal instead of yellow to fit the landscape. Ice cream treat stop.`
  },
  {
    id: 'creekside-bistro',
    name: 'Creekside American Bistro',
    day: null,
    type: 'food',
    lat: 34.8706, lng: -111.7612,
    color: '#d97706',
    image: 'images/creekside_bistro.png',
    details: `<strong>Area:</strong> Sedona<br>Upscale casual dining alongside Oak Creek with red rock views. Day 3 dinner.`
  },
  {
    id: 'williams-route66',
    name: 'Williams & Route 66',
    day: null,
    type: 'evelyn',
    lat: 35.2494, lng: -112.1871,
    color: '#22c55e',
    image: 'images/williams_route66.png',
    details: `<strong>Area:</strong> Williams<br>Gateway to Grand Canyon. Classic Route 66 main street with neon signs, retro diners & vintage charm. 20–30 min photos.`
  },
  {
    id: 'mather-point',
    name: 'Mather Point',
    day: null,
    type: 'evelyn',
    lat: 36.0611, lng: -112.1075,
    color: '#22c55e',
    image: 'images/mather_point.png',
    details: `<strong>Area:</strong> Grand Canyon South Rim<br>Most popular Grand Canyon viewpoint with sweeping canyon panoramas. First stop on arrival.`
  },
  {
    id: 'yavapai-point',
    name: 'Yavapai Point & Geology Museum',
    day: null,
    type: 'evelyn',
    lat: 36.0655, lng: -112.1181,
    color: '#22c55e',
    image: 'images/yavapai_point.png',
    details: `<strong>Area:</strong> Grand Canyon South Rim<br>Geology museum perched on canyon edge. Learn about 2 billion years of rock layers. Amazing views.`
  },
  {
    id: 'downtown-flagstaff',
    name: 'Downtown Flagstaff',
    day: null,
    type: 'evelyn',
    lat: 35.1983, lng: -111.6513,
    color: '#22c55e',
    image: 'images/downtown_flagstaff.png',
    details: `<strong>Area:</strong> Flagstaff<br>Charming historic Route 66 main street with brick buildings, shops, and mountain views. Day 5 afternoon stroll.`
  },
  {
    id: 'desert-botanical-garden',
    name: 'Desert Botanical Garden',
    day: null,
    type: 'evelyn',
    lat: 33.4617, lng: -111.9445,
    color: '#22c55e',
    image: 'images/desert_botanical_garden.png',
    details: `<strong>Area:</strong> Phoenix (Papago Park)<br>World-class desert plant collection with walking trails through cacti gardens. 1.5 hr visit on Day 7.`
  },
  {
    id: 'taco-chelo',
    name: 'Taco Chelo',
    day: null,
    type: 'food',
    lat: 33.4448, lng: -112.0560,
    color: '#d97706',
    image: 'images/taco_chelo.png',
    details: `<strong>Area:</strong> Phoenix<br>Colorful authentic Mexican taqueria. Day 7 farewell lunch before heading to the airport.`
  }
];

// Load custom locations from localStorage
try {
  const saved = localStorage.getItem('arizonaTripCustomLocations');
  if (saved) {
    const customs = JSON.parse(saved);
    if (Array.isArray(customs)) {
      customs.forEach(c => {
        if (c.id && c.name && c.lat && c.lng) locations.push(c);
      });
    }
  }
} catch (e) { /* ignore */ }

// ── Route path (main itinerary order) ──
const routeCoords = [
  [33.4373, -112.0078],  // Phoenix Airport
  [33.4225, -111.9877],  // Drury Inn
  [34.8558, -111.7617],  // Sedona
  [36.0544, -112.1401],  // Grand Canyon
  [33.4373, -112.0078],  // Back to Phoenix
];

// ── Tile Layers ──
const tileLayers = {
  light: L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '© <a href="https://carto.com/">CARTO</a> | © <a href="https://www.openstreetmap.org/">OSM</a>',
    subdomains: 'abcd',
    maxZoom: 19
  }),
  terrain: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://opentopomap.org">OpenTopoMap</a> | © <a href="https://www.openstreetmap.org/">OSM</a>',
    maxZoom: 17
  }),
  dark: L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '© <a href="https://carto.com/">CARTO</a> | © <a href="https://www.openstreetmap.org/">OSM</a>',
    subdomains: 'abcd',
    maxZoom: 19
  })
};

// ── Map Init ──
const map = L.map('map', {
  zoomControl: false
}).setView([34.5, -111.8], 7);

L.control.zoom({ position: 'topright' }).addTo(map);

// Default to terrain
let currentTheme = 'terrain';
tileLayers.terrain.addTo(map);
document.body.className = 'theme-terrain';

// ── Route line ──
const routeLine = L.polyline(routeCoords, {
  color: getComputedStyle(document.documentElement).getPropertyValue('--route-color').trim() || '#6366f1',
  weight: 3,
  opacity: 0.5,
  dashArray: '10, 10',
  smoothFactor: 1
}).addTo(map);

// ── Icon config by type ──
const typeConfig = {
  hotel: { emoji: '🏠', bg: '#fef3c7', border: '#f59e0b', label: 'Hotel', tagBg: 'rgba(245,158,11,0.15)', tagColor: '#f59e0b' },
  flight: { emoji: '✈️', bg: '#e0e7ff', border: '#6366f1', label: 'Flight', tagBg: 'rgba(99,102,241,0.15)', tagColor: '#6366f1' },
  nature: { emoji: '🌲', bg: '#d1fae5', border: '#10b981', label: 'Park/Nature', tagBg: 'rgba(16,185,129,0.15)', tagColor: '#10b981' },
  attraction: { emoji: '🎡', bg: '#fce7f3', border: '#ec4899', label: 'Attraction', tagBg: 'rgba(236,72,153,0.15)', tagColor: '#ec4899' },
  suggested: { emoji: '⭐', bg: '#fff7ed', border: '#f97316', label: 'Suggested', tagBg: 'rgba(249,115,22,0.15)', tagColor: '#f97316' },
  evelyn: { emoji: '🟢', bg: '#dcfce7', border: '#22c55e', label: "Evelyn's Pick", tagBg: 'rgba(34,197,94,0.15)', tagColor: '#22c55e' },
  food: { emoji: '🍽️', bg: '#fef3c7', border: '#d97706', label: 'Food & Dining', tagBg: 'rgba(217,119,6,0.15)', tagColor: '#d97706' },
  custom: { emoji: '📌', bg: '#e0e7ff', border: '#6366f1', label: 'Custom', tagBg: 'rgba(99,102,241,0.15)', tagColor: '#6366f1' }
};

// ── Custom emoji markers + popups ──
const markers = {};
const allMapMarkers = [];
locations.forEach(loc => {
  const cfg = typeConfig[loc.type] || typeConfig.nature;

  const icon = L.divIcon({
    className: '',
    html: `<div class="emoji-marker" style="background:${cfg.bg};border-color:${cfg.border}">${cfg.emoji}</div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -20]
  });

  const marker = L.marker([loc.lat, loc.lng], { icon }).addTo(map);
  allMapMarkers.push(marker);

  const dayLabel = loc.day
    ? `<div class="popup-day" style="color:${cfg.border}">${loc.day}</div>`
    : `<div class="popup-day" style="color:${cfg.border}">Possible Stop</div>`;

  const imageHtml = loc.image
    ? `<img class="popup-image" src="${loc.image}" alt="${loc.name}">`
    : '';

  marker.bindPopup(`
    <div>
      ${imageHtml}
      ${dayLabel}
      <div class="popup-title">${loc.name}</div>
      <div class="popup-detail">${loc.details}</div>
    </div>
  `, { className: 'custom-popup', maxWidth: 280 });

  markers[loc.id] = { marker, data: loc };
});

// ── Popup 'Add to Day' button (when in Day Planner view) ──
map.on('popupopen', (e) => {
  if (currentView !== 'planner') return;
  const popup = e.popup;
  const popupEl = popup.getElement();
  if (!popupEl) return;

  // Find which location this popup belongs to
  const markerLatLng = popup.getLatLng();
  let matchedId = null;
  Object.entries(markers).forEach(([id, { data }]) => {
    if (Math.abs(data.lat - markerLatLng.lat) < 0.0001 && Math.abs(data.lng - markerLatLng.lng) < 0.0001) {
      matchedId = id;
    }
  });
  if (!matchedId) return;

  const day = plannerState.days[plannerState.activeDay];
  const dayInfo = TRIP_DAYS.find(d => d.num === plannerState.activeDay);
  const alreadyAdded = day.stops.includes(matchedId) || day.start === matchedId || day.end === matchedId;

  // Don't add duplicate button
  const contentEl = popupEl.querySelector('.leaflet-popup-content');
  if (!contentEl || contentEl.querySelector('.popup-add-day-btn')) return;

  const btn = document.createElement('button');
  btn.className = 'popup-add-day-btn' + (alreadyAdded ? ' added' : '');
  btn.textContent = alreadyAdded
    ? `\u2705 Already on Day ${plannerState.activeDay}`
    : `\u2795 Add to Day ${plannerState.activeDay} (${dayInfo.date})`;

  if (!alreadyAdded) {
    btn.addEventListener('click', (ev) => {
      ev.stopPropagation();
      day.stops.push(matchedId);
      savePlannerState();
      addDropdownOpen = false;
      buildDayPlanner();
      highlightPlannerDay(plannerState.activeDay);
      calcPlannerRoute(plannerState.activeDay);
      btn.textContent = `\u2705 Added to Day ${plannerState.activeDay}!`;
      btn.classList.add('added');
    });
  }

  contentEl.appendChild(btn);
});

// ── Sidebar ──
const sidebar = document.getElementById('sidebar');

// Helper: set sidebar content while preserving toggle/drag handle
function setSidebarContent(html) {
  const toggle = sidebar.querySelector('.sidebar-toggle');
  const handle = sidebar.querySelector('.sidebar-drag-handle');
  sidebar.innerHTML = html;
  if (toggle) sidebar.prepend(handle, toggle);
  else {
    // Recreate if they were lost
    const t = document.createElement('button');
    t.className = 'sidebar-toggle';
    t.id = 'sidebar-toggle';
    t.title = 'Toggle sidebar';
    t.textContent = sidebar.classList.contains('collapsed') ? '\u25B2' : '\u25BC';
    const h = document.createElement('div');
    h.className = 'sidebar-drag-handle';
    sidebar.prepend(h);
    sidebar.prepend(t);
  }
  wireSidebarToggle();
}

function wireSidebarToggle() {
  const toggle = document.getElementById('sidebar-toggle');
  if (!toggle) return;
  toggle.onclick = () => {
    sidebar.classList.toggle('collapsed');
    toggle.textContent = sidebar.classList.contains('collapsed') ? '\u25B2' : '\u25BC';
    // Invalidate map size after animation
    setTimeout(() => map.invalidateSize(), 350);
  };
}

function buildSidebar() {
  const scheduled = locations.filter(l => l.day);
  const possible = locations.filter(l => !l.day);

  // Group scheduled by day
  const dayGroups = {};
  scheduled.forEach(loc => {
    if (!dayGroups[loc.day]) dayGroups[loc.day] = [];
    dayGroups[loc.day].push(loc);
  });

  let html = '';

  // Scheduled section
  for (const [day, locs] of Object.entries(dayGroups)) {
    html += `<div class="sidebar-section">
      <div class="sidebar-section-header">${day}</div>`;
    locs.forEach(loc => {
      const cfg = typeConfig[loc.type] || typeConfig.nature;
      html += `
        <div class="location-card" data-id="${loc.id}">
          <div class="card-marker" style="background:${cfg.tagBg}; color:${cfg.tagColor}">${cfg.emoji}</div>
          <div class="card-content">
            <h3>${loc.name}</h3>
            <span class="tag" style="background:${cfg.tagBg};color:${cfg.tagColor}">${cfg.label}</span>
          </div>
        </div>`;
    });
    html += `</div>`;
  }

  // Possible stops section (user's original ideas)
  const possibleOriginal = possible.filter(l => l.type !== 'suggested' && l.type !== 'evelyn');
  const possibleSuggested = possible.filter(l => l.type === 'suggested');
  const possibleEvelyn = possible.filter(l => l.type === 'evelyn');

  if (possibleOriginal.length) {
    html += `<div class="sidebar-section">
      <div class="sidebar-section-header">✨ Possible Stops</div>`;
    possibleOriginal.forEach(loc => {
      const cfg = typeConfig[loc.type] || typeConfig.nature;
      html += `
        <div class="location-card" data-id="${loc.id}">
          <div class="card-marker" style="background:${cfg.tagBg}; color:${cfg.tagColor}">${cfg.emoji}</div>
          <div class="card-content">
            <h3>${loc.name}</h3>
            <p>${loc.details.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().substring(0, 80)}…</p>
          </div>
        </div>`;
    });
    html += `</div>`;
  }

  // Suggested sites section (AI recommendations)
  if (possibleSuggested.length) {
    html += `<div class="sidebar-section">
      <div class="sidebar-section-header">⭐ Suggested (Family-Friendly)</div>`;
    possibleSuggested.forEach(loc => {
      const cfg = typeConfig[loc.type] || typeConfig.suggested;
      html += `
        <div class="location-card" data-id="${loc.id}">
          <div class="card-marker" style="background:${cfg.tagBg}; color:${cfg.tagColor}">${cfg.emoji}</div>
          <div class="card-content">
            <h3>${loc.name}</h3>
            <p>${loc.details.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().substring(0, 80)}…</p>
          </div>
        </div>`;
    });
    html += `</div>`;
  }

  // Evelyn's picks section
  if (possibleEvelyn.length) {
    html += `<div class="sidebar-section">
      <div class="sidebar-section-header">🟢 Evelyn's Picks</div>`;
    possibleEvelyn.forEach(loc => {
      const cfg = typeConfig[loc.type] || typeConfig.evelyn;
      html += `
        <div class="location-card" data-id="${loc.id}">
          <div class="card-marker" style="background:${cfg.tagBg}; color:${cfg.tagColor}">${cfg.emoji}</div>
          <div class="card-content">
            <h3>${loc.name}</h3>
            <p>${loc.details.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().substring(0, 80)}…</p>
          </div>
        </div>`;
    });
    html += `</div>`;
  }

  setSidebarContent(html);
  attachCardClicks();
}

// ── Evelyn's Full Plan View ──
const evelynPlan = [
  {
    day: 'Day 1 — Feb 14 (Sat)', title: 'Arrival – Phoenix',
    stops: [
      { time: 'Evening', text: 'Dinner at airport layover' },
      { time: '10:30 PM', text: 'Hotel check-in — Budget Inn Phoenix' },
    ]
  },
  {
    day: 'Day 2 — Feb 15 (Sun)', title: 'Phoenix → Sedona',
    stops: [
      { time: '8:25 AM', text: 'Usery Mountain Regional Park', id: 'usery-mountain' },
      { time: '9:30 AM', text: 'Sunset Point Rest Area (15 min)' },
      { time: '10:30 AM', text: 'Montezuma Castle', id: 'montezuma' },
      { time: '11:20 AM', text: 'Montezuma Well', id: 'montezuma-well' },
      { time: '12:30 PM', text: '🥧 Lunch: Rock Springs Café' },
      { time: '1:45 PM', text: 'Tuzigoot National Monument', id: 'tuzigoot' },
      { time: '2:30 PM', text: 'Cottonwood Old Town', id: 'cottonwood' },
      { time: '3:15 PM', text: 'Jerome (45 min)', id: 'jerome' },
      { time: '5:30 PM', text: 'Check-in: Hampton Inn Sedona' },
      { time: '7:00 PM', text: '🍽️ Dinner: Local Sedona restaurant' },
    ]
  },
  {
    day: 'Day 3 — Feb 16 (Mon)', title: 'Sedona Red Rock Day',
    stops: [
      { time: '8:00 AM', text: 'Red Rock State Park (1–1.5 hr)', id: 'red-rock-state-park' },
      { time: '9:45 AM', text: 'Chapel of the Holy Cross', id: 'chapel-holy-cross' },
      { time: '10:30 AM', text: 'Bell Rock (30–40 min)', id: 'bell-rock' },
      { time: '12:00 PM', text: '🍴 Lunch: Hideaway House' },
      { time: '1:15 PM', text: 'Airport Mesa Overlook', id: 'airport-mesa' },
      { time: '2:00 PM', text: "Devil's Bridge Trail (1 hr)", id: 'devils-bridge' },
      { time: '3:30 PM', text: 'West Fork Oak Creek Trail', id: 'west-fork-oak-creek' },
      { time: '4:15 PM', text: '🍦 Turquoise McDonald\'s' },
      { time: '4:40 PM', text: 'Boynton Canyon — Golden Hour', id: 'boynton-canyon' },
      { time: '6:30 PM', text: '🍽️ Dinner: Creekside American Bistro' },
    ]
  },
  {
    day: 'Day 4 — Feb 17 (Tue)', title: 'Sedona → Grand Canyon',
    stops: [
      { time: '8:00 AM', text: 'Oak Creek Vista', id: 'oak-creek-vista' },
      { time: '8:45 AM', text: 'Walnut Canyon NM (45–60 min)', id: 'walnut-canyon' },
      { time: '10:45 AM', text: 'Williams & Route 66 photos' },
      { time: '11:45 AM', text: '🍔 Lunch: In-N-Out Burger' },
      { time: '1:30 PM', text: 'Grand Canyon South Rim', id: 'kachina' },
      { time: 'Afternoon', text: 'Mather Point → Yavapai Point → Rim Trail' },
      { time: '5:45 PM', text: '🌅 Sunset at the rim' },
      { time: '6:45 PM', text: '🍽️ Dinner: Inside park or Tusayan' },
    ]
  },
  {
    day: 'Day 5 — Feb 18 (Wed)', title: 'Grand Canyon → Bearizona → Flagstaff',
    stops: [
      { time: '7:00 AM', text: '🌅 Optional Sunrise at Grand Canyon' },
      { time: '9:00 AM', text: 'Desert View Watchtower', id: 'desert-view-watchtower' },
      { time: '10:30 AM', text: 'Cameron Trading Post', id: 'cameron-trading-post' },
      { time: '11:15 AM', text: '🍔 Lunch: Wildflower Bread Company' },
      { time: '12:15 PM', text: 'Bearizona Wildlife Park (2 hr)', id: 'bearizona' },
      { time: '3:00 PM', text: 'Buffalo Park (20–30 min)', id: 'buffalo-park' },
      { time: '3:45 PM', text: 'Downtown Flagstaff stroll', id: 'flagstaff' },
      { time: '6:30 PM', text: '🍽️ Dinner: Local Flagstaff restaurant' },
    ]
  },
  {
    day: 'Day 6 — Feb 19 (Thu)', title: 'Flagstaff → Phoenix',
    stops: [
      { time: '8:00 AM', text: 'Sunset Crater Volcano NM', id: 'sunset-crater' },
      { time: '9:15 AM', text: 'Wupatki National Monument', id: 'wupatki' },
      { time: '10:45 AM', text: 'Oak Creek Canyon scenic pullout' },
      { time: '12:00 PM', text: '🍔 Lunch: Culver\'s' },
      { time: '1:00 PM', text: 'Drive to Phoenix' },
      { time: '3:30 PM', text: 'Check-in airport-area hotel' },
      { time: '6:30 PM', text: '🍽️ Dinner: Casual Phoenix restaurant' },
    ]
  },
  {
    day: 'Day 7 — Feb 20 (Fri)', title: 'Phoenix Exploration + Departure',
    stops: [
      { time: '8:15 AM', text: 'Desert Botanical Garden', id: 'desert-botanical' },
      { time: '10:00 AM', text: 'Papago Park / Hole-in-the-Rock', id: 'papago-park' },
      { time: '11:00 AM', text: 'Old Town Scottsdale stroll', id: 'old-town-scottsdale' },
      { time: '12:15 PM', text: '🌮 Lunch: Taco Chelo' },
      { time: '3:00 PM', text: 'Arrive at Phoenix Airport', id: 'phoenix-airport' },
      { time: '5:00 PM', text: '✈️ Flight home' },
    ]
  }
];

function buildEvelynSidebar() {
  let html = `<div class="sidebar-section">
    <div class="sidebar-section-header" style="font-size:1rem">🟢 Evelyn's Full Plan</div>
    <div style="padding:8px 16px;font-size:0.75rem;color:var(--text-muted)">
      7-day timed itinerary with meals. Click a stop to fly to it on the map.
    </div>
  </div>`;

  evelynPlan.forEach(dayObj => {
    html += `<div class="sidebar-section">
      <div class="sidebar-section-header">${dayObj.day}</div>
      <div style="padding:4px 16px 2px;font-size:0.7rem;color:var(--text-muted);font-weight:600">${dayObj.title}</div>`;
    dayObj.stops.forEach(stop => {
      const hasMarker = stop.id && markers[stop.id];
      const clickAttr = hasMarker ? `data-id="${stop.id}"` : '';
      const clickClass = hasMarker ? 'location-card' : '';
      const cursorStyle = hasMarker ? 'cursor:pointer' : 'cursor:default;opacity:0.75';
      html += `
        <div class="${clickClass}" ${clickAttr} style="display:flex;gap:10px;align-items:flex-start;padding:6px 16px;border-radius:8px;${cursorStyle}">
          <span style="font-size:0.65rem;color:var(--text-muted);min-width:60px;padding-top:2px;font-weight:500">${stop.time}</span>
          <span style="font-size:0.8rem;color:var(--text-primary);flex:1">${stop.text}</span>
        </div>`;
    });
    html += `</div>`;
  });

  setSidebarContent(html);
  attachCardClicks();
}

function attachCardClicks() {
  document.querySelectorAll('.location-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.id;
      const entry = markers[id];
      if (entry) {
        map.flyTo([entry.data.lat, entry.data.lng], 12, { duration: 1 });
        entry.marker.openPopup();
        document.querySelectorAll('.location-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
      }
    });
  });
}

// ── Day Planner State ──
const TRIP_DAYS = [
  { num: 1, date: 'Feb 14', label: 'Sat' },
  { num: 2, date: 'Feb 15', label: 'Sun' },
  { num: 3, date: 'Feb 16', label: 'Mon' },
  { num: 4, date: 'Feb 17', label: 'Tue' },
  { num: 5, date: 'Feb 18', label: 'Wed' },
  { num: 6, date: 'Feb 19', label: 'Thu' },
  { num: 7, date: 'Feb 20', label: 'Fri' }
];

let plannerState = { activeDay: 1, days: {} };
TRIP_DAYS.forEach(d => { plannerState.days[d.num] = { start: null, end: null, stops: [] }; });

// ── Multiple Plans Management ──
let allPlans = {}; // { planId: { name, data: plannerState } }
let currentPlanId = 'default';

function createEmptyPlan() {
  const emptyPlan = { activeDay: 1, days: {} };
  TRIP_DAYS.forEach(d => { emptyPlan.days[d.num] = { start: null, end: null, stops: [] }; });
  return emptyPlan;
}

// Load all plans from localStorage
function loadAllPlans() {
  try {
    const saved = localStorage.getItem('arizonaTripPlans');
    if (saved) {
      allPlans = JSON.parse(saved);
    } else {
      // Migrate old single plan to new format
      const oldPlan = localStorage.getItem('arizonaTripPlanner');
      if (oldPlan) {
        const parsed = JSON.parse(oldPlan);
        allPlans = {
          'default': { name: 'Default Plan', data: parsed }
        };
        saveAllPlans();
        localStorage.removeItem('arizonaTripPlanner'); // Clean up old format
      } else {
        allPlans = {
          'default': { name: 'Default Plan', data: createEmptyPlan() }
        };
      }
    }
    
    const savedCurrentId = localStorage.getItem('arizonaTripCurrentPlan');
    if (savedCurrentId && allPlans[savedCurrentId]) {
      currentPlanId = savedCurrentId;
    }
    
    // Load current plan into plannerState
    if (allPlans[currentPlanId]) {
      plannerState = allPlans[currentPlanId].data;
      if (!plannerState.activeDay) plannerState.activeDay = 1;
    }
  } catch (e) { /* ignore */ }
}

function saveAllPlans() {
  try {
    localStorage.setItem('arizonaTripPlans', JSON.stringify(allPlans));
  } catch (e) { /* ignore */ }
}

function savePlannerState() {
  try {
    // Update current plan in allPlans
    if (allPlans[currentPlanId]) {
      allPlans[currentPlanId].data = plannerState;
    }
    saveAllPlans();
  } catch (e) { /* ignore */ }
}

function switchPlan(planId) {
  if (!allPlans[planId]) return;
  
  // Save current plan
  if (allPlans[currentPlanId]) {
    allPlans[currentPlanId].data = plannerState;
  }
  
  // Switch to new plan
  currentPlanId = planId;
  plannerState = JSON.parse(JSON.stringify(allPlans[planId].data)); // Deep copy
  if (!plannerState.activeDay) plannerState.activeDay = 1;
  
  // Save current plan ID
  localStorage.setItem('arizonaTripCurrentPlan', currentPlanId);
  saveAllPlans();
  
  // Refresh UI
  if (currentView === 'planner') {
    buildDayPlanner();
  }
}

// Initialize plans on load
loadAllPlans();

// Get all location IDs assigned to any day
function getAssignedIds() {
  const ids = new Set();
  Object.values(plannerState.days).forEach(day => {
    if (day.start) ids.add(day.start);
    if (day.end) ids.add(day.end);
    day.stops.forEach(id => ids.add(id));
  });
  return ids;
}

// ── Routing Provider Abstraction ──
// Switch between OSRM (free, may differ from Google Maps) and Google Maps (requires API key)
// Configure via routingConfig at the top of this file
async function fetchRoute(waypoints) {
  if (routingConfig.provider === 'google') {
    if (!routingConfig.googleMapsApiKey || routingConfig.googleMapsApiKey.trim() === '') {
      throw new Error('Google Maps provider selected but API key is missing. Please add your API key to routingConfig.');
    }
    return await fetchGoogleRoute(waypoints);
  }
  return await fetchOSRMRoute(waypoints);
}

async function fetchOSRMRoute(waypoints) {
  const coords = waypoints.map(w => `${w.lng},${w.lat}`).join(';');
  const url = `${routingConfig.osrmServer}/route/v1/driving/${coords}?overview=full&geometries=geojson`;
  const resp = await fetch(url);
  const data = await resp.json();
  
  if (data.code !== 'Ok' || !data.routes || !data.routes[0]) {
    throw new Error('OSRM routing failed: ' + (data.message || data.code));
  }
  
  const route = data.routes[0];
  return {
    distance: route.distance, // meters
    duration: route.duration, // seconds
    geometry: route.geometry.coordinates.map(c => [c[1], c[0]]) // flip to [lat,lng]
  };
}

async function fetchGoogleRoute(waypoints) {
  if (!routingConfig.googleMapsApiKey || routingConfig.googleMapsApiKey.trim() === '') {
    throw new Error('Google Maps API key not configured');
  }
  
  // Load Google Maps API if not already loaded
  if (!window.google || !window.google.maps) {
    try {
      await window.loadGoogleMapsAPI();
    } catch (error) {
      throw new Error('Failed to load Google Maps API: ' + error.message);
    }
  }
  
  // Use Google Maps DirectionsService (client-side API)
  return new Promise((resolve, reject) => {
    const directionsService = new google.maps.DirectionsService();
    
    const origin = new google.maps.LatLng(waypoints[0].lat, waypoints[0].lng);
    const destination = new google.maps.LatLng(waypoints[waypoints.length - 1].lat, waypoints[waypoints.length - 1].lng);
    
    const request = {
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING,
    };
    
    // Add waypoints if there are intermediate points
    if (waypoints.length > 2) {
      request.waypoints = waypoints.slice(1, -1).map(w => ({
        location: new google.maps.LatLng(w.lat, w.lng),
        stopover: true
      }));
    }
    
    directionsService.route(request, (result, status) => {
      if (status !== google.maps.DirectionsStatus.OK) {
        reject(new Error(`Google Maps routing failed: ${status}`));
        return;
      }
      
      const route = result.routes[0];
      
      // Sum up all legs for total distance and duration
      let totalDistance = 0;
      let totalDuration = 0;
      route.legs.forEach(leg => {
        totalDistance += leg.distance.value; // meters
        totalDuration += leg.duration.value; // seconds
      });
      
      // Extract points from the route path
      const points = [];
      route.overview_path.forEach(point => {
        points.push([point.lat(), point.lng()]);
      });
      
      resolve({
        distance: totalDistance,
        duration: totalDuration,
        geometry: points
      });
    });
  });
}

// Decode Google Maps polyline encoding
function decodeGooglePolyline(encoded) {
  const points = [];
  let index = 0, lat = 0, lng = 0;
  
  while (index < encoded.length) {
    let b, shift = 0, result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
    lat += dlat;
    
    shift = 0;
    result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
    lng += dlng;
    
    points.push([lat / 1e5, lng / 1e5]);
  }
  
  return points;
}

// Planner route polyline
let plannerRouteLine = null;
let plannerRouteStats = { distance: 0, duration: 0 };

async function calcPlannerRoute(dayNum) {
  const day = plannerState.days[dayNum];
  if (plannerRouteLine) { map.removeLayer(plannerRouteLine); plannerRouteLine = null; }
  plannerRouteStats = { distance: 0, duration: 0 };

  // Build waypoint list
  const waypoints = [];
  if (day.start && markers[day.start]) waypoints.push(markers[day.start].data);
  day.stops.forEach(id => { if (markers[id]) waypoints.push(markers[id].data); });
  if (day.end && markers[day.end]) waypoints.push(markers[day.end].data);

  if (waypoints.length < 2) {
    updatePlannerStats();
    return;
  }

  try {
    const route = await fetchRoute(waypoints);
    plannerRouteStats.distance = route.distance;
    plannerRouteStats.duration = route.duration;
    plannerRouteLine = L.polyline(route.geometry, {
      color: '#6366f1',
      weight: 4,
      opacity: 0.8,
      smoothFactor: 1
    }).addTo(map);
  } catch (e) {
    console.error('Planner route error:', e);
  }
  updatePlannerStats();
  calcSuggestions(dayNum);
}

// Haversine distance in km
function haversineDist(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

async function calcSuggestions(dayNum) {
  const container = document.getElementById('planner-suggestions');
  if (!container) return;

  const day = plannerState.days[dayNum];
  // Build current waypoints
  const wpIds = [];
  if (day.start) wpIds.push(day.start);
  day.stops.forEach(id => wpIds.push(id));
  if (day.end) wpIds.push(day.end);

  // Need at least start+end to suggest
  if (wpIds.length < 2) {
    container.innerHTML = '';
    return;
  }

  const wpData = wpIds.map(id => markers[id]?.data).filter(Boolean);
  if (wpData.length < 2) { container.innerHTML = ''; return; }

  // Candidates: locations not on this day
  const onDay = new Set(wpIds);
  const candidates = locations.filter(l => !onDay.has(l.id) && markers[l.id]);
  if (candidates.length === 0) { container.innerHTML = ''; return; }

  container.innerHTML = `<div class="suggest-section"><div class="suggest-loading">⏳ Finding nearby stops...</div></div>`;

  // Pre-filter: only candidates within ~150km of route center
  const centerLat = wpData.reduce((s, w) => s + w.lat, 0) / wpData.length;
  const centerLng = wpData.reduce((s, w) => s + w.lng, 0) / wpData.length;
  const maxRouteDist = Math.max(...wpData.map(w => haversineDist(centerLat, centerLng, w.lat, w.lng)));
  const searchRadius = Math.max(maxRouteDist * 1.5, 80);
  const nearby = candidates.filter(c => haversineDist(centerLat, centerLng, c.lat, c.lng) <= searchRadius);

  if (nearby.length === 0) {
    container.innerHTML = `<div class="suggest-section"><div class="suggest-title">💡 Nearby Suggestions</div><div class="suggest-loading">No nearby locations to suggest</div></div>`;
    return;
  }

  // Use OSRM table API: all waypoints + candidates
  const allPoints = [...wpData, ...nearby];
  const coordStr = allPoints.map(p => `${p.lng},${p.lat}`).join(';');
  const wpIndices = wpData.map((_, i) => i);
  const candStartIdx = wpData.length;

  try {
    const resp = await fetch(`https://router.project-osrm.org/table/v1/driving/${coordStr}?annotations=duration`);
    const data = await resp.json();
    if (data.code !== 'Ok' || !data.durations) {
      container.innerHTML = '';
      return;
    }

    const durations = data.durations;
    // For each candidate, find best insertion point and extra time
    const scored = nearby.map((cand, ci) => {
      const candIdx = candStartIdx + ci;
      let minExtra = Infinity;

      // Try inserting between each consecutive pair of waypoints
      for (let i = 0; i < wpData.length - 1; i++) {
        const fromIdx = i;
        const toIdx = i + 1;
        const currentLeg = durations[fromIdx][toIdx];
        const toCandidate = durations[fromIdx][candIdx];
        const fromCandidate = durations[candIdx][toIdx];
        if (currentLeg != null && toCandidate != null && fromCandidate != null) {
          const extra = toCandidate + fromCandidate - currentLeg;
          if (extra < minExtra) minExtra = extra;
        }
      }

      return { loc: cand, extra: minExtra };
    });

    // Sort by least extra time, take top 5
    scored.sort((a, b) => a.extra - b.extra);
    const top5 = scored.slice(0, 5).filter(s => s.extra < Infinity);

    if (top5.length === 0) {
      container.innerHTML = '';
      return;
    }

    let sugHtml = `<div class="suggest-section">`;
    sugHtml += `<div class="suggest-title">💡 Nearby Suggestions</div>`;
    top5.forEach(s => {
      const cfg = typeConfig[s.loc.type] || typeConfig.nature;
      const extraMin = Math.round(s.extra / 60);
      const extraStr = extraMin <= 0 ? 'On route!' : `+${extraMin} min`;
      sugHtml += `<div class="suggest-item" data-suggest-id="${s.loc.id}" title="${s.loc.name} — adds ~${extraMin} min">`;
      sugHtml += `<span class="suggest-emoji">${cfg.emoji}</span>`;
      sugHtml += `<span class="suggest-name">${s.loc.name}</span>`;
      sugHtml += `<span class="suggest-extra">${extraStr}</span>`;
      sugHtml += `</div>`;
    });
    sugHtml += `</div>`;

    // Only update if still on same day
    if (plannerState.activeDay === dayNum && container) {
      container.innerHTML = sugHtml;
      // Wire up click to add
      container.querySelectorAll('.suggest-item').forEach(item => {
        item.addEventListener('click', () => {
          const id = item.dataset.suggestId;
          const curDay = plannerState.days[plannerState.activeDay];
          if (!curDay.stops.includes(id)) {
            curDay.stops.push(id);
            savePlannerState();
            addDropdownOpen = false;
            buildDayPlanner();
            highlightPlannerDay(plannerState.activeDay);
            calcPlannerRoute(plannerState.activeDay);
          }
        });
      });
    }
  } catch (e) {
    console.error('Suggestions error:', e);
    container.innerHTML = '';
  }
}

function updatePlannerStats() {
  const distEl = document.getElementById('planner-dist');
  const timeEl = document.getElementById('planner-time');
  const stopsEl = document.getElementById('planner-stops-count');
  if (!distEl) return;

  const dayNum = plannerState.activeDay;
  const day = plannerState.days[dayNum];
  const mi = (plannerRouteStats.distance / 1609.34).toFixed(0);
  const totalMin = Math.round(plannerRouteStats.duration / 60);
  const hrs = Math.floor(totalMin / 60);
  const mins = totalMin % 60;
  const timeStr = hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;

  distEl.textContent = plannerRouteStats.distance > 0 ? `${mi} mi` : '—';
  timeEl.textContent = plannerRouteStats.duration > 0 ? timeStr : '—';
  stopsEl.textContent = day.stops.length;
}

async function optimizeRoute(dayNum) {
  const day = plannerState.days[dayNum];
  if (day.stops.length < 2) return;

  // Build waypoints: start + stops + end
  const waypoints = [];
  if (day.start && markers[day.start]) waypoints.push({ id: day.start, ...markers[day.start].data });
  day.stops.forEach(id => { if (markers[id]) waypoints.push({ id, ...markers[id].data }); });
  if (day.end && markers[day.end]) waypoints.push({ id: day.end, ...markers[day.end].data });

  if (waypoints.length < 3) return;

  const coords = waypoints.map(w => `${w.lng},${w.lat}`).join(';');
  const sourceIdx = 0;
  const destIdx = waypoints.length - 1;
  try {
    const resp = await fetch(`https://router.project-osrm.org/trip/v1/driving/${coords}?source=first&destination=last&roundtrip=false`);
    const data = await resp.json();
    if (data.code === 'Ok' && data.waypoints) {
      // Reorder stops based on trip waypoint indices
      const ordered = data.waypoints
        .map((wp, i) => ({ originalIdx: i, tripIdx: wp.waypoint_index }))
        .sort((a, b) => a.tripIdx - b.tripIdx);

      // Extract just the middle stops (skip first = start, last = end)
      const newStops = [];
      ordered.forEach(o => {
        if (o.originalIdx !== 0 && o.originalIdx !== waypoints.length - 1) {
          newStops.push(waypoints[o.originalIdx].id);
        }
      });
      day.stops = newStops;
      savePlannerState();
      buildDayPlanner();
      calcPlannerRoute(dayNum);
    }
  } catch (e) {
    console.error('Optimization error:', e);
  }
}

// Dim/undim markers for planner view
function highlightPlannerDay(dayNum) {
  const day = plannerState.days[dayNum];
  const activeIds = new Set();
  if (day.start) activeIds.add(day.start);
  if (day.end) activeIds.add(day.end);
  day.stops.forEach(id => activeIds.add(id));

  Object.entries(markers).forEach(([id, { marker }]) => {
    const el = marker.getElement();
    if (el) {
      if (activeIds.size === 0) {
        el.style.opacity = '1';
      } else {
        el.style.opacity = activeIds.has(id) ? '1' : '0.35';
      }
    }
  });
}

function resetMarkerOpacity() {
  Object.values(markers).forEach(({ marker }) => {
    const el = marker.getElement();
    if (el) el.style.opacity = '1';
  });
}

let addDropdownOpen = false;
let myLocationData = null;  // Hoisted for planner access

function buildDayPlanner() {
  const dayNum = plannerState.activeDay;
  const day = plannerState.days[dayNum];
  const assignedIds = getAssignedIds();

  // Day tabs
  let html = `<div class="planner-tabs">`;
  TRIP_DAYS.forEach(d => {
    const active = d.num === dayNum ? 'active' : '';
    const stopCount = plannerState.days[d.num].stops.length;
    const badge = stopCount > 0 ? ` (${stopCount})` : '';
    html += `<button class="planner-tab ${active}" data-day="${d.num}">Day ${d.num}${badge}</button>`;
  });
  html += `</div>`;

  // Day header
  const dayInfo = TRIP_DAYS.find(d => d.num === dayNum);
  html += `<div class="planner-day-content">`;
  html += `<div style="font-size:0.95rem;font-weight:700;color:var(--text-primary);margin-bottom:4px">Day ${dayNum} — ${dayInfo.date} (${dayInfo.label})</div>`;

  // Helper: sort locations with hotels first
  const sortedForSelect = [...locations].sort((a, b) => {
    const aHotel = a.type === 'hotel' ? 0 : 1;
    const bHotel = b.type === 'hotel' ? 0 : 1;
    return aHotel - bHotel || a.name.localeCompare(b.name);
  });

  // Start selector
  html += `<div class="planner-label">🚗 Start Location</div>`;
  html += `<select class="planner-select" id="planner-start">`;
  html += `<option value="">— Select start —</option>`;
  if (myLocationData) {
    const sel = day.start === 'my-location' ? 'selected' : '';
    html += `<optgroup label="📍 My Location"><option value="my-location" ${sel}>📍 My Current Location</option></optgroup>`;
  }
  html += `<optgroup label="🏠 Hotels / Lodging">`;
  sortedForSelect.filter(l => l.type === 'hotel').forEach(loc => {
    const sel = day.start === loc.id ? 'selected' : '';
    html += `<option value="${loc.id}" ${sel}>${loc.name}</option>`;
  });
  html += `</optgroup><optgroup label="📍 All Locations">`;
  sortedForSelect.filter(l => l.type !== 'hotel').forEach(loc => {
    const sel = day.start === loc.id ? 'selected' : '';
    html += `<option value="${loc.id}" ${sel}>${loc.name}</option>`;
  });
  html += `</optgroup></select>`;

  // Stops
  html += `<div class="planner-label">📍 Stops</div>`;
  html += `<div class="planner-stops" id="planner-stops-list">`;
  if (day.stops.length === 0) {
    html += `<div class="planner-empty">No stops yet — add below or drag a marker here</div>`;
  } else {
    day.stops.forEach((id, idx) => {
      const loc = locations.find(l => l.id === id);
      if (!loc) return;
      html += `<div class="planner-stop" draggable="true" data-stop-id="${id}" data-stop-idx="${idx}">
        <span class="drag-handle">⠿</span>
        <span class="stop-num">${idx + 1}</span>
        <span class="stop-name" title="${loc.name}">${loc.name}</span>
        <button class="stop-remove" data-remove-id="${id}" title="Remove stop">✕</button>
      </div>`;
    });
  }
  html += `</div>`;

  // Add stop button + dropdown
  html += `<button class="planner-add-btn" id="planner-add-toggle">➕ Add Stop</button>`;
  if (addDropdownOpen) {
    const available = locations.filter(l => {
      // Not already a stop, start, or end on THIS day
      const onThisDay = day.stops.includes(l.id) || day.start === l.id || day.end === l.id;
      return !onThisDay;
    });
    html += `<div class="planner-dropdown" id="planner-dropdown">`;
    if (available.length === 0) {
      html += `<div class="planner-dropdown-item" style="cursor:default;color:var(--text-label)">All locations assigned</div>`;
    } else {
      available.forEach(loc => {
        const cfg = typeConfig[loc.type] || typeConfig.nature;
        const badge = assignedIds.has(loc.id) ? ' ⚠️' : '';
        html += `<div class="planner-dropdown-item" data-add-id="${loc.id}">${cfg.emoji} ${loc.name}${badge}</div>`;
      });
    }
    html += `</div>`;
  }

  // End selector
  html += `<div class="planner-label" style="margin-top:14px">🏁 End Location</div>`;
  html += `<select class="planner-select" id="planner-end">`;
  html += `<option value="">— Select end —</option>`;
  if (myLocationData) {
    const sel = day.end === 'my-location' ? 'selected' : '';
    html += `<optgroup label="📍 My Location"><option value="my-location" ${sel}>📍 My Current Location</option></optgroup>`;
  }
  html += `<optgroup label="🏠 Hotels / Lodging">`;
  sortedForSelect.filter(l => l.type === 'hotel').forEach(loc => {
    const sel = day.end === loc.id ? 'selected' : '';
    html += `<option value="${loc.id}" ${sel}>${loc.name}</option>`;
  });
  html += `</optgroup><optgroup label="📍 All Locations">`;
  sortedForSelect.filter(l => l.type !== 'hotel').forEach(loc => {
    const sel = day.end === loc.id ? 'selected' : '';
    html += `<option value="${loc.id}" ${sel}>${loc.name}</option>`;
  });
  html += `</optgroup></select>`;

  // Action buttons
  html += `<div class="planner-actions">`;
  html += `<button class="planner-action-btn primary" id="planner-optimize" ${day.stops.length < 2 ? 'disabled style="opacity:0.5;cursor:not-allowed"' : ''}>🔄 Optimize Route</button>`;
  html += `<button class="planner-action-btn" id="planner-clear">🗑️ Clear Day</button>`;
  html += `<button class="planner-action-btn" id="planner-save" style="background:rgba(99,102,241,0.1);color:#6366f1">💾 Save Plan</button>`;
  html += `</div>`;

  // Stats
  html += `<div class="planner-stats">`;
  html += `<div class="planner-stat"><div class="ps-val" id="planner-dist">—</div><div class="ps-label">Distance</div></div>`;
  html += `<div class="planner-stat"><div class="ps-val" id="planner-time">—</div><div class="ps-label">Drive Time</div></div>`;
  html += `<div class="planner-stat"><div class="ps-val" id="planner-stops-count">${day.stops.length}</div><div class="ps-label">Stops</div></div>`;
  html += `</div>`;

  // Suggestions container (populated async)
  html += `<div id="planner-suggestions"></div>`;

  html += `</div>`; // close planner-day-content

  setSidebarContent(html);

  // Wire up day tabs
  document.querySelectorAll('.planner-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      plannerState.activeDay = parseInt(tab.dataset.day);
      savePlannerState();
      addDropdownOpen = false;
      buildDayPlanner();
      highlightPlannerDay(plannerState.activeDay);
      calcPlannerRoute(plannerState.activeDay);
    });
  });

  // Wire up start/end selectors
  const startSel = document.getElementById('planner-start');
  const endSel = document.getElementById('planner-end');
  if (startSel) {
    startSel.addEventListener('change', () => {
      day.start = startSel.value || null;
      savePlannerState();
      highlightPlannerDay(dayNum);
      calcPlannerRoute(dayNum);
    });
  }
  if (endSel) {
    endSel.addEventListener('change', () => {
      day.end = endSel.value || null;
      savePlannerState();
      highlightPlannerDay(dayNum);
      calcPlannerRoute(dayNum);
    });
  }

  // Wire up add button + dropdown
  const addBtn = document.getElementById('planner-add-toggle');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      addDropdownOpen = !addDropdownOpen;
      buildDayPlanner();
      highlightPlannerDay(dayNum);
      // Restore stats after rebuild
      updatePlannerStats();
    });
  }

  document.querySelectorAll('.planner-dropdown-item[data-add-id]').forEach(item => {
    item.addEventListener('click', () => {
      const id = item.dataset.addId;
      day.stops.push(id);
      savePlannerState();
      addDropdownOpen = false;
      buildDayPlanner();
      highlightPlannerDay(dayNum);
      calcPlannerRoute(dayNum);
    });
  });

  // Wire up remove buttons
  document.querySelectorAll('.stop-remove').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.removeId;
      day.stops = day.stops.filter(s => s !== id);
      savePlannerState();
      buildDayPlanner();
      highlightPlannerDay(dayNum);
      calcPlannerRoute(dayNum);
    });
  });

  // Wire up optimize button
  const optBtn = document.getElementById('planner-optimize');
  if (optBtn && day.stops.length >= 2) {
    optBtn.addEventListener('click', () => {
      optBtn.textContent = '⏳ Optimizing...';
      optBtn.disabled = true;
      optimizeRoute(dayNum);
    });
  }

  // Wire up clear button
  const clearBtn = document.getElementById('planner-clear');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      day.start = null;
      day.end = null;
      day.stops = [];
      savePlannerState();
      if (plannerRouteLine) { map.removeLayer(plannerRouteLine); plannerRouteLine = null; }
      plannerRouteStats = { distance: 0, duration: 0 };
      buildDayPlanner();
      highlightPlannerDay(dayNum);
    });
  }

  // Wire up save/export button
  const saveBtn = document.getElementById('planner-save');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      let text = '🌵 ARIZONA ROAD TRIP — DAY PLANNER\n';
      text += `Exported: ${new Date().toLocaleString()}\n`;
      text += '═'.repeat(50) + '\n\n';

      TRIP_DAYS.forEach(td => {
        const dayData = plannerState.days[td.num];
        text += `📅 DAY ${td.num} — ${td.date} (${td.label})\n`;
        text += '─'.repeat(40) + '\n';

        const startLoc = dayData.start ? locations.find(l => l.id === dayData.start) : null;
        const endLoc = dayData.end ? locations.find(l => l.id === dayData.end) : null;

        text += `  🚗 Start: ${startLoc ? startLoc.name : '(not set)'}\n`;

        if (dayData.stops.length > 0) {
          dayData.stops.forEach((id, i) => {
            const loc = locations.find(l => l.id === id);
            text += `  ${i + 1}. ${loc ? loc.name : id}\n`;
          });
        } else {
          text += `  (no stops planned)\n`;
        }

        text += `  🏁 End: ${endLoc ? endLoc.name : '(not set)'}\n\n`;
      });

      text += '═'.repeat(50) + '\n';
      text += 'Generated by Arizona Trip Planner\n';

      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'arizona-trip-plan.txt';
      a.click();
      URL.revokeObjectURL(url);

      saveBtn.textContent = '✅ Saved!';
      setTimeout(() => { saveBtn.textContent = '💾 Save Plan'; }, 2000);
    });
  }

  // Wire up stop card clicks to fly to marker
  document.querySelectorAll('.planner-stop').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.classList.contains('stop-remove')) return;
      const id = card.dataset.stopId;
      const entry = markers[id];
      if (entry) {
        map.flyTo([entry.data.lat, entry.data.lng], 12, { duration: 1 });
        entry.marker.openPopup();
      }
    });
  });

  // Drag and drop reordering
  initPlannerDragDrop(dayNum);

  // (Map-to-planner drop is handled by custom drag on markers, no HTML5 drop zone needed here)

  // Calculate route and show stats
  highlightPlannerDay(dayNum);
  calcPlannerRoute(dayNum);
}

function initPlannerDragDrop(dayNum) {
  const stopList = document.getElementById('planner-stops-list');
  if (!stopList) return;

  const stops = stopList.querySelectorAll('.planner-stop');
  let draggedEl = null;

  stops.forEach(stop => {
    stop.addEventListener('dragstart', (e) => {
      draggedEl = stop;
      stop.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', stop.dataset.stopIdx);
    });

    stop.addEventListener('dragend', () => {
      stop.classList.remove('dragging');
      stops.forEach(s => s.classList.remove('drag-over'));
      draggedEl = null;
    });

    stop.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      if (stop !== draggedEl) {
        stop.classList.add('drag-over');
      }
    });

    stop.addEventListener('dragleave', () => {
      stop.classList.remove('drag-over');
    });

    stop.addEventListener('drop', (e) => {
      e.preventDefault();
      stop.classList.remove('drag-over');
      if (!draggedEl || stop === draggedEl) return;

      const fromIdx = parseInt(draggedEl.dataset.stopIdx);
      const toIdx = parseInt(stop.dataset.stopIdx);
      const day = plannerState.days[dayNum];

      // Reorder
      const [moved] = day.stops.splice(fromIdx, 1);
      day.stops.splice(toIdx, 0, moved);

      savePlannerState();
      buildDayPlanner();
      calcPlannerRoute(dayNum);
    });
  });
}

// ── Sidebar view toggle ──
let currentView = 'all';
function updateSidebarView(view) {
  currentView = view;
  if (plannerRouteLine) { map.removeLayer(plannerRouteLine); plannerRouteLine = null; }
  plannerRouteStats = { distance: 0, duration: 0 };

  if (view === 'evelyn') {
    resetMarkerOpacity();
    buildEvelynSidebar();
  } else if (view === 'planner') {
    buildDayPlanner();
  } else {
    resetMarkerOpacity();
    buildSidebar();
  }
}

document.querySelectorAll('.view-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    updateSidebarView(btn.dataset.view);
  });
});

buildSidebar();

// Collapse sidebar by default on mobile for better map view
if (window.matchMedia('(max-width: 768px)').matches) {
  const sidebar = document.getElementById('sidebar');
  const toggle = document.getElementById('sidebar-toggle');
  if (sidebar && toggle) {
    sidebar.classList.add('collapsed');
    toggle.textContent = '\u25B2'; // up arrow
  }
}

// Fit map to all markers
const allCoords = locations.map(l => [l.lat, l.lng]);
map.fitBounds(allCoords, { padding: [50, 50] });

// ── Theme Switcher Logic ──
document.querySelectorAll('.theme-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const theme = btn.dataset.theme;
    if (theme === currentTheme) return;

    // Swap tile layer
    map.removeLayer(tileLayers[currentTheme]);
    tileLayers[theme].addTo(map);
    currentTheme = theme;

    // Swap body class for CSS variables
    document.body.className = theme === 'dark' ? '' : `theme-${theme}`;

    // Update active button
    document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Emoji markers pick up border from CSS --marker-stroke automatically via .emoji-marker

    // Update route line color
    const rc = getComputedStyle(document.documentElement).getPropertyValue('--route-color').trim();
    const ro = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--route-opacity').trim());
    routeLine.setStyle({ color: rc, opacity: ro });
  });
});

// ── Routing Provider Switcher Logic ──
// Helper function to update routing button active states
function updateRoutingButtonStates(activeProvider) {
  document.querySelectorAll('.routing-btn').forEach(btn => {
    if (btn.dataset.routing === activeProvider) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// Initialize the routing provider buttons based on saved preference
updateRoutingButtonStates(routingConfig.provider);

// Handle routing provider button clicks
document.querySelectorAll('.routing-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const provider = btn.dataset.routing;
    if (provider === routingConfig.provider) return;

    // Update the provider
    routingConfig.provider = provider;
    localStorage.setItem('routingProvider', provider);

    // Update active button
    updateRoutingButtonStates(provider);

    // Show toast notification
    const providerName = provider === 'google' ? 'Google Maps' : 'OSRM (Open Source)';
    showToast(`📍 Routing provider changed to ${providerName}`);

    // If there's an active route, recalculate it with the new provider
    if (routeStart && routeEnd) {
      fetchDrivingRoute(routeStart, routeEnd);
    }

    // If there's an active planner route, recalculate it
    if (currentView === 'planner' && plannerState.activeDay !== null) {
      calcPlannerRoute(plannerState.activeDay);
    }
  });
});

// ── Click-to-Route Feature ──
let routeStart = null;    // { id, name, lat, lng }
let routeEnd = null;
let drivingRoute = null;  // Leaflet polyline
const routeHint = document.getElementById('routeHint');
const routePanel = document.getElementById('routePanel');
const routeEndpoints = document.getElementById('routeEndpoints');
const routeStats = document.getElementById('routeStats');
const routeClose = document.getElementById('routeClose');

function clearRoute() {
  if (drivingRoute) {
    map.removeLayer(drivingRoute);
    drivingRoute = null;
  }
  routeStart = null;
  routeEnd = null;
  routePanel.classList.remove('visible');
  routeHint.classList.remove('visible');
  // Remove selected class from all markers
  document.querySelectorAll('.emoji-marker.selected').forEach(el => el.classList.remove('selected'));
}

routeClose.addEventListener('click', clearRoute);

function selectMarker(locId) {
  const entry = markers[locId];
  if (!entry) return;
  const loc = entry.data;

  if (!routeStart) {
    // First click — select start
    clearRoute();
    routeStart = { id: loc.id, name: loc.name, lat: loc.lat, lng: loc.lng };

    // Highlight the marker
    const markerEl = entry.marker.getElement();
    if (markerEl) markerEl.querySelector('.emoji-marker')?.classList.add('selected');

    // Show hint
    routeHint.textContent = `✨ Now click another marker to get driving route from ${loc.name}`;
    routeHint.classList.add('visible');

  } else if (routeStart.id !== loc.id) {
    // Second click — select end and fetch route
    routeEnd = { id: loc.id, name: loc.name, lat: loc.lat, lng: loc.lng };

    // Highlight the end marker too
    const markerEl = entry.marker.getElement();
    if (markerEl) markerEl.querySelector('.emoji-marker')?.classList.add('selected');

    routeHint.textContent = '⏳ Fetching driving route…';
    fetchDrivingRoute(routeStart, routeEnd);

  } else {
    // Clicked the same marker again — deselect
    clearRoute();
  }
}

async function fetchDrivingRoute(start, end) {
  try {
    const waypoints = [start, end];
    const route = await fetchRoute(waypoints);

    // Draw the route
    if (drivingRoute) map.removeLayer(drivingRoute);
    drivingRoute = L.polyline(route.geometry, {
      color: '#3b82f6',
      weight: 5,
      opacity: 0.8,
      smoothFactor: 1
    }).addTo(map);

    // Fit bounds to the route
    map.fitBounds(drivingRoute.getBounds(), { padding: [80, 80] });

    // Calculate stats
    const distanceMiles = (route.distance / 1609.344).toFixed(1);
    const durationMin = Math.round(route.duration / 60);
    const hours = Math.floor(durationMin / 60);
    const mins = durationMin % 60;
    const timeStr = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;

    // Show panel
    routeHint.classList.remove('visible');
    routeEndpoints.innerHTML = `
      <span class="ep-name">${start.name}</span>
      <span class="ep-arrow">→</span>
      <span class="ep-name">${end.name}</span>
    `;
    routeStats.innerHTML = `
      <div class="route-stat">
        <span class="stat-value">${distanceMiles} mi</span>
        <span class="stat-label">Distance</span>
      </div>
      <div class="route-stat">
        <span class="stat-value">${timeStr}</span>
        <span class="stat-label">Drive Time</span>
      </div>
    `;
    routePanel.classList.add('visible');

  } catch (err) {
    console.error('Routing error:', err);
    routeHint.textContent = '❌ Routing failed — check your connection';
    setTimeout(() => routeHint.classList.remove('visible'), 3000);
  }
}

// Wire up marker clicks for routing
Object.values(markers).forEach(({ marker, data }) => {
  marker.on('click', () => {
    // Only enter routing mode if popup is already open or if clicking a second marker
    // We let the normal popup open on first click, but track it for routing
    selectMarker(data.id);
  });
});

// Click on map background clears route selection
map.on('click', (e) => {
  if (routeStart && !routeEnd) {
    // Was waiting for second marker but clicked map instead
    clearRoute();
  }
});
// ── Add Location Modal ──
const modalHTML = `
<div class="modal-overlay" id="add-loc-modal">
  <div class="modal-card">
    <h2>📌 Add Custom Location</h2>
    <div class="modal-field">
      <label>Location Name</label>
      <div class="modal-search-row">
        <input type="text" id="add-loc-name" placeholder="e.g. In-N-Out Burger, Flagstaff" />
        <button class="modal-search-btn" id="add-loc-search">🔍 Search</button>
      </div>
      <div id="add-loc-results"></div>
      <div class="modal-selected-info" id="add-loc-selected"></div>
    </div>
    <div class="modal-field">
      <label>Type</label>
      <select id="add-loc-type">
        <option value="custom">📌 Custom</option>
        <option value="hotel">🏠 Hotel / Lodging</option>
        <option value="nature">🌲 Park / Nature</option>
        <option value="attraction">🎡 Attraction</option>
      </select>
    </div>
    <div class="modal-field">
      <label>Description (auto-filled, or write your own)</label>
      <textarea id="add-loc-desc" placeholder="Optional description..."></textarea>
    </div>
    <div class="modal-actions">
      <button class="modal-cancel" id="add-loc-cancel">Cancel</button>
      <button class="modal-submit" id="add-loc-submit" disabled>➕ Add to Map</button>
    </div>
  </div>
</div>`;
document.body.insertAdjacentHTML('beforeend', modalHTML);

const addLocModal = document.getElementById('add-loc-modal');
const addLocName = document.getElementById('add-loc-name');
const addLocSearch = document.getElementById('add-loc-search');
const addLocResults = document.getElementById('add-loc-results');
const addLocSelected = document.getElementById('add-loc-selected');
const addLocType = document.getElementById('add-loc-type');
const addLocDesc = document.getElementById('add-loc-desc');
const addLocSubmit = document.getElementById('add-loc-submit');
const addLocCancel = document.getElementById('add-loc-cancel');

let selectedGeoResult = null;

document.getElementById('add-loc-btn').addEventListener('click', () => {
  addLocModal.classList.add('open');
  addLocName.value = '';
  addLocResults.innerHTML = '';
  addLocSelected.textContent = '';
  addLocDesc.value = '';
  addLocType.value = 'custom';
  addLocSubmit.disabled = true;
  selectedGeoResult = null;
  setTimeout(() => addLocName.focus(), 100);
});

addLocCancel.addEventListener('click', () => {
  addLocModal.classList.remove('open');
});

addLocModal.addEventListener('click', (e) => {
  if (e.target === addLocModal) addLocModal.classList.remove('open');
});

// Enter key triggers search
addLocName.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') { e.preventDefault(); addLocSearch.click(); }
});

// Geocode search
addLocSearch.addEventListener('click', async () => {
  const query = addLocName.value.trim();
  if (!query) return;
  addLocSearch.disabled = true;
  addLocSearch.textContent = '⏳';
  addLocResults.innerHTML = '';
  addLocSelected.textContent = '';
  selectedGeoResult = null;
  addLocSubmit.disabled = true;

  try {
    // Bias search toward Arizona
    const resp = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query + ', Arizona')}&format=json&limit=5&addressdetails=1`);
    const data = await resp.json();

    if (data.length === 0) {
      addLocResults.innerHTML = '<div style="padding:10px;font-size:0.78rem;color:var(--text-label)">No results found. Try a more specific name.</div>';
    } else {
      let html = '<div class="modal-results">';
      data.forEach((r, i) => {
        html += `<div class="modal-result-item" data-idx="${i}">📍 ${r.display_name}</div>`;
      });
      html += '</div>';
      addLocResults.innerHTML = html;

      // Wire up result clicks
      addLocResults.querySelectorAll('.modal-result-item').forEach(item => {
        item.addEventListener('click', () => {
          const idx = parseInt(item.dataset.idx);
          selectedGeoResult = data[idx];
          // Highlight selected
          addLocResults.querySelectorAll('.modal-result-item').forEach(r => r.classList.remove('selected'));
          item.classList.add('selected');
          addLocSelected.textContent = `✅ Selected: ${selectedGeoResult.display_name.split(',').slice(0, 3).join(',')}`;
          addLocSubmit.disabled = false;

          // Auto-fill description from address
          if (!addLocDesc.value.trim()) {
            const addr = selectedGeoResult.address || {};
            const parts = [];
            if (addr.road) parts.push(addr.road);
            if (addr.city || addr.town || addr.village) parts.push(addr.city || addr.town || addr.village);
            if (addr.state) parts.push(addr.state);
            const areaStr = parts.length ? parts.join(', ') : '';
            addLocDesc.value = areaStr ? `<strong>Area:</strong> ${areaStr}` : '';
          }

          // Auto-fill name if empty
          if (!addLocName.value.trim()) {
            addLocName.value = selectedGeoResult.display_name.split(',')[0];
          }
        });
      });
    }
  } catch (err) {
    addLocResults.innerHTML = '<div style="padding:10px;font-size:0.78rem;color:#ef4444">❌ Search failed. Check your internet connection.</div>';
  }

  addLocSearch.disabled = false;
  addLocSearch.textContent = '🔍 Search';
});

// Submit: create marker, save to localStorage, refresh sidebar
addLocSubmit.addEventListener('click', async () => {
  if (!selectedGeoResult) return;
  addLocSubmit.disabled = true;
  addLocSubmit.textContent = '⏳ Adding...';

  const locName = addLocName.value.trim() || selectedGeoResult.display_name.split(',')[0];
  const locId = 'custom-' + Date.now();
  const locType = addLocType.value;
  const locDesc = addLocDesc.value.trim() || `<strong>Area:</strong> ${selectedGeoResult.display_name.split(',').slice(1, 3).join(',').trim()}`;
  const lat = parseFloat(selectedGeoResult.lat);
  const lng = parseFloat(selectedGeoResult.lon);
  const cfg = typeConfig[locType] || typeConfig.custom;

  // Try to fetch an image from Wikipedia
  let imageUrl = null;
  try {
    const wikiResp = await fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(locName)}&prop=pageimages&format=json&pithumbsize=400&origin=*`);
    const wikiData = await wikiResp.json();
    const pages = wikiData.query && wikiData.query.pages;
    if (pages) {
      const page = Object.values(pages)[0];
      if (page && page.thumbnail && page.thumbnail.source) {
        imageUrl = page.thumbnail.source;
      }
    }
    // If no result, try with shorter name (first word or two)
    if (!imageUrl) {
      const shortName = locName.split(/[,\-–]/)[0].trim();
      if (shortName !== locName) {
        const resp2 = await fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(shortName)}&prop=pageimages&format=json&pithumbsize=400&origin=*`);
        const data2 = await resp2.json();
        const pages2 = data2.query && data2.query.pages;
        if (pages2) {
          const page2 = Object.values(pages2)[0];
          if (page2 && page2.thumbnail && page2.thumbnail.source) {
            imageUrl = page2.thumbnail.source;
          }
        }
      }
    }
  } catch (e) { /* Wikipedia fetch failed, proceed without image */ }

  const newLoc = {
    id: locId,
    name: locName,
    day: null,
    type: locType,
    lat: lat,
    lng: lng,
    color: cfg.border,
    image: imageUrl,
    details: locDesc
  };

  // Add to locations array
  locations.push(newLoc);

  // Create marker on map
  const icon = L.divIcon({
    className: '',
    html: `<div class="emoji-marker" style="background:${cfg.bg};border-color:${cfg.border}">${cfg.emoji}</div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -20]
  });

  const marker = L.marker([lat, lng], { icon }).addTo(map);
  allMapMarkers.push(marker);

  const dayLabel = `<div class="popup-day" style="color:${cfg.border}">Custom Location</div>`;
  const imageHtml = imageUrl ? `<img class="popup-image" src="${imageUrl}" alt="${locName}">` : '';
  marker.bindPopup(`
    <div>
      ${imageHtml}
      ${dayLabel}
      <div class="popup-title">${locName}</div>
      <div class="popup-detail">${locDesc}</div>
    </div>
  `, { className: 'custom-popup', maxWidth: 280 });

  markers[locId] = { marker, data: newLoc };

  // Wire up click for routing
  marker.on('click', () => { selectMarker(locId); });

  // Save to localStorage
  try {
    const saved = localStorage.getItem('arizonaTripCustomLocations');
    const customs = saved ? JSON.parse(saved) : [];
    customs.push(newLoc);
    localStorage.setItem('arizonaTripCustomLocations', JSON.stringify(customs));
  } catch (e) { /* ignore */ }

  // Close modal
  addLocModal.classList.remove('open');
  addLocSubmit.disabled = false;
  addLocSubmit.textContent = '➕ Add to Map';

  // Refresh sidebar
  if (currentView === 'all') buildSidebar();
  else if (currentView === 'planner') buildDayPlanner();

  // Fly to new location
  map.flyTo([lat, lng], 12, { duration: 1 });
  setTimeout(() => marker.openPopup(), 1200);
});

// ── Toast Helper ──
function showToast(msg, duration = 3000) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('visible');
  setTimeout(() => toast.classList.remove('visible'), duration);
}

// ── Geolocation / My Location ──
let myLocationMarker = null;

const locateBtn = document.getElementById('locate-btn');
if (locateBtn) {
  locateBtn.addEventListener('click', () => {
    if (!navigator.geolocation) {
      showToast('❌ Geolocation is not supported by your browser');
      return;
    }

    locateBtn.classList.add('loading');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        myLocationData = { lat, lng };

        // Remove old marker
        if (myLocationMarker) map.removeLayer(myLocationMarker);

        // Create pulsing blue marker
        const locIcon = L.divIcon({
          className: '',
          html: '<div class="my-location-marker"></div>',
          iconSize: [18, 18],
          iconAnchor: [9, 9]
        });
        myLocationMarker = L.marker([lat, lng], { icon: locIcon, zIndexOffset: 2000 })
          .addTo(map)
          .bindPopup(`<div style="font-family:'Inter',sans-serif;text-align:center">
            <div style="font-weight:700;font-size:0.9rem;margin-bottom:4px">📍 My Location</div>
            <div style="font-size:0.75rem;color:var(--popup-detail)">${lat.toFixed(4)}, ${lng.toFixed(4)}</div>
          </div>`, { className: 'custom-popup' });

        // Register in markers so planner can use it for routes
        markers['my-location'] = {
          marker: myLocationMarker,
          data: { id: 'my-location', name: 'My Current Location', lat, lng, type: 'custom' }
        };

        map.flyTo([lat, lng], 13, { duration: 1.2 });
        locateBtn.classList.remove('loading');
        locateBtn.classList.add('active');
        showToast(`📍 Location found: ${lat.toFixed(4)}, ${lng.toFixed(4)}`);

        // Refresh planner to show My Location option
        if (currentView === 'planner') buildDayPlanner();
      },
      (err) => {
        locateBtn.classList.remove('loading');
        const msgs = {
          1: '❌ Location permission denied. Please enable location access.',
          2: '❌ Location unavailable. Try again later.',
          3: '⏳ Location request timed out. Try again.'
        };
        showToast(msgs[err.code] || '❌ Could not get location');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  });
}
// ── Plan Management UI ──
function updatePlanSelector() {
  const planSelect = document.getElementById('plan-select');
  if (!planSelect) return;
  
  planSelect.innerHTML = '';
  Object.keys(allPlans).forEach(planId => {
    const option = document.createElement('option');
    option.value = planId;
    option.textContent = allPlans[planId].name;
    if (planId === currentPlanId) option.selected = true;
    planSelect.appendChild(option);
  });
}

// Initialize plan selector
updatePlanSelector();

// Plan selector change handler
const planSelect = document.getElementById('plan-select');
if (planSelect) {
  planSelect.addEventListener('change', (e) => {
    switchPlan(e.target.value);
    showToast(`✅ Switched to: ${allPlans[e.target.value].name}`);
  });
}

// Plan management modal
const planManageHTML = `
<div class="modal-overlay" id="plan-manage-modal">
  <div class="modal-card">
    <h2>🗺️ Manage Plans</h2>
    <div class="plan-list" id="plan-list"></div>
    <div class="modal-field">
      <label>Create New Plan</label>
      <div class="modal-search-row">
        <input type="text" id="new-plan-name" placeholder="e.g. Alternative Route" />
        <button class="modal-search-btn" id="create-plan-btn">➕ Create</button>
      </div>
    </div>
    <div class="modal-actions">
      <button class="modal-cancel" id="plan-manage-close">Close</button>
    </div>
  </div>
</div>`;
document.body.insertAdjacentHTML('beforeend', planManageHTML);

const planManageModal = document.getElementById('plan-manage-modal');
const planManageBtn = document.getElementById('plan-manage-btn');
const planManageClose = document.getElementById('plan-manage-close');
const newPlanName = document.getElementById('new-plan-name');
const createPlanBtn = document.getElementById('create-plan-btn');
const planListDiv = document.getElementById('plan-list');

// Sanitize HTML attributes to prevent XSS
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderPlanList() {
  if (!planListDiv) return;
  
  let html = '';
  Object.keys(allPlans).forEach(planId => {
    const plan = allPlans[planId];
    const isCurrent = planId === currentPlanId;
    const safePlanId = escapeHtml(planId);
    const safePlanName = escapeHtml(plan.name);
    html += `
      <div class="plan-item ${isCurrent ? 'current' : ''}" data-plan-id="${safePlanId}">
        <div class="plan-item-info">
          <div class="plan-item-name">${safePlanName}</div>
          ${isCurrent ? '<span class="plan-item-badge">Current</span>' : ''}
        </div>
        <div class="plan-item-actions">
          ${!isCurrent ? `<button class="plan-item-btn" data-action="switch" data-plan-id="${safePlanId}">Switch</button>` : ''}
          ${planId !== 'default' ? `<button class="plan-item-btn danger" data-action="delete" data-plan-id="${safePlanId}">Delete</button>` : ''}
        </div>
      </div>
    `;
  });
  
  planListDiv.innerHTML = html;
  
  // Add event listeners
  planListDiv.querySelectorAll('.plan-item-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const action = e.target.dataset.action;
      const planId = e.target.dataset.planId;
      
      if (action === 'switch') {
        switchPlan(planId);
        updatePlanSelector();
        renderPlanList();
        showToast(`✅ Switched to: ${allPlans[planId].name}`);
      } else if (action === 'delete') {
        if (confirm(`Delete plan "${allPlans[planId].name}"? This cannot be undone.`)) {
          delete allPlans[planId];
          saveAllPlans();
          renderPlanList();
          updatePlanSelector();
          showToast(`🗑️ Plan deleted`);
        }
      }
    });
  });
}

planManageBtn.addEventListener('click', () => {
  planManageModal.classList.add('open');
  renderPlanList();
  newPlanName.value = '';
});

planManageClose.addEventListener('click', () => {
  planManageModal.classList.remove('open');
});

planManageModal.addEventListener('click', (e) => {
  if (e.target === planManageModal) planManageModal.classList.remove('open');
});

createPlanBtn.addEventListener('click', () => {
  const name = newPlanName.value.trim();
  if (!name) {
    showToast('⚠️ Please enter a plan name');
    return;
  }
  
  // Generate unique ID with additional entropy to prevent collisions
  const planId = 'plan_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  
  // Create new plan
  allPlans[planId] = {
    name: name,
    data: createEmptyPlan()
  };
  
  saveAllPlans();
  updatePlanSelector();
  renderPlanList();
  newPlanName.value = '';
  
  showToast(`✅ Created: ${name}`);
});

newPlanName.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    createPlanBtn.click();
  }
});
