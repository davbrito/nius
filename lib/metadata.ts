export function titleTemplate(title?: string) {
  return [title, "Nius"].filter(Boolean).join(" - ");
}
