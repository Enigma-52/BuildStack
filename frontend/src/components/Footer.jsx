import React from "react";
import { Rocket,
  Linkedin
 } from "lucide-react";
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
 import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
function Footer() {
  return (
    <>
      <footer className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-orange-400 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
                  <Rocket className="w-8 h-8 text-orange-500 relative" />
                </div>
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-orange-400">
                  BuildStack
                </span>
              </div>
              <p className="text-gray-600 mb-4">
                Discover and evaluate the best development tools for your next
                project.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Product
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-orange-500">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-orange-500">
                    Categories
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-orange-500">
                    Trending
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-orange-500">
                    Compare Tools
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Our team
              </h3>
              <ul className="space-y-2">
                <li>
                  <div className="text-gray-600 hover:text-orange-500">
                    Sohom Saha
                  </div>
                </li>
                <li>
                  <div className="text-gray-600 hover:text-orange-500">
                    Arunabho Bhattacharya
                  </div>
                </li>
                <li>
                  <div  className="text-gray-600 hover:text-orange-500">
                    Rohit Singh
                  </div>
                </li>
                <li>
                  <div className="text-gray-600 hover:text-orange-500">
                    Padmanabha Gupta
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
               Profiles
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" >
                    <FontAwesomeIcon icon={faGithub} className="text-gray-600 hover:text-orange-500 w-5 h-5 mr-5"  /> 
                  </a>
                  <a href="#" >
                  <FontAwesomeIcon icon={faLinkedin} className="text-gray-600 hover:text-orange-500 w-5 h-5"  /> 
                  </a>
                </li>
                <li>
                <a href="#" >
                    <FontAwesomeIcon icon={faGithub} className="text-gray-600 hover:text-orange-500 w-5 h-5 mr-5"  /> 
                  </a>
                  <a href="#" >
                  <FontAwesomeIcon icon={faLinkedin} className="text-gray-600 hover:text-orange-500 w-5 h-5"  /> 
                  </a>
                </li>
                <li>
                <a href="#" >
                    <FontAwesomeIcon icon={faGithub} className="text-gray-600 hover:text-orange-500 w-5 h-5 mr-5"  /> 
                  </a>
                  <a href="#" >
                  <FontAwesomeIcon icon={faLinkedin} className="text-gray-600 hover:text-orange-500 w-5 h-5"  /> 
                  </a>
                </li>
                <li>
                <a href="#" >
                    <FontAwesomeIcon icon={faGithub} className="text-gray-600 hover:text-orange-500 w-5 h-5 mr-5"  /> 
                  </a>
                  <a href="#" >
                  <FontAwesomeIcon icon={faLinkedin} className="text-gray-600 hover:text-orange-500 w-5 h-5"  /> 
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-12 pt-8">
            <p className="text-center text-gray-600">
              © {new Date().getFullYear()} BuildStack. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
