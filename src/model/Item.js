export class Item {
    name = '';

    constructor(id, data) {
        this.id = id;

        this.name = data.name;
        this.value = data.value;
        this.role = data.role;
        this.description = data.description;
    }
}