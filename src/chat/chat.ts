import { decode } from "../helper/jwtTokenize";
import Messages from "../db/models/Messages";
import USER from "../models/User";

export const chat = (skt) => {
    const users = {};
    skt.on('connection', async socket => {
        function getCookie(name: string, str: string): any {
            function escape(s) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
            const match = str.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
            return match ? match[1] : null;
        }
        const cookies = socket.request.headers["cookie"] as string;
        const token = getCookie('token', cookies);
        try {
            const userData = decode(token);
            socket.emit('new-user', userData);
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