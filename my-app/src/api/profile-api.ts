import {TPhotos, TProfile} from "../types/types";
import {APIResponse, instance} from "./api";

export type TSavePhotos = {
    photos: TPhotos,
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<TProfile>('/profile/' + userId)
            .then(res => res.data);
    },
    getUserStatus(userId: number) {
        return instance.get('profile/status/' + userId)
            .then(res => res.data);
    },
    updateUserStatus(status: string) {
        return instance.put<APIResponse>('profile/status', {status})
            .then(res => res.data);
    },
    savePhoto(photoFile: File) {
        const formData = new FormData();
        formData.append('image', photoFile);

        return instance.put<APIResponse<TSavePhotos>>('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(res => res.data);
    },
    saveProfile(profile: TProfile) {
        return instance.put<APIResponse>('/profile', profile)
            .then(res => res.data);
    },
};
