'use client';

import React, { useState } from 'react'
import { ConfirmModal } from '@/Components/Modal';
import { formatDate } from '@/lib/utils/helpers/formatDate';
import { SubscriptionType } from '@/types/subscription';
import { IoBanOutline, IoCheckmarkCircleOutline, IoCloseCircleOutline, IoTrashBinOutline, IoWarningOutline } from 'react-icons/io5'

interface IProps extends SubscriptionType {
    counter: number;
    handleDelete: (id: string) => Promise<void>
    handleSubscribeAction: (id: string) => Promise<void>;
}

const SubsTableItem: React.FC<IProps> = ({
    _id,
    email,
    date,
    counter,
    handleDelete,
    status,
    handleSubscribeAction
}) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [actionType, setActionType] = useState<"action" | "delete" | null>(null);
    const formattedDate = formatDate(date);

    const Title = actionType === "action" ? status === 'active' ? "Block Category" : "Activate Category" : "Delete Category";
    const Msg = actionType === "action" ? `Are you sure you want to ${status === 'active' ? "blocke" : "activate"} this category?`
        : 'Are you sure you want to delete this category?';
    const Btn = actionType === "action" ? status === 'active' ? "blocke" : "activate" : 'delete';
    const Icon = actionType === "action" ? <IoWarningOutline size={80} color='#ffa500' /> : <IoCloseCircleOutline size={80} color='red' />;


    const handleConfirmModal = async (id: string) => {
        if (actionType === "action") {
            await handleSubscribeAction(id)
        } else if (actionType === "delete") {
            await handleDelete(id)
        }
        setShowModal(false);
        setActionType(null);
    }


    return (
        <>
            <tr className='bg-gray-100 border-b text-left'>
                <td className='px-6 py-4 cursor-pointer'>{counter}</td>
                <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                    {email || "No Email"}
                </th>
                <td className='px-6 py-4 hidden sm:block'>{date ? formattedDate : 'N/A'}</td>
                <td className='px-6 py-4 text-white uppercase text-xs'>
                    {status === 'active' ? (
                        <span className="px-2 py-1 bg-green-600">Active</span>
                    ) : (
                        <span className="px-2 py-1 bg-red-600">Blocked</span>
                    )}
                </td>
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
                                    title="Block subscription"
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
                                    title="Activate subscription"
                                />
                            </button>
                        )} |
                        <IoTrashBinOutline
                            onClick={() => {
                                setActionType('delete')
                                setShowModal(true)
                            }}
                            size={20}
                            title='Delete subscription'
                            className='text-black hover:text-red-500 cursor-pointer'
                        />
                    </div>

                    {showModal && (
                        <ConfirmModal
                            isOpen={showModal}
                            title={Title}
                            message={Msg}
                            buttonText={Btn}
                            onClose={() => setShowModal(false)}
                            onConfirm={() => handleConfirmModal(_id)}
                            icon={Icon}
                        />
                    )}
                </td>
            </tr >
        </>
    )
}

export default SubsTableItem