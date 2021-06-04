import {TUser} from "../types/types";
import {APIResponse, instance} from "./api";

type TGetUsers = {
    items: TUser[],
    totalCount: number,
    error: string,
}

export const userAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<TGetUsers>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data);
    },
    follow(id: number) {
        return instance.post<APIResponse>(`follow/${id}`, {}, {})
            .then(response => response.data)
    },
    unfollow(id: number) {
        return instance.delete<APIResponse>(`follow/${id}`, {})
            .then(response => response.data)
    },
};
