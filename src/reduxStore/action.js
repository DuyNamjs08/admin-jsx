

export const Dark = (data)=>{
    return {
        type : "DARK",
        payload:data,
    }
}
export const Light = (data)=>{
    return {
        type : "LIGHT",
        payload:data,
    }
}
export const Toggle = (data)=>{
    return {
        type : "TOGGLE",
        payload:data,
    }
}
export const Loginauth = (data)=>{
    return {
        type : "LOGIN",
        payload:data,
    }
}
export const LogOutauth = (data)=>{
    return {
        type : "LOGOUT",
        payload:data,
    }
}