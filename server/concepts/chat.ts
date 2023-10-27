import { ObjectId } from "mongodb";
import DocCollection, { BaseDoc } from "../framework/doc";
import { ContentT } from "../types";
import { NotFoundError } from "./errors";

export interface ChatDoc extends BaseDoc {
    user1: ObjectId;
    user2: ObjectId;
    content: [ObjectId, ContentT][];
}

export default class ChatConcept {

    public readonly chats = new DocCollection<ChatDoc>("chats");

    async getChats(user: ObjectId) {
        const chats = await this.chats.readMany({ $or: [{user1: user}, {user2: user}] });
        return chats;
    }

    async getChat(_id: ObjectId) {
        const chat = await this.chats.readOne({_id});
        console.log(chat)
        if (chat === null) {
            throw new NotFoundError(`Chat not found!`);
        }
        return chat;
    }

    async getChatByReceiver(sender: ObjectId, receiver: ObjectId){
        const chat = await this.chats.readOne({ $or: [{user1: sender, user2: receiver}, {user1: receiver, user2: sender}] });
        if (chat === null) {
            throw new NotFoundError(`Chat not found!`);
        }
        return chat;
    }

    async createChat(sender: ObjectId, receiver: ObjectId, content: ContentT) {
        const _id = await this.chats.createOne( {user1: sender, user2: receiver, content: [[sender, content]]} );
        return { msg: "Chat started successfully!" };
    }

    async sendMessage(sender: ObjectId, receiver: ObjectId, content: ContentT) {
        const chat = await this.chats.readOne({ $or: [{user1: sender, user2: receiver}, {user1: receiver, user2: sender}] });
        if (chat === null) {
            throw new NotFoundError("Chat not found!");
        } else {
            const newContent = chat.content;
            newContent.push([sender, content]);
            console.log('newContent', newContent)
            const update: Partial<ChatDoc> = { content: newContent };
            await this.chats.updateOne( {_id: chat._id}, update)
            return { msg: "Message sent successfully!" };
        }
    }

}