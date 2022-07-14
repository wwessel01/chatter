<script lang="ts">
    import {auth} from "$lib/services/firebase";
    import { onAuthStateChanged } from "firebase/auth";
    import { currentUser } from "$lib/store";
    import LoginButton from "$lib/components/auth/loginButton.svelte";
    import LogoutButton from "$lib/components/auth/logoutButton.svelte";


    onAuthStateChanged(auth, (user) => {
		if (user) {
			currentUser.update(() => user);
		} else {
			currentUser.update(() => undefined);
		}
	});
</script>

{#if $currentUser}
    <header>
        <h1>💬 Chatter</h1>
        <div>
            <p>👤 {$currentUser.displayName}</p>
            <LogoutButton />
        </div>
    </header>
    <slot />
{:else}
    <header>
        <h1>💬 Chatter</h1>
    </header>
    <LoginButton />
{/if}

<style>
    header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1em;
    }

    h1, p {
        margin: 0;
    }
</style>
