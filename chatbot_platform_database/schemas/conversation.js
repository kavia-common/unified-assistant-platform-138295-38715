//
// MongoDB schema for chatbot conversations.
//
// PUBLIC_INTERFACE
// Conversation schema fields:
// - _id: ObjectId (auto-generated)
// - user_id: ObjectId (reference to Users collection; required)
// - messages: array of { sender: "user"|"bot"|"system", text: string, timestamp: Date }
// - application_id: ObjectId (reference to Applications, optional)
// - started_at: Date
// - last_activity: Date
//

const conversationSchema = {
  bsonType: "object",
  required: ["user_id", "messages", "started_at"],
  properties: {
    user_id: {
      bsonType: "objectId",
      description: "Reference to the user"
    },
    application_id: {
      bsonType: "objectId",
      description: "Optional reference to a launched app"
    },
    messages: {
      bsonType: "array",
      items: {
        bsonType: "object",
        required: ["sender", "text", "timestamp"],
        properties: {
          sender: {
            enum: ["user", "bot", "system"]
          },
          text: {
            bsonType: "string"
          },
          timestamp: {
            bsonType: "date"
          }
        }
      }
    },
    started_at: {
      bsonType: "date"
    },
    last_activity: {
      bsonType: "date"
    }
  }
};

module.exports = conversationSchema;
