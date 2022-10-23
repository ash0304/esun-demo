import axios from 'axios';
import Cookies from 'js-cookie';
import router from '../router';
import store from '../utilities/store';

// api請求設定
const request = axios.create({
  // 根據環境切換(暫)
  baseURL:
    process.env.VUE_APP_ENV == 'local'
      ? process.env.VUE_APP_API_BASE_URL
      : process.env.VUE_APP_WEB_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

request.interceptors.request.use(
  (config) => {
    const token = Cookies.get('login_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    const { data, status } = response;
    const { ok, model, message, responseCode } = data;
    if (status == 200) {
      if (ok) {
        // loading close
        store.dispatch('toggleLoading', false);
        if (responseCode === '000000') {
          // 根據環境切換(暫)
          if (process.env.VUE_APP_ENV == 'local') {
            return model;
          } else {
            return JSON.parse(model);
          }
        } else {
          // show error modal
          store.dispatch('setGlobalModalMessage', message);
          store.dispatch('toggleGlobalModal', true);
          return Promise.reject();
        }
      } else {
        // loading close
        store.dispatch('toggleLoading', false);
        // todo
        console.log(message);
      }
    } else {
      store.dispatch('toggleLoading', false);
      router.push({ name: 'Error500', query: { t: 0 } });
    }
  },
  (error) => {
    store.dispatch('toggleLoading', false);
    return error.response;
  }
);

// 根據環境切換(暫)
export const doPost = (route, data) => {
  store.dispatch('toggleLoading', true);
  if (process.env.VUE_APP_ENV == 'local') {
    return request.post(route, data);
  } else {
    const postData = {
      Url: `${process.env.VUE_APP_API_BASE_URL}${route}`,
      Request: JSON.stringify(data),
    };
    return request.post('PostApi', postData);
  }
};
// 根據環境切換(暫)
export const doGet = (route) => {
  store.dispatch('toggleLoading', true);
  if (process.env.VUE_APP_ENV == 'local') {
    return request.get(route);
  } else {
    const postData = { Url: `${process.env.VUE_APP_API_BASE_URL}${route}` };
    return request.post('GetApi', postData);
  }
};

// 文件請求設定
const filerequest = axios.create({
  // 根據環境切換(暫)
  baseURL:
    process.env.VUE_APP_ENV == 'local'
      ? process.env.VUE_APP_API_BASE_URL
      : process.env.VUE_APP_WEB_BASE_URL,
  headers: { 'Content-Type': 'multipart/form-data' },
});

filerequest.interceptors.response.use(
  (response) => {
    const { data, status } = response;
    const { ok, model, message, responseCode } = data;
    if (status == 200) {
      if (ok) {
        // loading close
        store.dispatch('toggleLoading', false);
        if (responseCode === '000000') {
          // 根據環境切換(暫)
          if (process.env.VUE_APP_ENV == 'local') {
            return model;
          } else {
            return JSON.parse(model);
          }
        } else {
          // show error modal
          store.dispatch('setGlobalModalMessage', message);
          store.dispatch('toggleGlobalModal', true);
          return Promise.reject();
        }
      } else {
        // loading close
        store.dispatch('toggleLoading', false);
        // todo
        console.log(message);
      }
    } else {
      store.dispatch('toggleLoading', false);
      router.push({ name: 'Error500', query: { t: 0 } });
    }
  },
  (error) => {
    store.dispatch('toggleLoading', false);
    return error.response;
  }
);

// 根據環境切換(暫) - 未定案
export const doFilePost = (route, data) => {
  store.dispatch('toggleLoading', true);
  if (process.env.VUE_APP_ENV == 'local') {
    return filerequest.post(route, data);
  } else {
    const url = `${process.env.VUE_APP_API_BASE_URL}${route}`;
    data.append('Url', url);
    return filerequest.post(route, data);
  }
};

// blob文件請求設定
const blobrequest = axios.create({
  // 根據環境切換(暫)
  baseURL:
    process.env.VUE_APP_ENV == 'local'
      ? process.env.VUE_APP_API_BASE_URL
      : process.env.VUE_APP_WEB_BASE_URL,
  responseType: 'blob',
});

blobrequest.interceptors.response.use(
  (response) => {
    const { status } = response;
    if (status == 200) {
      return response;
    } else {
      router.push({ name: 'Error500', query: { t: 0 } });
    }
  },
  (error) => {
    return error.response;
  }
);

// 根據環境切換 - 檔案blob
export const doBlobFile = (route, data, config) => {
  if (process.env.VUE_APP_ENV == 'local') {
    return blobrequest.post(route, data, config);
  } else {
    const postData = {
      Url: `${process.env.VUE_APP_API_BASE_URL}${route}`,
      Request: JSON.stringify(data),
    };
    return blobrequest.post('DownloadFile', postData);
  }
};

// 驗證授權請求設定
const authRequest = axios.create({
  // 根據環境切換(暫)
  baseURL:
    process.env.VUE_APP_ENV == 'local'
      ? process.env.VUE_APP_API_BASE_URL
      : process.env.VUE_APP_WEB_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

authRequest.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authRequest.interceptors.response.use(
  (response) => {
    const { data, status } = response;
    const { ok, model, message, responseCode } = data;
    if (status == 200) {
      if (ok) {
        // loading close
        store.dispatch('toggleLoading', false);
        if (responseCode === '000000') {
          return model;
        } else {
          // show error modal
          store.dispatch('setGlobalModalMessage', message);
          store.dispatch('toggleGlobalModal', true);
          return Promise.reject();
        }
      } else {
        // loading close
        store.dispatch('toggleLoading', false);
        // todo
        console.log(message);
      }
    } else {
      store.dispatch('toggleLoading', false);
      router.push({ name: 'Error500', query: { t: 0 } });
    }
  },
  (error) => {
    store.dispatch('toggleLoading', false);
    router.push({ name: 'Error500', query: { t: 0 } });
    return error.response;
  }
);

// 根據環境切換(暫)
export const doAuthGet = (route) => {
  store.dispatch('toggleLoading', true);
  return authRequest.get(route);
};
