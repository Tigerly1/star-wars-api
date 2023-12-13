import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';

describe('FilmModule (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/graphql (POST) - fetch films', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: '{ films {url} }', 
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.films).toBeInstanceOf(Array);
      });
  });

  it('/graphql (POST) - fetch film by id', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: '{film(id: 2) {url}}', 
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.film).toBeInstanceOf(Object);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
