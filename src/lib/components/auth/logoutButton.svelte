<script lang="ts">
    import { auth } from "$lib/services/firebase";

    const logout = () => {
        auth.signOut();
    };
</script>

<button on:click={logout}>📴 Log out</button>

<style>
    button {
        background-color: white;
        border: 2px solid black;
        border-radius: 5px;
        padding: .3em;
        margin-top: .5em
    }
</style>
