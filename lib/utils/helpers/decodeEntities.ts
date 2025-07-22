import he from "he";

export const decodeEntities = (str: string) => {
  return he.decode(str);
};
