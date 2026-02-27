const sendResponse = (res, data) => {
    const { statusCode, success, message, data: DataReponse } = data;
    res.status(statusCode).json({
        success,
        message,
        data: DataReponse,
    });
};
export default sendResponse;
//# sourceMappingURL=sendResponse.js.map