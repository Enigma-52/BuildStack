import { Link } from "../Link"
import { Image } from "../Image"
import { useNavigate } from 'react-router-dom'

const Logo = () => {
    return (
        <div>
            <Link href={"/"}>
                <Image
                    src={'/logo/Logo.png'}
                    alt="logo"
                    width={50}
                    height={50}
                    className="p-1 m-1.3 rounded-full"
                />
            </Link>

            
        </div>
    )
}

export default Logo