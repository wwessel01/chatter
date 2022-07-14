<script lang="ts">
    import { auth } from "$lib/services/firebase";

    const logout = () => {
        auth.signOut();
    };
</script>

<button on:click={logout}>📴 Log out</button>
