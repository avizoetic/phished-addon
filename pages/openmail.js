import { baseURL } from "../config.js";

export const openmail = (email, name, photo, addresses) => {
  return {
    sections: [
      {
        widgets: [
          {
            textParagraph: {
              text: "Do you see anything suspicious with this message? Don't hesitate to report it via the button below.",
            },
            horizontalAlignment: "CENTER",
          },
          {
            divider: {},
          },
          {
            buttonList: {
              buttons: [
                {
                  text: "Report this mail",
                  onClick: {
                    action: {
                      function: baseURL + "/report",
                      parameters: [{ key: "mime", value: "addresses" }],
                    },
                  },
                  color: {
                    red: 0.153,
                    green: 0.62,
                    blue: 0.663,
                    alpha: 1,
                  },
                },
              ],
            },
            horizontalAlignment: "CENTER",
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
    displayStyle: "DISPLAY_STYLE_UNSPECIFIED",
  };
};
