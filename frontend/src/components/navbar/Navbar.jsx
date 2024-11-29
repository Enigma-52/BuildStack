"use client"

import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import Logo from "./Logo";
import Menu from "./menu";
import Search from "./search";
import SignInButton from "./sign-in-button";
import Modal from "./modals/modal";
import AuthContent from "./auth-content";
import SearchModal from './modals/searchModal';
import SearchContent from './search-content';
import { User } from "lucide-react"; 

const Navbar = () => {
    const [authModalVisible, setAuthModalVisible] = useState(false);
    const [searchModalVisible, setSearchModalVisible] = useState(false);
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        // Check if user is signed in by looking for token
        const token = localStorage.getItem('token');
		console.log(token);
        setIsSignedIn(!!token);
    }, []);

    const handleButtonClick = () => {
        setAuthModalVisible(true);
    }

    const handleSearchButtonClick = () => {
        setSearchModalVisible(true);
    }

    const handleProfileClick = () => {
        window.location.href = '/profile';
    }

    useEffect(() => {
        const handleKeydown = (event) => {
            if (event.ctrlKey && event.key === 'k') {
                event.preventDefault();
                setSearchModalVisible(true);
            }
        };

        window.addEventListener('keydown', handleKeydown);
        return () => {
            window.removeEventListener('keydown', handleKeydown);
        };
    }, []);

    return (
        <>
            <div className="border-b py-2 md:py-0 px-4 md:px-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Logo />
                        <div onClick={handleSearchButtonClick}>
                            <Search />
                        </div>
                    </div>

                    <div className="absolute right-1/2 translate-x-1/2 transform-z-10">
                        <Menu />
                    </div>

                    <div className="flex items-center">
                        <Button className="bg-red-50 text-red-400 px-3 py-2 my-3 mx-1.5">
                            Subscribe
                        </Button>

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
                    <SearchModal visible={searchModalVisible} setVisible={setSearchModalVisible}>
                        <SearchContent />
                    </SearchModal>
                </div>
            </div>
        </>
    );
}

export default Navbar;