"use client";
import type { Emoji as EmojiData, EmojiMartData } from "@emoji-mart/data";
import data from "@emoji-mart/data/sets/15/apple.json";
import Image from "next/image";
import styles from "./styles.module.css";

type EmojiId = keyof typeof data.emojis | keyof typeof data.aliases;

const Data = data as EmojiMartData;
const emojiSetName = "apple";

function get(emojiId: string): EmojiData {
  const { aliases, emojis } = Data;
  return emojis[emojiId] || emojis[aliases[emojiId]];
}

function Emoji({ id, skin = 1 }: { id: EmojiId; skin?: number }) {
  const emoji = get(id);
  const emojiSkin = emoji.skins[skin - 1];

  const imageSrc = `https://cdn.jsdelivr.net/npm/emoji-datasource-${emojiSetName}@15.0.1/img/${emojiSetName}/64/${emojiSkin.unified}.png`;
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
