"use client";

import { useState } from "react";
import LaunchesMenu from "./menus/launches-menu";
import CommunityMenu from "./menus/community-menu";
import NewsMenu from "./menus/news-menu";
import { Link } from "../Link";


const Menu = () => {

    const [showLaunchesMenu, setShowLaunchesMenu] = useState(false);
    const [showCommunityMenu, setShowCommunityMenu] = useState(false);
    const [showNewsMenu, setShowNewsMenu] = useState(false);

    return (
        <div className="hidden lg:flex items-center relative">
            <div className="space-x-6 text-gray-500 flex items-center">
                <div
                    onMouseEnter={() => setShowLaunchesMenu(true)}
                    onMouseLeave={() => setShowLaunchesMenu(false)}
                    onClick={() => window.location.href = '/home'}
                    className="hover:cursor-pointer hover:text-red-500"
                >
                    Launches {/*{showLaunchesMenu && <LaunchesMenu />}*/}
                </div>
                <div onClick={() => window.location.href='/categories'} className="hover:text-red-500 hover:cursor-pointer">
                    Products
                </div>

                <div
                    onMouseEnter={() => setShowNewsMenu(true)}
                    onMouseLeave={() => setShowNewsMenu(false)}
                    className="hover:cursor-pointer"
                >
                    News {showNewsMenu && <NewsMenu/>}
                </div>

                <div
                    onMouseEnter={() => setShowCommunityMenu(true)}
                    onMouseLeave={() => setShowCommunityMenu(false)}
                    className="hover:cursor-pointer"
                >
                    Community {showCommunityMenu && <CommunityMenu/>}
                </div>

                <div onClick={() => window.location.href='/sponsor'} className="hover:text-red-500 hover:cursor-pointer">
                    Advertise
                </div>
            </div>

        </div>
    );
}

export default Menu;