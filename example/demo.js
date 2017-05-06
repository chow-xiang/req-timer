'use strict';

var reqTimer = require('../lib/req-timer');

new reqTimer(20000, 1000, null, null, null, 'http://www.baidu.com')
.then(ret => {
	console.log(ret);
})
