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
import { useNavigate } from "react-router-dom";
import { FaMagnifyingGlass } from "react-icons/fa6";

const Navbar = () => {
	const [authModalVisible, setAuthModalVisible] = useState(false);
	const [searchModalVisible, setSearchModalVisible] = useState(false);
	const [isSignedIn, setIsSignedIn] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [loginModalVisible, setLoginModalVisible] = useState(false);
	const [showUserMenu, setShowUserMenu] = useState(false);

	const router = useNavigate();

	const handleNewsletterClick = () => {
		router('/newsletter');
	}

	const handleCreateProductClick = () => {
		router('/createProduct');
	}

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

	const handleHomepageClick = () => {
		router("/home");
	}

	const handleNotificationButtonClick = () => {
		router("/notifications");
	}

	return (
		<>

			<nav
				className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
					}`}
			>
				<div className={`py-2 md:py-0 px-4 md:px-6 ${isMobileMenuOpen ? 'border-b-0' : 'border-b-2'}`}>
					<div className="flex items-center justify-between my-6 max-sm:mx-0">
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
							<div className="relative group cursor-pointer" onClick={handleHomepageClick} >
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

						<div className="flex items-center mx-4 max-sm:-ml-5">


							{isSignedIn ? (
								<>
									<Button className="hover:bg-gray-100 rounded-full border-2 px-4 py-2 mx-2 text-black p"
										onClick={handleCreateProductClick}
									>
										<FiPlusCircle className="w-5 h-5" />
										Submit
									</Button>
									<Button onClick={handleNotificationButtonClick} className="rounded-full p-2 border-2 hover:bg-gray-100 mx-2 text-black">
										<PiBellBold className="w-5 h-5 " />
									</Button>
									<div onMouseEnter={() => setShowUserMenu(true)} onMouseLeave={() => setShowUserMenu(false)}>
										<Button
											variant="ghost"
											className="rounded-full border-2 p-2 hover:bg-gray-100 mx-2"
										>
											<User className="h-6 w-6 text-gray-600" />
											{showUserMenu && <UserMenu />}
										</Button>
									</div>
								</>
							) : (
								<>
									<div className="max-sm:-mr-1" onClick={handleNewsletterClick}>
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
				<div className="w-full h-full flex flex-col items-center justify-center px-4 py-6">
					<div className="w-full mb-8 items-center justify-center">
						{/* Add responsive width to Search */}
						<div className="rounded-full flex items-center text-gray-500 m-auto bg-slate-100 relative">
							<div className="flex flex-row flex-1" onClick={handleSearchButtonClick}>
								<FaMagnifyingGlass className="m-auto ml-3" />
								<input
									type="text"
									placeholder="Search"
									className="p-2 rounded-full focus:outline-none text-base bg-slate-100 flex-1"
								/>
							</div>
						</div>
					</div>

					{/* Add other menu items if needed */}
					{/* Menu Items */}
					<div className="w-full h-[60vh]">
						<div className="space-y-4">
							{["Launches", "Products", "News", "Discussions", "Advertise"].map((item) => (
								<div
									key={item}
									className="flex items-center justify-between text-gray-800 text-lg font-medium px-2 py-2 hover:bg-gray-100 rounded-lg cursor-pointer"
								>
									<span>{item}</span>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth="1.5"
										stroke="currentColor"
										className="w-5 h-5 text-gray-500"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M8.25 4.5l7.5 7.5-7.5 7.5"
										/>
									</svg>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			<Modal visible={authModalVisible} setVisible={setAuthModalVisible}>
				<AuthContent />
				<div className="text-grey-600 font-medium items-center justify-center">
					<p className="items-center justify-center flex">Already have an Account?</p>
					<p onClick={handleLoginModalButtonClick} className="hover:text-orange-600 items-center justify-center flex hover:cursor-pointer">
						Login
					</p>
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
				<div onClick={handleSignInButtonClick} className=" text-grey-600 font-medium items-center justify-center">
					<p className="items-center justify-center flex">First time using BuildStack?</p>
					<p className="hover:text-orange-600 hover:cursor-pointer items-center justify-center flex"> Create an account</p>
				</div>
			</LoginModal>
		</>
	);
};

export default Navbar;