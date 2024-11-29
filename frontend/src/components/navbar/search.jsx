import { useState } from 'react';
import { PiMagnifyingGlass } from 'react-icons/pi'
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Button } from '../ui/button';


const Search = () => {


	return (
		<div className="rounded-full flex items-center text-gray-500 ml-1 bg-slate-100 relative mr-10">
			<div className="flex flex-row max-xl:hidden flex-1">
				<FaMagnifyingGlass className="m-auto ml-3" />
				<input
					type="text"
					placeholder="Search (ctrl + k)"
					className="p-2 rounded-full focus:outline-none text-base bg-slate-100 flex-1"
				/>
			</div>
			<Button className="xl:hidden max-sm:hidden border-2 rounded-full hover:bg-slate-100 bg-white">
				<FaMagnifyingGlass className="m-auto" />
			</Button>
		</div>

	);
}

export default Search;