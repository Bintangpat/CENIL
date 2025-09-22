import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
  roomId: string;
  user: string;
  message: string;
  timestamp: Date;
}

const MessageSchema = new Schema<IMessage>({
  roomId: { type: String, required: true },
  user: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.models.Message ||
  mongoose.model<IMessage>("Message", MessageSchema);
