export type WeatherCategory = "hot" | "mild" | "cold" | "rainy";

export const CITIES = [
  { name: "თბილისი", lat: 41.7151, lon: 44.8271 },
  { name: "ბათუმი", lat: 41.6168, lon: 41.6367 },
  { name: "ქუთაისი", lat: 42.2679, lon: 42.6946 },
  { name: "რუსთავი", lat: 41.5495, lon: 45.005 },
  { name: "გორი", lat: 41.9842, lon: 44.1089 },
  { name: "თელავი", lat: 41.9198, lon: 45.4731 },
];

export const CATEGORY_LABEL: Record<WeatherCategory, string> = {
  hot: "ცხელა",
  mild: "ზომიერი",
  cold: "ცივა",
  rainy: "წვიმს",
};

export const CATEGORY_TIP: Record<WeatherCategory, string> = {
  hot: "ჩაიცვი მსუბუქი და ჰაეროვანი ტანსაცმელი.",
  mild: "მსუბუქი ფენები საკმარისია.",
  cold: "ჩაიცვი თბილად, ქურთუკი აუცილებელია.",
  rainy: "წვიმისგან დამცავი ქურთუკი გამოგადგება.",
};

export interface WeatherResult {
  city: string;
  date: string;
  minTemp: number;
  maxTemp: number;
  rainProbability: number;
  category: WeatherCategory;
}

export function categorize(maxTemp: number, rainProbability: number): WeatherCategory {
  if (rainProbability > 50) return "rainy"; // ანაცვლებს დანარჩენს
  if (maxTemp > 25) return "hot";
  if (maxTemp >= 15) return "mild";
  return "cold";
}

// YYYY-MM-DD ადგილობრივი დროით (Open-Meteo-ს სწორედ ეს ფორმატი სჭირდება)
export function toISODate(d: Date): string {
  const z = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return z.toISOString().slice(0, 10);
}

export function dateLimits(days = 14) {
  const now = new Date();
  return { min: toISODate(now), max: toISODate(new Date(now.getTime() + days * 864e5)) };
}

export async function fetchWeather(date: string, cityName: string): Promise<WeatherResult> {
  const city = CITIES.find((c) => c.name === cityName) ?? CITIES[0];
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}` +
    `&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max` +
    `&timezone=auto&start_date=${date}&end_date=${date}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("request failed");
  const d = (await res.json()).daily;
  const maxTemp = d?.temperature_2m_max?.[0];
  const minTemp = d?.temperature_2m_min?.[0];
  const rain = d?.precipitation_probability_max?.[0] ?? 0;
  if (maxTemp == null || minTemp == null) throw new Error("no data");
  return { city: city.name, date, minTemp, maxTemp, rainProbability: rain, category: categorize(maxTemp, rain) };
}
