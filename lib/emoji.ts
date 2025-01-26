import type { Emoji as EmojiData, EmojiMartData } from "@emoji-mart/data";
import data from "@emoji-mart/data/sets/15/apple.json";

const Data = data as EmojiMartData;
const emojiSetName = "apple";

export type EmojiId = keyof typeof data.emojis | keyof typeof data.aliases;

export function getEmoji(emojiId: EmojiId): EmojiData {
  const { aliases, emojis } = Data;
  return emojis[emojiId] || emojis[aliases[emojiId]];
}

export function getEmojiSkin(emojiId: EmojiId, skin: number = 1) {
  const emoji = getEmoji(emojiId);
  return emoji.skins[skin - 1];
}

export function getEmojiImageUrl(unified: string) {
  return `https://cdn.jsdelivr.net/npm/emoji-datasource-${emojiSetName}@15.0.1/img/${emojiSetName}/64/${unified}.png`;
}

export function getEmojiImageUrlById(emojiId: EmojiId, skin: number = 1) {
  return getEmojiImageUrl(getEmojiSkin(emojiId, skin).unified);
}
