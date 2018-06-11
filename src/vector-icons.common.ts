import { layout } from "tns-core-modules/utils/utils";
import { Color } from "tns-core-modules/color";
import { Font } from "tns-core-modules/ui/styling/font";
import { path, knownFolders } from "tns-core-modules/file-system";

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
