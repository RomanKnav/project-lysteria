/* properties to have: name, character type, remaining skill points, 

attributes (for allocating skill points): 
    accuracy
    dodging
    armor
    attack damage (dependent on weapon)
    REMEMBER: after every round there are LOOT DROPS

    after each battle there'll be a RANDOM WEAPON
    currency used: GOLD

    RANDOM WEAPON AFTER EVERY BATTLE
*/

let characters = {
    "Leopold": {accuracy: 0, dodging: 0, armor: 0, weapon: "none", points: 10}, 
    "Lyra": {accuracy: 0, dodging: 0, armor: 0, weapon: "none", points: 10}, 
    "Thorne": {accuracy: 0, dodging: 0, armor: 0, weapon: "none", points: 10}, 
    "Seraphina": {accuracy: 0, dodging: 0, armor: 0, weapon: "none", points: 10}
};  

// after each character is created, a "Character" object should be created.

export default class Character {
    constructor() {
        this.name;
        this.type;
        this.accuracy;
        this.dodging;
        this.armor;
        this.weapon;
    }
}
























