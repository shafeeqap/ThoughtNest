import { NodeViewWrapper, NodeViewProps } from "@tiptap/react"
// import Image from "next/image"
import { useState } from "react"
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiAlignLeft, CiAlignCenterH, CiAlignRight } from "react-icons/ci";

export default function ImageView({ node, updateAttributes, getPos, editor }: NodeViewProps) {
  const { src, width, align, caption } = node.attrs
  const [dragging, setDragging] = useState(false)

  // console.log("Rendering ImageView with src:", src);

  const startResize = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragging(true)

    const startX = e.clientX
    const startWidth = parseFloat(width)

    const onMove = (e: MouseEvent) => {
      console.log("Resizing image, clientX:", e.clientX, "startX:", startX, "startWidth:", startWidth);

      const newWidth = Math.max(100, startWidth + (e.clientX - startX))
      updateAttributes({ width: `${newWidth}px` })
    }

    const onUp = () => {
      setDragging(false)
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseup", onUp)
    }

    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseup", onUp)
  }

  const setAlign = (value: "left" | "center" | "right") => {
    console.log("Setting align to:", value);

    updateAttributes({ align: value })
  }

  const deleteImage = () => {
    const pos = getPos()
    editor.chain().focus().deleteRange({ from: pos, to: pos + node.nodeSize }).run()
  }

  return (
    <NodeViewWrapper
      // style={{ textAlign: align }}
      className="my-4 block relative"
    >
      {/* toolbar */}
      <div className="flex gap-2 mb-1 text-xs">
        <button type="button" onClick={() => setAlign("left")} className="px-2 border text-blue-600 hover:bg-gray-100"><CiAlignLeft size={32} title="Left" /></button>
        <button type="button" onClick={() => setAlign("center")} className="px-2 border text-blue-600 hover:bg-gray-100"><CiAlignCenterH size={32} title="Center" /></button>
        <button type="button" onClick={() => setAlign("right")} className="px-2 border text-blue-600 hover:bg-gray-100"><CiAlignRight size={32} title="Right" /></button>
        <button type="button" onClick={deleteImage} className="px-2 border text-red-500 hover:bg-gray-100"><RiDeleteBin6Line size={32} title="Delete" /></button>
      </div>

      {/* alignment wrapper */}
      <div
        className={`relative ${align === "center"
          ? "mx-auto"
          : align === "right"
            ? "ml-auto"
            : "mr-auto"
          } `}
        style={{ width }}
      >
        <img
          src={src}
          style={{ width }}
          className={`${align === "center"
            ? "mx-auto"
            : align === "right"
              ? "ml-auto"
              : "mr-auto"
            } ${dragging ? "cursor-se-resize" : ""}`}
          alt="Image"
        />

        {/* resize handle */}
        <div
          onMouseDown={(e) => {
            e.stopPropagation()
            startResize(e)
          }}
          className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500 cursor-se-resize"
        />

        {/* caption */}
        <input
          value={caption}
          placeholder="Add caption..."
          onChange={(e) => updateAttributes({ caption: e.target.value })}
          className="text-center text-sm text-gray-500 w-full mt-2 border"
        />
      </div>

    </NodeViewWrapper>
  )
}