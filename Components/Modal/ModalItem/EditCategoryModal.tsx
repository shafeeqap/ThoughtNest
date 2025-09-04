import { ErrorType } from '@/types/error';
import React, { Dispatch, SetStateAction } from 'react'
import EditModal from '../EditModal';

interface EditCategoryModalProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  handleCategoryEdit: (id: string, categoryName: string, description: string) => void;
  title?: string;
  message?: string;
  buttonText?: string;
  categoryName: string;
  description: string;
  setCategoryName: Dispatch<SetStateAction<string>>;
  setDescription: Dispatch<SetStateAction<string>>;
  error: ErrorType;
  setError: (value: React.SetStateAction<ErrorType>) => void;
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({
  isOpen,
  onClose,
  handleCategoryEdit,
  title,
  message,
  buttonText,
  categoryName,
  description,
  setCategoryName,
  setDescription,
  error,
  setError,
  id,
}) => {
  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCategoryEdit(id, categoryName, description);
  }


  return (
    <EditModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onFormSubmit}
      title={title}
      message={message}
      buttonText={buttonText}
    >
      <div className='w-full pb-5'>
        <label htmlFor="categoryName">Category name</label>
        <input
          onChange={(e) => {
            setCategoryName(e.target.value)
            setError(prev => ({ ...prev, categoryName: undefined }))
          }}
          type="text"
          value={categoryName}
          placeholder='Category name'
          className='w-full border border-gray-300 rounded-md p-2 outline-0'
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
          id='description'
          placeholder='Description'
          value={description}
          className='w-full border border-gray-300 rounded-md p-2 outline-0'
        />
        {error.description && (
          <span className='text-red-500 text-xs'>{error.description}</span>
        )}
      </div>
    </EditModal>
  )
}

export default EditCategoryModal