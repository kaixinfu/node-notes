function fnFetchData (  ) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log('delay ===========>>>>>');
			resolve({name: 'delay'})
		}, 2000)
	})
}

module.exports = fnFetchData
