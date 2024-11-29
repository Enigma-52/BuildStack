import React from 'react'
import { Button } from './components/ui/button'
import Navbar from './components/navbar/Navbar'
import Left from './components/home/Left'
import Right from './components/home/Right'
import Footer from './components/footer'


const App = () => {


	return (
		<>
			<Navbar/>
			<div className='flex min-h-screen' id='Main'>
			<Left/>
			<Right/>
			</div>
			<Footer/>
		</>
	)
}

export default App
