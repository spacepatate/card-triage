import Axios from 'axios';

export default {
    install: (Vue) => {
        Vue.prototype.$api = Axios.create({
            baseURL: 'http://localhost:3000',
        });
    },
};
