const request = require('supertest');
const app = require('../src/app');

describe('Car API', () => {
  it('should get all cars', async () => {
    const response = await request(app).get('/cars');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThanOrEqual(0);
  });

  it('should create a new car model', async () => {
    const newCar = {
      name: 'New Car',
      model: 'Bmw',
      series: '8'
    };

    const response = await request(app)
      .post('/cars')
      .send(newCar);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(newcar.model);
    expect(response.body.birthdate).toBe(newcar.series);
    expect(response.body.nationality).toBe(newcar.origin);
  });

  it('should get an car by ID', async () => {
    const carId = 1;

    const response = await request(app).get(`/cars/${carId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', carId);
    expect(response.body).toHaveProperty('model');
    expect(response.body).toHaveProperty('series');
    expect(response.body).toHaveProperty('origin');
  });

  it('should update a car by ID with the full object', async () => {
    const updatedAuthor = {
      id: 1,
      model: 'Updated Car Name',
      series: '2',
      origin: 'Updated Origin'
    };

    const response = await request(app)
      .put(`/cars/${updatedCar.id}`)
      .send(updatedAuthor);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(updatedAuthor);
  });

  it('should partially update an author by ID', async () => {
    const partialUpdate = {
      name: 'Partially Updated Name'
    };

    const response = await request(app)
      .patch('/cars/1')
      .send(partialUpdate);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
    expect(response.body.name).toBe(partialUpdate.name);
  });

  it('should delete an author by ID', async () => {
    // First, create a car to delete
    const newCar = {
      model: 'Author to Delete',
      series: '11',
      origin: 'Unknown'
    };

    const createResponse = await request(app)
      .post('/cars')
      .send(newCar);
    
    const carmodel = createResponse.body.id; // Get the ID of the created author

    // Delete the author
    const deleteResponse = await request(app)
      .delete(`/car/${carmodel}`);

    expect(deleteResponse.status).toBe(204);
    expect(deleteResponse.body).toEqual({}); // Ensure response body is empty

    // Verify that the author was actually deleted
    const getResponse = await request(app).get(`/car/${carmodel}`);
    expect(getResponse.status).toBe(404);
    expect(getResponse.text).toBe('Car not found');
  });

  it('should return 404 when deleting a car ID that does not exist', async () => {
    const response = await request(app)
      .delete('/car/999');
    
    expect(response.status).toBe(404);
    expect(response.text).toBe('Author not found');
  });

  it('should return 404 for a car ID that does not exist', async () => {
    const response = await request(app).get('/authors/999');
    expect(response.status).toBe(404);
    expect(response.text).toBe('Author not found');
  });

  it('should return 404 when updating a car ID that does not exist', async () => {
    const updatedAuthor = {
      Model: 'Updated Car',
      series: '1',
      origin: 'Updated Origin'
    };

    const response = await request(app)
      .put('/car/999')
      .send(updatedAuthor);

    expect(response.status).toBe(404);
    expect(response.text).toBe('Author not found');
  });

  it('should return 404 when partially updating a non-existent author ID', async () => {
    const partialUpdate = {
      name: 'Partially Updated Name'
    };

    const response = await request(app)
      .patch('/car/999')
      .send(partialUpdate);

    expect(response.status).toBe(404);
    expect(response.text).toBe('Car not found');
  });
});