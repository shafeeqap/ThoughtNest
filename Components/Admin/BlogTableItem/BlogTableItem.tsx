'use client';

import React, { useState } from 'react'
import { ConfirmModal, UpdateStatusModal } from '@/Components/Modal';
import { assets } from '@/data/assets'
import { formatDate } from '@/lib/utils/helpers/formatDate';
import { truncateText } from '@/lib/utils/helpers/truncateText';
import { BlogItemType } from '@/types/blog';
import Image from 'next/image'
import { IoCloseCircleOutline, IoTrashBinOutline, IoWarningOutline, IoEyeOutline } from 'react-icons/io5';
import { CiEdit } from "react-icons/ci";
import { blogStatusConfig } from '@/lib/config/ui/blogStatusConfig';
import { blogActionConfig } from '@/lib/config/ui/blogActionConfig';
import EditBlogModal from '@/Components/Modal/ModalItem/EditBlogModal';


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
    const [actionType, setActionType] = useState<"action" | "delete" | null>(null);
    const formattedDate = formatDate(createdAt);
    const truncatedText = truncateText(title);

    const [editCategoryName, setEditCategoryName] = useState();
    const [editDescription, setEditDescription] = useState();
    const [editTitle, setEditTitle] = useState();
    const [editImage, setEditImage] = useState();


    // ====================================================================================== //
    const Title = actionType === "action" ? action === 'active' ? "Block Blog" : "Activate Blog." : "Delete Blog.";
    const Msg = actionType === "action" ? `Are you sure you want to ${action === 'active' ? "blocke" : "activate"} this Blog?`
        : 'Are you sure you want to delete this blog?';
    const Btn = actionType === "action" ? action === 'active' ? "blocke" : "activate" : 'delete';
    const Icon = actionType === "action" ? <IoWarningOutline size={80} color='#ffa500' /> : <IoCloseCircleOutline size={80} color='red' />;


    const handleConfirmModal = async (id: string) => {
        if (actionType === "action") {
            await handleBlogAction(id, "action", action === 'active' ? "blocked" : "active")
        } else if (actionType === "delete") {
            await handleDelete(id)
        }
        setShowModal(false);
        setActionType(null);
    }

    return (
        <>
            <tr className='bg-gray-100 border-b'>
                <td className='px-6 py-4'>
                    {counter}
                </td>
                <th scope='row' className='items-center gap-3 hidden sm:flex px-6 py-4 text-gray-900 whitespace-nowrap'>
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
                <td className='px-6 py-4'>
                    {formattedDate}
                </td>
                <td className='px-6 py-4'>
                    {category?.categoryName || "No Category"}
                </td>
                <td className='px-6 py-4'>
                    <Image
                        src={image}
                        width={180}
                        height={180}
                        alt='blogImg'
                        className='w-14 h-12 object-cover border border-black'
                    />
                </td>

                {/* Update Status */}
                <td className='px-6 py-4'>
                    {status && (
                        <button
                            onClick={() => setShowUpdateModal(true)}
                            className={`px-1.5 py-1.5 cursor-pointer uppercase flex justify-around gap-1 min-w-[100px] ${blogStatusConfig[status].className}`}
                        >
                            {blogStatusConfig[status].icon}
                            <p>{status}</p>
                        </button>
                    )}
                </td>

                {/* Edit Blog */}
                <td className='px-6 py-4'>
                    <CiEdit
                        onClick={() => setShowEditModal(true)}
                        size={32}
                        title='Edit blog'
                        className='cursor-pointer hover:text-gray-400'
                    />
                </td>

                {/* Update Action */}
                <td className='px-6 py-4 text-white'>
                    {action && (
                        <button
                            onClick={() => {
                                setActionType('action')
                                setShowModal(true)
                            }}
                            className={`px-1.5 py-1.5 min-w-[100px] cursor-pointer flex justify-around items-center uppercase ${blogActionConfig[action].className}`}
                        >
                            {blogActionConfig[action].icon}
                            {blogActionConfig[action].btnName}
                        </button>
                    )}
                </td>
                {/* Preview Blog */}
                <td className='px-6 py-4'>
                    <IoEyeOutline
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
                    isOpen={shwoEditModal}
                    onClose={() => setShowEditModal(false)}
                    title='Edit Blog Items.'
                    message='Edit your blog content.'
                    buttonText='save changes'
                    blogTitle={title}
                    categoryName={category.categoryName}
                    image={image}
                />
            )}
        </>
    )
}

export default BlogTableItem