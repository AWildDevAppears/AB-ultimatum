import { ItemList } from "../state/CacheState/CacheStore";
import { Item } from "./Item";

export class Container {
    inventory = [];

    constructor(id, data) {
        this.id = id;

        this.inventory = data.inventory;
        this.maxItems = data.maxItems;
    }

    getInventory() {
        return this.inventory.map(id => new Item(id, ItemList[id]));
    }

    asData() {
        return {
            inventory: this.inventory,
            maxItems: this.maxItems,
        };
    }
}