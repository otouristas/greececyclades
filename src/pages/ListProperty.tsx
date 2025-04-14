import ComingSoon from '../components/ComingSoon';
import SEO from '../components/SEO';
import { SITE_TAGLINE } from '../constants/seo';

export default function ListProperty() {
  return (
    <>
      <SEO 
        title={`List Your Property ${SITE_TAGLINE}`}
        description="List your property on Greece Cyclades and reach travelers planning their perfect Greek island vacation."
      />
      <ComingSoon 
        title="Coming Soon"
        description="We're currently developing our property listing functionality. Soon you'll be able to list your accommodation, restaurant, or activity on our platform to reach travelers planning their Cyclades adventure."
      />
    </>
  );
}
