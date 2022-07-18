<script lang="ts">
    import type { Chatroom } from "$lib/models/chatroom";

    import { db } from "$lib/services/firebase";
    import { currentUser } from "$lib/store";
    import { collection, onSnapshot } from "firebase/firestore";
    import { onDestroy } from "svelte";

    let chatrooms: Chatroom[] = [];
    const unsubscribe = onSnapshot(
        collection(db, "chatrooms"),
        (snapshot) => {
            chatrooms = snapshot.docs.map((doc) => {
                const chatroom = doc.data() as Chatroom;
                chatroom.id = doc.id;
                return chatroom;
            })
            .filter((chatroom) => chatroom.members && chatroom.members.length > 0)
            .filter((chatroom) => chatroom.members.filter((member) => member.uid === $currentUser!.uid));
        }
    );
    onDestroy(() => {
        unsubscribe();
    });
</script>

<section>
    <h2>Welcome!</h2>
    <a class="new" href="/chat/create">➕ New chatroom</a>
    <h2>Join chat</h2>
    <ul>
        {#each chatrooms as chatroom}
            <li>
                <a href={`/chat/${chatroom.id}`}>{chatroom.title}</a>
            </li>
        {/each}
    </ul>
</section>

<style>
    section {
        height: 100%;
        display: flex;
        flex-flow: column;
        align-items: center;
    }

    h2 {
        text-align: center;
        margin-bottom: .3em;
    }

    a {
        box-sizing: border-box;
        display: inline-block;
        color: black;
        text-decoration: none;
        background-color: lightblue;
        border: 2px solid black;
        border-radius: 5px;
        padding: 1em;
        width: 80vw;
        text-align: center;
    }

    a.new {
        background-color: lightcoral;
    }

    ul {
        list-style: none;
        padding: 0;
        flex: 1;
        overflow-y: scroll;
        margin-top: 0;
    }

    li:not(:last-child) {
        margin-bottom: .5em;
    }
</style>
