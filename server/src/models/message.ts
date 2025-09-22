import mongoose, { Document, Model } from "mongoose";

export interface IMessage {
  roomId: string;
  user: string;
  message: string;
  timestamp: number;
}

const messageSchema = new mongoose.Schema<IMessage & mongoose.Document>({
  roomId: { type: String, required: true },
  user: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Number, required: true },
});

const Message = (mongoose.models.Message ||
  mongoose.model<IMessage & mongoose.Document>(
    "Message",
    messageSchema,
  )) as Model<IMessage & mongoose.Document>;

export default Message;
