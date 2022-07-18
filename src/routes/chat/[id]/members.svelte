<script lang="ts">
    import type { Chatroom } from "$lib/models/chatroom";
    import { page } from "$app/stores";
    import { db } from "$lib/services/firebase";
    import { doc, onSnapshot } from "firebase/firestore";
    import { onDestroy } from "svelte";
    import { currentUser } from "$lib/store";

    const id = $page.params.id;

    let chatroom: Chatroom | null | undefined = undefined;
    let copyButton: HTMLElement;
    let copyText: HTMLElement;

    const handleCopy = () => {
        navigator.clipboard.writeText(copyText.innerText)
        .then(() => {
            copyButton.innerText = '✔️';
        })
        .catch((err) => {
            copyButton.innerText = '❌';
        })
        setTimeout(() => {
            copyButton.innerText = '💾';
        }, 500);
    }

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
        <div class="share-box">
            <div class="content">
                <h2>Add a new member to {chatroom.title}?</h2>
                <div class="share-copy">
                    <h3>Share this link with your friends!</h3>
                    <button bind:this={copyButton} on:click={handleCopy}>💾</button>
                </div>
                <p bind:this={copyText}>
                    {window.origin + `/chat/${id}/join`}
                </p>
            </div>
        </div>
        <div class="members-box">
            <h2>Members:</h2>
            <ul>
                {#each chatroom.members as member}
                    <li>{member.displayName}</li>
                {/each}
            </ul>
        </div>
    {:else if chatroom === undefined}
        <h1>Loading...</h1>
    {:else}
        <h1>😥 No chatroom found...</h1>
    {/if}
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
        margin: .5em;
        text-align: center;
    }

    p {
        overflow-wrap: break-word;
    }

    h2 {
        margin-bottom: 0;
    }

    ul {
        padding-inline-start: 20px;
    }

    .share-box, .members-box {
        flex: 1;
        display: flex;
        flex-flow: column;
        justify-content: center;
    }

    .members-box, .share-box > .content{
        background-color: lightblue;
        padding: 1em;
        border: 2px solid black;
        border-radius: 5px;
    }

    .members-box {
        flex: 0;
        margin-top: 1em;
    }

    .share-copy {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .share-copy button {
        border: 2px solid black;
        padding: .2em;
        border-radius: 50%;
        background-color: white;
        font-size: 1em;
    }
</style>