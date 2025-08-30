import React, { Dispatch, SetStateAction, useState } from 'react'
import { ConfirmModal, EditModal } from '@/Components/Modal';
import { IoBanOutline, IoCheckmarkCircleOutline, IoTrashBinOutline } from 'react-icons/io5';
import { CategoryType } from '@/types/category';
import { CiEdit } from 'react-icons/ci';
import { truncateText } from '@/lib/utils/helpers/truncateText';
import { IoCloseCircleOutline, IoWarningOutline } from 'react-icons/io5'
import { ErrorType } from '@/types/error';


interface IProps extends CategoryType {
    counter: number;
    handleCategoryAction: (id: string) => Promise<void>;
    handleDelete: (id: string) => Promise<void>;
    setCategoryName: Dispatch<SetStateAction<string>>;
    setDescription: Dispatch<SetStateAction<string>>;
    handleCategoryEdit: (id: string, categoryName: string, description: string) => void;
    error: ErrorType;
    setError: (value: React.SetStateAction<ErrorType>) => void;
}

const CategoryTableItem: React.FC<IProps> = ({
    _id,
    counter,
    categoryName,
    description,
    status,
    handleCategoryAction,
    handleDelete,
    setCategoryName,
    setDescription,
    handleCategoryEdit,
    error,
    setError
}) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [shwoEditModal, setShowEditModal] = useState<boolean>(false);
    const [editCategoryName, setEditCategoryName] = useState(categoryName);
    const [editDescription, setEditDescription] = useState(description);
    const [actionType, setActionType] = useState<"action" | "delete" | null>(null);
    const truncatedText = truncateText(description);

    const Title = actionType === "action" ? status === 'active' ? "Block Category" : "Activate Category" : "Delete Category";
    const Msg = actionType === "action" ? `Are you sure you want to ${status === 'active' ? "blocke" : "activate"} this category?`
        : 'Are you sure you want to delete this category?';
    const Btn = actionType === "action" ? status === 'active' ? "blocke" : "activate" : 'delete';
    const Icon = actionType === "action" ? <IoWarningOutline size={80} color='#ffa500' /> : <IoCloseCircleOutline size={80} color='red' />;


    const handleConfirmModal = async (id: string) => {
        if (actionType === "action") {
            await handleCategoryAction(id)
        } else if (actionType === "delete") {
            await handleDelete(id)
        }
        setShowModal(false);
        setActionType(null);
    }

    return (
        <>
            <tr className='bg-gray-100 border-b text-left'>
                <td className='px-6 py-4'>{counter}</td>
                <td className='px-6 py-4'>{categoryName}</td>
                <td className='px-6 py-4'>{truncatedText}</td>
                <td className='px-6 py-4'>
                    {status === 'active' ? (
                        <span className="text-green-600">Active</span>
                    ) : (
                        <span className="text-red-600">Blocked</span>
                    )}
                </td>

                {/* Edit category */}
                <td className='px-6 py-4'>
                    <button onClick={() => {
                        setShowEditModal(true)
                        setEditCategoryName(categoryName);
                        setEditDescription(description);
                    }}
                    >
                        <CiEdit
                            size={32}
                            title='Edit category'
                            className='cursor-pointer'
                        />
                    </button>
                </td>

                {/* Action category */}
                <td className='px-6 py-4'>
                    <div className='content-center flex gap-2'>
                        {status === 'active' ? (
                            <button
                                onClick={() => {
                                    setActionType('action')
                                    setShowModal(true)
                                }}
                            >
                                <IoBanOutline
                                    size={20}
                                    className='text-black hover:text-red-500 cursor-pointer'
                                    title="Block Category"
                                />
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    setActionType('action')
                                    setShowModal(true)
                                }}
                            >
                                <IoCheckmarkCircleOutline
                                    size={20}
                                    className="text-green-500 hover:text-green-700 cursor-pointer"
                                    title="Activate Category"
                                />
                            </button>
                        )} |
                        <button
                            onClick={() => {
                                setActionType('delete')
                                setShowModal(true)
                            }}
                        >
                            <IoTrashBinOutline
                                size={20}
                                title='Delete category'
                                className='cursor-pointer hover:text-red-500'
                            />
                        </button>
                    </div>

                    {showModal && (
                        <ConfirmModal
                            isOpen={showModal}
                            onClose={() => setShowModal(false)}
                            title={Title}
                            message={Msg}
                            buttonText={Btn}
                            onConfirm={() => handleConfirmModal(_id)}
                            icon={Icon}
                        />
                    )}

                </td>

                {shwoEditModal && (
                    <EditModal
                        isOpen={shwoEditModal}
                        onClose={() => setShowEditModal(false)}
                        title='Edit category'
                        message='Edit your content'
                        buttonText='save changes'
                        categoryName={editCategoryName}
                        description={editDescription}
                        setCategoryName={setEditCategoryName}
                        setDescription={setEditDescription}
                        handleCategoryEdit={handleCategoryEdit}
                        error={error}
                        setError={setError}
                        id={_id}
                    />
                )}
            </tr>
        </>
    )
}

export default CategoryTableItem