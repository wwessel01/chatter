<script lang="ts">
    import { db } from "$lib/services/firebase";
    import { addDoc, collection } from "firebase/firestore";
    import { currentUser} from "$lib/store";
    import { goto } from '$app/navigation';


    let title: string = "";

    const createChatroom = async () => {
        if (!title) return;

        const member = {
            uid: $currentUser!.uid,
            displayName: $currentUser!.displayName,
            photoUrl: $currentUser!.photoURL,
        };

        const chatroom = {
            title,
            members: [member],
            messages: [],
        };

        const doc = await addDoc(collection(db, "chatrooms"), chatroom);
        goto(`/chat/${doc.id}`);
    };
</script>

<section>
    <h1>Create a chatroom!</h1>
    <form on:submit|preventDefault={createChatroom}>
        <input type="text" placeholder="Chatroom title" bind:value={title} />
        <button type="submit">☑️ Create chatroom</button>
    </form>
</section>

<style>
    section {
        height: 100%;
        display: flex;
        flex-flow: column;
    }

    h1 {
        margin: 0;
        flex: 0;
        margin-top: .5em;
        text-align: center;
    }

    form {
        flex: 1;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
    }

    input {
        width: 80vw;
        margin-bottom: .5em;
        box-sizing: border-box;
        padding: 1em;
        font-size: 1em;
        border: 2px solid black;
        border-radius: 5px;
    }

    button {
        width: 80vw;
        padding: 1em;
        font-size: 1em;
        background-color: lightblue;
        border: 2px solid black;
        border-radius: 5px;
    }
</style>