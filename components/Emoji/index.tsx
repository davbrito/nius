"use client";
import { EmojiId, getEmojiImageUrl, getEmojiSkin } from "@/lib/emoji";
import Image from "next/image";
import styles from "./styles.module.css";

function Emoji({ id, skin = 1 }: { id: EmojiId; skin?: number }) {
  const emojiSkin = getEmojiSkin(id, skin);
  const imageSrc = getEmojiImageUrl(emojiSkin.unified);

  return (
    <Image
      alt={emojiSkin.native}
      height={64}
      src={imageSrc}
      width={64}
      className={styles.emoji}
    />
  );
}

export default Emoji;
