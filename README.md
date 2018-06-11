# NativeScript Vector Icons

<img src="https://github.com/manojdcoder/nativescript-vector-icons/raw/master/media/demo-ios.gif" height="600px" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://github.com/manojdcoder/nativescript-vector-icons/raw/master/media/demo-android.gif" height="600px" />

## Prerequisites / Requirements
You will have to manually [install](https://docs.nativescript.org/ui/styling#using-fonts) the fonts you want to use.

## Installation
From the command prompt go to your app's root folder and execute:

```javascript
tns plugin add nativescript-vector-icons
```

## Demo app
If you want a quickstart, clone the repo, `cd src`, and `npm run demo.ios` or `npm run demo.android`.

## API

### getImage
Returns the image url based on the given parameters.

| Parameters | Type | Description |
| ---  | --- | --- |
| `font` | `Font` | Instance of `Font` you want to use, created with font family name and size. |
| `glyph` | `String` | A string that represents an icon. |
| `color` | `Color` | Instance of `Color` you want to use, created with known color names / hex code / raba values. |

```js
var Color = require('color').Color;
var Font = require('ui/styling/font').Font;
var vectorIcons = require('nativescript-vector-icons');
vectorIcons.getImage(
    Font.default.withFontFamily('Material Design Icons, MaterialDesignIcons').withFontSize(48), 
    String.fromCharCode(63615), 
    new Color('blue')
);
```

## Known issues on Android
#### Icon resolution is too low in ActionBar / TabView 
[#5887](https://github.com/NativeScript/NativeScript/issues/5887) - Android uses deprecated method to create Drawable from Bitmap
