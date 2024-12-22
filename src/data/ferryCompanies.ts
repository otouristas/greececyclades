export interface FerryCompany {
  name: string;
  logo: string;
  website: string;
  primaryColor: string;
}

export const ferryCompanies: Record<string, FerryCompany> = {
  'Blue Star Ferries': {
    name: 'Blue Star Ferries',
    logo: '/images/ferry/companies/blue-star.webp',
    website: 'https://www.bluestarferries.com',
    primaryColor: '#003087'
  },
  'SeaJets': {
    name: 'SeaJets',
    logo: '/images/ferry/companies/seajets.png',
    website: 'https://www.seajets.gr',
    primaryColor: '#e31837'
  },
  'Golden Star Ferries': {
    name: 'Golden Star Ferries',
    logo: '/images/ferry/companies/golden-star.webp',
    website: 'https://goldenstarferries.gr',
    primaryColor: '#fdb913'
  },
  'Fast Ferries': {
    name: 'Fast Ferries',
    logo: '/images/ferry/companies/fast-ferries.webp',
    website: 'https://www.fastferries.com.gr',
    primaryColor: '#1e3d59'
  },
  'Hellenic Seaways': {
    name: 'Hellenic Seaways',
    logo: '/images/ferry/companies/hellenic.svg',
    website: 'https://hellenicseaways.gr',
    primaryColor: '#00a0df'
  },
  'ANEK Lines': {
    name: 'ANEK Lines',
    logo: '/images/ferry/companies/anek-lines.webp',
    website: 'https://www.anek.gr',
    primaryColor: '#004B87'
  },
  'Aegean Sea Lines': {
    name: 'Aegean Sea Lines',
    logo: '/images/ferry/companies/aegean-sea-lines.webp',
    website: 'https://www.aegeansealines.com',
    primaryColor: '#2B3990'
  },
  'Zante Ferries': {
    name: 'Zante Ferries',
    logo: '/images/ferry/companies/zante-ferries.png',
    website: 'https://www.zanteferries.gr',
    primaryColor: '#005BAA'
  }
};
