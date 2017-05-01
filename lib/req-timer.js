'use strict';



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

	// 跑满设定的时间
	while(process.hrtime(startTime) / 1000 >= t){
		
	}
}