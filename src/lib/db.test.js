import createDb from './db';
import createDbWithMocks from './createDbWithMocks.test.js';


it('setLocation', () => {
	const db = createDb();

	db.location = 'some location';
	db.data = 'some data';

	db.setLocation('a different location');
	expect(db.data).toEqual(null);
});

it('getData', async () => {
	const db = createDbWithMocks({ loc1: 'data1' });

	try {
		await db.getData();
	} catch(err) {
		expect(err).toEqual("The location hasn't been set");
	}

	db.data = 'data0';
	const data0 = await db.getData();
	expect(data0).toEqual('data0');

	db.setLocation('loc1');
	const data1 = await db.getData();
	expect(data1).toEqual('data1');
	expect(db.data).toEqual('data1');
	
	db.setLocation('no location by this name');
	try {
		await db.getData();
	} catch(err) {
		expect(err).toEqual('No such location: no location by this name');
	}
	expect(db.data).toEqual(null);
});

it('getDayLists', async () => {
	const db = createDbWithMocks({ loc1:
		{ list: [
			{ dt: 1479600000 },
			{ dt: 1479610800 },
			{ dt: 1479686400 },
		]}
	});

	db.setLocation('no location by this name');
	try {
		await db.getDayLists();
	} catch(err) {
		expect(err).toEqual('No such location: no location by this name');
	}

	db.setLocation('loc1');
	const lists = await db.getDayLists();

	console.log(lists);
	expect(lists.length).toEqual(2);

	expect(lists[0].length).toEqual(2);
	expect(lists[0][0].dt).toEqual(1479600000);
	expect(lists[0][1].dt).toEqual(1479610800);

	expect(lists[1].length).toEqual(1);
	expect(lists[1][0].dt).toEqual(1479686400);
});