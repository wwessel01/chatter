<script lang="ts">
    import type { Chatroom } from "$lib/models/chatroom";
    import { page } from "$app/stores";
    import { db } from "$lib/services/firebase";
    import { doc, onSnapshot } from "firebase/firestore";
    import { onDestroy } from "svelte";
    import { currentUser } from "$lib/store";

    const id = $page.params.id;

    let chatroom: Chatroom | null | undefined = undefined;

    const unsubscribe = onSnapshot(doc(db, "chatrooms", id), (snapshot) => {
        let data: Chatroom | null = snapshot.data() as Chatroom;
        if (!data || !data.members.map((member) => member.uid === $currentUser!.uid).includes(true)) data = null;
        chatroom = data;
    });

    onDestroy(() => {
        unsubscribe();
    });
</script>

<section>
    {#if chatroom}
        <h1>{chatroom.title}</h1>
        <h2>Add a new member to the chatroom</h2>
        <h3>Share this link with your friends!</h3>
        <p>
            {window.origin + `/chat/${id}/join`}
        </p>
        <h2>Current members:</h2>
        <ul>
            {#each chatroom.members as member}
                <li>{member.displayName}</li>
            {/each}
        </ul>
    {:else if chatroom === undefined}
        <h1>Loading...</h1>
    {:else}
        <h1>😥 No chatroom found...</h1>
    {/if}
</section>

<style>
    section {
        display: flex;
        flex-flow: column;
    }

    p {
        overflow-wrap: break-word;
    }
</style>