import {createRouter, createWebHistory} from 'vue-router';
import MainView from '@/views/MainView.vue';
import MemberView from '@/views/MemberView.vue';
import ProjectView from '@/views/ProjectView.vue';
import MakerView from '@/views/MakerView.vue';
import SignInView from "@/views/SignInView.vue";
import {client} from "@/api/APISpec";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "main",
            component: MainView,
            meta: { authRequired: true }
        },
        {
            path: "/sign-in",
            name: "signin",
            component: SignInView
        },
        {
            path: "/member",
            name: "member",
            component: MemberView,
            meta: { authRequired: true }
        },
        {
            path: "/project",
            name: "project",
            component: ProjectView,
            meta: { authRequired: true }
        },
        {
            path: "/maker",
            name: "maker",
            component: MakerView,
            meta: { authRequired: true }
        },
    ]
});

router.beforeEach(async (to, from, next) => {
    const accessToken = sessionStorage.getItem("accessToken");

    if(to.matched.some((routeInfo) => {
        return routeInfo.meta.authRequired;
    })) {
        if(accessToken === null) {
            alert("로그인이 필요합니다");
            next("/sign-in");
        }
    }

    if(accessToken !== null) {
        // axios header에 전역적으로 token 주입
        client.interceptors.request.use((config) => {
            config.headers.setAuthorization(accessToken);

            return config;
        }, (error) => Promise.reject(error));
    }

    next();
})

export default router
