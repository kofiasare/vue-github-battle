import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import App from './App.vue';
import Routes from './router';

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.config.productionTip = false;

new Vue({
    el: '#app',
    render: h => h(App),
    router: new VueRouter({
        mode: 'history',
        routes: Routes,
    }),
});