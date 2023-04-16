import { decode } from "../helper/jwtTokenize";
import Messages from "../db/models/Messages";
import USER from "../models/User";

export const chat = async(skt) => {
    const users = {};
    const chats = await Messages.findAll({ attributes: ["msg_content", "userId"] });
    const ds: object[] = []
    const getOwners = async (userId:number, msg_content:string) => {
        const messaging: any = [];
        await USER.findOne({ where: { id: userId }, attributes: ["firstName", "lastName"] })
            .then(data => {
                const { firstName, lastName } = data?.dataValues
                messaging.push({ sender: `${firstName} ${lastName}`, message: msg_content })
            })
        return messaging;
    }
    for(let i= 0; i < chats.length; i++) {
        const chat = chats[i];
        const { userId, msg_content } = chat.dataValues;
        ds.push(await getOwners(userId, msg_content))
    }
    skt.on('connection', async socket => {
        const token = socket.handshake.query.token;        
        try {
            const userData = decode(token);
            socket.emit('new-user', userData);
            socket.emit('recents', ds)
            socket.on('connected', person => {
                users[socket.id] = person;
                socket.broadcast.emit('welcome', { person, message: "Joined the chat" })
            })
            socket.on('chat', async (data) => {
                try {
                    await Messages.create({ msg_content: data.message, userId: data.senderId })
                    socket.broadcast.emit('chat-message', data)
                } catch (e) {
                    socket.emit('failure_message', { error: e, data })
                }
            })
            socket.on('disconnect', () => {
                const person = users[socket.id];
                socket.broadcast.emit('bye', { person, message: 'Left the chat' })
                delete users[socket.id]
            })
        } catch (err) {
            socket.emit('failure_connection', { error: "Please login" });
        }
    })
}