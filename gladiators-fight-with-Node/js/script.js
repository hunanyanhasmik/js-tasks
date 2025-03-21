async function fetchGladiators() {
    const response = await fetch("http://localhost:3000/gladiators");
    return await response.json();
}


// Function to gladiator attack

function attack(attacker, enemy) {
    enemy.health -= attacker.power;
    logMessage(`💥 [${attacker.name} x ${attacker.health.toFixed(0)}] hits [${enemy.name} x ${enemy.health.toFixed(0)}] with power ${attacker.power.toFixed(1)}`);

    if (enemy.health <= 0) {
        logMessage(`⬛ [${enemy.name}] is dying.`);
        caesarDecision(enemy);
    }
}

// Function to update speed

function updateSpeed(gladiator) {
    if (gladiator.health <= 30) {
        gladiator.speed = gladiator.initialSpeed * 3;
    } else {
        gladiator.speed = gladiator.initialSpeed * (gladiator.health / 100);
    }

}


const startButton = document.getElementById("startButton");
const log = document.getElementById("log");


let gladiators = [];

// Battle start
async function startBattle() {
    startButton.disabled = true;
    log.innerHTML = "";

    gladiators = await fetchGladiators();
    logMessage("🏛️ Battle begins!");


    let battleInterval = setInterval(() => {
        let availableGladiators = gladiators.filter(g => g.health > 0);

        if (availableGladiators.length === 1) {
            logMessage(`🏆 ${availableGladiators[0].name} wins with health x${availableGladiators[0].health.toFixed(1)}.`);
            clearInterval(battleInterval);
            startButton.disabled = false;

            return;
        }

        availableGladiators.forEach(gladiator => {
            updateSpeed(gladiator);

            if (Math.random() < 1 / gladiator.speed) {
                let enemys = availableGladiators.filter(g => g !== gladiator);

                if (enemys.length > 0) {
                    let target = enemys[Math.floor(Math.random() * enemys.length)];
                    attack(gladiator, target);
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


startButton.addEventListener("click", () => startBattle());









