import Vue from 'vue';
import axios from "axios";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

function getCookie(name){
    var allcookies = document.cookie;
    var cookie_pos = allcookies.indexOf(name);
    if (cookie_pos != -1) {
        cookie_pos = cookie_pos + name.length + 1; 
        var cookie_end = allcookies.indexOf(";", cookie_pos);
        
        if (cookie_end == -1) {
            cookie_end = allcookies.length;

        }
        var value = unescape(allcookies.substring(cookie_pos, cookie_end)); 
    }
    return value;
}

const _axios = axios.create();

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent

    if(getCookie("token")) {
      config.headers.Authorization = getCookie("token");
    }

    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

Plugin.install = function(Vue) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)
