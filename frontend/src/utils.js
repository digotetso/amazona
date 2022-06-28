
export const getError = (error) => {
    return error.response && error.response.data.message  // check if this error reponse from backend
        ? error.response.data.message
        : error.message
}