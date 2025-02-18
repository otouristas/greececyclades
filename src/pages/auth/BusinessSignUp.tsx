import { useState } from 'react';
import AuthLayout from '../../components/auth/AuthLayout';
import { Eye, EyeOff } from 'lucide-react';

export default function BusinessSignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    contactName: '',
    email: '',
    phone: '',
    password: '',
  });

  const businessTypes = [
    'Hotel / Resort',
    'Restaurant',
    'Tour Operator',
    'Transportation',
    'Activity Provider',
    'Other'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement business sign up logic
    console.log('Business sign up:', formData);
  };

  return (
    <AuthLayout
      title="Create Business Account"
      subtitle="Join our network of Greek tourism providers"
      type="business"
      isSignUp
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="businessName" className="block text-sm font-medium text-white">
            Business name
          </label>
          <input
            type="text"
            id="businessName"
            name="businessName"
            required
            value={formData.businessName}
            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
            className="mt-1 block w-full rounded-md border-0 bg-white/10 px-3 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-white/60 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
          />
        </div>

        <div>
          <label htmlFor="businessType" className="block text-sm font-medium text-white">
            Business type
          </label>
          <select
            id="businessType"
            name="businessType"
            required
            value={formData.businessType}
            onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
            className="mt-1 block w-full rounded-md border-0 bg-white/10 px-3 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
          >
            <option value="" className="bg-blue-600">Select a business type</option>
            {businessTypes.map((type) => (
              <option key={type} value={type} className="bg-blue-600">
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="contactName" className="block text-sm font-medium text-white">
            Contact person name
          </label>
          <input
            type="text"
            id="contactName"
            name="contactName"
            required
            value={formData.contactName}
            onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
            className="mt-1 block w-full rounded-md border-0 bg-white/10 px-3 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-white/60 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white">
            Business email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="mt-1 block w-full rounded-md border-0 bg-white/10 px-3 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-white/60 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-white">
            Business phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="mt-1 block w-full rounded-md border-0 bg-white/10 px-3 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-white/60 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-white">
            Password
          </label>
          <div className="relative mt-1">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              autoComplete="new-password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="block w-full rounded-md border-0 bg-white/10 px-3 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-white/60 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-white/60 hover:text-white"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Eye className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-blue-600 shadow-sm hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Create Business Account
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}
