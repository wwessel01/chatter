import type { Message } from "./message";

export class Chatroom {
    id: string;
    title: string;
    members: string[];
    messages: Message[];

    constructor(id: string, title: string, members: string[], messages: Message[]) {
        this.id = id;
        this.title = title;
        this.members = members;
        this.messages = messages;
    }
}