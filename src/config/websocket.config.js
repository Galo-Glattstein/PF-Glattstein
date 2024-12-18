import { Server } from "socket.io";
import BearManager from "../managers/BearManager.js";

const bearManager = new BearManager();


export const config = (httpServer) => {
    
    const socketServer = new Server(httpServer);

    
    socketServer.on("connection", async (socket) => {
        console.log("Conexión establecida", socket.id);

        
        socketServer.emit("bears-list", { bears: await bearManager.getAll() });

        socket.on("insert-bear", async (data) => {
            try {
                await bearManager.insertOne(data);

                
                socketServer.emit("bears-list", { bears: await bearManager.getAll() });
            } catch (error) {
                
                socketServer.emit("error-message", { message: error.message });
            }
        });

        socket.on("delete-bear", async (data) => {
            try {
                await bearManager.deleteOneById(Number(data.id));

                
                socketServer.emit("bears-list", { bears: await bearManager.getAll() });
            } catch (error) {
                
                socketServer.emit("error-message", { message: error.message });
            }
        });

        // Escucha el evento de desconexión del cliente
        socket.on("disconnect", () => {
            console.log("Se desconecto un cliente"); // Indica que un cliente se desconectó
        });
    });
};