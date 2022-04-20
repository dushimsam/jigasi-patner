exports.isUserCategory = (categories) => {
    try {
        return function (req, res, next) {
            // if (!(categories.find((category) => category === req.AUTH_DATA.USER_TYPE)))
            //     return res.send({
            //         success: false,
            //         message: 'You are not Authorized',
            //         err: null,
            //         status: 401
            //     }).status(401);
            next();
        }
    } catch (e) {
        // do nothing
    }
}
