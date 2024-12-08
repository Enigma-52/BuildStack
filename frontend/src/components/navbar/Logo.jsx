import { Link } from "../Link"
import { Image } from "../Image"

const Logo = () => {
    return (
        <div>
            <Link href={"/"}>
                <Image
                    src={"/images/favicon.ico"}
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