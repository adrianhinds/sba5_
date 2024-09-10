const request = require('supertest');
const app = require('../src/app');

describe('Car API', () => {
  it('should get all cars', async () => {
    const response = await request(app).get('/cars');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThanOrEqual(0);
  });

  it('should create a new car', async () => {
    const newCar = {
      Model: 'New Car',
      series: 2,
      origin: 'Germany',
    
    };

    const response = await request(app)
	  .post('/cars')
	  .send(newCar);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe(newcar.model);
    expect(response.body.authorId).toBe(newcar.series);
    expect(response.body.publisherId).toBe(newcar.origin);
    expect(response.body.publishedDate).toBe(newcar.location);
    expect(response.body.genre).toBe(newcar.manufacturer);
  });

  it('should get a book by ID', async () => {
    const carId = 1;

    const response = await request(app).get(`/cars/${carId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', carId);
    expect(response.body).toHaveProperty('model');
  });

  it('should update a car by ID with the full object', async () => {
    const updatedCar = {
      id: 1,
      model: 'Updated Car Model',
      series: 1,
      origin: 'America',
      transmission: 'Manual'
    };

    const response = await request(app)
	  .put('/cars/1')
	  .send(updatedCar);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(updatedCar);
  });

  it('should partially update a car by ID', async () => {
    const partialUpdate = {
      car: 'Partially Updated Car'
    };

    const response = await request(app)
	  .patch('/cars/1')
	  .send(partialUpdate);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
    expect(response.body.series).toBe(partialUpdate.series);
  });

  it('should delete a car by ID', async () => {
    // First, create a car to delete
    const newCar = {
      Model: 'Car to Delete',
      series: 2,
      origin: 'America',
      transmission: 'Manual'
    };

    const createResponse = await request(app)
	  .post('/cars')
	  .send(newCar);
    
    const carId = createResponse.body.id; // Get the ID of the created car

    // Delete the car
    const deleteResponse = await request(app)
	  .delete(`/cars/${carId}`);

    expect(deleteResponse.status).toBe(204);
    expect(deleteResponse.body).toEqual({}); // Ensure response body is empty

    // Verify that the car was actually deleted
    const getResponse = await request(app).get(`/cars/${carId}`);
    expect(getResponse.status).toBe(404);
    expect(getResponse.text).toBe('car not found');
  });

  it('should return 404 when deleting a non-existent car ID', async () => {
    const response = await request(app)
	  .delete('/cars/999');
    
    expect(response.status).toBe(404);
    expect(response.text).toBe('car not found');
  });

  it('should return 404 for a non-existent car ID', async () => {
    const response = await request(app).get('/cars/999');
    expect(response.status).toBe(404);
    expect(response.text).toBe('car not found');
  });

  it('should return 404 when updating a non-existent car ID', async () => {
    const updatedCar = {
      Car: 'Updated Car'
    };

    const response = await request(app)
	  .put('/cars/999')
	  .send(updatedCar);

    expect(response.status).toBe(404);
    expect(response.text).toBe('car not found');
  });
  
  it('should filter cars by model', async () => {
    const newCar = {
      model: 'New car',
      series: 2,
      origin: 'Japan',
      transmission: 'Automatic'
    };

    await request(app)
      .post('/cars')
      .send(newCar);

    const transmission = 'Automatic';

    const response = await request(app).get(`/cars?model=${model}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThanOrEqual(1);

    const filteredCars = response.body;
    filteredCars.forEach(car => {
      expect(car.model).toBe(model);
    });
  });
});