export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function getIslandSlug(name: string): string {
  return slugify(name);
}

export function compareSlug(slug1: string, slug2: string): boolean {
  return slugify(slug1) === slugify(slug2);
}
