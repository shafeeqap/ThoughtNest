import React, { useState } from "react";

type PropTypes = {
    text: string;
    limit: number;
}
const ReadMore: React.FC<PropTypes> = ({ text, limit = 100 }) => {
    const [isReadMore, setIsReadMore] = useState(false);

    // Toggle Function
    const toggleExpand = () => setIsReadMore((prev) => !prev);

    // Check if Truncation is Needed
    if (text.length <= limit) {
        return <p>{text}</p>;
    }

    // Create Truncated Text part to avoid cutting words in the middle 
    let truncatedText = text.substring(0, limit);
    const lastSpaceIndex = truncatedText.lastIndexOf(" ");
    if (lastSpaceIndex > 0) {
        truncatedText = truncatedText.substring(0, lastSpaceIndex);
    }

    return (
        <p>
            {isReadMore ? text : truncatedText}
            <span
                onClick={toggleExpand}
                style={{
                    color: "#007bff",
                    cursor: "pointer",
                    marginTop: "5px",
                    fontStyle: "italic",
                }}
            >
                {isReadMore ? " show less" : " ...read more"}
            </span>
        </p>
    );
};

export default ReadMore;
