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
    expect(response.body.name).toBe(newAuthor.name);
    expect(response.body.birthdate).toBe(newAuthor.birthdate);
    expect(response.body.nationality).toBe(newAuthor.nationality);
  });

  it('should get an author by ID', async () => {
    const authorId = 1;

    const response = await request(app).get(`/authors/${authorId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', authorId);
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('birthdate');
    expect(response.body).toHaveProperty('nationality');
  });

  it('should update an author by ID with the full object', async () => {
    const updatedAuthor = {
      id: 1,
      name: 'Updated Author Name',
      birthdate: '1980-01-01',
      nationality: 'Updated Nationality'
    };

    const response = await request(app)
      .put(`/authors/${updatedAuthor.id}`)
      .send(updatedAuthor);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(updatedAuthor);
  });

  it('should partially update an author by ID', async () => {
    const partialUpdate = {
      name: 'Partially Updated Name'
    };

    const response = await request(app)
      .patch('/authors/1')
      .send(partialUpdate);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
    expect(response.body.name).toBe(partialUpdate.name);
  });

  it('should delete an author by ID', async () => {
    // First, create an author to delete
    const newAuthor = {
      name: 'Author to Delete',
      birthdate: '1980-01-01',
      nationality: 'Unknown'
    };

    const createResponse = await request(app)
      .post('/authors')
      .send(newAuthor);
    
    const authorId = createResponse.body.id; // Get the ID of the created author

    // Delete the author
    const deleteResponse = await request(app)
      .delete(`/authors/${authorId}`);

    expect(deleteResponse.status).toBe(204);
    expect(deleteResponse.body).toEqual({}); // Ensure response body is empty

    // Verify that the author was actually deleted
    const getResponse = await request(app).get(`/authors/${authorId}`);
    expect(getResponse.status).toBe(404);
    expect(getResponse.text).toBe('Author not found');
  });

  it('should return 404 when deleting a non-existent author ID', async () => {
    const response = await request(app)
      .delete('/authors/999');
    
    expect(response.status).toBe(404);
    expect(response.text).toBe('Author not found');
  });

  it('should return 404 for a non-existent author ID', async () => {
    const response = await request(app).get('/authors/999');
    expect(response.status).toBe(404);
    expect(response.text).toBe('Author not found');
  });

  it('should return 404 when updating a non-existent author ID', async () => {
    const updatedAuthor = {
      name: 'Updated Name',
      birthdate: '1980-01-01',
      nationality: 'Updated Nationality'
    };

    const response = await request(app)
      .put('/authors/999')
      .send(updatedAuthor);

    expect(response.status).toBe(404);
    expect(response.text).toBe('Author not found');
  });

  it('should return 404 when partially updating a non-existent author ID', async () => {
    const partialUpdate = {
      name: 'Partially Updated Name'
    };

    const response = await request(app)
      .patch('/authors/999')
      .send(partialUpdate);

    expect(response.status).toBe(404);
    expect(response.text).toBe('Author not found');
  });
});