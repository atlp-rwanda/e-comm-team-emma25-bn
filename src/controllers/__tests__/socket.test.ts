import { createServer } from "http";
import { Server } from "socket.io";
import Client from "socket.io-client";

describe("Chat Testing", () => {
  let io, serverSocket, clientSocket;

  beforeAll((done) => {
    const httpServer = createServer();
    io = new Server(httpServer);
    jest.setTimeout(120000);
    httpServer.listen(() => {
      const port = (httpServer as any).address().port;
      clientSocket = Client(`http://localhost:${port}`);
      io.on("connection", (socket) => {
        serverSocket = socket;
      });
      clientSocket.on("connect", done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  test("Listening on hello event from server", (done) => {
    clientSocket.on("hello", (arg) => {
      expect(arg).toBe("world");
      done();
    });
    serverSocket.emit("hello", "world");
  });

  test("listening on event emitted from client", (done) => {
    serverSocket.on("hi", (cb) => {
      cb("hola");
    });
    clientSocket.emit("hi", (arg) => {
      expect(arg).toBe("hola");
      done();
    });
  });
});