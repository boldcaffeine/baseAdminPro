import defaultSettings from "@/settings";

const title: string = defaultSettings.title || "Vue Element Admin";

export default function getPageTitle(pageTitle?: string): string {
  if (pageTitle) {
    return `${pageTitle} - ${title}`;
  }
  return `${title}`;
}
