import { createPortal } from "react-dom";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const BaseModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return;

    return createPortal(
        <div className='fixed inset-0 flex justify-center items-center'>
            {/* Overlay */}
            <div
                onClick={onClose}
                className='absolute inset-0 bg-black opacity-70'></div>

            <div className='flex flex-col gap-5 ml-20 sm:m-0 sm:w-1/2 max-w-md'>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className='relative w-10 h-10 text-2xl text-white place-self-center rounded-full hover:bg-gray-500 cursor-pointer transition duration-300'
                >
                    X
                </button>
                <div className='bg-white text-black flex flex-col justify-center items-center gap-5 max-w-[95%] md:max-w-full py-5 px-5 rounded-md z-10'>
                    {children}
                </div>
            </div>
        </div>,
        document.body
    )
}

export default BaseModal