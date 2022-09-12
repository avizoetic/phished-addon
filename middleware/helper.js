import { getOwnName } from "./api.js";

export const getEmailAddresses = (data, ownAddress) => {
  var newArray = data.filter(function (el) {
    return el.name == "Cc" || el.name == "To" || el.name == "From";
  });

  const result = newArray.map((item) =>
    item.value.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi)
  );

  var merged = [].concat.apply([], result);

  var emailList = merged.filter(function (el) {
    return el != ownAddress;
  });
  return emailList;
};

export const getName = (req) => {
  const oauth = req?.body?.authorizationEventObject;
  async function fetchName() {
    const response = await getOwnName(oauth);
    return response;
  }
  const addressPromise = fetchName();
  return addressPromise;
};
