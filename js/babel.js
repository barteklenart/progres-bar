"use strict"
	
	/*
		Wartości według założeń zadania:
		currentData - 10 czerwca
		daysInMonth -  maksymalna ilość dni w czerwcu to 30
	*/

	var settings = {
		currentData: 10,
		daysInMonth: 30,
		singleDayValue: function() {
			return (100 / this.daysInMonth );
		}
	}


	function loadJSON() {   
		const xhr = new XMLHttpRequest();
		xhr.overrideMimeType("application/json");
		xhr.open('GET', './data/data.json', true); 
		xhr.onreadystatechange = function () {
		      if (xhr.readyState == 4 && xhr.status == "200") {
		        renderData(xhr.responseText);
		      }
		};
		xhr.send(null);  
	}
	
	function renderData(data){
		const json = JSON.parse(data);
		const range = document.querySelector('.range');
		const currentData = settings.currentData; 
		let html = '<div class="range-inner"></div>';
		html += json.map( (item) => {
			const rightDateFormat = item.data.replace(/\//ig, '.');
			const day = rightDateFormat.substring(0,2);
			if(day == '-0' || day > settings.daysInMonth){
				return;
			}
			const position = (day * settings.singleDayValue()).toFixed(2) + '%';
			let positionOnRange = 0;
			if(position === '100.00%') {
				positionOnRange = 'auto; right: -1px';
			} else if (day === '01') {
				positionOnRange = '-1px';
			} else {
				positionOnRange = position;	
			}
			// const positionOnRange = position !== '100.00%' ? position : 'auto; right: -1px';
			return `
				<span class="point point-${item.ikona} ${ currentData >= Number(day) ? 'active' : '' }" data-percent="${position}" style="left: ${positionOnRange}">
					<i class="fa ${item.ikona} " ari;a-hidden="true"></i>
					<span class="tooltip-area">
						<span class="tooltip-date">
							${rightDateFormat}
						</span>
						<span class="tooltip-text">
							${ item.nazwa.length > 21 ? (item.nazwa.substring(0,21) + "...") : item.nazwa}
						</span>
					</span>
				</span>
			`
		}).join('');
		range.innerHTML = html;
		startBlueRange(currentData);
	}

	function startBlueRange(currentData){
		const rangeInner = document.querySelector('.range-inner');
		setTimeout(function(){
			rangeInner.style.width = (currentData * settings.singleDayValue()).toFixed(2) + '%';
		}, 0)
	}

	function init() {
		loadJSON();
	}

window.onload = init;
