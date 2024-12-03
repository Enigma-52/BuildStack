import React from 'react'
import { Button } from '../components/ui/button'
import Navbar from '../components/navbar/Navbar'
import Left from '../components/home/Left'
import Right from '../components/home/Right'
import Footer from '../components/Footer'

const HomePage = () => {
	return (
		<>
			<Navbar/>
			<div className='flex min-h-screen pb-12 pt-10' id='Main'>
			<Left/>
			<Right/>
			</div>
			<div className='bg-orange-50'>
			<Footer/>
			</div>
		</>
	)
}

export default HomePage;
