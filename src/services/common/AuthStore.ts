import {defineStore} from "pinia";
import router from "@/router";
import {client} from "@/api/APISpec";

export const useAuthStore = defineStore({
    id: "auth",
    state: () => ({
        accessToken: sessionStorage.getItem("accessToken"),
        returnUrl: null
    }),
    actions: {
        async login(username: string, password: string) {
            try {
                const response = await client.post(`/member-service/api/sign-in`, {
                    username: username,
                    password: password
                });

                const accessToken = response.headers["authorization"];

                // update pinia state
                this.accessToken = accessToken;

                // store user details and jwt in local storage to keep user logged in between page refreshes
                sessionStorage.setItem("accessToken", accessToken);

                alert("로그인에 성공하였습니다");
                // redirect to previous url or default to home page
                await router.push(this.returnUrl || '/');
            } catch (error) {
                alert("로그인에 실패하였습니다");
                console.error(error);
                throw error;
            }
        }
    }
});