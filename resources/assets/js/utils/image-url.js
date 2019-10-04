import { UrlGenerator } from "laravel-image";

/**
 * Wrapper utility to contain global configuration options.
 */

const urlGenerator = new UrlGenerator({
  filters_format: "-image({filter})"
});

const MEDIA_DIR = "/media/xl";

export default function imageUrl(path, width) {
  // Path can contain spaces, that we need to escape.
  const url = `${MEDIA_DIR}/${encodeURIComponent(path)}`;

  return urlGenerator.make(url, width);
}
