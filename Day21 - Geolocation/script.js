// ==========================================================
// MOCK GEOLOCATION FOR CONTINUOUS SIMULATION (REMOVE IN PRODUCTION)
// ==========================================================

// Check if geolocation is available before mocking (good practice)
if (navigator.geolocation) {
    const originalWatchPosition = navigator.geolocation.watchPosition;
    const originalClearWatch = navigator.geolocation.clearWatch;

    let watchIdCounter = 0;
    const activeWatches = {};

    // Initial simulated values (around Vasai-Virar)
    let currentLat = 19.2183;
    let currentLng = 72.8696;
    let currentSpeed = 0; // meters/second
    let currentHeading = 0; // degrees (0-359.99)

    // State for more controlled speed changes
    let accelerating = true;
    let turningRight = true;

    // Override watchPosition
    navigator.geolocation.watchPosition = (successCallback, errorCallback, options) => {
        const watchId = ++watchIdCounter;
        console.log(`Mocking watchPosition for ID: ${watchId}`);

        // Simulate continuous updates
        const interval = setInterval(() => {
            // --- Logic for continually changing values ---

            // Simulate acceleration/deceleration
            const speedChangeRate = 0.5; // m/s per update (adjust this for faster/slower changes)
            const maxSpeedMps = 35; // Max speed in m/s (approx 126 km/h)
            const minSpeedMps = 0; // Min speed in m/s

            if (accelerating) {
                currentSpeed += speedChangeRate;
                if (currentSpeed >= maxSpeedMps) {
                    currentSpeed = maxSpeedMps;
                    accelerating = false; // Start decelerating
                }
            } else {
                currentSpeed -= speedChangeRate;
                if (currentSpeed <= minSpeedMps) {
                    currentSpeed = minSpeedMps;
                    accelerating = true; // Start accelerating
                }
            }

            // Simulate changing heading (turning)
            const headingChangeRate = 5; // degrees per update (adjust for faster/slower turns)
            if (turningRight) {
                currentHeading += headingChangeRate;
                if (currentHeading >= 360) {
                    currentHeading -= 360; // Keep within 0-359
                    turningRight = false; // Start turning left
                }
            } else {
                currentHeading -= headingChangeRate;
                if (currentHeading < 0) {
                    currentHeading += 360; // Keep within 0-359
                    turningRight = true; // Start turning right
                }
            }

            // Simulate slight movement based on heading and speed
            // (Optional, for visual debugging of lat/lng, not strictly needed for speed/compass)
            const intervalTimeSeconds = 500 / 1000; // 0.5 seconds
            const distanceMovedMeters = currentSpeed * intervalTimeSeconds; // meters moved in this interval

            // Approximate conversion from meters to degrees (at the equator, 1 degree lat ~ 111,139 meters)
            const metersPerDegreeLat = 111139;
            const metersPerDegreeLng = metersPerDegreeLat * Math.cos(currentLat * Math.PI / 180);

            currentLat += (distanceMovedMeters / metersPerDegreeLat) * Math.cos(currentHeading * Math.PI / 180);
            currentLng += (distanceMovedMeters / metersPerDegreeLng) * Math.sin(currentHeading * Math.PI / 180);

            // Ensure lat/lng stay within reasonable bounds
            currentLat = Math.max(-90, Math.min(90, currentLat));
            currentLng = Math.max(-180, Math.min(180, currentLng));


            const simulatedPosition = {
                coords: {
                    latitude: currentLat,
                    longitude: currentLng,
                    speed: currentSpeed, // In meters/second
                    heading: currentHeading, // In degrees
                    accuracy: 5, // Example accuracy
                    altitude: 50,
                    altitudeAccuracy: 10
                },
                timestamp: Date.now()
            };

            // Call the success callback provided by your actual code
            if (successCallback) {
                successCallback(simulatedPosition);
            }
        }, 500); // Send updates every 500 milliseconds (0.5 seconds)

        activeWatches[watchId] = interval;
        return watchId; // Return a fake watch ID
    };

    // Override clearWatch
    navigator.geolocation.clearWatch = (watchId) => {
        console.log(`Clearing mock watch for ID: ${watchId}`);
        if (activeWatches[watchId]) {
            clearInterval(activeWatches[watchId]);
            delete activeWatches[watchId];
        }
    };

    console.warn("Geolocation.watchPosition is being MOCKED for development. Remove this code for production!");
} else {
    console.error("Geolocation is not supported by your browser. Mocking unavailable.");
    alert("Geolocation is not supported by your browser. This app might not work as expected.");
}

const arrow = document.querySelector('.arrow');
const speed = document.querySelector('.speed-value');

navigator.geolocation.watchPosition((data) => {
    console.log(data);
    speed.textContent = Math.round(data.coords.speed * 3.6);
    const currentHeading = data.coords.heading;
    arrow.setAttribute('transform', `rotate(${currentHeading})`);

    console.log(`Applying svg tranform: rotate(${currentHeading} 32 32)`);

}, (e) => {
    console.error(e);
    alert('please allowed that !!')
});