import { Action } from "./Action.js";

export class ActionsManager {
    constructor() {
        this.actions = this.loadActions();
        this.balance = this.calcBalance();
    }

    // Load actions from localStorage
    loadActions() {
        const actionsData = localStorage.getItem('actions');
        return actionsData ? JSON.parse(actionsData)
            .map(action => new Action(action.type, action.description, action.amount)) : [];
    }

    // Save actions to localStorage
    saveActions() {
        localStorage.setItem('actions', JSON.stringify(this.actions));
    }

    addAction(action) {
        this.actions.push(action);
        this.saveActions();
        this.updateBalance();
    }

    deleteAction(id) {
        this.actions = this.actions.filter(action => action.getId() !== id);
        this.saveActions();
        this.updateBalance();
    }

    updateAction(id, amount) {
        const action = this.actions.find(action => action.getId() === id);
        if (action) {
            action.setAmount(amount);
            this.saveActions();
            this.updateBalance();
        }
    }

    calcBalance() {
        return this.actions.reduce((acc, action) => {
            return action.getType() === 'income' ? acc + action.getAmount() : acc - action.getAmount();
        }, 0);
    }

    // Update balance after changes
    updateBalance() {
        this.balance = this.calcBalance();
    }
    
    // Getters
    getActions() {
        return this.actions;
    }

    getBalance() {
        return this.balance;
    }
}