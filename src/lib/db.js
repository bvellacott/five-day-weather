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

const secondsInADay = 60*60*25;

function getWeatherUrl(location) {
	var coord = coordinates[location];
	if(!coord)
		throw new Error('No such location: ' + location);
	return urlTemplate.replace('{lat}', coord.lat).replace('{lon}', coord.lon) + 
		'&APPID=ef9d9ffffeae1c3288d5a9dee220f11c';
}

function createDb() {
	return {
		// exposed this method so that I can replace it when running tests
		_getWeatherData(location) {
			try {
				var url = getWeatherUrl(location);
			} catch(err) {
				return new Promise((resolve, reject) => { reject(err); });
			}
			return new Promise((resolve, reject) => {
				get(url, (err, data) => {
					if(err) { reject(err); }
					else { resolve(data); }
				});
			});
		},

		getData() {
			if(this.data)
				return new Promise((resolve) => { resolve(this.data); });
			if(!this.location)
				return new Promise((resolve, reject) => { reject("The location hasn't been set"); });
			return this._getWeatherData(this.location)
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
			return this.getData().then((data, err) => {
				if(err)
					return new Promise((resolve, reject) => { reject(err); });

				var lists = [];
				var day;
				var dayList;
				var dayCount = 0;

				// Sort the list of weather data into batches by day -> lists
				const byDayName = datum => { return day === moment(datum.dt*1000).format('dddd'); }
				do {
					day = moment((data.list[0].dt + dayCount * secondsInADay) * 1000).format('dddd');
					dayList = data.list.filter(byDayName);
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