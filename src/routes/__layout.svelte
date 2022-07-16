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

<section>
    {#if $currentUser}
        <header>
            <a href="/">
                <h1>💬 Chatter</h1>
            </a>
            <div>
                <p>👤 {$currentUser.displayName}</p>
                <LogoutButton />
            </div>
        </header>
        <div class="content">
            <slot />
        </div>
    {:else}
        <header>
            <h1>💬 Chatter</h1>
        </header>
        <LoginButton />
    {/if}
</section>

<style>
    section {
        height: 100%;
        display: flex;
        flex-flow: column;
        padding: 1em;
        box-sizing: border-box;
        font-family: 'Ubuntu', sans-serif;
    }

    header {
        flex: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .content {
        flex: 1;
        display: flex;
        flex-flow: column;
        min-height: 0;
        position: relative;
    }

    a {
        text-decoration: none;
        color: black;
    }

    h1, p {
        margin: 0;
    }
</style>
