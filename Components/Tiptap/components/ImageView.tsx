import { NodeViewWrapper, NodeViewProps } from "@tiptap/react"
// import Image from "next/image"
import { useState } from "react"


export default function ImageView({ node, updateAttributes, getPos, editor }: NodeViewProps) {
  const { src, width, align, caption } = node.attrs
  const [dragging, setDragging] = useState(false)

  console.log("Rendering ImageView with src:", src);


  const startResize = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragging(true)

    const startX = e.clientX
    const startWidth = parseInt(width)

    const onMove = (e:MouseEvent) => {
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
      className="my-4 inline-block relative"
    >
      {/* toolbar */}
      <div className="flex gap-2 mb-1 text-xs">
        <button type="button" onClick={() => setAlign("left")} className="px-2 border">L</button>
        <button type="button" onClick={() => setAlign("center")} className="px-2 border">C</button>
        <button type="button" onClick={() => setAlign("right")} className="px-2 border">R</button>
        <button type="button" onClick={deleteImage} className="px-2 border text-red-500">Delete</button>
      </div>

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

      {/* caption */}
      <input
        value={caption}
        placeholder="Add caption..."
        onChange={(e) => updateAttributes({ caption: e.target.value })}
        className="text-center text-sm text-gray-500 w-full mt-2 border"
      />

      {/* resize handle */}
      <div
        onMouseDown={(e) => {
          e.stopPropagation()
          startResize(e)
        }}
        className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500 cursor-se-resize"
      />

    </NodeViewWrapper>
  )
}