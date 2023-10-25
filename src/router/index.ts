import {createRouter, createWebHistory} from 'vue-router';
import MainView from '@/views/MainView.vue';
import MemberView from '@/views/MemberView.vue';
import ProjectView from '@/views/ProjectView.vue';
import MakerView from '@/views/MakerView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "main",
            component: MainView
        },
        {
            path: "/member",
            name: "member",
            component: MemberView
        },
        {
            path: "/project",
            name: "project",
            component: ProjectView
        },
        {
            path: "/maker",
            name: "maker",
            component: MakerView
        },
    ]
});

export default router
