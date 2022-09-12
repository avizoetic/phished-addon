import { baseURL } from "../config.js";

export const response = (
  type,
  title,
  description,
  color,
  action,
  email,
  name,
  photo
) => {
  return {
    sections: [
      {
        widgets: [
          {
            decoratedText: {
              topLabel: "Type",
              text: type,
              bottomLabel: "",
            },
          },
          {
            divider: {},
          },
          {
            decoratedText: {
              topLabel: "",
              text: title,
            },
          },
          {
            textParagraph: {
              text: description,
            },
          },
        ],
      },
    ],
    header: {
      title: name,
      subtitle: email,
      imageUrl: photo,
      imageType: "CIRCLE",
    },
  };
};
