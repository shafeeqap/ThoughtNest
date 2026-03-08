import { Editor } from "@tiptap/react"
import { CiAlignLeft, CiAlignCenterH, CiAlignRight } from "react-icons/ci"
import { RiDeleteBin6Line } from "react-icons/ri"

interface Props {
    editor: Editor
}

export default function ImageToolbar({ editor }: Props) {
    if (!editor.isActive("image")) return null

    const setAlign = (align: string) => {
        editor.commands.updateAttributes("image", { align })
    }

    const deleteImage = () => {
        editor.commands.deleteSelection()
    }

    return (
        <div className=" flex gap-2 bg-white shadow-md border rounded-md p-1 z-50">

            <button type="button"
                onClick={() => setAlign("left")}
                className="p-1 hover:bg-gray-100 rounded"
            >
                <CiAlignLeft size={22} />
            </button>

            <button type="button"
                onClick={() => setAlign("center")}
                className="p-1 hover:bg-gray-100 rounded"
            >
                <CiAlignCenterH size={22} />
            </button>

            <button type="button"
                onClick={() => setAlign("right")}
                className="p-1 hover:bg-gray-100 rounded"
            >
                <CiAlignRight size={22} />
            </button>

            <button type="button"
                onClick={deleteImage}
                className="p-1 hover:bg-red-100 text-red-500 rounded"
            >
                <RiDeleteBin6Line size={22} />
            </button>

        </div>
    )
}