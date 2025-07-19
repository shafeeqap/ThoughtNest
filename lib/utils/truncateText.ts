export const truncateText = (text: string, maxLength = 20): string => {
  let truncateText = text.substring(0, maxLength);
  const lastSpace = truncateText.lastIndexOf(" ");

  if (lastSpace > 0) {
    truncateText = truncateText.substring(0, lastSpace);
  }
  return text.length > maxLength ? truncateText + "..." : text;
};
