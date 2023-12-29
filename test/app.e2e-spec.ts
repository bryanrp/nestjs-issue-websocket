import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { io, Socket } from 'socket.io-client';
import { AppModule } from './../src/app.module';

describe('e2e', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.listen(3000);
  });

  describe('/ namespace', () => {
    let socket: Socket;

    beforeEach((done) => {
      socket = io('http://localhost:3000');
      socket.on('connect', () => done());
    });

    describe('test', () => {
      it('should return true', async () => {
        const response = await socket.emitWithAck('test');
        expect(response).toBe(true);
      });
    });

    describe('server', () => {
      it('should return true', async () => {
        const response = await socket.emitWithAck('server');
        expect(response).toBe(true);
      });
    });

    afterEach(() => {
      socket.disconnect();
    });
  });

  describe('/foo namespace', () => {
    let socket: Socket;

    beforeEach((done) => {
      socket = io('http://localhost:3000/foo');
      socket.on('connect', () => done());
    });

    describe('test', () => {
      it('should return true', async () => {
        const response = await socket.emitWithAck('test');
        expect(response).toBe(true);
      });
    });

    describe('server', () => {
      it('should return true', async () => {
        const response = await socket.emitWithAck('server');
        expect(response).toBe(true);
      });
    });

    afterEach(() => {
      socket.disconnect();
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
