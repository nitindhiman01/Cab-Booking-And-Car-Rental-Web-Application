//Creating the token and saving in to the cookie.

const sendDriverToken = (driver, statusCode, res) => {
    const token = driver.getJWTToken();

    //options for cookie
    const options = {
        expires: new Date(
            Date.now() + 5 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        driver,
        token,
    });
}

module.exports = sendDriverToken