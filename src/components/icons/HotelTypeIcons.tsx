import { Building2, Home, Building, Castle, Sparkles, Users, Mountain } from 'lucide-react';

export function getHotelTypeIcon(slug: string) {
  const iconClass = "w-5 h-5";
  
  switch (slug) {
    case 'hotel':
      return <Building2 className={iconClass} />;
    case 'villa':
      return <Home className={iconClass} />;
    case 'apartment':
      return <Building className={iconClass} />;
    case 'resort':
      return <Castle className={iconClass} />;
    case 'boutique':
      return <Sparkles className={iconClass} />;
    case 'guesthouse':
      return <Users className={iconClass} />;
    case 'cave-house':
      return <Mountain className={iconClass} />;
    default:
      return <Building2 className={iconClass} />;
  }
}
