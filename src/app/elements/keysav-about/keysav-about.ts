"use strict";

import { PolymerElement, component, property, observe } from "polymer-decorators";

(() => {
@component("keysav-about")
class KeysavAbout extends PolymerElement {
    @property({type: String})
    version: string;

    constructor() {
        super();
        this.version = require("../package.json").version;
    }
}
Polymer(KeysavAbout);
})()
