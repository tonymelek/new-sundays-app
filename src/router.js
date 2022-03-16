import { createWebHistory, createRouter } from "vue-router";
import Students from './components/Students.vue'
import LoginPage from './components/LoginPage.vue'

const options={
    history:createWebHistory(),
    routes: [
        {
            Component: LoginPage,
            path:'/'

        },
        {
            Component: Students,
            path:'/students'
        }
    ]
}

export const router=createRouter(options);

