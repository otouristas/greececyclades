import ComingSoon from '../components/ComingSoon';
import SEO from '../components/SEO';
import { SITE_TAGLINE } from '../constants/seo';

export default function SignUp() {
  return (
    <>
      <SEO 
        title={`Create Account ${SITE_TAGLINE}`}
        description="Join Greece Cyclades to start planning your perfect Greek island adventure with personalized recommendations and travel tools."
      />
      <ComingSoon 
        title="Coming Soon"
        description="We're currently working on our sign-up functionality. Check back soon to create an account and access personalized travel planning features."
      />
    </>
  );
}
