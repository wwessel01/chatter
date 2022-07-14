<script lang="ts">
    import type { Message } from "$lib/models/message";
    import { currentUser } from "$lib/store";

    export let message: Message;

    const messageClass = message.uid === $currentUser!.uid ? "self" : "other";
</script>

<div class='message {messageClass}'>
    <img src={message.photoUrl || "http://dummyimage.com/200x200"} alt="user"/>
    <p>{message.text}</p>
</div>

<style>
    .message {
        width: 100%;
        display: flex;
    }

    .message.self {
        flex-direction: row-reverse;
    }

    .message.other {
        flex-direction: row;
    }

    .message img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
</style>