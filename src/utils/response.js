

export const errorResponse = (error)=>{
    return {
        success: false,
        err: error
    };
}

export const successReponse = (data)=>{
    return {
        success: true,
        data: data
    };
}
