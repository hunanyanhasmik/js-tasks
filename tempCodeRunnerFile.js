
function Person(name, age) {
    this.name = name;
    this.age = age;


    setInterval(() => {
        console.log(`${this.name} is ${this.age += 1} years old`);
    }, 1000);
}

const alex = new Person("Alex", 30);

console.log(alex)