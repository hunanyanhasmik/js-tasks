import { faker } from '@faker-js/faker';
import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());

function getRandomIntNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloatNum(min, max, decimals) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}

// Function to generate gladiators names

function generateGladiators(num) {
    return Array.from({ length: num }, () => ({
        name: faker.person.fullName(),
        health: getRandomIntNum(80, 100),
        power: getRandomFloatNum(2, 5, 1),
        initialSpeed: getRandomFloatNum(1, 5, 3),
    }));
}

app.get('/gladiators', (req, res) => {
    res.json(generateGladiators(5));
});

// Start the server

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
