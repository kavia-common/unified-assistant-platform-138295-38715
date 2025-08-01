# Chatbot Platform Database Model

This document describes the MongoDB data model and initialization for the chatbot platform.

## Collections

### 1. `users`
- Stores registered user profiles.
- Fields:
  - `username` (string, unique, required)
  - `email` (string, unique, required)
  - `password_hash` (string, required)
  - `created_at`, `updated_at` (Date)

### 2. `conversations`
- Logs all chatbot conversations (each can relate to an application).
- Fields:
  - `user_id` (ObjectId, ref: users)
  - `application_id` (ObjectId, ref: applications, optional)
  - `messages` (array of `{sender, text, timestamp}`)
  - `started_at`, `last_activity` (Date)

### 3. `applications`
- Registered apps for the unified assistant.
- Fields:
  - `name` (string, unique, required)
  - `description` (string, optional)
  - `entrypoint_url` (string, required)
  - `icon_url` (string, optional)
  - `registered_at` (Date)
  - `metadata` (object, optional)

## Initialization

Run the following command to set up collections and validation:
```sh
mongosh mongodb://<user>:<pass>@localhost:<port>/<db>?authSource=admin db_init.js
```
This will create the collections, apply schema validation, and set indexes.
