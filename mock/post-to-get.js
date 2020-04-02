module.exports = (req, res, next) => {
	console.log("------------------");
	req.method = 'GET';
	next();
}