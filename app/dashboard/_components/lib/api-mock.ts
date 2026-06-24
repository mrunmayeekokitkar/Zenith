export interface PlanetData {
  name: string;
  visibility: number; // 0-100
  color: string;
}

export interface WeatherData {
  cloudCover: number; // 0-100%
  seeing: number; // 0-10 (higher is better)
  transparency: string; // Poor, Average, Good, Excellent
}

export interface TelemetryData {
  visiblePlanets: PlanetData[];
  issPosition: { lat: number; lng: number; altitude: number; velocity: number };
  activeSatellites: number;
  weather: WeatherData;
  twinScore: number;
}

export async function fetchTelemetryData(lat: number, lng: number): Promise<TelemetryData> {
  // Simulate network latency (1.5s)
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Generate deterministic but seemingly random data based on coordinates
  const seed = Math.abs(lat * lng);
  
  const score = Math.floor(40 + (seed % 60)); // 40-100
  const satellites = Math.floor(12 + (seed % 40));

  const allPlanets = [
    { name: "Venus", color: "#fcd34d" },
    { name: "Mars", color: "#f87171" },
    { name: "Jupiter", color: "#fdba74" },
    { name: "Saturn", color: "#fde047" },
  ];
  
  const numPlanets = 1 + Math.floor(seed % 4);
  const visiblePlanets = allPlanets.slice(0, numPlanets).map((p, i) => ({
    ...p,
    visibility: Math.floor(40 + ((seed + i * 13) % 60)),
  }));

  const issLat = ((seed % 180) - 90);
  const issLng = ((seed * 2) % 360) - 180;

  const transparencyLevels = ["Poor", "Average", "Good", "Excellent"];

  return {
    visiblePlanets,
    issPosition: {
      lat: issLat,
      lng: issLng,
      altitude: 408 + (seed % 20), // ~408-428 km
      velocity: 27500 + (seed % 1000), // ~27.5k km/h
    },
    activeSatellites: satellites,
    weather: {
      cloudCover: seed % 100,
      seeing: 3 + (seed % 7),
      transparency: transparencyLevels[seed % 4],
    },
    twinScore: score,
  };
}
