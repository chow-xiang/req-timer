### what's this
-
It's a very simple stress testing tools forwebsite.
**Note: updating!**

usage:

    var reqTimer = require('../lib/req-timer');
    new reqTimer(20000, 1000, null, null, null, 'http://www.baidu.com')
    .then(ret => {
    	console.log(ret);
    })

also:

    npm install reqTimer -g
    
    reqTimer -n 1000 -t 100 http://www.baidu.com
    
    
