import moment from 'moment';
import get from 'jsonp';

const coordinates =  {
	'Aberdeen': {"lon":-2.09814, "lat":57.143688},
	'Cork': {"lon":-8.47061, "lat":51.897968},
	'Dublin': {"lon":-6.26719,"lat":53.34399},
	'Edinburgh': {"lon":-3.19648,"lat":55.952061},
	'Glasgow': {"lon":-4.25763,"lat":55.86515},
	'Leeds': {"lon":-1.54785,"lat":53.796478},
	'London': {"lon": -0.12574, "lat": 51.50853},
	'Londonderry County Borough': {"lon":-7.30917,"lat":54.997211},
	'Norwich': {"lon":1.29834,"lat":52.627831},
	'Plymouth': {"lon":-4.14305,"lat":50.371529},
};

const urlTemplate = 'http://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}';

function getWeatherUrl(location) {
	var coord = coordinates[location];
	return urlTemplate.replace('{lat}', coord.lat).replace('{lon}', coord.lon) + 
		'&APPID=ef9d9ffffeae1c3288d5a9dee220f11c';
}

function getWeatherData(location) {
	var url = getWeatherUrl(location);
	return new Promise((resolve, reject) => {
		get(url, (err, data) => {
			if(err) { reject(err); }
			else { resolve(data); }
		});
	});
}

const secondsInADay = 60*60*25;

function createDb() {
	return {
		getData() {
			if(this.data)
				return new Promise((resolve) => { resolve(this.data); });
			if(!this.location)
				return new Promise((resolve, reject) => { reject("The location hasnn't been set"); });
			return getWeatherData(this.location)
			.then((data, err) => {
				if(err) {
					return new Promise((resolve, reject) => { reject(err); });
				}
				this.data = data;
				return new Promise((resolve) => { resolve(data); });
			});
		},

		setLocation(location) {
			if(this.location === location)
				return;
			this.location = location;
			this.data = null;
		},

		getLocations() {
			return Object.keys(coordinates);
		},

		getDayLists() {
			var d = this.getData();
			return this.getData().then((data, err) => {
				if(err)
					return new Promise((resolve, reject) => { reject(err); });

				var lists = [];
				var day;
				var dayList;
				var dayCount = 0;
				do {
					day = moment((data.list[0].dt + dayCount * secondsInADay) * 1000).format('dddd');
					dayList = data.list.filter(datum => {
						return day === moment(datum.dt*1000).format('dddd');
					});
					if(dayList.length)
						lists.push(dayList);
					dayCount++;
				} while(dayList.length);
				return new Promise((resolve) => { resolve(lists); });
			});
		},

	}
};

export default createDb;