import { Dialog, Transition, TransitionChild, DialogPanel } from '@headlessui/react';
import { Fragment } from 'react';
import { X } from 'lucide-react';

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
					<div className="fixed inset-0 bg-black bg-opacity-75 backdrop-filter backdrop-blur" />
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
						<DialogPanel className="relative h-full w-full max-w-md mt-auto sm:mt-0 flex flex-col bg-white rounded-sm shadow-md">
							<div className="absolute top-0 right-0 mt-4 mr-4">
								<button
									onClick={() => setVisible(false)}
									className="hover:opacity-70 focus:outline-none"
								>
									<X className="w-5 h-5" aria-hidden="true" />
								</button>
							</div>
							<div className="flex justify-center flex-col flex-1 px-8 py-10 text-left rounded-t-md">
								{children}
							</div>
						</DialogPanel>
					</TransitionChild>
				</div>
			</Dialog>
		</Transition>
	);
};

export default Modal;