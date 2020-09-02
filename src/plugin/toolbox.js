const ezDing = function(){
	let getWinSize = () => {
		let documentElement = document.documentElement;
		let body = document.getElementsByTagName('body')[0];
		let width = window.innerWidth || documentElement.clientWidth || body.clientWidth;
		let height = window.innerHeight || documentElement.clientHeight || body.clientHeight;
		return [width, height];
	}

	return{
		getWinSize: getWinSize
	}
}();

module.exports = ezDing;