import { JSX } from "react";
import { IoBanOutline, IoCheckmarkCircleOutline } from "react-icons/io5";

export const blogActionConfig: Record<string, { className: string; icon: JSX.Element; btnName: string }> = {
    active: {
        className: "bg-green-600 hover:bg-green-700",
        icon: <IoCheckmarkCircleOutline size={18} />,
        btnName: 'Active'
    },
    blocked: {
        className: "bg-red-600 hover:bg-red-700",
        icon: <IoBanOutline size={18} />,
        btnName: 'Blocked'
    }
}