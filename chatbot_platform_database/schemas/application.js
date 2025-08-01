//
// MongoDB schema for applications registered on the chatbot platform.
//
// PUBLIC_INTERFACE
// Application schema fields:
// - _id: ObjectId
// - name: string (unique, required)
// - description: string
// - entrypoint_url: string (API/launch endpoint)
// - icon_url: string (optional, for UI)
// - registered_at: Date
// - metadata: object (optional, open-ended)
//

const applicationSchema = {
  bsonType: "object",
  required: ["name", "entrypoint_url", "registered_at"],
  properties: {
    name: {
      bsonType: "string",
      description: "App unique name"
    },
    description: {
      bsonType: "string"
    },
    entrypoint_url: {
      bsonType: "string",
      description: "Entry API endpoint or launch URL"
    },
    icon_url: {
      bsonType: "string"
    },
    registered_at: {
      bsonType: "date"
    },
    metadata: {
      bsonType: "object"
    }
  }
};

module.exports = applicationSchema;
