import { env } from "@/src/config";

export const resolveAssetUrl = (src?: string | null) => {
  if (!src) return null;
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  if (!env.BACKEND_ORIGIN) return src.startsWith("/") ? src : `/${src}`;
  return src.startsWith("/") ? `${env.BACKEND_ORIGIN}${src}` : `${env.BACKEND_ORIGIN}/${src}`;
};
