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
        if (!data || !data.members.find(() => $currentUser!.uid)) data = null;
        chatroom = data;
    });

    onDestroy(() => {
        unsubscribe();
    });
</script>

{#if chatroom}
    <h1>{chatroom.title}</h1>
    <ul>
        {#each chatroom.members as member}
            <li>{member}</li>
        {/each}
    </ul>
{:else if chatroom === undefined}
    <h1>Loading...</h1>
{:else}
    <h1>😥 No chatroom found...</h1>
{/if}