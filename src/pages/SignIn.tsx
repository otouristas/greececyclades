import ComingSoon from '../components/ComingSoon';
import SEO from '../components/SEO';
import { SITE_TAGLINE } from '../constants/seo';

export default function SignIn() {
  return (
    <>
      <SEO 
        title={`Sign In ${SITE_TAGLINE}`}
        description="Sign in to your Greece Cyclades account to access personalized travel planning features and exclusive content."
      />
      <ComingSoon 
        title="Coming Soon"
        description="We're currently working on our sign-in functionality. Check back soon to access personalized travel planning features and exclusive content."
      />
    </>
  );
}
