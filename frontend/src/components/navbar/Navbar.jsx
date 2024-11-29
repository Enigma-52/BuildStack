"use client";

import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import Logo from "./Logo";
import Menu from "./menu";
import Search from "./search";
import SignInButton from "./sign-in-button";
import Modal from "./modals/modal";
import AuthContent from "./auth-content";
import SearchModal from "./modals/searchModal";
import SearchContent from "./search-content";
import { User, Rocket } from "lucide-react";

const Navbar = () => {
  const [authModalVisible, setAuthModalVisible] = useState(false);
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    // Check if user is signed in by looking for token
    const token = localStorage.getItem("token");
    console.log(token);
    setIsSignedIn(!!token);
  }, []);

  const handleButtonClick = () => {
    setAuthModalVisible(true);
  };

  const handleSearchButtonClick = () => {
    setSearchModalVisible(true);
  };

  const handleProfileClick = () => {
    window.location.href = "/profile";
  };

  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        setSearchModalVisible(true);
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  return (
    <>
	<nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
      <div className="border-b py-2 md:py-0 px-4 md:px-6">
        <div className="flex items-center justify-between my-6">
          <div className="flex items-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-orange-400 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
              <Rocket className="w-8 h-8 text-orange-500 relative" />
            </div>
            <span className="mx-2 text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-orange-400 max-sm:hidden">
              BuildStack
            </span>
            {/*<Logo />*/}
            <div onClick={handleSearchButtonClick}>
              <Search />
            </div>
          </div>

          <div className="mx-5 absolute right-1/2 translate-x-1/2 transform-z-10">
            <Menu />
          </div>

          <div className="flex items-center mx-4">
            <button className="group px-6 py-2 mx-4 bg-gradient-to-r from-orange-600 to-orange-400 text-white rounded-full font-medium transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/30">
              <span className="flex items-center gap-2">Subscribe</span>
            </button>

            {isSignedIn ? (
              <Button
                onClick={handleProfileClick}
                variant="ghost"
                className="rounded-full p-2 hover:bg-gray-100"
              >
                <User className="h-6 w-6 text-gray-600" />
              </Button>
            ) : (
              <div onClick={handleButtonClick}>
                <SignInButton />
              </div>
            )}
          </div>

          <Modal visible={authModalVisible} setVisible={setAuthModalVisible}>
            <AuthContent />
          </Modal>
          <SearchModal
            visible={searchModalVisible}
            setVisible={setSearchModalVisible}
          >
            <SearchContent />
          </SearchModal>
        </div>
      </div>
	  </nav>
    </>
  );
};

export default Navbar;
