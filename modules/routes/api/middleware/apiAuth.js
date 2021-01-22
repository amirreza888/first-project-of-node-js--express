const jwt = require('jsonwebtoken')
const User = require(`${config.path.model}/user`);


module.exports=(req,res,next)=>{
    let token = req.body.token || req.query.token || req.header("token")
    if(token){
        return jwt.verify(token, config.secret, (err, decode)=>{
            if(err){
                return res.json({
                    data: 'failed to authenticate token',
                    succcess: false
                })
            }

            User.findById(decode.user_id,(err, user)=>{
                if (err) throw err;
                if (user){
                    user.token = token;
                    req.user = user;
                    next()
                }else{
                    return res.json({
                        data: 'user not found',
                        succcess: false
                    })
                }
            })

        })

    }
    return res.json({
        data: "No token provide",
        success : false
    })
}