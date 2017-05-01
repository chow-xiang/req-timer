'use strict';

var buildRequest = require('./build-request.js');

module.exports = reqTimer;

/***
* @param {Number} requestNumber
* @param {Number} requestTimes
* @param {String} body
* @param {String} method
* @param {Object} headers
* @param {String} url
*
*/
async function reqTimer (n, t, b, m, h, url) {
	
	var startTime = process.hrtime();
	var timeSpace = ~~(t * 1000 / n);
	var result    = [];

	// 跑满设定的时间
	for(var i=0;i < t;i++){
		// build request
		var req = buildRequest(b, m, h, url, startTime, timeSpace * t);

		// request
		result.push(req());
	}

	return await Promise.all(result);
}


process.on('unhandledRejection', error => {
	// Will print "unhandledRejection err is not defined"
	console.log('unhandledRejection', error.message);
});
