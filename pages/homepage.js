import { baseURL } from "../config.js";

export const homepage = (email, name, photo) => {
  return {
    sections: [
      {
        header: "",
        widgets: [
          {
            decoratedText: {
              topLabel: "",
              text: "Welcome!",
              wrapText: true,
              startIcon: {
                altText: "Send an email",
                iconUrl:
                  "https://pbs.twimg.com/profile_images/1323247670010535940/zyHtp0yy_400x400.jpg",
              },
            },
          },
        ],
      },
      {
        widgets: [
          {
            textParagraph: {
              text: "We help you report phishing simulations or other mails to our services.",
            },
            horizontalAlignment: "CENTER",
          },
          {
            divider: {},
          },
          {
            decoratedText: {
              topLabel: "Getting started",
              text: "Open an email to get started",
              startIcon: {
                knownIcon: "EMAIL",
                altText: "Send an email",
              },
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
