/*
	TMS.js
	Because I don't want to deal with jQuery anymore!

	Original source: http://youmightnotneedjquery.com/
*/
const TMS = {};
//
TMS['logWarnings'] = false;
/*
	Warn if something goes wrong
*/
TMS['warn'] = function(warnText){
	if (TMS.logWarnings === true){
		console.warn(warnText);
	};
};
/*
	CSS
*/
TMS['css'] = function(elementId, cssChanges){
	var canStart = true, eReason = '';
	const elId = document.getElementById(elementId);
	if (elId === null){
		canStart = false;
		eReason = eReason + '\nDOM does not exist! (' + elementId + ')';
	};
	if (typeof cssChanges !== 'object'){
		canStart = false;
		eReason = eReason + '\nYou must insert an object for CSS data (Current type: ' + typeof cssChanges + ')';
	};
	// End
	if (canStart === true){
		Object.keys(cssChanges).forEach(function(cItem){
			elId.style[cItem] = cssChanges[cItem];
		});
	} else {
		TMS.warn('TMS - Unable to apply CSS data!' + eReason);
	};
};
/*
	animate
	
	elementId     = HTML DOM id
	cssChanges    = Object {width: x, height, y}
	animationTime = Number (Min: 0)
	animationEase = CSS for transition option, like cubic-bezier
*/
TMS['animate'] = function(elementId, cssChanges, animationTime, animationEase){
	var canStart = true, eReason = '', transitionString = '';
	const elId = document.getElementById(elementId);
	if (elId === null){
		canStart = false;
		eReason = eReason + '\nDOM does not exist! (' + elementId + ')';
	};
	if (typeof cssChanges !== 'object'){
		canStart = false;
		eReason = eReason + '\nYou must insert an object for CSS data (Current type: ' + typeof cssChanges + ')';
	};
	if (typeof animationTime !== 'number'){
		canStart = false;
		eReason = eReason + '\nYou must insert a number on animation time (Current type: ' + typeof animationTime + ')';
	};
	// End
	if (canStart === true){
		if (animationEase === undefined){
			animationEase = '';
		};
		if (animationTime < 0){
			animationTime = 0;
		};
		Object.keys(cssChanges).forEach(function(cItem){
			elId.style[cItem] = cssChanges[cItem];
			transitionString = transitionString + cItem + ' ' + (animationTime / 1000) + 's ';
			elId.style['transition'] = transitionString + animationEase;
		});
		setTimeout(function(){
			elId.style['transition'] = 'none 0s';
		}, (animationTime + 1));
	} else {
		TMS.warn('TMS - Unable to animate!' + eReason);
	};
};
/*
	Focus Element
	sTimeout = time [ms]
*/
TMS['focus'] = function(elementId, sTimeout){
	const elId = document.getElementById(elementId);
	if (elId !== null){
		if (sTimeout !== undefined && parseInt(sTimeout) !== NaN){
			setTimeout(function(){
				elId.focus();
			}, sTimeout);
		} else {
			elId.focus();
		};
	} else {
		TMS.warn('TMS - Unable to focus element because it does not exist! (' + elementId + ')');
	};
};
/*
	Disable Element
*/
TMS['disableElement'] = function(elementId){
	const elId = document.getElementById(elementId);
	if (elId !== null){
		elId.disabled = 'disabled';
		// If is <input>
		if (elId.type === 'button'){
			TMS.css(elementId, {'filter': 'grayscale(1) blur(0.8px)', 'cursor': 'not-allowed', 'opacity': '0.6'});
		};
	} else {
		TMS.warn('TMS - Unable to disable element because it does not exist! (' + elementId + ')');
	};
};
/*
	Enable Element
*/
TMS['enableElement'] = function(elementId){
	const elId = document.getElementById(elementId);
	if (elId !== null){
		elId.disabled = '';
		// If is <input>
		if (elId.type === 'button'){
			TMS.css(elementId, {'filter': 'grayscale(0) blur(0px)', 'cursor': 'pointer', 'opacity': '1'});
		};
	} else {
		TMS.warn('TMS - Unable to enable element because it does not exist! (' + elementId + ')');
	};
};
/*
	Scroll top
	Usage: elementObjects = {HTML_DOM_ID_0: scrollInt, HTML_DOM_ID_1: scrollInt2} and goes on
*/
TMS['scrollTop'] = function(elementObjects){
	Object.keys(elementObjects).forEach(function(cItem){
		const elId = document.getElementById(cItem);
		if (elId !== null){
			elId.scrollTop = elementObjects[cItem];
		} else {
			TMS.warn('TMS - Unable to scroll element because it does not exist! (' + elementId + ')');
		};
	});
};
/*
	Append data
*/
TMS['append'] = function(elementId, newData){
	const elId = document.getElementById(elementId);
	if (elId !== null){
		var pHTML = elId.innerHTML;
		elId.innerHTML = pHTML + newData;
	} else {
		TMS.warn('TMS - Unable to append element data because parent DOM does not exist! (' + elementId + ')');
	};
};
/*
	Add Class
*/
TMS['addClass'] = function(elementId, className){
	const elId = document.getElementById(elementId);
	if (elId !== null){
		elId.classList.add(className);
	} else {
		TMS.warn('TMS - Unable to add class because DOM does not exist! (' + elementId + ')');
	};
};
/*
	Add Class
*/
TMS['removeClass'] = function(elementId, className){
	const elId = document.getElementById(elementId);
	if (elId !== null){
		elId.classList.remove(className);
	} else {
		TMS.warn('TMS - Unable to remove class because DOM does not exist! (' + elementId + ')');
	};
};
/*
	Clear
	Removes all HTML inside
*/
TMS['clear'] = function(elementId){
	const elId = document.getElementById(elementId);
	if (elId !== null){
		elId.innerHTML = '';
	} else {
		TMS.warn('TMS - Unable to clear inner data because DOM does not exist! (' + elementId + ')');
	};
};
/*
	triggerClick
*/
TMS['triggerClick'] = function(elementId){
	const elId = document.getElementById(elementId);
	if (elId !== null){
		elId.click();
	} else {
		TMS.warn('TMS - Unable to clear inner data because DOM does not exist! (' + elementId + ')');
	};
};
/*
	fadeIn
*/
TMS['fadeIn'] = function(elementId, animationTime){
	const elId = document.getElementById(elementId), tagType = {
		'DIV': 'block',
		'IMG': 'inline'
	};
	if (elId !== null){
		var dTime = 1000, dMode = 'block', finalOpacity = 1, eStyles = getComputedStyle(elId);
		if (animationTime !== undefined && animationTime !== NaN){
			dTime = parseInt(animationTime);
			if (dTime < 0){
				dTime = 1;
			};
		};
		if (tagType[elId.tagType] !== undefined){
			dMode = tagType[elId.tagType];
		};
		if (eStyles.opacity !== ''){
			finalOpacity = eStyles.opacity;
		};
		TMS.css(elementId, {'display': dMode, 'opacity': finalOpacity, 'transition': 'opacity ' + dTime + 'ms'});
		setTimeout(function(){
			TMS.css(elementId, {'transition': 'none'});
		}, (dTime + 1));
	} else {
		TMS.warn('TMS - Unable to fade in because DOM does not exist! (' + elementId + ')');
	};
};
/*
	fadeOut
*/
TMS['fadeOut'] = function(elementId, animationTime){
	const elId = document.getElementById(elementId);
	if (elId !== null){
		var dTime = 1000;
		if (animationTime !== undefined && animationTime !== NaN){
			dTime = parseInt(animationTime);
			if (dTime < 0){
				dTime = 1;
			};
		};
		TMS.css(elementId, {'opacity': '0', 'transition': 'opacity ' + dTime + 'ms'});
		setTimeout(function(){
			TMS.css(elementId, {'transition': 'none', 'display': 'none'});
		}, (dTime + 1));
	} else {
		TMS.warn('TMS - Unable to fade out because DOM does not exist! (' + elementId + ')');
	};
};
/*
	scrollCenter
*/
TMS['scrollCenter'] = function(elementId){
	const elId = document.getElementById(elementId);
	if (elId !== null){
		var parentDom = elId.parentElement,
			parentHeight = parentDom.offsetHeight;
		parentDom.scrollTo(0, (elId.offsetTop - (parentHeight / 2)))
	} else {
		TMS.warn('TMS - Unable to fade out because DOM does not exist! (' + elementId + ')');
	};
};