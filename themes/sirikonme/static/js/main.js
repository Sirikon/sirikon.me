'use strict';

var intentConfig = {
	width: 600,
	height: 350
};

function getIntentTop() {
	return (screen.height - intentConfig.height) / 4;
}

function getIntentLeft() {
	return (screen.width - intentConfig.width) / 2;
}

function buildTwitterIntentUrl(text, url) {
	return "https://twitter.com/intent/tweet?text=" + text + "&url=" + url + "&via=sirikon";
}

function buildFacebookIntentUrl(url) {
	return "https://www.facebook.com/sharer/sharer.php?u=" + url + "&display=popup";
}

function buildIntentConfig() {
	return "width=" + intentConfig.width +
			",height=" + intentConfig.height +
			",location=no,menubar=no,status=no,top=" + getIntentTop() +
			",left=" + getIntentLeft();
}

function twitterIntent(text, url) {
	window.open(buildTwitterIntentUrl(text, url), "", buildIntentConfig());
}

function facebookIntent(url) {
	window.open(buildFacebookIntentUrl(url), "", buildIntentConfig());
}

function onTwitterIntentClick() {
	var text = this.getAttribute('data-twitter-intent');
	var url = this.getAttribute('data-twitter-intent-url');
	twitterIntent(text, url);
}

function onFacebookIntentClick() {
	var url = this.getAttribute('data-facebook-intent');
	facebookIntent(url);
}

function bindEvents() {
	var twitterIntentElements = document.querySelectorAll('[data-twitter-intent]');
	for(var i = 0; i < twitterIntentElements.length; i++) {
		var element = twitterIntentElements[i];
		element.addEventListener('click', onTwitterIntentClick);
	}

	var facebookIntentElements = document.querySelectorAll('[data-facebook-intent]');
	for(var i = 0; i < facebookIntentElements.length; i++) {
		var element = facebookIntentElements[i];
		element.addEventListener('click', onFacebookIntentClick);
	}
}

function initialize() {
	bindEvents();
}

initialize();
