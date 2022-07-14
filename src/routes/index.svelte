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
                .filter((group) => group.members)
                .filter((group) => group.members.includes($currentUser!.uid));
        }
    );
    onDestroy(() => {
        unsubscribe();
    });
</script>

<section>
    <button>Create chat</button>
    <h2>Join chat</h2>
    <ul>
        {#each chatrooms as chatroom}
            <li>
                <a href={`/chat/${chatroom.id}`}>{chatroom.title}</a>
            </li>
        {/each}
    </ul>
</section>
