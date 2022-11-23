import { API_URL } from "../config";

const getWalletAuthHeaderObject = (existingHeaders) => {
  const headers = existingHeaders ?? new Headers();
  headers.append("Access-Control-Allow-Origin", "*");
  headers.append(
    "Access-Control-Allow-Headers",
    "Origin, X-Origin, Content-Type, DummyAuthHeader"
  );
  headers.append("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
  //const base64String = getCookie(`authHeader-${account}`);
  //headers.append('DummyAuthHeader', `${base64String}`);

  return headers;
};

const getSDKApiHeaderObject = async (existingHeaders, apiKey, playerId) => {
  const headers = existingHeaders ?? new Headers();
  headers.append("Access-Control-Allow-Origin", "*");
  headers.append(
    "Access-Control-Allow-Headers",
    "Origin, X-Origin, Content-Type, DummyAuthHeader"
  );
  headers.append("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
  const date = new Date();
  const today = await date.getDate().toString();
  const sha256Today = await sha256(today);
  const base64String = await window.btoa(
    unescape(
      encodeURIComponent(`${today}-${apiKey}-${playerId}-${sha256Today}`)
    )
  );
  headers.append("DummyAuthHeader", `Basic ${base64String}`);
  return headers;
};

async function sha256(str) {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder("utf-8").encode(str)
  );
  return Array.prototype.map
    .call(new Uint8Array(buf), (x) => ("00" + x.toString(16)).slice(-2))
    .join("");
}

export const handleError = async (response) => {
  if (response.status === 401) {
    // custom error response format handling
    console.log("authorize error");
    //   const errorInfo = await response.json();
    //   console.log("error Info", response);
    //   throw new Error(errorInfo.message);
    // } else if (!response.ok) {
    //   console.log("status text", response.statusText);
    //   const err = response.statusText || response;
    //   throw new Error(err);
    const res = { text: "Invalid API key" };
    console.log(res);
    return res;
  }
  if (response.status === 400) {
    // custom error response format handling
    const errorInfo = await response.json();
    console.log("error Info", errorInfo);
    throw new Error(errorInfo.message);
  } else if (!response.ok) {
    console.log("status text", response.statusText);
    const err = response.statusText || response;
    throw new Error(err);
  }
  return response.json();
};

export const apiFetchDataWithSig = async (
  url,
  method,
  existingOptions,
  existingheaders
) => {
  const fetchURL = `${API_URL}/${url}`;
  const headers = getSDKApiHeaderObject(existingheaders);

  const options = existingOptions ?? {};
  options.method = `${method}`;
  options.headers = headers;
  const res = await fetch(fetchURL, options);
  return handleError(res);
  /*
  let base64String = getCookie(`authHeader-${account}`);

  if ((!base64String || base64String === null) && !allowNoAuthOption) {
    if (sigPrompt) {
      const promptResponse = await sigPrompt(
        async () => {
          base64String = getCookie(`authHeader-${account}`);
          headers.delete('DummyAuthHeader');
          headers.append('DummyAuthHeader', `${base64String}`);
          const res = await fetch(fetchURL, options);
          return handleError(res);
        },
        async () => {
          if (allowNoAuthOption) {
            const res = await fetch(fetchURL, options);
            return handleError(res);
          }
          return null;
        }
      );

      return promptResponse;
    }
    return null;
  }

  if (base64String || allowNoAuthOption) {
    const res = await fetch(fetchURL, options);
    return handleError(res);
  }
  */
  return null;
};

export const fetchSDKApi = async (
  url,
  method,
  existingOptions,
  existingheaders,
  apiKey,
  playerId
) => {
  const fetchURL = `${API_URL}/${url}`;
  const headers = await getSDKApiHeaderObject(
    existingheaders,
    apiKey,
    playerId
  );

  const options = existingOptions ?? {};
  options.method = `${method}`;
  options.headers = headers;
  const res = await fetch(fetchURL, options);
  return handleError(res);
  // fetch(fetchURL, options)
  //   .then(function (response) {
  //     return response;
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  /*
  let base64String = getCookie(`authHeader-${account}`);

  if ((!base64String || base64String === null) && !allowNoAuthOption) {
    if (sigPrompt) {
      const promptResponse = await sigPrompt(
        async () => {
          base64String = getCookie(`authHeader-${account}`);
          headers.delete('DummyAuthHeader');
          headers.append('DummyAuthHeader', `${base64String}`);
          const res = await fetch(fetchURL, options);
          return handleError(res);
        },
        async () => {
          if (allowNoAuthOption) {
            const res = await fetch(fetchURL, options);
            return handleError(res);
          }
          return null;
        }
      );

      return promptResponse;
    }
    return null;
  }

  if (base64String || allowNoAuthOption) {
    const res = await fetch(fetchURL, options);
    return handleError(res);
  }
  */
  return null;
};
