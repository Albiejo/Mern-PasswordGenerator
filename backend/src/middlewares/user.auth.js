import jwt from 'jsonwebtoken';

export const userAuth = async (req, res, next) => {
   
    try {
        const authHeader = req.headers.authorization;


        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            console.log("Authorization header missing or does not start with 'Bearer'");
            return res.status(401).json({ error: "Authorization header missing or invalid" });
        }

        const token = authHeader.split(' ')[1];
       

        if (!token) {
            return res.status(401).json({ error: 'No token found' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (decoded) {
            req.userId = decoded._id;
            next();
        } else {
            return res.status(401).json({ error: 'Unauthorized' });
        }
    } catch (error) {
        console.error("Error in userAuth middleware:", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
