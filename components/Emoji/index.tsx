"use client";
import { EmojiId, getEmojiImageUrl, getEmojiSkin } from "@/lib/emoji";
import Image from "next/image";

function Emoji({ id, skin = 1 }: { id: EmojiId; skin?: number }) {
  const emojiSkin = getEmojiSkin(id, skin);
  const imageSrc = getEmojiImageUrl(emojiSkin.unified);

  return (
    <Image
      alt={emojiSkin.native}
      height={64}
      src={imageSrc}
      width={64}
      className="inline-block h-4 w-4 align-[-0.1em] select-none"
    />
  );
}

export default Emoji;
