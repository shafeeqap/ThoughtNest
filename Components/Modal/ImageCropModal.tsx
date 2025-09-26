import React from 'react'
import BaseModal from './BaseModal';
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import Image from 'next/image';


interface ImageCropModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    message?: string;
    buttonText?: string;
    image: string;
    croppedImage: File | null,
    handleCrop: () => void
    cropperRef: React.RefObject<ReactCropperElement | null>;
}

const ImageCropModal: React.FC<ImageCropModalProps> = ({
    isOpen,
    onClose,
    image,
    title,
    message,
    buttonText,
    croppedImage,
    handleCrop,
    cropperRef,
}) => {

    const handleSaveChange = () => {
        handleCrop();
        onClose();
    }

    return (
        <BaseModal isOpen={isOpen} onClose={onClose}>
            <div className='w-full flex flex-col items-start py-3 border-b border-gray-300'>
                <h1 className='text-2xl font-semibold'>{title}</h1>
                <p className='text-center'>{message}</p>
            </div>

            <div className='w-3/4 px-5 lg:w-[1100px] max-h-[500px] lg:h-auto overflow-y-auto flex flex-col md:flex-row items-center justify-between gap-5 overflow-x-hidden'>

                {/* Cropper preview */}
                {image && (
                    <div className='w-fit mt-5 flex flex-col items-center'>
                        <Cropper
                            src={image}
                            style={{ height: 300, width: "100%" }}
                            aspectRatio={16 / 9}
                            guides={true}
                            viewMode={1}
                            ref={cropperRef}
                        />
                        <div className='mt-3 flex flex-col sm:flex-row gap-5'>
                            <button
                                type='button'
                                onClick={handleCrop}
                                className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer uppercase"
                            >
                                Crop Image
                            </button>
                            <button
                                type='button'
                                onClick={handleSaveChange}
                                className="text-white px-7 py-2 rounded uppercase 
                                bg-red-500 hover:bg-red-600 cursor-pointer"
                            >
                                {buttonText}
                            </button>
                        </div>
                    </div>
                )}

                {/* Show cropped preview */}
                {croppedImage && (
                    <div className='w-full mt-5 mb-5 flex flex-col items-center gap-3'>
                        <p>Preview Cropped Image:</p>
                        <Image src={URL.createObjectURL(croppedImage)} alt='Cropped Preview' width={200} height={120} />
                    </div>
                )}
            </div>
        </BaseModal>
    )
}

export default ImageCropModal