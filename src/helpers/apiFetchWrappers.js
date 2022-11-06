
import { API_URL } from '../config';

const getWalletAuthHeaderObject = (existingHeaders) => {
  const headers = existingHeaders ?? new Headers();
  headers.append('Access-Control-Allow-Origin', '*');
  headers.append(
    'Access-Control-Allow-Headers',
    'Origin, X-Origin, Content-Type, DummyAuthHeader'
  );
  headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE');
  //const base64String = getCookie(`authHeader-${account}`);
  //headers.append('DummyAuthHeader', `${base64String}`);

  return headers;
};

export const handleError = async (response) => {
  if (response.status === 400) {
    // custom error response format handling
    const errorInfo = await response.json();
    throw new Error(errorInfo.message);
  } else if (!response.ok) {
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
  const headers = getWalletAuthHeaderObject(existingheaders);

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
