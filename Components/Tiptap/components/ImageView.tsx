import { NodeViewWrapper, NodeViewProps } from "@tiptap/react"
// import Image from "next/image"
import { useState } from "react"
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiAlignLeft, CiAlignCenterH, CiAlignRight } from "react-icons/ci";
import ImageToolbar from "./ImageToolbar";


export default function ImageView({ node, updateAttributes, getPos, editor }: NodeViewProps) {
  const { src, width, align, caption } = node.attrs
  const [dragging, setDragging] = useState(false)

  const startResize = (e: React.MouseEvent, direction: string) => {
    e.preventDefault()
    setDragging(true)

    const startX = e.clientX
    const startWidth = parseFloat(width)

    const onMove = (e: MouseEvent) => {
      let diff = e.clientX - startX

      if (direction.includes("left")) {
        diff = -diff
      }

      const newWidth = Math.max(120, startWidth + diff)
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
    // console.log("Setting align to:", value);

    updateAttributes({ align: value })
  }

  const deleteImage = () => {
    const pos = getPos()
    editor.chain().focus().deleteRange({ from: pos, to: pos + node.nodeSize }).run()
  }

  return (
    <NodeViewWrapper className="my-4 block relative">
      {/* toolbar */}
      {/* <div className="flex gap-2 mb-1 text-xs">
        <button type="button" onClick={() => setAlign("left")} className={`px-2 border hover:bg-slate-200 ${align === "left" ? "bg-gray-100 text-blue-600" : ""}`}><CiAlignLeft size={22} title="Align left" /></button>
        <button type="button" onClick={() => setAlign("center")} className={`px-2 border hover:bg-slate-200 ${align === "center" ? "bg-gray-100 text-blue-600" : ""}`}><CiAlignCenterH size={22} title="Align center" /></button>
        <button type="button" onClick={() => setAlign("right")} className={`px-2 border hover:bg-slate-200 ${align === "right" ? "bg-gray-100 text-blue-600" : ""}`}><CiAlignRight size={22} title="Align right" /></button>
        <button type="button" onClick={deleteImage} className="px-2 border text-red-500 hover:bg-gray-100"><RiDeleteBin6Line size={22} title="Delete image" /></button>
      <ImageToolbar editor={editor} />
      </div> */}


      {/* image container */}
      <div
        className={`relative group ${align === "center"
          ? "mx-auto"
          : align === "right"
            ? "ml-auto"
            : "mr-auto"
          } `}
        style={{ width }}
      >
        <img
          src={src}
          className="block w-full select-none"
          draggable={false}
          alt="Image"
        />

        {/* resize handle */}
        <div
          onMouseDown={(e) => startResize(e, "top-left")}
          className="absolute w-3 h-3 bg-blue-500 top-0 left-0 cursor-nwse-resize"
        />
        <div
          onMouseDown={(e) => startResize(e, "top-right")}
          className="absolute w-3 h-3 bg-blue-500 top-0 right-0 cursor-nesw-resize"
        />
        <div
          onMouseDown={(e) => startResize(e, "bottom-left")}
          className="absolute w-3 h-3 bg-blue-500 bottom-0 left-0 cursor-nesw-resize"
        />

        <div
          onMouseDown={(e) => startResize(e, "bottom-right")}
          className="absolute w-3 h-3 bg-blue-500 bottom-0 right-0 cursor-nwse-resize"
        />
      </div>

      {/* caption */}
      <div
        className={`relative ${align === "center"
          ? "mx-auto"
          : align === "right"
            ? "ml-auto"
            : "mr-auto"
          } `}
        style={{ width }}
      >
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