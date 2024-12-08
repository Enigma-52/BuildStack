import { IoMailOpenOutline } from "react-icons/io5";

const Subscribe = () => {
    return (
        <div>
            <button className="max-sm:px-2 group px-6 py-2 mx-4 bg-gradient-to-r from-gray-600 to-gray-400 text-white rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-gray-500/30">
                <span className="flex items-center gap-2">
                    Subscribe
                    <IoMailOpenOutline className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>

            </button>
        </div>
    );
}

export default Subscribe;