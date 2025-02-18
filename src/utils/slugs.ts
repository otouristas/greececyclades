// Generic slug generator for any name and location
export function generateSlug(name: string, location?: string): string {
  const nameSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  if (!location) {
    return nameSlug;
  }
  const locationSlug = location.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return `${nameSlug}-${locationSlug}`;
}

// Specific slug generator for vehicles
export function getVehicleSlug(make: string, model: string): string {
  return generateSlug(`${make} ${model}`);
}

// Parse vehicle slug back into make and model
export function parseVehicleSlug(slug: string): { make: string; model: string } | null {
  const parts = slug.split('-');
  if (parts.length < 2) return null;
  
  // Since model names can contain multiple parts, we need to handle that
  const make = parts[0];
  const model = parts.slice(1).join(' ');
  
  return { make, model };
}

// Specific slug generator for activities
export function getActivitySlug(name: string, location: string): string {
  return generateSlug(name, location);
}

// Specific slug generator for islands
export function getIslandSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-');
}
