import { faker } from 'https://cdn.jsdelivr.net/npm/@faker-js/faker/+esm';

console.log(faker)


// Gladiators constructor

class Gladiator {
    constructor() {
        this.name = faker.person.fullName();
        this.health = getRandomIntNum(80, 100);
        this.initialHealth = this.health;
        this.power = getRandomFloatNum(2, 5, 1);
        this.speed = getRandomFloatNum(1, 5, 3);
        this.initialSpeed = this.speed;
    }

    attack(enemy) {
        enemy.health -= this.power;
        logMessage(`💥 [${this.name} x ${this.health.toFixed(0)}] hits [${enemy.name} x ${enemy.health.toFixed(0)}] with power ${this.power.toFixed(1)}`);

        if (enemy.health <= 0) {
            logMessage(`⬛ [${enemy.name}] is dying.`);
            caesarDecision(enemy);
        }
    }

    updateSpeed() {
        if (this.health <= 30) {
            this.speed = this.initialSpeed * 3;
        } else {
            this.speed = this.initialSpeed * (this.health / this.initialHealth);
        }
    }
}

function getRandomIntNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloatNum(min, max, decimals) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}



const startButton = document.getElementById("startButton");
const log = document.getElementById("log");


// Battle start function

let gladiators = [];

function startBattle(gladiatorsNum = 4) {
    gladiators = Array.from({ length: gladiatorsNum }, () => new Gladiator());

    startButton.disabled = true;
    log.innerHTML = "";

    logMessage("⚔️🔥 Battle begins!");

    let battleInterval = setInterval(() => {
        let availableGladiators = gladiators.filter(gladiator => gladiator.health > 0);

        if (availableGladiators.length === 1) {
            logMessage(`🏆 [${availableGladiators[0].name}] won with health x${availableGladiators[0].health.toFixed(1)}`);
            clearInterval(battleInterval);

            startButton.disabled = false;

            return;
        }

        availableGladiators.forEach(gladiator => {
            gladiator.updateSpeed();

            if (Math.random() < 1 / gladiator.speed) {
                let enemys = availableGladiators.filter(g => g !== gladiator);

                if (enemys.length > 0) {
                    let target = enemys[Math.floor(Math.random() * enemys.length)];
                    gladiator.attack(target);
                }
            }
        });
    }, 500);
}


// Caesar Decision

function caesarDecision(gladiator) {
    setTimeout(() => {
        let decision = Math.random() > 0.5 ? "Live" : "Finish";

        if (decision === "Live") {
            gladiator.health = 50;

            logMessage(`💪 Caesar shows :+1: to [${gladiator.name}].`);
        } else {
            gladiators = gladiators.filter(g => g !== gladiator);

            logMessage(`❌ Caesar shows :-1: to [${gladiator.name}].`);
        }
    }, 100);
}


// Log Message function

function logMessage(message) {
    log.innerHTML += `<p>${message}</p>`;
    log.scrollTop = log.scrollHeight;
}


startButton.addEventListener("click", () => startBattle(2));





