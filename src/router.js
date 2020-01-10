import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "Login",
            component: Login,
            meta: {
                title: '云盘'
            }
        },
        {
            path: "/public",
            name: "public",
            component: () =>
                import(/* webpackChunkName: "about" */ "./views/Public.vue"),
            meta: {
                title: '云盘'
            }
        },
        {
            path: "/private",
            name: "private",
            component: () =>
                import(/* webpackChunkName: "about" */ "./views/Private.vue"),
            meta: {
                title: '云盘'
            }
        },
        {
            path: "/admin",
            name: "admin",
            component: () =>
                import(/* webpackChunkName: "about" */ "./views/Admin.vue"),
            meta: {
                title: '云盘'
            }
        },
        {
            path: "/register",
            name: "register",
            component: () =>
                import(/* webpackChunkName: "about" */ "./views/Register.vue"),
            meta: {
                title: '云盘'
            }
        }
    ]
});
