import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const mapCardTypeToQuestionType = (cardType) => {
  switch (cardType) {
    case "Card1":
      return "singleChoice";
    case "Card2":
      return "multipleChoice";
    case "Card3":
      return "textInput";
    case "Card4":
      return "matching";
    case "Card5":
      return "ordering";
    default:
      return "textInput";
  }
};

export const answerGenerator = (cardType, options) => {
  console.log(options)
  switch (cardType) {
    case "Card1":
      return [...options].find((el) => el.selected).text;
    case "Card2":
      return [...options].filter((el) => el.selected).map((el) => el.text);
    case "Card3":
      return [...options].map((el) => el.text);
    case "Card4":
      const result = options.reduce((acc, item) => {
        acc[item.left] = item.right;
        return acc;
      }, {});

      return result
    case "Card5":
      return options.sort((a, b) => a.order - b.order)
      .map(item => item.text.trim())
      .join(" ")
  }
};

export default mapCardTypeToQuestionType;
