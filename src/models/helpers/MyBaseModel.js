import { DBBaseModel } from 'wizweb-fe'
import VueCookies from "vue-cookies";

export default class DBEvent extends DBBaseModel {
    static baseUrl = import.meta.env.VITE_API_BACKEND_URL

    static adapter = 'laravel'

    static mergeHeaders(headers) {
      const result = {
        ...headers,
      };

      const VITE_AUTH = VueCookies.get('VITE_AUTH');

      if (VITE_AUTH?.token) {
        const expireDate = new Date(VITE_AUTH.expireDate);
        const currentDate = new Date();

        if (currentDate <= expireDate) {
          result['Authorization'] = `Bearer ${VITE_AUTH.token}`;
        }
      }

      return result;
    }



}
