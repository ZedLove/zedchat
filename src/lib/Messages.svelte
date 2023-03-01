<script lang="ts">
  import { afterUpdate, beforeUpdate, onDestroy, onMount } from 'svelte';
  import { fade, slide } from 'svelte/transition';
  import type { MessagesRecord, MessagesResponse, UsersResponse } from './db';
  import { Collections } from './db';
  import { currentUser, pb } from './pocketbase';

  type Message = MessagesResponse<{user: UsersResponse}>;

  let messages: Message[] = [];
  let newMessage: string;
  let unsubscribe: () => void;

  onMount(async () => {
    const resultList = await pb.collection(Collections.Messages).getList<Message>(1, 50, {
      sort: 'created',
      expand: 'user',
    });
    messages = resultList.items;

    unsubscribe = await pb
      .collection(Collections.Messages)
      .subscribe<Message>('*', async ({action, record}) => {
        if (action === 'create') {
          const user = await pb.collection(Collections.Users).getOne<UsersResponse>(record.user);
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
      user: $currentUser?.id,
    };
    const createdMessage = await pb.collection(Collections.Messages).create<MessagesRecord>(data);
    newMessage = '';
  }

  onDestroy(() => unsubscribe?.());

  let messageList: HTMLDivElement;
  let autoscroll: boolean;

  beforeUpdate(() => {
    autoscroll = messageList && (messageList.offsetHeight + messageList.scrollTop) > (messageList.scrollHeight - 20);
  });

  afterUpdate(() => {
    if (autoscroll) messageList.scrollTo(0, messageList.scrollHeight);
  });

</script>

{#if $currentUser}
  <div class="messages" bind:this={messageList} transition:slide>
    <div class="curtain" />
    {#each messages as message (message.id)}
      <div class="msg {$currentUser.id === message.expand?.user.id ? 'author' : 'recipient'}" transition:fade>
        <div class="info">
          <img
            class="avatar"
            src={`https://avatars.dicebear.com/api/identicon/${message.expand?.user.username}.svg`}
            alt="user avatar"
            width="30px"
          />
          <small>@{message.expand?.user.username}</small>
        </div>
        <p class="msg-text">{message.text}</p>
      </div>
    {/each}
  </div>

  <form on:submit|preventDefault={sendMessage}>
    <!-- svelte-ignore a11y-autofocus -->
    <input bind:value={newMessage} placeholder="Message" type="text" autofocus />
    <button type="submit">Send</button>
  </form>
{/if}

<style>
.messages {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 1rem;
}

.messages .curtain {
  position: fixed;
  background: linear-gradient(0deg, rgba(1,1,1,0) 0%, var(--main-bg-color) 100%);
  height: 1.5rem;
}

.msg {
  min-width: 44%;
  max-width: 320px;
  border-radius: 0.375rem;
  padding: 0.375rem;
  margin: 0.175rem 0;
  text-align: left;
}

.msg.author {
  background-color: #4e8bc7;
  align-self: flex-end;
}

.msg.recipient {
  background-color: #7f7f7f;
  align-self: flex-start;
}

.msg .info {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  background-color: rgba(50, 50, 50, 0.2);
  border-radius: 0.375rem;
}

.msg .info small {
  margin: 0 0.5rem;
}

.msg .msg-text {
  margin-top: 0.2rem;
}

form {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

form input {
  flex-basis: 80%;
  height: 2.5rem;
  border-radius: 0.3rem;
  border: none;
  padding: 0 0.5rem;
}

form button {
  height: 2.5rem;
  flex-basis: 16%;
}
</style>
