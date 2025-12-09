export interface TopAttraction {
  id: string;
  name: string;
  url: string;
  rank: number;
}

export interface RelatedLink {
  label: string;
  url: string;
}

export interface LinkGroup {
  title: string;
  links: RelatedLink[];
}

export interface IslandAttractionData {
  topAttractions: TopAttraction[];
  relatedIslands: RelatedLink[];
  relatedServices: RelatedLink[];
  relatedActivities: RelatedLink[];
}

export interface SiteLinksData {
  popularIslands: LinkGroup;
  islandCategories: LinkGroup;
  topActivities: LinkGroup;
  travelServices: LinkGroup;
}
