const jwt = require("jsonwebtoken");
const secret = "fitnessApp";


//[SECTION] Token Creation

module.exports.createAccessToken = (user) => {
	const data = {
		id: user._id,
		email : user.email,
		isAdmin : user.isAdmin
	}
	return jwt.sign(data, secret, {});

}


//[SECTION] Token Verification

module.exports.verify = (req, res, next) => {
	console.log(req.headers.authorization)

	let token = req.headers.authorization

	if(typeof token === "undefined"){
		return res.status(401).send({ auth: "Failed. No Token"})
	} else {
		console.log(token);
		token = token.slice(7, token.length)
		console.log(token)

		jwt.verify(token, secret, function(err, decodedToken){

			if (err){
				return res.status(403).send({
					auth: "Failed",
					message: err.message
				})
			} else {
				console.log("result from verify method:")
				console.log(decodedToken);
				//if our token is verified  to be correct, then we will update the request and add the user's decoded token details
				req.user = decodedToken

				//it passes details of the request and response to the next function/middleware
				next()
			}
		})
	}
}


//[SECTION] Error Handler
module.exports.errorHandler = (err, req, res, next) => {
	//Logging the error
	console.error(err)

	const statusCode = err.status || 500;
	const errorMessage = err.message || 'Internal Server Error';
	//Sends a standardized error response
	res.status(statusCode).json({
		error: {
			message: errorMessage,
			errorCode: err.code || 'SERVER_ERROR',
			details: err.details || null
		}
	});
};

