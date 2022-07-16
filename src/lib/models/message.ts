export class Message {
    text: string;
    photoUrl: string | null;
    displayName: string | null;
    createdAt: Date;
    uid: string;

    constructor(text: string, photoUrl: string | null, displayName: string | null, createdAt: Date, uid: string) {
        this.text = text;
        this.photoUrl = photoUrl;
        this.displayName = displayName;
        this.createdAt = createdAt;
        this.uid = uid;
    }
}