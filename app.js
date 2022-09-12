import express from "express";
import { homepage } from "./pages/homepage.js";
import { openmail } from "./pages/openmail.js";
import { response } from "./pages/response.js";

import { getEmailAddresses, getName } from "./middleware/helper.js";
import { getMime, sendReport } from "./middleware/api.js";

const app = express();
const port = 3000;

console.log(`running at port ${port} `);

app.use(express.json());

app.post("/", (req, res) => {
  const auth = req?.body?.authorizationEventObject;
  const msgId = req?.body?.gmail?.messageId;
  if (req?.body?.gmail?.messageId) {
    const auth = req?.body?.authorizationEventObject;
    const msgId = req?.body?.gmail?.messageId;
    getName(req).then((data) => {
      const email = data?.emailAddresses[0]?.value;
      const name = data?.names[0]?.displayName;
      const photo = data?.photos[0]?.url;
      const url = `https://gmail.googleapis.com/gmail/v1/users/${email}/messages/${msgId}`;

      async function fetchMime() {
        const response = await getMime(url, auth);
        return response;
      }

      const mimePromise = fetchMime();
      mimePromise.then((addresses) =>
        res.json({
          action: {
            navigations: [
              {
                pushCard: openmail(email, name, photo, addresses),
              },
            ],
          },
        })
      );
    });
  } else {
    getName(req).then((data) => {
      const email = data?.emailAddresses[0]?.value;
      const name = data?.names[0]?.displayName;
      const photo = data?.photos[0]?.url;

      res.json({
        action: {
          navigations: [
            {
              pushCard: homepage(email, name, photo),
            },
          ],
        },
      });
    });
  }
});

app.post("/report", (req, res) => {
  const auth = req?.body?.authorizationEventObject;
  const msgId = req?.body?.gmail?.messageId;
  getName(req).then((data) => {
    const email = data?.emailAddresses[0]?.value;
    const name = data?.names[0]?.displayName;
    const photo = data?.photos[0]?.url;
    const url = `https://gmail.googleapis.com/gmail/v1/users/${email}/messages/${msgId}`;

    async function fetchMime() {
      const response = await getMime(url, auth);
      return response;
    }

    const mimePromise = fetchMime();
    mimePromise.then((mimeres) => {
      async function fetchMimeData() {
        const response = await sendReport(mimeres, email);
        return response;
      }

      const mimeDataPromise = fetchMimeData();

      mimeDataPromise.then((mimeDatares) => {
        const type = mimeDatares?.Type;
        const title = mimeDatares?.Title;
        const description = mimeDatares?.Description;
        const color = mimeDatares?.Color;
        const action = mimeDatares?.Action;

        res.json({
          renderActions: {
            action: {
              navigations: [
                {
                  pushCard: response(
                    type,
                    title,
                    description,
                    color,
                    action,
                    email,
                    name,
                    photo
                  ),
                },
              ],
            },
          },
        });
      });
    });
  });
});

app.listen(3000, function () {
  console.log("Express listening on port", this.address().port);
});
