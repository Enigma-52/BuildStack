import { HiOutlineInformationCircle, HiOutlinePhotograph, HiOutlineUserGroup, HiOutlineLightBulb, HiOutlineCheckCircle } from 'react-icons/hi';

const ProductCreationPage = () => {
    return (
        <div className="flex">
            {/* Left Section */}
            <div className="w-1/3 p-8">
            <div className="flex cursor-pointer p-2 my-1">
                <div className="flex flex-col items-start space-y-3 m-0.5">
                    <div className="flex items-center gap-4 group hover:bg-green-100 origin-left transition-colors duration-500 ease-in-out rounded-md p-2">
                        <div className='bg-green-200 p-2 rounded-sm shadow-sm group-hover:bg-green-100 transition-colors duration-500 ease-in-out'>
                            <HiOutlineInformationCircle className="w-6 h-6 text-gray-500 group-hover:text-green-600 transition-colors duration-500 ease-in-out" />
                        </div>
                        <div>
                            <div className='font-semibold group-hover:text-green-600 transition-colors duration-500 ease-in-out'>
                                Discussions
                            </div>
                            <div className='text-xs w-60 group-hover:text-green-700 transition-colors duration-500 ease-in-out'>
                                Ask questions, find support, and connect
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 group hover:bg-red-100 transition-colors duration-500 ease-in-out rounded-md p-2">
                        <div className='bg-red-200 p-1 rounded-sm shadow-sm group-hover:bg-red-100 transition-colors duration-500 ease-in-out'>
                            <HiOutlinePhotograph className="w-6 h-6 text-gray-500 group-hover:text-red-600 transition-colors duration-500 ease-in-out" />
                        </div>
                        <div>
                            <div className='font-semibold group-hover:text-red-600 transition-colors duration-500 ease-in-out'>
                            Streaks
                            </div>
                            <div className='text-xs w-60 group-hover:text-red-700 transition-colors duration-500 ease-in-out'>
                            The most active community members
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 group hover:bg-blue-100 transition-colors duration-500 ease-in-out rounded-md p-2">
                        <div className='bg-blue-200 p-1 rounded-sm shadow-sm group-hover:bg-blue-100 transition-colors duration-500 ease-in-out'>
                            <HiOutlineUserGroup className="w-6 h-6 text-gray-500 group-hover:text-blue-600 transition-colors duration-500 ease-in-out" />
                        </div>
                        <div>
                            <div className='font-semibold group-hover:text-blue-600 transition-colors duration-500 ease-in-out'>
                            Events
                            </div>
                            <div className='text-xs w-60 group-hover:text-blue-700 transition-colors duration-500 ease-in-out'>
                            Meet others online and in-person
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>


            </div>

            {/* Right Section */}
            <div className="w-2/3 p-8">
                <div className="main-info">
                    <h2 className="text-lg font-medium mb-4">Main info</h2>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="product-name" className="block text-sm font-medium text-gray-700">
                                Name of the product
                            </label>
                            <input
                                id="product-name"
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                placeholder="hello network"
                                maxLength={40}
                            />
                        </div>
                        {/* Add more main info fields here */}
                    </div>
                </div>


                {/* Main Info Section */}
                <div className="main-info">
                    <h2 className="text-lg font-medium mb-4">Main Info</h2>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="product-name" className="block text-sm font-medium text-gray-700">
                                Name of the product
                            </label>
                            <input
                                id="product-name"
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                placeholder="hello network"
                                maxLength={40}
                            />
                        </div>
                        {/* Add more main info fields here */}
                    </div>
                </div>
                {/* Product Info */}
                <h2 className="text-lg font-medium mb-4">Tell us more about this product</h2>
                <p className="text-gray-500 mb-8">We'll need its name, tagline, links, launch tags, and description.</p>
                {/* Add product info fields here */}
            </div>
        </div>
    );
};

export default ProductCreationPage;