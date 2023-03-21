import { Request, Response } from "express";
import path from "path";

const chatPath = path.resolve(__dirname,'../chat/chat.html');
class ChatController {
    static async channelChat(req:Request, res:Response) {
        res.sendFile(chatPath);
    }
}

export default ChatController