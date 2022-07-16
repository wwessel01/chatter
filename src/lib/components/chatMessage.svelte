<script lang="ts">
    import type { Message } from "$lib/models/message";
    import { currentUser } from "$lib/store";

    export let message: Message;

    const messageClass = message.uid === $currentUser!.uid ? "self" : "other";
</script>

<div class='message {messageClass}'>
    <p class="display-name {messageClass}">{message.displayName}</p>
    <img src={message.photoUrl || "http://dummyimage.com/200x200"} alt="user"/>
    <p>{message.text}</p>
</div>

<style>
    .message {
        width: fit-content;
        max-width: 80%;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding-block: .2em;
        padding-inline: 1em;
        border-radius: 1em;
        position: relative;
    }

    .message:not(:last-child) {
        margin-bottom: 1.5em;
    }

    .message.self {
        flex-direction: row-reverse;
        background-color: lightblue;
        margin-left: auto;
    }

    .message.other {
        flex-direction: row;
        background-color: lightcoral;
    }

    .message img {
        width: 2em;
        height: 2em;
        border-radius: 50%;
    }

    .message p {
        margin-inline: .5em;
        overflow: hidden;
    }

    .display-name {
        position: absolute;
        top: -1.2em;
        margin: 0;
        opacity: .5;
        font-size: smaller;
    }

    .display-name.self {
        right: 0;
    }

    .display-name.other {
        left: 0;
    }
</style>