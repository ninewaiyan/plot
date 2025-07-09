// src/utils/location.js

export async function fetchUserLocation() {
  if (!navigator.geolocation) return null;

  try {
    const position = await new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 8000 })
    );

    const { latitude, longitude } = position.coords;

    // Just return coordinates as a string
    return `${latitude},${longitude}`;  // e.g. "21.95456,96.0888832"
  } catch (err) {
    console.warn('Location not available or denied', err);
    return null;
  }
}
