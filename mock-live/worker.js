/* eslint-disable consistent-return */
const getMetaData = { current: {}, hasData: false };
const initData = { current: {}, hasData: false };
const fieldsData = { current: [], hasData: false };

const SharedWorkerRequestTypes = {
  GetMeta: "GET_META",
  Init: "INIT",
  Fields: "FIELDS",
};

const ERR = "ERROR_OCCURRED";

const fetchData = (message, url, obj, needApiKey = true) => {
  if (message.isCustomerPreview) {
    return;
  }
  if (obj.hasData !== false && !message.isInvalidate) {
    return obj.hasData;
  }

  obj.hasData = fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
    credentials: "same-origin",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.status);
      }

      return res.json();
    })
    .then((res) => {
      obj.current = JSON.stringify(res);

      return true;
    })
    .catch((e) => {
      throw e;
    });

  return obj.hasData;
};

const getMeta = (message) => {
  return fetchData(
    message,
    `${message.data.domain}/v1/accounts/get-meta`,
    getMetaData,
    false
  );
};

const homeInit = (message) => {
  return fetchData(message, `${message.data.domain}/v1/home/init`, initData);
};

const fields = (message) => {
  return fetchData(message, `${message.data.domain}/v1/all-fields`, fieldsData);
};

const isInFlight = (promise) => {
  return new Promise((res, rej) => {
    return promise.then(() => res("Resolved")).catch((e) => rej(e));
  });
};

onmessage = async (ev) => {
  const errorHandling = async (functionToCall, message, obj, type) => {
    isInFlight(functionToCall(message))
      .then(() => {
        postMessage({
          respData: obj.current,
          type: type,
        });
      })
      .catch(() => {
        postMessage({
          respData: ERR,
          type: type,
        });
      });
  };

  const message = ev.data;

  if (message.type === "setData") {
    Promise.all([getMeta(message), homeInit(message), fields(message)]);
  } else if (message.type === "setMetaData") {
    Promise.all([getMeta(message)]);
  } else if (message.type === "getData") {
    switch (message.request) {
      case SharedWorkerRequestTypes.GetMeta:
        errorHandling(
          getMeta,
          message,
          getMetaData,
          SharedWorkerRequestTypes.GetMeta
        );
        break;
      case SharedWorkerRequestTypes.Init:
        errorHandling(
          homeInit,
          message,
          initData,
          SharedWorkerRequestTypes.Init
        );
        break;
      case SharedWorkerRequestTypes.Fields:
        errorHandling(
          fields,
          message,
          fieldsData,
          SharedWorkerRequestTypes.Fields
        );
        break;
    }
  }

  // Notify the main page that the worker is connected
};
postMessage({ type: "connected" });
