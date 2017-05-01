'use strict';

const HELP_ARG      = /\|[\-h|\-\-help]+\|/;
const NUMBER_ARG    = /\|[\-n|\-\-number]+\|+(\d*)+(\|)/;
const TIMES_ARG     = /\|[\-t|\-\-times]+\|+(\d*)+(\|)/;
const BODY_ARG   = /\|[\-b|\-\-body]+\|+(\S*)+(\|)/;
const METHOD_ARG = /\|[\-m|\-\-method]+\|+(\S*)+(\|)/;
const HEADER_ARG = /\|[\-h|\-\-headers]+\|+(\S*)+(\|)/;
const URL_ARG       = /\|(http\S*)/;
var color           = require('color');

module.exports = formatArg;

/*
* Format process.arg to a json, like {n: 1000, t: 100} 
* And filter '-h' from arg;
* @param 
* @return {Object} result
*/

function  formatArg () {

	var result = {
		n: 0,     // number
		t: 0,     // request time
		b: '',    // request param
		m: 'get', // request type
		h: {}     // headers,
		url: ''   // url
	};
	var argsStr = process.argv.join('|');

	if(!filterHelpArg(argsStr)){return result;}

	result.n   = NUMBER_ARG.exec(argsStr)[1];
	result.t   = TIMES_ARG.exec(argsStr)[1];
	result.b   = BODY_ARG.exec(argsStr)[1];
	result.m   = METHOD_ARG.exec(argsStr)[1];
	result.h   = HEADER_ARG.exec(argsStr)[1];
	result.h   = HEADER_ARG.exec(argsStr)[1];
	result.url = URL_ARG.exec(argsStr)[1];

	// headers转json
	try{
		result.h = json.parse(result.h)
	}catch(e){}
	
	return result;
}

/*
*find '-h' or '--help'
*/

function filterHelpArg(str){
	if(HELP_ARG.test(str)){
		console.log(` [url]
			useage: reqTimer [-n <number>] [-t <times>] [-b <body>] [-m <method>]  [-h <headers>] [url]
			-n,     --number      request number
			-t,     --times       request time
			-b,     --body        requesy body
			-m,     --method      request method
			-h,     --headers     request headers
		`.green)
		return false;
	}
	return true;
}