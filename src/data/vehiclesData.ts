export type { Vehicle } from "./types";

import { electricVehicles } from "./vehicles/electric";
import { luxuryVehicles } from "./vehicles/luxury";
import { motorcycles } from "./vehicles/motorcycles";
import { scooters } from "./vehicles/scooters";
import { suvs } from "./vehicles/suvs";
import { sportsVehicles } from "./vehicles/sports";
import { compactVehicles } from "./vehicles/compact";
import { hybridVehicles } from "./vehicles/hybrid";
import { commercialVehicles } from "./vehicles/commercial";
import { classicVehicles } from "./vehicles/classic";

export const vehicles = [
  ...electricVehicles,
  ...luxuryVehicles,
  ...motorcycles,
  ...scooters,
  ...suvs,
  ...sportsVehicles,
  ...compactVehicles,
  ...hybridVehicles,
  ...commercialVehicles,
  ...classicVehicles,
];