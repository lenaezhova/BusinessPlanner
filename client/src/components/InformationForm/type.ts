export type infoState = {
    email:  string,
    oldPassword: string,
    newPassword: string,
    confirmNewPassword: string,
    name: string,
    surname: string,
    gender: string,
    patronymic: string
}

export type errorState = {
    oldPasswordError:  boolean
}