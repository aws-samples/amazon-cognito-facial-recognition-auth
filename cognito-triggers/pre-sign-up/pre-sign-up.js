exports.handler = async event => {
    event.response.autoConfirmUser = true;
    event.response.autoVerifyEmail = true;
    return event;
};