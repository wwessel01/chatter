export class Member {
    uid: string;
    photoUrl: string | null;
    displayName: string | null;

    constructor(uid: string, photoUrl: string | null, displayName: string | null) {
        this.uid = uid;
        this.photoUrl = photoUrl;
        this.displayName = displayName;
    }
}