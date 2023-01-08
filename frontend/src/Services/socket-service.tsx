import { io, Socket } from "socket.io-client";

class SocketService {
    static socket: Socket | undefined;
    
    static connect() {
        this.socket = io("http://localhost:4000");
            }

    static disconnect(): void {
        this.socket?.disconnect();
    }

}

export default SocketService;