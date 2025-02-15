import EventBus from "../../utils/EventBus/EventBus";
import { WSTransportEvents } from "../../enums/WSTransportEvents";

export class WSTransport extends EventBus {
  private _url: string;
  private _socket: WebSocket | null;
  private _pingIntervalTime = 3000;
  private _pingInterval?: ReturnType<typeof setInterval>;

  constructor(url: string) {
    super();
    this._url = url;
    this._socket = null;
  }

  public connect(): Promise<void> {
    if (this._socket) {
      throw new Error("Сокет уже открыт");
    }

    this._socket = new WebSocket(this._url);
    this._subscribe(this._socket);
    this._setupPing();
    return new Promise((resolve, reject) => {
      this.on(WSTransportEvents.Error, reject);
      this.on(WSTransportEvents.Connected, () => {
        this.off(WSTransportEvents.Error, reject);
        resolve();
      });
    });
  }

  public send(data: string | number | object) {
    if (!this._socket) {
      throw new Error("Нет открытого сокета");
    }
    this._socket.send(JSON.stringify(data));
  }

  public close() {
    this._socket?.close();
    clearInterval(this._pingInterval);
  }

  private _setupPing() {
    this._pingInterval = setInterval(() => {
      this.send({ type: "ping" });
    }, this._pingIntervalTime);

    this.on(WSTransportEvents.Close, () => {
      clearInterval(this._pingInterval);
      this._pingInterval = undefined;
    });
  }

  private _subscribe(socket: WebSocket) {
    socket.addEventListener("open", () => {
      this.emit(WSTransportEvents.Connected);
    });

    socket.addEventListener("close", () => {
      this.emit(WSTransportEvents.Close);
    });

    socket.addEventListener("error", (event) => {
      this.emit(WSTransportEvents.Error, event);
    });

    socket.addEventListener("message", (message) => {
      try {
        const data = JSON.parse(message.data);
        if (
          data.type &&
          (data.type === "pong" || data.type === "user connected")
        ) {
          return;
        }
        this.emit(WSTransportEvents.Message, data);
      } catch (error) {
        console.log(error);
      }
    });
  }
}
