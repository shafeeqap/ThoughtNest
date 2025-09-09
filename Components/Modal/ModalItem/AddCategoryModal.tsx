import React, { Dispatch, SetStateAction } from 'react';
import AddModal from '../AddModal';
import { ErrorType } from '@/types/error';

interface AddModalItemProps {
    isOpen: boolean;
    onClose: () => void;
    handleSubmit: (categoryName: string, description: string) => void;
    categoryName: string;
    description: string;
    setCategoryName: Dispatch<SetStateAction<string>>;
    setDescription: Dispatch<SetStateAction<string>>;
    error: ErrorType;
    setError: (value: React.SetStateAction<ErrorType>) => void;
}


const AddModalItems: React.FC<AddModalItemProps> = ({
    isOpen,
    onClose,
    categoryName,
    description,
    setCategoryName,
    setDescription,
    handleSubmit,
    error,
    setError
}) => {
    const onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSubmit(categoryName, description);
    }
    

    return (
        <AddModal
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={onFormSubmit}
        >
            <div className='w-full mb-5'>
                <label htmlFor="categoryName">Category name</label>
                <input
                    onChange={(e) => {
                        setCategoryName(e.target.value)
                        setError(prev => ({ ...prev, categoryName: undefined }))
                    }}
                    type="text"
                    id='categoryName'
                    value={categoryName}
                    placeholder='Category name'
                    className='w-full border border-gray-300 rounded-md p-1.5 outline-0'
                />
                {error.categoryName && (
                    <span className='text-red-500 text-xs'>{error.categoryName}</span>
                )}
            </div>
            <div className='w-full mt-5 mb-5'>
            <label htmlFor="description">Description</label>
                <textarea
                    onChange={(e) => {
                        setDescription(e.target.value)
                        setError(prev => ({ ...prev, description: undefined }))
                    }}
                    placeholder='Description'
                    value={description}
                    className='w-full border border-gray-300 rounded-md p-1 outline-0'
                />
                {error.description && (
                    <span className='text-red-500 text-xs'>{error.description}</span>
                )}
            </div>
        </AddModal>
    )
}

export default AddModalItems;