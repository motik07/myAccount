export class Action {
    constructor(type, description, amount) {
        this.id = Math.floor(Math.random() * 1001); // Unique ID between 0 and 1000
        this.type = type;
        this.description = description;
        this.amount = amount;
    }

    // Getters
    getId() {
        return this.id;
    }

    getType() {
        return this.type;
    }

    getDescription() {
        return this.description;
    }

    getAmount() {
        return this.amount;
    }

    // Setters
    setType(type) {
        this.type = type;
    }

    setDescription(description) {
        this.description = description;
    }

    setAmount(amount) {
        this.amount = amount;
    }
}