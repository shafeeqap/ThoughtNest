import { NodeViewWrapper } from "@tiptap/react"
import Image from "next/image"
import { useState } from "react"

export default function ImageView({ node, updateAttributes }) {
  const { src, width, align, caption } = node.attrs
  const [dragging, setDragging] = useState(false)

  console.log("Rendering ImageView with src:", src);


  const startResize = (e) => {
    e.preventDefault()
    setDragging(true)

    const startX = e.clientX
    const startWidth = parseInt(width)
    // const startWidth = e.target.closest("img").offsetWidth

    const onMove = (e) => {
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

  return (
    <NodeViewWrapper
      style={{ textAlign: align }}
      className="my-4 inline-block relative"
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

      {/* caption */}
      <input
        value={caption}
        placeholder="Add caption..."
        onChange={(e) =>
          updateAttributes({ caption: e.target.value })
        }
        className="text-center text-sm text-gray-500 w-full mt-2 border"
      />
      {/* resize handle */}
      <div
        onMouseDown={startResize}
        className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500 cursor-se-resize"
      />

    </NodeViewWrapper>
  )
}