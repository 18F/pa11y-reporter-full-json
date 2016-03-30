'use strict';

module.exports = {
	begin: emptyFunction,
	error: reportError,
	debug: emptyFunction,
	info: emptyFunction,
	results: reportResults
};

function emptyFunction () {}

function reportError (message) {
	console.error(message);
}

function reportResults (results, url) {
	var output = {
    url: url,
		isPerfect: (results.length === 0),
		count: {
			total: results.length,
			error: results.filter(buildTypeFilter('error')).length,
			warning: results.filter(buildTypeFilter('warning')).length,
			notice: results.filter(buildTypeFilter('notice')).length
		},
		results: results.map(toLegacyResult)
	};
	console.log(JSON.stringify(output));
}

function buildTypeFilter (type) {
	return function (result) {
		return (result.type === type);
	};
}

function toLegacyResult (result) {
	return {
		code: result.code,
		message: result.message,
		type: result.type,
		html: result.context
	};
}
