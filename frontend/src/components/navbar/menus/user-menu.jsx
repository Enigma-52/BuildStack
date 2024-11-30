import { useNavigate } from "react-router-dom";




const UserMenu = () => {

    const router = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/home";
    };
    const handleProfileClick = () => {
		router("/profile");
	};

    return (
        <div className="border rounded-sm shadow-md bg-white absolute top-full
         text-gray-600">
            <div className="flex cursor-pointer p-2 my-1">
                <div className="flex flex-col items-start space-y-3 m-0.5 mr-10">
                    <div onClick={handleProfileClick}>
                        Profile
                    </div>
                    <div>
                        My products
                    </div>
                    <div>
                        Settings
                    </div>
                    <div>
                        API dashboard
                    </div>
                    <hr className="border-[1px] border-black w-full" />


                    <div onClick={handleLogout}>
                        Logout
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserMenu;