import jwt from 'jsonwebtoken';



const userAuth = async (req, res, next) => {
    const token = req.cookies.token;
    console.log(token)
    
    

    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized access:No token" });
    }



    try {
        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(tokenDecoded.id);

        if (tokenDecoded && tokenDecoded.id) {
            req.userId = tokenDecoded.id;
        } else {
            return res.status(401).json({ success: false, message: "Unauthorized access" });
        }

        next();
    } catch (error) {
        return res.status(403).json({ success: false, message: "Invalid ebehrb token", error: error.message });
    }
}

export default userAuth;