import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

// Allow only certain inline styles
DOMPurify.addHook("uponSanitizeAttribute", (node, data) => {
  if (data.attrName === "style") {
    const allowedStyles = ["text-align", "color", "font-weight"];
    const styleValue = data.attrValue
      .split(";")
      .map((style) => style.trim())
      .filter((style) => allowedStyles.some((prop) => style.startsWith(prop)))
      .join(";");

    data.attrValue = styleValue;
  }
});

export const sanitizeHtml = (html: string): string => {
  return DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    FORBID_TAGS: ["script"],
    FORBID_ATTR: ["onerror", "onclick", "onload", "onmouseover"],
    ALLOWED_ATTR: ["style"],
    ALLOWED_TAGS: [
      "p",
      "br",
      "h1",
      "h2",
      "h3",
      "div",
      "span",
      "ul",
      "ol",
      "li",
    ],
  });
};
