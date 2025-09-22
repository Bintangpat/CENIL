// Next.js API route
import { connectDB } from "@/lib/db";
import Message from "@/models/message";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  await connectDB();
  const messages = await Message.find({ roomId: params.id }).sort({
    timestamp: 1,
  });
  return Response.json(messages);
}
