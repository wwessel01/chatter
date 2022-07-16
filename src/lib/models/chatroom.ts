import type { Member } from "./member";
import type { Message } from "./message";

export class Chatroom {
    id: string;
    title: string;
    members: Member[];
    messages: Message[];

    constructor(id: string, title: string, members: Member[], messages: Message[]) {
        this.id = id;
        this.title = title;
        this.members = members;
        this.messages = messages;
    }
}