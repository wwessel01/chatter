<script lang="ts">
    import type { Chatroom } from '$lib/models/chatroom';
    import { page } from '$app/stores';
    import { db } from "$lib/services/firebase";
    import { doc, onSnapshot, updateDoc } from "firebase/firestore";
    import { onDestroy } from "svelte";
    import { currentUser } from '$lib/store';
    import ChatMessage from '$lib/components/chatMessage.svelte';

    const id = $page.params.id;

    let chatroom: Chatroom | null | undefined = undefined;
    let message: string = "";

    const unsubscribe = onSnapshot(
        doc(db, "chatrooms", id),
        (snapshot) => {
            let data: Chatroom | null = snapshot.data() as Chatroom;
            if(!data.members.find(() => $currentUser!.uid)) data = null;
            chatroom = data;
        }
    );
    onDestroy(() => {
        unsubscribe();
    });

    const sendMessage = () => {
        if(!message || !chatroom) return;

        const msg = {
            text: message,
            photoUrl: $currentUser!.photoURL,
            createdAt: new Date(),
            uid: $currentUser!.uid
        };

        const newMsgArray = [...chatroom.messages, msg];

        updateDoc(doc(db, "chatrooms", id), {
            messages: newMsgArray
        });
    };
</script>

{#if chatroom}
    <h1>{chatroom.title}</h1>
    {#each chatroom.messages as message}
        <ChatMessage message={message} />
    {/each}
    <form on:submit|preventDefault={sendMessage}>
        <input type="text" bind:value={message}/>
        <button type="submit">Send</button>
    </form>
{:else}
    {#if chatroom === undefined}
        <h1>Loading...</h1>
    {:else}
        <h1>😥 No chatroom found... </h1>
    {/if}
{/if}