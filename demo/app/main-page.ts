import { isIOS } from "tns-core-modules/platform";
import { Color } from "tns-core-modules/color";
import { EventData, PropertyChangeData } from "tns-core-modules/data/observable";
import { Page } from "tns-core-modules/ui/page";
import { TabView } from "tns-core-modules/ui/tab-view";

import { MainViewModel } from "./main-view-model";

export function onPageLoaded(args: EventData) {
    const page = <Page>args.object;
    page.bindingContext = new MainViewModel();
}

export function onTabViewLoaded(args: EventData) {
    const tabView = (<TabView>args.object);
    updateColorAt(tabView, 0);
    tabView.on("selectedIndexChange", onTabViewSelectedIndexChange);
}

export function onTabViewSelectedIndexChange(args: PropertyChangeData) {
    const tabView = (<TabView>args.object);
    updateColorAt(tabView, args.value);
}

function updateColorAt(tabView: TabView, index: number) {
    tabView.ios.tabBar.tintColor = new Color((<any>tabView.items[index]).tintColor).ios;
}
