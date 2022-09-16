import axios from "axios";
import { Base64 } from "js-base64";

const peopleurl = `https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses,photos`;
const reporturl = `https://inbound.phished.io/api/emails/reports/client`;

export const getOwnName = async (oauth) => {
  try {
    return await axios
      .get(peopleurl, {
        headers: {
          authorization: "Bearer " + oauth.userOAuthToken,
        },
      })
      .then((res) => {
        const emails = res.data;

        return emails;
      });
  } catch (error) {
    console.log(error);
  }
};

export const getMime = async (url, auth) => {
  try {
    return await axios
      .get(url, {
        headers: {
          authorization: "Bearer " + auth.userOAuthToken,
        },
      })
      .then((res) => {
        const msgmime = res?.data?.payload;

        var object = msgmime?.headers.reduce(
          (obj, item) => Object.assign(obj, { [item.name]: item.value }),
          {}
        );

        const sender = object?.From;
        const subject = object?.Subject;

        const raw = JSON.stringify(object);

        var part = msgmime?.parts?.filter(function (part) {
          return part?.mimeType == "text/html";
        });

        var parsing;

        if (part) {
          parsing = part[0]?.body?.data;
        } else {
          parsing = msgmime?.body?.data;
        }

        var content = "";
        if (parsing) {
          content = Base64.decode(
            parsing?.replace(/-/g, "+").replace(/_/g, "/")
          );
        }

        const parameters = {
          senderAddress: sender,
          mailSubject: subject,
          email: raw,
          mailContent: content,
        };

        return parameters;
      });
  } catch (error) {
    console.log(error);
  }
};

export const sendReport = async (mime, email) => {
  try {
    return await axios
      .post(reporturl, {
        reporterEmailAddress: email,
        senderAddress: mime.senderAddress,
        mailSubject: mime.mailSubject,
        mailContent: mime.mailContent,
      })
      .then((res) => {
        const reportresponse = res.data;
        // console.log("report response", reportresponse);
        return reportresponse;
      });
  } catch (error) {
    console.log(error);
  }
};
