'use client';

import React, { useEffect, useState } from 'react'
import { ConfirmModal, PreviewModal, UpdateStatusModal } from '@/Components/Modal';
import { assets } from '@/data/assets'
import { formatDate } from '@/lib/utils/helpers/formatDate';
import { truncateText } from '@/lib/utils/helpers/truncateText';
import { BlogItemType } from '@/types/blog';
import Image from 'next/image'
import { IoCloseCircleOutline, IoTrashBinOutline, IoWarningOutline, IoEyeOutline } from 'react-icons/io5';
import { CiEdit } from "react-icons/ci";
import { blogStatusConfig } from '@/lib/config/ui/blogStatusConfig';
import { blogActionConfig } from '@/lib/config/ui/blogActionConfig';
import { CategoryType } from '@/types/category';
import { categoryService } from '@/services/categoryService';
import { validateBlog } from '@/lib/validators/validateBlog';
import { toast } from 'react-toastify';
import { EditBlogModal } from '@/Components/Modal/ModalItem';
import { useEditBlogMutation } from '@/redux/features/blogApiSlice';


interface IProps extends BlogItemType {
    handleBlogAction: (id: string, type: "action", value: string) => Promise<void>;
    handleUpdateStatus: (id: string, type: "status", value: string) => Promise<void>;
    handleDelete: (id: string) => Promise<void>;
    counter: number;
}

