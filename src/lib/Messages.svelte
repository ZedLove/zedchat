<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { currentUser, pb } from './pocketbase';

  let messages = [];
  let newMessage: string;
  let unsubscribe: () => void;

  onMount(async () => {
    const resultList = await pb.collection('messages').getList(1, 50, {
      sort: 'created',
      expand: 'user',
    });
    messages = resultList.items;

    unsubscribe = await pb
      .collection('messages')
      .subscribe('*', async ({action, record}) => {
        if (action === 'create') {
          const user = await pb.collection('users').getOne(record.user);
          record.expand = { user };
          messages = [...messages, record];
        }
        if (action === 'delete') {
          messages = messages.filter(m => m.id !== record.id);
        }
      })
  });

  async function sendMessage() {
    const data = {
      text: newMessage,
      user: $currentUser.id,
    };
    const createdMessage = await pb.collection('messages').create(data);
  }

  onDestroy(() => unsubscribe?.());
</script>

<div class="messages">
  {#each messages as message (message.id)}
    <div class="msg">
      <img
        class="avatar"
        src={`https://avatars.dicebear.com/api/identicon/${message.expand.user.username}.svg`}
        alt="user avatar"
        width="30px"
      />
      <div>
        <small>Sent by @{message.expand.user.username}</small>
        <p class="msg-text">{message.text}</p>
      </div>
    </div>
  {/each}
</div>

<form on:submit|preventDefault={sendMessage}>
  <input bind:value={newMessage} placeholder="Message" type="text" />
  <button type="submit">Send</button>
</form>