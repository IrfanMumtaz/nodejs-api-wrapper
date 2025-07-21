class Controller {

    response(res, data, code=200) {
        res.status(code).json({
            data: data,
            error: {},
            success: true,
            messag: "Operation Successful"
        })
    }

}

module.exports = Controller; 