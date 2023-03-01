/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Messages = "messages",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

export type ViewSystemFields<T = never> = {
  	id: RecordIdString
  	collectionId: string
  	collectionName: Collections
  	expand?: T
}

// Record types for each collection

export type MessagesRecord = {
	text: string
	user: RecordIdString
}

export type UsersRecord = {
	name?: string
	avatar?: string
}

// Response types include system fields and match responses from the PocketBase API
export type MessagesResponse<Texpand = unknown> = MessagesRecord & BaseSystemFields<Texpand>
export type UsersResponse = UsersRecord & AuthSystemFields

export type CollectionRecords = {
	messages: MessagesRecord
	users: UsersRecord
}
