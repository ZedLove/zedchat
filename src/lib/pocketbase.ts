import PocketBase from 'pocketbase';
import { writable } from 'svelte/store';

const dbUrl = process.env.NODE_ENV === 'production' ? 'https://chat.zaknitsch.com:443' : 'http://localhost:8090';
export const pb = new PocketBase(dbUrl);

export const currentUser = writable(pb.authStore.model);

pb.authStore.onChange(() => currentUser.set(pb.authStore.model));
