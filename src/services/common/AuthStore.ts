import {defineStore} from "pinia";
import axios, {Axios} from "axios";
import router from "@/router";

const baseURL = import.meta.env.VITE_MEMBER_SERVICE_URL;

const client: Axios = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const useAuthStore = defineStore({
    id: "auth",
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        accessToken: localStorage.getItem("accessToken"),
        returnUrl: null
    }),
    actions: {
        async login(username: string, password: string) {
            try {
                const response = await client.post(`${baseURL}/api/sign-in`, {
                    username: username,
                    password: password
                });

                const accessToken = response.headers["authorization"];

                // update pinia state
                this.accessToken = accessToken;

                // store user details and jwt in local storage to keep user logged in between page refreshes
                localStorage.setItem("accessToken", accessToken);

                // redirect to previous url or default to home page
                await router.push(this.returnUrl || '/');
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        logout() {
            this.accessToken = null;
            localStorage.removeItem("accessToken");
            router.push("/login");
        }
    }
});