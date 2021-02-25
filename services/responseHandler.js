function handleResponse(user, status, success, message){
    return {
        user: user,
        status: status,
        success: success,
        message: message
    }
}

module.exports = { handleResponse }