import { useState } from 'react';
import { PiMagnifyingGlass } from 'react-icons/pi'



const Search = () => {

    
    return (
        <div className="rounded-full flex items-center text-gray-500 
        ml-4 bg-slate-100 relative">
            <PiMagnifyingGlass className='ml-2' />
            <input
                type='text' placeholder='Search ( ctrl + k )' className='p-2 rounded-full 
                focus:outline-none text-l bg-slate-100' 
            />
            
        </div>
        
    );
}

export default Search;