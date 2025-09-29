import { JSX } from "react";
import { IoCloseCircleOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';
import { MdOutlinePending } from "react-icons/md";

export const blogStatusConfig: Record<string, { className: string; icon: JSX.Element }> = {
    pending: {
        className: "text-black bg-yellow-500 hover:bg-yellow-400 cursor-pointer",
        icon: <MdOutlinePending size={18} />,
    },
    approved: {
        className:
            "text-white bg-green-600 hover:bg-green-700 cursor-pointer",
        icon: <IoCheckmarkCircleOutline size={18} />,
    },
    rejected: {
        className:
            "text-white bg-red-500 hover:bg-red-600 cursor-pointer",
        icon: <IoCloseCircleOutline size={18} />,
    },
}