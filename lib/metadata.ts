export function titleTemplate(title?: string) {
  return ["Nius", title].filter(Boolean).join(" - ");
}
