const _ = require('lodash');
const jwt = require('jwt-simple');
const config = require('nconf');

const BrewData = require('./brew.data.js');

const Middleware = {
	account : (req, res, next) => {
		if(req.cookies && req.cookies.nc_session){
			try{
				req.account = jwt.decode(req.cookies.nc_session, config.get('secret'));
			}catch(e){}
		}
		return next();
	},
	admin : (req, res, next) => {
		if(req.query.admin_key === config.get('admin_key')){
			delete req.admin_key;
			req.isAdmin = true;
		}
		return next();
	},


	//Filters
	devOnly : (req, res, next) => {
		const env = process.env.NODE_ENV;
		if(env !== 'staging' && env !== 'production') return next();
		return res.sendStatus(404);
	},
	adminOnly : (req, res, next) => {
		if(req.isAdmin) return next();
		return res.sendStatus(401);
	},


	//Loaders
	loadBrew : (req, res, next) => {
		//Loads a brew by edit id

		//TODO: move validate into hurrr
	},
	viewBrew : (req, res, next) => {
		//load by share
		//increase view count
	},

};

module.exports = Middleware;