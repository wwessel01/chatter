export class Message {
    text: string;
    photoUrl: string | null;
    createdAt: Date;
    uid: string;

    constructor(text: string, photoUrl: string | null, createdAt: Date, uid: string) {
        this.text = text;
        this.photoUrl = photoUrl;
        this.createdAt = createdAt;
        this.uid = uid;
    }
}