import * as application from "tns-core-modules/application";
import { isIOS, isAndroid } from "tns-core-modules/platform";
import { Color } from "tns-core-modules/color";
import { fromFileOrResource } from "tns-core-modules/image-source";
import { ActionBar } from "tns-core-modules/ui/action-bar";
import { TabView, TabViewItem } from "tns-core-modules/ui/tab-view";

declare var org;

/**
 * By default ActionBar `color` will be applied as `tintColor` to `ActionItem` in iOS.
 * Code below is a workaround to set our own `tintColor`.
 */
if (isIOS) {
    (<any>ActionBar.prototype).originalUpdateColors = (<any>ActionBar.prototype).updateColors;
    (<any>ActionBar.prototype).updateColors = function (navigationBar) {
        this.originalUpdateColors(navigationBar);
        this.nativeView.tintColor = new Color("green").ios;
    };
}

/**
 * Known issues on Android
 * https://github.com/NativeScript/NativeScript/issues/5887
 */
if (isAndroid) {
    (<any>ActionBar.prototype)._addActionItems = function () {
        const menu = this.nativeViewProtected.getMenu();
        menu.clear();

        const items = this.actionItems.getVisibleItems();
        for (const item of items) {
            const filePath = item.icon,
                menuItem = menu.add(android.view.Menu.NONE, (<any>item)._getItemId(), android.view.Menu.NONE, item.text + "");

            if (filePath) {
                const bitmap = android.graphics.BitmapFactory.decodeFile(filePath);
                menuItem.setIcon(new android.graphics.drawable.BitmapDrawable(application.android.context.getResources(), bitmap));
            }
            menuItem.setShowAsAction(android.view.MenuItem.SHOW_AS_ACTION_ALWAYS);
        }
    };
    (<any>TabViewItem.prototype)._update = function () {
        const tv = this.nativeViewProtected;
        const tabView = this.parent as TabView;
        if (tv && tabView) {
            const tabSpec = new org.nativescript.widgets.TabItemSpec();
            tabSpec.title = this.title;
            if (this.iconSource) {
                const is = fromFileOrResource(this.iconSource);
                tabSpec.iconDrawable = new android.graphics.drawable.BitmapDrawable(application.android.context.getResources(), is.android);
            }
            this.tabItemSpec = tabSpec;
            (<any>tabView).updateAndroidItemAt(this.index, this.tabItemSpec);
        }
    };
}

application.start({ moduleName: "main-page" });
