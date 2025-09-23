import React, { Dispatch, SetStateAction, useState } from 'react'
import { ConfirmModal } from '@/Components/Modal';
import { IoBanOutline, IoCheckmarkCircleOutline, IoTrashBinOutline, IoCloseCircleOutline, IoWarningOutline } from 'react-icons/io5';
import { CategoryType } from '@/types/category';
import { CiEdit } from 'react-icons/ci';
import { truncateText } from '@/lib/utils/helpers/truncateText';
import { ErrorType } from '@/types/error';
import { toast } from 'react-toastify';
import { validateCategory } from '@/lib/validators/validateCategory';
import { EditCategoryModal } from '@/Components/Modal/ModalItem';
import { useEditCategoryMutation } from '@/redux/features/categoryApiSlice';


interface IProps extends CategoryType {
    counter: number;
    handleCategoryAction: (id: string) => Promise<void>;
    handleDelete: (id: string) => Promise<void>;
    setCategoryName: Dispatch<SetStateAction<string>>;
    setDescription: Dispatch<SetStateAction<string>>;
    setError: (value: React.SetStateAction<ErrorType>) => void;
    error: ErrorType;
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
    error,
    setError
}) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [shwoEditModal, setShowEditModal] = useState<boolean>(false);
    const [editCategoryName, setEditCategoryName] = useState(categoryName);
    const [editDescription, setEditDescription] = useState(description);
    const [actionType, setActionType] = useState<"action" | "delete" | null>(null);
    const truncatedText = truncateText(description);

    const [editCategory] = useEditCategoryMutation();

    // ====================================================================================== //
    const Title = actionType === "action" ? status === 'active' ? "Block Category" : "Activate Category" : "Delete Category";
    const Msg = actionType === "action" ? `Are you sure you want to ${status === 'active' ? "blocke" : "activate"} this category?`
        : 'Are you sure you want to delete this category?';
    const Btn = actionType === "action" ? status === 'active' ? "blocke" : "activate" : 'delete';
    const Icon = actionType === "action" ? <IoWarningOutline size={80} color='#ffa500' /> : <IoCloseCircleOutline size={80} color='red' />;
    // ====================================================================================== //

    const isChanged = editCategoryName !== categoryName || editDescription !== description;

    const handleConfirmModal = async (id: string) => {
        if (actionType === "action") {
            await handleCategoryAction(id)
        } else if (actionType === "delete") {
            await handleDelete(id)
        }
        setShowModal(false);
        setActionType(null);
    }

    // =====================> Handle Category Edit <===================== //
    const handleCategoryEdit = async (id: string, categoryName: string, description: string) => {
        try {
            const validationError = validateCategory(categoryName, description);
            if (validationError) {
                setError(validationError)
                return;
            }

            const response = await editCategory({id, categoryName, description}).unwrap();

            toast.success(response.msg);
            setCategoryName('');
            setDescription('');
            setShowEditModal(false);
            setError({})

        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.warning(error.message)
                console.log(error.message, 'Error...');
            } else {
                toast.warning('An unexpected error occurred.');
                console.log(error, 'Unknown error...');
            }
        }
    }


    return (
        <>
            <tr className='bg-gray-100 border-b text-left'>
                <td className='px-6 py-4'>{counter}</td>
                <td className='px-6 py-4'>{categoryName}</td>
                <td className='px-6 py-4'>{truncatedText}</td>

                {/* Update Status */}
                <td className='px-6 py-4 text-white text-xs'>
                    {status === 'active' ? (
                        <button
                            onClick={() => {
                                setActionType('action')
                                setShowModal(true)
                            }}
                            className="px-1.5 py-1.5 bg-green-600 cursor-pointer flex justify-around items-center uppercase hover:bg-green-700 min-w-[100px]"
                        >
                            <IoCheckmarkCircleOutline
                                size={18}
                                title="Activate Category"
                            />
                            Active
                        </button>
                    ) : (
                        <button onClick={() => {
                            setActionType('action')
                            setShowModal(true)
                        }}
                            className="px-1.5 py-1.5 bg-red-600 cursor-pointer flex justify-around items-center uppercase min-w-[100px] hover:bg-red-700"
                        >
                            <IoBanOutline
                                size={18}
                                title="Block Category"
                            />
                            Blocked
                        </button>
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
                            className='cursor-pointer hover:text-gray-400'
                        />
                    </button>
                </td>

                {/* Action category */}
                <td className='px-6 py-4 sm:flex justify-around items-center'>
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
                    <EditCategoryModal
                        isOpen={shwoEditModal}
                        onClose={() => setShowEditModal(false)}
                        title='Edit category.'
                        message='Update your category content.'
                        buttonText='save changes'
                        categoryName={editCategoryName}
                        description={editDescription}
                        setCategoryName={setEditCategoryName}
                        setDescription={setEditDescription}
                        handleCategoryEdit={handleCategoryEdit}
                        error={error}
                        setError={setError}
                        id={_id}
                        isChanged={isChanged}
                    />
                )}
            </tr>
        </>
    )
}

export default CategoryTableItem