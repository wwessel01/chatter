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
            <div class="right">
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
        <div class="login-box">
            <LoginButton />
        </div>
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
        background-color: lightblue;
        border: 2px solid black;
        border-radius: 5px;
        padding: .5em;
        margin-bottom: .5em;
    }

    header .right {
        display: flex;
        flex-flow: column;
        align-items: center;
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

    .login-box {
        display: flex;
        justify-content: center;
    }
</style>
