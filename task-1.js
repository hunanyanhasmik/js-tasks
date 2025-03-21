// Create a constructor function Person with name and age properties. 
// Upon creating a new instance, the person's age should
// automatically increase by 1 every second.


function Person(name, age) {
    this.name = name;
    this.age = age;


    setInterval(() => {
        console.log(`${this.name} is ${this.age} years old`);
    }, 1000);
}

const alex = new Person("Alex", 30);


// Create 4 instances of Person and store them in an array.


// example 1

let persons = [
    new Person("Joe", 18),
    new Person("Sara", 24),
    new Person("Will", 42),
    new Person("Natali", 35),
];


// example 2


const joe = new Person("Joe", 18);
const sara = new Person("Sara", 24);
const will = new Person("Will", 42);
const natali = new Person("Natali", 35);


const persons2 = [joe, sara, will, natali];


// Implement a function that checks every second:
// If any person in the array reaches age 40 or above, remove them.

function checkAgeAndRemovePerson() {
    const intervalId = setInterval(() => {
        persons = persons.filter(person => {
            if (person.age >= 40) {
                console.log(`${person.name} age is greater than 40 and he is removed.`);
                clearInterval(intervalId);
                return false;
            }
            return true;
        });
    }, 1000);
}

checkAgeAndRemovePerson();


// Implement another function that adds a new person every 2 seconds:
// The new person should have a random name and a random age between 1 and 50.


function addNewPerson() {
    setInterval(() => {
        const newPerson = new Person(getRandomName(), getRandomAge());
        persons.push(newPerson);

        console.log(`Person name - ${newPerson.name}, Person age - ${newPerson.age}`);
    }, 2000);
}

addNewPerson();

function getRandomName() {
    const names = ["Brian", "Jaiden", "Alexis", "Leonardo", "Santiago", "Francisco", "Cayden", "Shan", "Calvin", "Kai", "Drake", "Troy", "Zion", "Clayton", "Roberto", "Zane", "Gregory", "Tucker", "Rafael", "Kingston", "Dominick", "Ezekiel", "Griffin", "Devon", "Drew", "Lukas", "Johnny", "Ty", "Pedro", "Tyson", "Caiden", "Mateo", "Braylon", "Cash", "Aden", "Chance", "Taylor", "Marcos", "Maximus", "Ruben", "Emanuel", "Simon"];

    return names[Math.floor(Math.random() * names.length)];
}


function getRandomAge() {
    return Math.floor(Math.random() * 50) + 1;
}







