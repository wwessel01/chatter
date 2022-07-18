<script lang="ts">
    import { auth } from "$lib/services/firebase";
    import { signInWithPopup, GoogleAuthProvider  } from "firebase/auth";

    const provider = new GoogleAuthProvider();

    const loginWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                const user = result.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
            });
    };
</script>

<button on:click={loginWithGoogle}>👍 Login</button>

<style>
    button {
        background-color: lightblue;
        border: 2px solid black;
        border-radius: 5px;
        padding: 1em;
        width: 80vw;
        text-align: center;
        font-size: 1em;
    }
</style>
