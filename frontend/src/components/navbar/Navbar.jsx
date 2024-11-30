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
import { User, Rocket, X } from "lucide-react";
import { IoMenuOutline } from "react-icons/io5";
import { PiBellBold } from "react-icons/pi";
import Subscribe from "./subscribe";
import { FiPlusCircle } from "react-icons/fi";
import LoginModal from "./modals/LoginModal";
import LoginContent from "./login-content";
import UserMenu from "./menus/user-menu";

const Navbar = () => {
	const [authModalVisible, setAuthModalVisible] = useState(false);
	const [searchModalVisible, setSearchModalVisible] = useState(false);
	const [isSignedIn, setIsSignedIn] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [loginModalVisible, setLoginModalVisible] = useState(false);
	const [showUserMenu, setShowUserMenu] = useState(false);

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

	const handleSignInButtonClick = () => {
		setAuthModalVisible(true);
		setLoginModalVisible(false);
	};

	const handleSearchButtonClick = () => {
		setSearchModalVisible(true);
	};

	const handleProfileClick = () => {
		window.location.href = "/profile";
	};

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
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

	const handleLoginModalButtonClick = () => {
		setLoginModalVisible(true);
		setAuthModalVisible(false);
	}

	return (
		<>

			<nav
				className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
					}`}
			>
				<div className={`py-2 md:py-0 px-4 md:px-6 ${isMobileMenuOpen ? 'border-b-0' : 'border-b-2'}`}>
					<div className="flex items-center justify-between my-6">
						<div className="flex items-center">
							<button
								className="sm:hidden"
								onClick={toggleMobileMenu}
							>
								{isMobileMenuOpen ? (
									<X className="w-8 h-8 text-black mr-4" />
								) : (
									<IoMenuOutline className="w-8 h-8 text-black mr-4" />
								)}
							</button>
							<div className="relative group">
								<div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-orange-400 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
								<Rocket className="w-8 h-8 text-orange-500 relative" />
							</div>
							<span className="mx-1 text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-orange-400 max-sm:hidden">
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


							{isSignedIn ? (
								<>
									<Button className="hover:bg-gray-100 rounded-full border-2 px-4 py-2 mx-2 text-black p"
										onClick={() => window.location.href = '/createProduct'}
									>
										<FiPlusCircle className="w-5 h-5" />
										Submit
									</Button>
									<Button className="rounded-full p-2 border-2 hover:bg-gray-100 mx-2 text-black">
										<PiBellBold className="w-5 h-5 " />
									</Button>
									<div onMouseEnter={() => setShowUserMenu(true)} onMouseLeave={() => setShowUserMenu(false)}>
										<Button
											onClick={handleProfileClick}
											variant="ghost"
											className="rounded-full border-2 p-2 hover:bg-gray-100 mx-2"
										>
											<User className="h-6 w-6 text-gray-600" />
											{ showUserMenu && <UserMenu/> }
										</Button>
									</div>
								</>
							) : (
								<>
									<div onClick={() => window.location.href = '/newsletter'}>
										<Subscribe />
									</div>
									<div onClick={handleSignInButtonClick}>
										<SignInButton />
									</div>
								</>
							)}
						</div>
					</div>
				</div>
			</nav>

			{/* Mobile Menu */}
			<div
				className={`fixed sm:hidden top-0 left-0 w-full h-full bg-white z-40 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
					}`}

			>
				<div className="h-full flex flex-col justify-center items-center">
					{/* Add your mobile menu items here */}
					hello
					<a href="/" className="text-2xl font-bold mb-4">
						Home
					</a>
					<a href="/about" className="text-2xl font-bold mb-4">
						About
					</a>
					<a href="/contact" className="text-2xl font-bold mb-4">
						Contact
					</a>
				</div>
			</div>

			<Modal visible={authModalVisible} setVisible={setAuthModalVisible}>
				<AuthContent />
				<div onClick={handleLoginModalButtonClick} className="hover:text-orange-600 text-black font-medium hover:cursor-pointer">
					Hello
				</div>
			</Modal>
			<SearchModal
				visible={searchModalVisible}
				setVisible={setSearchModalVisible}
			>
				<SearchContent />
			</SearchModal>
			<LoginModal visible={loginModalVisible} setVisible={setLoginModalVisible}>
				<LoginContent />
				<div onClick={handleSignInButtonClick} className="hover:text-orange-600 text-black font-medium hover:cursor-pointer items-center justify-center">
					hello
				</div>
			</LoginModal>
		</>
	);
};

export default Navbar;