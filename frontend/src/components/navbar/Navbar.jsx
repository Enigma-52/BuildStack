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


const Navbar = () => {


	const [authModalVisible, setAuthModalVisible] = useState(false);
	const handleButtonClick = () => {
		setAuthModalVisible(true);
	}

	const [searchModalVisible, setSearchModalVisible] = useState(false);
	const handleSearchButtonClick = () => {
		setSearchModalVisible(true);
	}

	useEffect(() => {
		const handleKeydown = (event) => {
			if (event.ctrlKey && event.key === 'k') {
				event.preventDefault();
				setSearchModalVisible(true);
			}
		};

		window.addEventListener('keydown', handleKeydown);

		// Clean up the event listener on component unmount
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

						<div onClick={handleButtonClick}><SignInButton /></div>
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