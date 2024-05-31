import jwt from 'jsonwebtoken';


export const userAuth=async(req,res,next)=>{
    try {
        const authHeader=req.headers.authorization
        if(!authHeader || !authHeader.startsWith('Bearer')){
            return res.status(401).json({error:""})
        }
        const token = authHeader.split(' ')[1]
        if (!token) {
            return res.status(401).json({ error: 'No token found' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        if (decoded) {
            req.userId = decoded._id
            next()
        } else {
            return res.status(401).json({ error: 'Unauthorized' });
        }
    } catch (error) {
        console.log(error)
    }
}