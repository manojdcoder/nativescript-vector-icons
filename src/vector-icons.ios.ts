import { Color } from "tns-core-modules/color";
import { Font } from "tns-core-modules/ui/styling/font";
import { File } from "tns-core-modules/file-system";

import { getImageUrl } from "./vector-icons.common";

export function getImage(font: Font, glyph: string, color: Color): string {
    const imageUrl = getImageUrl(font, glyph, color);

    if (!File.exists(imageUrl)) {
        const attributesDict: any = {
            [NSFontAttributeName]: font.getUIFont(UIFont.systemFontOfSize(font.fontSize)),
            [NSForegroundColorAttributeName]: color.ios
        };

        const attributedString = NSAttributedString.alloc()
            .initWithStringAttributes(glyph, attributesDict);
        UIGraphicsBeginImageContextWithOptions(attributedString.size(), false, 0.0);
        attributedString.drawAtPoint(CGPointMake(0, 0));

        const iconImage = UIGraphicsGetImageFromCurrentImageContext();
        UIGraphicsEndImageContext();

        const success = UIImagePNGRepresentation(iconImage)
            .writeToFileAtomically(imageUrl, true);
        if (!success) {
            console.error("Failed to write image");
        }
    }

    return imageUrl;
}
