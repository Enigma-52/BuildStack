import {
    LuAlarmClock,  // for "Coming soon"
    LuArchive,        // for "Launch archive"
    LuBookOpen        // for "Launch guide"
} from 'react-icons/lu'
import { PiRocketLaunch, PiCompass } from "react-icons/pi";



const LaunchesMenu = () => {
    return (
        <div className="border rounded-sm shadow-md bg-white absolute top-full
         text-gray-600">
            <div className="flex cursor-pointer p-2 my-1">
                <div className="flex flex-col items-start space-y-3 m-0.5">
                    <div className="flex items-center gap-4 group hover:bg-green-100 origin-left transition-colors duration-500 ease-in-out rounded-md p-2">
                        <div className='bg-green-200 p-1 rounded-sm shadow-sm group-hover:bg-green-100 transition-colors duration-500 ease-in-out'>
                            <LuAlarmClock className="w-6 h-6 text-gray-500 group-hover:text-green-600 transition-colors duration-500 ease-in-out" />
                        </div>
                        <div>
                            <div className='font-semibold group-hover:text-green-600 transition-colors duration-500 ease-in-out'>
                                Coming soon
                            </div>
                            <div className='text-xs w-60 group-hover:text-green-700 transition-colors duration-500 ease-in-out'>
                                Upcoming launches to watch
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 group hover:bg-red-100 transition-colors duration-500 ease-in-out rounded-md p-2">
                        <div className='bg-red-200 p-1 rounded-sm shadow-sm group-hover:bg-red-100 transition-colors duration-500 ease-in-out'>
                            <PiRocketLaunch className="w-6 h-6 text-gray-500 group-hover:text-red-600 transition-colors duration-500 ease-in-out" />
                        </div>
                        <div>
                            <div className='font-semibold group-hover:text-red-600 transition-colors duration-500 ease-in-out'>
                            Launch archive
                            </div>
                            <div className='text-xs w-60 group-hover:text-red-700 transition-colors duration-500 ease-in-out'>
                            Most loved launches by the community
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 group hover:bg-blue-100 transition-colors duration-500 ease-in-out rounded-md p-2">
                        <div className='bg-blue-200 p-1 rounded-sm shadow-sm group-hover:bg-blue-100 transition-colors duration-500 ease-in-out'>
                            <PiCompass className="w-6 h-6 text-gray-500 group-hover:text-blue-600 transition-colors duration-500 ease-in-out" />
                        </div>
                        <div>
                            <div className='font-semibold group-hover:text-blue-600 transition-colors duration-500 ease-in-out'>
                            Launch guide
                            </div>
                            <div className='text-xs w-60 group-hover:text-blue-700 transition-colors duration-500 ease-in-out'>
                            Checklists and pro tips for launching
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default LaunchesMenu;