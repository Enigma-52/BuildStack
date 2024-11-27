"use client"

import { useState } from "react";
import { Button } from "../ui/button";
import Logo from "./Logo";
import Menu from "./menu";
import Search from "./search";
import SignInButton from "./sign-in-button";
import Modal from "./modals/modal";



const Navbar = () => {


	const [authModalVisible, setAuthModalVisible] = useState(false);
	const handleButtonClick = () => {
		setAuthModalVisible(true);
	}

	return (
		<>
			<div className="border-b py-2 md:py-0 px-4 md:px-6">
				<div className="flex items-center justify-between">
					<div className="flex items-center">
						<Logo />
						<Search />
					</div>

					<div className="absolute right-1/2 translate-x-1/2 transform-z-10">
						<Menu />
					</div>

					<div className="flex items-center">
						<Button className="bg-red-50 text-red-400 px-3 py-2 my-3 mx-1.5">
							Subscribe
						</Button>

						<div onClick={handleButtonClick}><SignInButton/></div>
					</div>
					<Modal visible={authModalVisible} setVisible={setAuthModalVisible}>
						Hi
					</Modal>

				</div>
			</div>
			
		</>
	);
}

export default Navbar;