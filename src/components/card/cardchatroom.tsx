import { ObjectId } from "mongoose";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

export type CardChatRoomProps = {
  _id: ObjectId;
  name: String;
  member: String[];
  createdBy: String;
};

export function CardChatRoom({
  _id,
  name,
  member,
  createdBy,
}: CardChatRoomProps) {
  const { user } = useAuth();
  return (
    <Link href={`/${user?.role}/forum/chat/${_id}`}>
      <div className="bg-background relative flex h-12 min-h-20 w-full flex-col items-start justify-center-safe rounded-2xl p-4">
        <p className="text-accent-foreground mb-2 text-base font-bold">
          Obrolan {name}
        </p>
        <p className="text-accent-foreground mb-2 text-xs">
          Dibuat oleh | {createdBy}
        </p>
      </div>
    </Link>
  );
}
