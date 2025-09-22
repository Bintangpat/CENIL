import mongoose, { Schema, Document } from "mongoose";

export interface IChatRoom extends Document {
  name: string; // nama grup obrolan
  members: string[]; // array userId / email
  createdBy: string; // siapa yang bikin
  createdAt: Date;
}

const ChatRoomSchema: Schema<IChatRoom> = new Schema(
  {
    name: { type: String, required: true },
    members: [{ type: String, required: true }],
    createdBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "chatrooms" },
);

export default mongoose.models.ChatRoom ||
  mongoose.model<IChatRoom>("ChatRoom", ChatRoomSchema);
