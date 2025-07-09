const _ = {
	getSleep: (url) => {
		return url
			?.split('?')
			?.pop()
			?.split('#')
			?.shift()
			?.split('&')
			?.filter((x) => x.startsWith('sleep'))
			?.pop()
			?.split('=')
			?.pop();
	},

	getStatus: (url) => {
		const status = url
			?.split('?')
			?.shift()
			?.split('#')
			?.shift()
			?.split('/')[1]
			?.match(/(?<status>\d{3})/)?.groups?.status;
		return Number(status || 0);
	},

	wait: (url) => {
		const sleep = _.getSleep(url);
		return new Promise((resolve) => {
			setTimeout(
				() => {
					resolve();
				},
				sleep ? Math.min(sleep * 1000, 30000) : 0,
			);
		});
	},

	response: (method, url) => {
		const res = {
			method: method,
			url: url,
			requestedSleep: `${_.getSleep(url)} seconds`,
			maxSleep: '30 seconds',
			requestedStatus: _.getStatus(url),
		};
		return JSON.stringify(res, 2, '\t');
	},
};

module.exports = _;
