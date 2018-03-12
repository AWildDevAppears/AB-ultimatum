import { ItemList } from "../state/CacheState/CacheStore";
import { Item } from "./Item";

export default class Player {
    prefix = '';
    surname = '';
    name = '';
    
    healthMax = 100;
    healthNow = 100;

    stamMax = 50;
    stamNow = 50;

    inventory = [];

    equipment = {
        head: '',
        body: '',
        legs: '',
        gloves: '',
        boots: '',
        weapon: '',
    }

    looks = {
        all: {
            gender: '',
            skin: '',

        },
        face: {
            eyeColor: '',
            hairStyle: '',
            hairColor: '',
            facialHairColor: '',
            facialHairStyle: '',
        },
        body: {
            weight: '',
            height: '', // UNUSED
        },
    }

    maxItems = 24;

    money = 0;

    setPlayerLooks(looks) {
        this.looks = looks;
    }

    setPlayerName(prefix, surname, name) {
        this.prefix = prefix;
        this.surname = surname;
        this.name = name;
    }

    getInventory() {
        return this.inventory.map(id => new Item(id, ItemList[id]));
    }
}