import { layout } from "@nativescript/core/utils";
import { Color } from "@nativescript/core/color";
import { Font } from "@nativescript/core/ui/styling/font";
import { path, knownFolders } from "@nativescript/core/file-system";

function getHashCode(value: any): number {
  let hash = 0;
  if (value.length === 0) {
    return hash;
  }
  for (const i in value) {
    const char = value.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash;
}

export function getImageUrl(font: Font, glyph: string, color: Color): string {
  const hasCode = getHashCode(`${font.fontFamily}:${glyph}:${color.argb}`);
  return path.join(
    knownFolders.temp().path,
    `${hasCode}_${font.fontSize}@${layout.getDisplayDensity()}x.png`
  );
}
