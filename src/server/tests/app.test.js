import '../config/env.config.js'; // workaround for ES imports being hoisted, to import the env file before other modules
import app from '../app.js';
import superTest from 'supertest';
import uuid from 'uuid';
const server = superTest(app);

let reviewID1, reviewID2, userID;
const userName = uuid.v4();

describe('Test POST /api/user endpoint', () => {
	test('Test POST /api/user with no body', async () => {
		const res = await server.post('/api/user');

		expect(res.status).toBe(406);
		expect(res.type).toBe('application/json');
		expect(res.body).toMatchObject({err:'Request body did not include required parameters'});
	});

	test('Test POST /api/user with invalid body', async () => {
		const res = await server.post('/api/user')
			.send({});

		expect(res.status).toBe(406);
		expect(res.type).toBe('application/json');
		expect(res.body).toMatchObject({err:'Request body did not include required parameters'});
	});

	test('Test POST /api/user with valid body', async () => {
		let res = await server.post('/api/user')
			.send({
				name: userName,
				avatar: 'base64'
			});

		expect(res.status).toBe(201);
		expect(res.type).toBe('application/json');
		expect(res.body.id).not.toBeUndefined();
		userID = res.body.id;
	});
});

describe('Test GET /api/user endpoint', () => {
	test('GET /api/user', async () => {
		const res = await server.get('/api/user');

		expect(res.status).toBe(200);
		expect(res.type).toBe('application/json');
	});
});

describe('Test GET /api/user/{id} endpoint', () => {
	test('GET /api/user/{id} with invalid id', async () => {
		const res = await server.get('/api/user/-1');

		expect(res.status).toBe(404);
	});

	test('GET /api/user/{id} with valid id', async () => {
		const res = await server.get(`/api/user/${userID}`);

		expect(res.status).toBe(200);
		expect(res.type).toBe('application/json');
	});
});

describe('Test POST /api/review endpoint', () => {
	test('POST /api/review with no body', async () => {
		const res = await server.post('/api/review');

		expect(res.status).toBe(406);
		expect(res.type).toBe('application/json');
		expect(res.body).toMatchObject({err:'Request body did not include required parameters'});
	});

	test('POST /api/review with invalid body', async () => {
		const res = await server.post('/api/review')
			.send({});

		expect(res.status).toBe(406);
		expect(res.type).toBe('application/json');
		expect(res.body).toMatchObject({err:'Request body did not include required parameters'});
	});

	test('POST /api/review with invalid user_id parameter', async () => {
		const res = await server.post('/api/review')
			.send({
				user_id: -1,
				title: 'Mediocre Service',
				content: 'Experience was sub par, nothing special.',
				rating: 3
			});

		expect(res.status).toBe(406);
		expect(res.type).toBe('application/json');
		expect(res.body).toMatchObject({err:'No Such User'});
	});

	test('POST /api/review with valid body', async () => {
		let res = await server.post('/api/review')
			.send({
				user_id: userID,
				title: '[TEST DATA] Mediocre Service',
				content: '[TEST DATA] Experience was sub par, nothing special.',
				rating: 3
			});

		expect(res.status).toBe(201);
		expect(res.type).toBe('application/json');
		expect(res.body.id).not.toBeUndefined();
		reviewID1 = res.body.id;

		if(reviewID1) {
			res = await server.post('/api/review')
				.send({
					user_id: userID,
					title: '[TEST DATA 2] Mediocre Service',
					content: '[TEST DATA 2] Experience was sub par, nothing special.',
					rating: 3
				});
			reviewID2 = res.body.id;
		}
	});
});

describe('Test GET /api/review endpoint', () => {
	test('GET /api/review', async () => {
		const res = await server.get('/api/review');

		expect(res.status).toBe(200);
		expect(res.type).toBe('application/json');
	});
});

describe('Test GET /api/review/{id} endpoint', () => {
	test('GET /api/review/{id} with invalid id', async () => {
		const res = await server.get('/api/review/-1');

		expect(res.status).toBe(404);
	});

	test('GET /api/review/{id} with valid id', async () => {
		const res = await server.get(`/api/review/${reviewID1}`);

		expect(res.status).toBe(200);
		expect(res.type).toBe('application/json');
	});
});

describe('Test DELETE /api/review/{id} endpoint', () => {
	test('DELETE /api/review/{id} with invalid id', async () => {
		const res = await server.delete('/api/review/-1');

		expect(res.status).toBe(404);
	});

	test('DELETE /api/review/{id} with valid id', async () => {
		let res = await server.delete(`/api/review/${reviewID1}`);

		expect(res.status).toBe(202);

		res = await server.get(`/api/review/${reviewID1}`);

		expect(res.status).toBe(404);
	});
});

describe('Test DELETE /api/user/{id} endpoint', () => {
	test('DELETE /api/user/{id} with invalid id', async () => {
		const res = await server.delete('/api/user/-1');

		expect(res.status).toBe(404);
	});

	test('DELETE /api/user/{id} with valid id', async () => {
		console.log(userID);
		console.log(reviewID2);
		let res = await server.delete(`/api/user/${userID}`);

		expect(res.status).toBe(202);

		res = await server.get(`/api/review/${reviewID2}`);

		expect(res.status).toBe(404);
	});
});