const BlogTableItem: React.FC<IProps> = ({
    _id,
    counter,
    authorImg,
    title,
    description,
    author,
    createdAt,
    category,
    image,
    handleDelete,
    handleBlogAction,
    handleUpdateStatus,
    status,
    action,
}) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [shwoEditModal, setShowEditModal] = useState<boolean>(false);
    const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
    const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);
    const [actionType, setActionType] = useState<"action" | "delete" | null>(null);
    const [categories, setCategories] = useState<CategoryType[]>([]);

    const [editTitle, setEditTitle] = useState(title);
    const [editCategoryName, setEditCategoryName] = useState(category._id);
    const [editDescription, setEditDescription] = useState(description);
    const [editImage, setEditImage] = useState<File | null | string>(image);

    const [editBlog] = useEditBlogMutation()

    const formattedDate = formatDate(createdAt);
    const truncatedText = truncateText(title);

    const isChanged = editTitle !== title || editCategoryName !== category._id || editDescription !== description || editImage !== image;


    // ====================================================================================== //
    const Title = actionType === "action" ? action === 'active' ? "Block Blog" : "Activate Blog." : "Delete Blog.";
    const Msg = actionType === "action" ? `Are you sure you want to ${action === 'active' ? "blocke" : "activate"} this Blog?`
        : 'Are you sure you want to delete this blog?';
    const Btn = actionType === "action" ? action === 'active' ? "blocke" : "activate" : 'delete';
    const Icon = actionType === "action" ? <IoWarningOutline size={80} color='#ffa500' /> : <IoCloseCircleOutline size={80} color='red' />;
    // ====================================================================================== //

    const handleConfirmModal = async (id: string) => {
        if (actionType === "action") {
            await handleBlogAction(id, "action", action === 'active' ? "blocked" : "active")
        } else if (actionType === "delete") {
            await handleDelete(id)
        }
        setShowModal(false);
        setActionType(null);
    }

    useEffect(() => {
        async function fetchCategories() {
            const response = await categoryService.fetchCategory();
            setCategories(response)
        }

        fetchCategories();
    }, []);

    const handleBlogEdit = async (id: string,) => {
        const validationError = validateBlog(editTitle, editDescription, editImage);

        if (validationError) {
            if (validationError.title) toast.warning(validationError.title);
            if (validationError.description) toast.warning(validationError.description);
            if (validationError.image) {
                validationError.image.forEach((msg) => toast.warning(msg))
            }

            return;
        }

        const formData = new FormData();
        formData.append('blogTitle', editTitle);
        formData.append('category', editCategoryName);
        formData.append('description', editDescription);

        if (editImage) {
            formData.append('image', editImage);
        }
        try {
            const res = await editBlog({ id, formData }).unwrap();
            // setAllBlogs(prev => prev.map(blog => blog._id === id ? res.updatedBlog : blog));
            toast.success(res.msg);

            setShowEditModal(false);

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
            <tr className='bg-gray-100 border-b'>
                <td className='px-3 py-4'>
                    {counter}
                </td>
                <th scope='row' className='items-center gap-3 hidden sm:flex px-3 py-4 text-gray-900 whitespace-nowrap'>
                    <Image
                        width={40}
                        height={40}
                        src={authorImg || assets.profile_icon}
                        alt='author_img'
                    />
                    <p>{author ? author : "No author"}</p>
                </th>
                <td className='px-6 py-4'>
                    <p className='font-medium text-black'>{title ? truncatedText : 'No title'}</p>
                </td>
                <td className='px-3 py-4'>
                    {formattedDate}
                </td>
                <td className='px-3 py-4'>
                    {category?.categoryName || "No Category"}
                </td>
                <td className='px-6 py-4'>
                    <Image
                        src={image ? typeof image === 'string' ? image : URL.createObjectURL(image) : "/placeholder.png"}
                        width={180}
                        height={180}
                        alt='blogImg'
                        className='w-14 h-12 object-cover border border-black'
                    />
                </td>

                {/* Update Status */}
                <td className='px-3 py-4'>
                    {status && (
                        <button
                            onClick={() => setShowUpdateModal(true)}
                            className={`px-1.5 py-1.5 cursor-pointer uppercase flex justify-around gap-0.5 min-w-[100px] ${blogStatusConfig[status].className}`}
                        >
                            {blogStatusConfig[status].icon}
                            <p>{status}</p>
                        </button>
                    )}
                </td>

                {/* Edit Blog */}
                <td className='px-3 py-4'>
                    <CiEdit
                        onClick={() => setShowEditModal(true)}
                        size={32}
                        title='Edit blog'
                        className='cursor-pointer hover:text-gray-400'
                    />
                </td>

                {/* Update Action */}
                <td className='px-3 py-4 text-white'>
                    {action && (
                        <button
                            onClick={() => {
                                setActionType('action')
                                setShowModal(true)
                            }}
                            className={`px-1.5 py-1.5 min-w-[95px] cursor-pointer flex justify-around items-center uppercase ${blogActionConfig[action].className}`}
                        >
                            {blogActionConfig[action].icon}
                            {blogActionConfig[action].btnName}
                        </button>
                    )}
                </td>

                {/* Preview Blog */}
                <td className='px-6 py-4'>
                    <IoEyeOutline
                        onClick={() => setShowPreviewModal(true)}
                        size={22}
                        title='Preview'
                        className='cursor-pointer hover:text-gray-400'
                    />
                </td>

                {/* Delete Blog */}
                <td className='px-6 py-4 sm:flex justify-around items-center'>
                    <IoTrashBinOutline
                        onClick={() => {
                            setActionType('delete')
                            setShowModal(true)
                        }}
                        size={20}
                        title='Delete blog'
                        className='text-black hover:text-red-500 cursor-pointer'
                    />
                </td>
            </tr>

            {showModal && (
                <ConfirmModal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    onConfirm={() => handleConfirmModal(_id)}
                    icon={Icon}
                    title={Title}
                    message={Msg}
                    buttonText={Btn}
                />
            )}

            {showUpdateModal && (
                <UpdateStatusModal
                    id={_id}
                    isOpen={showUpdateModal}
                    onClose={() => setShowUpdateModal(false)}
                    handleUpdateStatus={handleUpdateStatus}
                    setShowUpdateModal={setShowUpdateModal}
                    updatedStatus={status}
                />
            )}

            {shwoEditModal && (
                <EditBlogModal
                    id={_id}
                    isOpen={shwoEditModal}
                    onClose={() => setShowEditModal(false)}
                    title='Edit Blog Items.'
                    buttonText='save changes'
                    blogTitle={editTitle}
                    editDescription={editDescription}
                    setEditDescription={setEditDescription}
                    setTitle={setEditTitle}
                    editCategoryName={editCategoryName}
                    editImage={editImage}
                    setEditCategoryName={setEditCategoryName}
                    setEditImage={setEditImage}
                    categories={categories}
                    handleBlogEdit={handleBlogEdit}
                    isChanged={isChanged}
                />
            )}

            {showPreviewModal && (
                <PreviewModal
                    isOpen={showPreviewModal}
                    onClose={() => setShowPreviewModal(false)}
                    authorImg={authorImg}
                    author={author}
                    category={category}
                    image={image}
                    title={title}
                    description={description}
                    createdAt={createdAt}
                />
            )}
        </>
    )
}

export default BlogTableItem