import moment from 'moment';

const secondsInADay = 60*60*25;

function createDb() {
	return {
		getDayLists() {
			if(!this.data || !this.data.list)
				throw new Error('No data has been loaded');
			var lists = [];
			var day;
			var dayList;
			var dayCount = 0;
			do {
				day = moment((this.data.list[0].dt + dayCount * secondsInADay) * 1000).format('dddd');
				dayList = this.data.filter(datum => {
					return day === moment(datum.dt*1000).format('dddd');
				});
				if(dayList.length)
					lists.push(dayList);
			} while(dayList.length);
			return new Promise((resolve, reject) => {
				resolve(lists);
			});
		}
	}
};