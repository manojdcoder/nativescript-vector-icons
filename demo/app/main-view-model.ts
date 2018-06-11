import { Color } from "color";
import { Observable } from "tns-core-modules/data/observable";
import { Font } from "tns-core-modules/ui/styling/font";

import { getImage } from "nativescript-vector-icons";

export class MainViewModel extends Observable {

  private font: Font = Font.default
    .withFontFamily("Material Design Icons, MaterialDesignIcons")
    .withFontSize(32);

  getImage(glyph: string, color: Color): string {
    return getImage(this.font, glyph, color);
  }

  get core(): string {
    return this.getImage(String.fromCharCode(63615), new Color("blue"));
  }

  get angular(): string {
    return this.getImage(String.fromCharCode(63153), new Color("red"));
  }

  get vue(): string {
    return this.getImage(String.fromCharCode(63555), new Color("#6bb78b"));
  }

  get rocket(): string {
    return this.getImage(String.fromCharCode(62563), new Color("green"));
  }
}
