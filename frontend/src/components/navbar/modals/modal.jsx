import { Dialog, Transition, TransitionChild, DialogPanel } from '@headlessui/react';
import { Fragment } from 'react';
import { X } from 'lucide-react';
import { Button } from '../../ui/button';

const Modal = ({ visible, setVisible, children }) => {
	return (
		<Transition appear show={visible} as={Fragment}>
			<Dialog as="div" className="relative z-50" onClose={() => setVisible(false)}>
				<TransitionChild
					as={Fragment}
					enter="ease-out duration-200"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-100"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 z-50 transition-opacity bg-black bg-opacity-75 backdrop-filter backdrop-blur" />
				</TransitionChild>

				<div className="fixed inset-0 z-50 flex items-center justify-center">
					<TransitionChild
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<div className='fixed inset-0 z-50 flex items-center justify-center'>
						<div className="absolute top-0 left-1 mt-4 mr-4 ml-4">
									<Button
										onClick={() => setVisible(false)}
										className="hover:text-red-600 focus:outline-none
										 bg-white rounded-full"
									>
										<X className="w-5 h-5" aria-hidden="true" />
									</Button>
								</div>
							<DialogPanel className="relative h-full xl:h-[600px] w-full
						 max-w-md mt-auto sm:w-[650px] sm:mt-0 flex flex-col bg-white 
						 rounded-sm 
						 shadow-md"
							>
								
								<div className="flex justify-center flex-col flex-1 px-8
							 py-10 text-left rounded-t-md">
									{children}
								</div>
							</DialogPanel>
						</div>
					</TransitionChild>
				</div>
			</Dialog>
		</Transition>
	);
};

export default Modal;