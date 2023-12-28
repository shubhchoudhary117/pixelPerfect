const jwt = require("jsonwebtoken")
const Protect = async (req, res, next) => {
    let token = "";
    console.log(req.headers)
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            await jwt.verify(token, process.env.SECRETE_KEY, (err, decode) => {
                if (!err) {
                    req.otp=decode.otp;
                    req.mobile=decode.phone
                } else {
                    console.log(err);
                    res.status(401).json({ badcradintals: true });
                }
            })
            next();
        } catch (error) {
           
            res.status(401).json({ badcradintals: true });
        }
    } else {
        res.status(401).json({ badcradintals: true });
    }
}


module.exports=Protect