<script lang="ts">
    import type { Chatroom } from "$lib/models/chatroom";
    import { page } from "$app/stores";
    import { db } from "$lib/services/firebase";
    import { doc, onSnapshot, updateDoc } from "firebase/firestore";
    import { onDestroy, onMount } from "svelte";
    import { currentUser } from "$lib/store";
import { goto } from "$app/navigation";

    const id = $page.params.id;

    let chatroom: Chatroom | null | undefined = undefined;

    const unsubscribe = onSnapshot(doc(db, "chatrooms", id), (snapshot) => {
        let data: Chatroom | null = snapshot.data() as Chatroom;
        if (!data) data = null;
        chatroom = data;
    });

    const addUserToMembers = async () => {
        if(!chatroom) return;
        if(!chatroom.members.map((member) => member.uid === $currentUser!.uid).includes(true)) {
            const member = {
                uid: $currentUser!.uid,
                photoUrl: $currentUser!.photoURL,
                displayName: $currentUser!.displayName,
            };
        
            const newMemberArray = [...chatroom.members, member];
        
            await updateDoc(doc(db, "chatrooms", id), {
                members: newMemberArray,
            });
        }
        goto("/chat/" + id);
    }

    $: if(chatroom) addUserToMembers();

    onDestroy(() => {
        unsubscribe();
    });
</script>

{#if chatroom}
    <h1>Joining {chatroom.title}...</h1>
{:else if chatroom === undefined}
    <h1>Loading...</h1>
{:else}
    <h1>😥 No chatroom found...</h1>
{/if}