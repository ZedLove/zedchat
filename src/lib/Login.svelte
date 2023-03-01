<script lang="ts">
import type { UsersRecord } from './db';
import { currentUser, pb } from './pocketbase';

let username: string;
let password: string;

async function login() {
  await pb.collection('users').authWithPassword(username, password);
}

async function signUp() {
  try {
    const userPayload = {
      username,
      password,
      passwordConfirm: password,
      name: 'TODO',
    };
    await pb.collection('users').create<UsersRecord>(userPayload);
    await login();
  } catch (error) {
    // TODO: handle error
    password = ''; // TODO: is this how to reset a svelte value?
    console.error(`Error while creating new user ${username}:`, error);
  }
}

// TODO: use this
// function signOut() {
//   pb.authStore.clear();
// }
</script>

{#if $currentUser}
  <p>Signed in as {$currentUser.username}</p>
{:else}
  <form on:submit|preventDefault>
    <input bind:value={username} placeholder="Username" type="text" />
    <input bind:value={password} placeholder="password" type="password" />
    <button on:click={signUp}>Sign Up</button>
    <button on:click={login}>Login</button>
  </form>
{/if}
