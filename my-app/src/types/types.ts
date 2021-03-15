type TContacts = {
    github: string | null,
    vk: string | null,
    facebook: string | null,
    instagram: string | null,
    twitter: string | null,
    website: string | null,
    youtube: string | null,
    mainLink: string | null,
};
export type TPhotos = {
    large: string | null,
    small: string | null,
};
export type TProfile = {
    userId: number,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    aboutMe: string,
    fullName: string,
    contacts: TContacts,
    photos: TPhotos,
};
export type TUser = {
    id: number,
    name: string,
    status: string,
    photos: TPhotos,
    followed: boolean,
};
