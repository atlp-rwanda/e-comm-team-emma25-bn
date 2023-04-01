import { Router } from "express";
import ChatController from "../controllers/chatController";
import Messages from "../db/models/Messages";

const chat = Router();
chat.get("/chat",  ChatController.channelChat);
chat.get("/allchat",async (req, res) => {
    const all = await Messages.findAll();
    res.status(200).json({status: 200, messages: all});
})
export default chat
