export function slugify(text: string): string {
  console.log('Slugifying:', text);
  const result = text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  console.log('Result:', result);
  return result;
}

export function getIslandSlug(name: string): string {
  return slugify(name);
}

export function getVehicleSlug(make: string, model: string): string {
  return slugify(`${make} ${model}`);
}

export function compareSlug(slug1: string, slug2: string): boolean {
  return slugify(slug1) === slugify(slug2);
}
