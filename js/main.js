"use strict";

/*
	Wartości według założeń zadania:
	currentData - 10 czerwca
	daysInMonth -  maksymalna ilość dni w czerwcu to 30
*/

var settings = {
	currentData: 10,
	daysInMonth: 30,
	singleDayValue: function singleDayValue() {
		return 100 / this.daysInMonth;
	}
};

function loadJSON(callback) {
	var xhr = new XMLHttpRequest();
	xhr.overrideMimeType("application/json");
	xhr.open('GET', './data/data.json', true);
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == "200") {
			renderData(xhr.responseText);
		}
	};
	xhr.send(null);
}

function renderData(data) {
	var json = JSON.parse(data);
	var range = document.querySelector('.range');
	var currentData = settings.currentData;
	var html = '<div class="range-inner"></div>';
	html += json.map(function (item) {
		var rightDateFormat = item.data.replace(/\//ig, '.');
		var day = rightDateFormat.substring(0, 2);
		var position = (day * settings.singleDayValue()).toFixed(2) + '%';
		var positionOnRange = 0;
		if (position === '100.00%') {
			positionOnRange = 'auto; right: -1px';
		} else if (day === '01') {
			positionOnRange = '-1px';
		} else {
			positionOnRange = position;
		}
		// const positionOnRange = position !== '100.00%' ? position : 'auto; right: -1px';
		return "\n\t\t\t\t<span class=\"point point-" + item.ikona + " " + (currentData >= Number(day) ? 'active' : '') + "\" data-percent=\"" + position + "\" style=\"left: " + positionOnRange + "\">\n\t\t\t\t\t<i class=\"fa " + item.ikona + " \" ari;a-hidden=\"true\"></i>\n\t\t\t\t\t<span class=\"tooltip-area\">\n\t\t\t\t\t\t<span class=\"tooltip-date\">\n\t\t\t\t\t\t\t" + rightDateFormat + "\n\t\t\t\t\t\t</span>\n\t\t\t\t\t\t<span class=\"tooltip-text\">\n\t\t\t\t\t\t\t" + (item.nazwa.length > 21 ? item.nazwa.substring(0, 21) + "..." : item.nazwa) + "\n\t\t\t\t\t\t</span>\n\t\t\t\t\t</span>\n\t\t\t\t</span>\n\t\t\t";
	}).join('');
	range.innerHTML = html;
	startBlueRange(currentData);
}

function startBlueRange(currentData) {
	var rangeInner = document.querySelector('.range-inner');
	setTimeout(function () {
		rangeInner.style.width = (currentData * settings.singleDayValue()).toFixed(2) + '%';
	}, 0);
}

function init() {
	loadJSON();
}

window.onload = init;