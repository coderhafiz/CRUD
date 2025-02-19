import mongoose, { Schema } from "mongoose";

const topicSchema = new Schema(
  {
    title: String,
    description: String,
    name: String,
    email: { type: String, unique: true },
    role: { type: String, default: "admin" }, // Roles: 'user', 'admin'
    image: String,
  },
  {
    timestamps: true,
  }
);

const Topic = mongoose.models.Topic || mongoose.model("Topic", topicSchema);

export default Topic;
