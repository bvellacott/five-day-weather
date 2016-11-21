import createDb from './db';

it('declaring the mock dependency createDbWithMocks for testing', () => {
	expect(true).toEqual(true);
})

export default function createDbWithMocks(mocks) {
	const db = createDb();

	db._getWeatherData = function(location) {
		var data = mocks[location];
		if(data)
			return new Promise(resolve => { resolve(data); });
		return new Promise((resolve, reject) => { reject('No such location: ' + location); });
	};

	db.getLocations = function() { return Object.keys(mocks); };

	return db;
}