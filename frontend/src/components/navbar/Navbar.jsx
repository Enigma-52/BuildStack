import { Button } from "../ui/button";
import Logo from "./Logo";
import Menu from "./menu";
import Search from "./search";




const Navbar = () => {
   return (
      <div className="border-b py-2 md:py-0 px-4 md:px-6">
         <div className="flex items-center justify-between">
            <div className="flex items-center">
               <Logo />
               <Search />
            </div>

            <div className="absolute right-1/2 translate-x-1/2 transform-z-10">
               <Menu/>
            </div>

            <div className="flex items-center">
               <Button className="bg-red-50 text-red-400 px-3 py-2 my-3 mx-1.5">
                  Subscribe
               </Button>
               
               <Button className="bg-red-400 text-white px-3 py-2 my-3 mx-1.5">
                  Sign in
               </Button>
            </div>
            
         </div>
      </div>

   );
}

export default Navbar;