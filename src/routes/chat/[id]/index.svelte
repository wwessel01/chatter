<script lang="ts">
    import type { Chatroom } from "$lib/models/chatroom";
    import { page } from "$app/stores";
    import { goto } from '$app/navigation';
    import { db } from "$lib/services/firebase";
    import { doc, onSnapshot, updateDoc } from "firebase/firestore";
    import { onDestroy, onMount } from "svelte";
    import { currentUser } from "$lib/store";
    import ChatMessage from "$lib/components/chatMessage.svelte";
    
    const id = $page.params.id;
    
    let chatroom: Chatroom | null | undefined = undefined;
    let message: string = "";
    let messagesDiv: HTMLElement;
    let formInput: HTMLInputElement;

    const unsubscribe = onSnapshot(doc(db, "chatrooms", id), (snapshot) => {
        let data: Chatroom | null = snapshot.data() as Chatroom;
        if (!data || !data.members.find(() => $currentUser!.uid)) data = null;
        chatroom = data;
    });
    
    const sendMessage = async () => {
        if (!message || !chatroom) return;

        formInput.value = "";
        
        const msg = {
            text: message,
            photoUrl: $currentUser!.photoURL,
            displayName: $currentUser!.displayName,
            createdAt: new Date(),
            uid: $currentUser!.uid,
        };
        
        const newMsgArray = [...chatroom.messages, msg];
        
        await updateDoc(doc(db, "chatrooms", id), {
            messages: newMsgArray,
        });

        updateScroll(true);
    };
    
    const updateScroll = (smooth: boolean) => {
        if (!messagesDiv) return;
        messagesDiv.lastElementChild?.scrollIntoView({behavior: smooth ? "smooth" : "auto"});
    }

    const gotoMembers = () => {
        goto(window.location.href + "/members");
    }
    
    $: if (messagesDiv) updateScroll(false);

    onDestroy(() => {
        unsubscribe();
    });
</script>

{#if chatroom}
    <h1>{chatroom.title}</h1>
    <button class="member-button" on:click={gotoMembers}>👥</button>
    <div bind:this={messagesDiv} class="messages">
        {#each chatroom.messages as message}
            <ChatMessage {message} />
        {/each}
    </div>
    <form on:submit|preventDefault={sendMessage}>
        <input bind:this={formInput} type="text" bind:value={message} />
        <button type="submit">✉️</button>
    </form>
{:else if chatroom === undefined}
    <h1>Loading...</h1>
{:else}
    <h1>😥 No chatroom found...</h1>
{/if}

<style>
    h1 {
        margin: 0;
        flex: 0;
        margin-top: .5em;
        text-align: center;
    }

    .member-button {
        position: absolute;
        right: .2em;
        top: .6em;
        cursor: pointer;
        border: none;
        background-color: transparent;
        font-size: 1.2em;
    }

    .messages {
        flex: 1;
        overflow-y: scroll;
        min-height: 0;
        border: 2px solid black;
        border-radius: 1em 1em 0 0;
        padding-block: 1em;
        padding-inline: .2em;
    }

    form {
        background-color: lightblue;
        display: flex;
        padding: 1em;
        border: 2px solid black;
        border-top: none;
        border-radius: 0 0 1em 1em;
    }

    form input {
        flex: 1;
        border: 2px solid black;
        padding: .5em;
        margin-right: .5em;
        border-radius: 5px;
    }

    form button {
        border: 2px solid black;
        padding: .2em;
        border-radius: 50%;
        background-color: white;
        font-size: 1.2em;
    }
</style>
