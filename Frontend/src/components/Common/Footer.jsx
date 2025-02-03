import FooterLogo from "./Footer.Logo";
import SocialMedia from './SocialMedia'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 border-t-2">
      <div className="w-full md:px-4  sm:px-6 lg:px-8">
        <div className="w-full flex justify-between flex-wrap gap-y-8">
          {/* Logo and Description */}
          <div className="md:w-[30%] w-full px-3">
           <FooterLogo/>
            {/* Social Media handles */}
            <SocialMedia/>
          </div>

          {/* Solutions Column */}
          <div className="md:w-[65%] w-full flex justify-between flex-wrap px-4 gap-y-4 gap-x-3 flex-wrap">

          <div>
            <h4 className="font-semibold sm:text-lg mb-5 text-[1rem]">Solutions</h4>
            <ul className="flex flex-col gap-y-1 space-y-2 md:font-semibold font-normal sm:text-sm text-[0.8rem]">
              <li>
                <a href="#" className="hover:text-gray-200 opacity-60 hover:opacity-100">Marketing</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-200 opacity-60 hover:opacity-100">Analytics</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-200 opacity-60 hover:opacity-100">Automation</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-200 opacity-60 hover:opacity-100">Commerce</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-200 opacity-60 hover:opacity-100">Insights</a>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="font-semibold sm:text-lg mb-5 text-[1rem]">Support</h4>
            <ul className="flex flex-col gap-y-1 space-y-2 md:font-semibold font-normal sm:text-sm text-[0.8rem]">
              <li>
                <a href="#" className="hover:text-gray-200 opacity-60 hover:opacity-100">Submit ticket</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-200 opacity-60 hover:opacity-100">Documentation</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-200 opacity-60 hover:opacity-100">Guides</a>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-semibold sm:text-lg mb-5 text-[1rem]">Company</h4>
            <ul className="flex flex-col gap-y-1 space-y-2 md:font-semibold font-normal sm:text-sm text-[0.8rem]">
              <li>
                <a href="#" className="hover:text-gray-200 opacity-60 hover:opacity-100">About</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-200 opacity-60 hover:opacity-100">Blog</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-200 opacity-60 hover:opacity-100">Jobs</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-200 opacity-60 hover:opacity-100">Press</a>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="font-semibold sm:text-lg mb-5 text-[1rem]">Legal</h4>
            <ul className="flex flex-col gap-y-1 space-y-2 md:font-semibold font-normal sm:text-sm text-[0.8rem]">
              <li>
                <a href="#" className="hover:text-gray-200 opacity-60 hover:opacity-100">Terms of service</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-200 opacity-60 hover:opacity-100">Privacy policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-200 opacity-60 hover:opacity-100">License</a>
              </li>
            </ul>
          </div>
          </div>
        </div>
        <div className="mt-8 text-center font-semibold text-sm text-gray-400">
          © 2024 Your Company, Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
