import { layout } from "tns-core-modules/utils/utils";
import { Color } from "tns-core-modules/color";
import { Font } from "tns-core-modules/ui/styling/font";
import { File } from "tns-core-modules/file-system";

import { getImageUrl } from "./vector-icons.common";

export function getImage(font: Font, glyph: string, color: Color): string {
    const imageUrl = getImageUrl(font, glyph, color);

    if (!File.exists(imageUrl)) {
        const paint = new android.graphics.Paint();
        paint.setTypeface(font.getAndroidTypeface());
        paint.setColor(color.android);
        paint.setTextSize(layout.toDevicePixels(font.fontSize));
        paint.setAntiAlias(true);

        const textBounds = new android.graphics.Rect();
        paint.getTextBounds(glyph, 0, glyph.length, textBounds);

        const bitmap = android.graphics.Bitmap
            .createBitmap(
                textBounds.width(),
                textBounds.height(),
                android.graphics.Bitmap.Config.ARGB_8888
            );

        const canvas = new android.graphics.Canvas(bitmap);
        canvas.drawText(glyph, -textBounds.left, -textBounds.top, paint);

        let fos = null;

        try {
            fos = new java.io.FileOutputStream(new java.io.File(imageUrl));
            bitmap.compress(android.graphics.Bitmap.CompressFormat.PNG, 100, fos);
            fos.flush();
        } catch (error) {
            console.error(error);
        } finally {
            try {
                if (fos != null) {
                    fos.close();
                    fos = null;
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    return imageUrl;
}
