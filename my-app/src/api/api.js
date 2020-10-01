import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        'API-KEY': "8c9ba98e-b3c1-4f12-bbc3-ef13dd1018cc"
    },
});

export const userAPI = {
    getUsers(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data);
    },
    follow(id) {
        return instance.post(`follow/${id}`, {},{})
            .then(response => response.data)
    },
    unfollow(id) {
        return instance.delete(`follow/${id}`, {},{})
            .then(response => response.data)
    }
};

