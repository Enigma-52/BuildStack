import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
const SignInButton = () => {

    
    return ( 
        <Button className="group px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-400 text-white rounded-full font-medium transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/30">
              <span className="flex items-center gap-2">
                Sign in 
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
     );
}
 
export default SignInButton;