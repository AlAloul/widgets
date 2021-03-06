var _args = arguments[0] || {};

var COLOR_DISABLED = "#CCC";
var COLOR_ENABLED = "#999";

var MIN_NAVBAR_HEIGHT = 40;
var NAVBAR_OFFSET = (OS_IOS && parseInt(Ti.Platform.version.split(".")[0], 10) >=7) ? 20 : 0;

$.header.height = MIN_NAVBAR_HEIGHT+NAVBAR_OFFSET;

/**
 * Callback function place holders
 */
var onCloseCallback = _args.onClose || null;
var onLoadCallback 	= _args.onload || null;
var onErrorCallback = _args.onerror || null;
var onBeforeLoadCallback = _args.onbeforeload || null;

/**
 * Expose Browser navigation functions
 */
exports.goBack = $.webView.goBack;
exports.goForward = $.webView.goForward;
exports.canGoBack = $.webView.canGoBack;
exports.canGoForward = $.webView.canGoForward;


exports.setHtml = function setHTML(_html){
	$.webView.html = _html;
};
exports.getHTML = function getHTML(){
	return $.webView.html;
};

exports.setURL = function setURL(_url){
	$.webView.url = _url;
};

exports.getURL = function getURL(){
	return $.webView.url;
};

/**
 * Sets onClose event callback
 */
exports.onClose = function(f){
	onCloseCallback = f;
};

/**
 * Sets onError event callback
 */
exports.onError = function(f){
	onErrorCallback = f;
};

/**
 * Sets onLoad event callback
 */
exports.onLoad = function(f){
	onLoad = f;
};

/**
 * Sets onBeforeLoadCallback event callback
 */
exports.onBeforeLoadCallback = function(f){
	onBeforeLoadCallback = f;
};

/**
 * Click event on Back Button
 */
$.backBtn.addEventListener('click', function(e){
	$.webView.goBack();
});

$.forwardBtn.addEventListener('click', function(e){
	$.webView.goForward();
});

$.closeBtn.addEventListener('click', function(e){
	Ti.API.debug('ON CLOSE');
	
	$.webView.stopLoading();
	
	onCloseCallback && onCloseCallback(e);
});

/**
 * Browser Event Listener - load
 * Fired when browser has completed laoding the webpage
 */
$.webView.addEventListener('load', function(e){
	Ti.API.debug('ON LOAD');
	/**
	 * Update navigation UI
	 */
	$.webView.canGoBack() && $.backBtn.setColor(COLOR_ENABLED) || $.backBtn.setColor(COLOR_DISABLED);
	$.webView.canGoForward() && $.forwardBtn.setColor(COLOR_ENABLED) || $.forwardBtn.setColor(COLOR_DISABLED);
	
	/**
	 * Set the Title of the Website
	 */
	$.title.text = $.webView.evalJS('document.title');
	
	onLoadCallback && (typeof(onLoadCallback) === "function") && onLoadCallback(e);
});

/**
 * Browser Event Listener - Error
 * Fired when there is an error loading the page
 */
$.webView.addEventListener('error', function(e){
	Ti.API.debug('ON ERROR');
	onErrorCallback && (typeof(onErrorCallback) === "function") && onErrorCallback(e);
});

/**
 * Browser Event Listener - beforeload
 * Fired right before the browser starts to load a new url. 
 * Can cancel the browser activity at this point
 */
$.webView.addEventListener('beforeload', function(e){
	Ti.API.debug('ON BEFORELOAD');
	/**
	 * Enable the Stop Button
	 */
	onBeforeLoadCallback && (typeof(onBeforeLoadCallback) === "function") && onBeforeLoadCallback(e);
});