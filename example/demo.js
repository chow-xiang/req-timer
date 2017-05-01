'use strict';

var reqTimer = require('../lib/req-timer');


Promise
.all([reqTimer(1000, 1000, null, null, null, 'http://www.baidu.com')])
.then(ret => {console.log(ret)})