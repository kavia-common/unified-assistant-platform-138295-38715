//
// MongoDB Initialization Script for Chatbot Platform
// Run this script with `mongosh` to ensure correct collections and (optional)
// schema validation for users, conversations, and applications.
//
// PUBLIC_INTERFACE
// - Setups up user, conversation, and application collections with recommended validation rules
// - Safe to re-run (uses createCollection with validation if not exists)
//
// Usage (from terminal or Docker container):
// mongosh mongodb://[user]:[pass]@[host]:[port]/[db] db_init.js
//

const userSchema = require('./schemas/user');
const conversationSchema = require('./schemas/conversation');
const applicationSchema = require('./schemas/application');

function createCollectionWithValidation(db, name, schema) {
  const existing = db.getCollectionNames().includes(name);
  if (!existing) {
    db.createCollection(name, {
      validator: { $jsonSchema: schema },
      validationLevel: "strict",
      validationAction: "error"
    });
    print(`✓ Created collection '${name}' with schema validation.`);
  } else {
    db.runCommand({
      collMod: name,
      validator: { $jsonSchema: schema },
      validationLevel: "strict",
      validationAction: "error"
    });
    print(`✓ Updated '${name}' collection validator (or already configured).`);
  }
}

(function platformDbSetup() {
  const dbName = db.getName();
  print("Running chatbot platform DB initialization for: " + dbName);

  createCollectionWithValidation(db, "users", userSchema);
  createCollectionWithValidation(db, "conversations", conversationSchema);
  createCollectionWithValidation(db, "applications", applicationSchema);

  // Indexes for performance and uniqueness
  db.users.createIndex({ username: 1 }, { unique: true });
  db.users.createIndex({ email: 1 }, { unique: true });
  db.applications.createIndex({ name: 1 }, { unique: true });

  print("Setup complete: users, conversations, applications ready.");
})();
