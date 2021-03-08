type ContactsType = {
    github: string | null
    vk: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    website: string | null
    youtube: string | null
    mainLink: string | null
};
export type PhotoType = {
    large: string | null
    small: string | null
};
export type TProfile = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotoType
};
export type UserType = {
    id: number,
    name: string,
    status: string,
    photos: PhotoType,
    followed: boolean,
}
