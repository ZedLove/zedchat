# ZedChat

A very basic real-time messaging application built using Svelte, TypeScript and pocketbase. Currently deployed live at https://zedlove.github.io/zedchat/. To send messages, you must create a user by supplying a unique username and valid password.

Planned improvements can be found in the [TODO](./TODO.md) file.

## Getting Started

This project uses `nvm`. To ensure you are using compatible `node` and `npm` versions, run `nvm use` prior to any install commands

* `npm ci`
* `npm run dev`
* `pocketbase serve` (migrations should be run automatically)

The running application can be found at [localhost:5173/zedchat/](http://localhost:5173/zedchat/). The `base` path can be configured in `vite.config.ts`.

### Database

You will need a local [pocketbase](https://pocketbase.io/docs/) instance running with the latest migrations from the `pb_migrations/` directory in this project. Data is persisted in an untracked `pb_data/` directory.