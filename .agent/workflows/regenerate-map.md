---
description: Regenerate the interactive Arizona trip map from Planning.md
---

# Regenerate Trip Map

This workflow regenerates `map.html` from the current contents of `Planning.md`.

## Steps

1. **Read `Planning.md`** to understand the current trip plan (locations, dates, hotels, flights, stops).

2. **Read the existing `map.html`** to understand the current map structure and which locations are already included.

3. **Check the `images/` folder** for existing location photos. List all files in `c:\Users\Charl\OneDrive\Documents\AntiGravityProjects\ArizonaTrip\images\` to know which images already exist.

4. **Identify changes** by comparing Planning.md content against the existing location data in map.html:
   - New locations that need to be added
   - Removed locations that should be deleted
   - Updated details (dates, confirmation numbers, etc.)
   - Locations that need new images generated

5. **Generate images** ONLY for new locations that don't already have an image in the `images/` folder. Save new images to the `images/` folder using the naming convention: `lowercase_name.png` (e.g., `sedona_overlook.png`). Use the `generate_image` tool with descriptive prompts about the Arizona location.

6. **Update `map.html`** location data array. For each location, determine:
   - `id`: kebab-case unique identifier
   - `name`: display name
   - `day`: date string if assigned, `null` if unassigned
   - `type`: one of `hotel`, `flight`, `nature`, `attraction`
     - `hotel` → 🏠 lodging/hotels/resorts
     - `flight` → ✈️ airports/flights
     - `nature` → 🌲 parks, mountains, lakes, natural landmarks, craters
     - `attraction` → 🎡 towns, wildlife parks, ghost towns, man-made attractions
   - `lat`/`lng`: coordinates (look up if needed)
   - `color`: `#f59e0b` (hotel), `#6366f1` (flight), `#10b981` (nature/attraction)
   - `image`: relative path like `images/filename.png`
   - `details`: HTML string with key info (confirmations, addresses, notes)

7. **Update the route line** (`routeCoords` array) if the main itinerary order changed.

8. **Verify** by opening map.html in the browser or reviewing the changes.

## Important Notes

- **Reuse existing images** — never regenerate an image that already exists in the `images/` folder
- **Use LLM judgment** to categorize locations — read the Planning.md naturally rather than relying on strict parsing rules
- **Preserve the map's theme system**, sidebar, legend, and overall HTML structure — only modify the `locations` array, `routeCoords`, and add new images
- The map.html template (CSS, theme switcher, sidebar builder, etc.) should NOT need changes unless the user requests new features
