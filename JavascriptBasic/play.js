var name = "Sanjay Murmu";
let age = 23;
var hasHobbies = true;

age = 30;

// puri function which doesn't depend from outside the function
function summarizeUser(username, userAge, userHobbies) {
    return (
        'Name is ' +
        username +
        ', age is ' +
        userAge +
        ', and the user hobbies:' +
        userHobbies
    )
}
console.log(summarizeUser(name, age, hasHobbies)) // Name is Sanjay Murmu, age is 30, and the user hobbies:true

// anynomyns function 
const summarizeUser = function (username, userAge, userHobbies) {
    return (
        'Name is ' +
        username +
        ', age is ' +
        userAge +
        ', and the user hobbies:' +
        userHobbies
    )
}

console.log(summarizeUser(name, age, hasHobbies)) // Name is Sanjay Murmu, age is 30, and the user hobbies:true

// rewritin above function as Array function;
const summarizeUser = (username, userAge, userHobbies) => {
    return (
        'Name is' + username + ', age is' + userAge + ', and the user hobbies:' + userHobbies
    )

}

summarizeUser(name, age, hasHobbies) //=> 'Name is' + username + ', age is' + userAge + ', and the user hobbies:' + userHobbies


const addR = (a, b) => a + b;
console.log(add) // 3

const addOne = a => a + 1; // if you have one argument,eg(a) so paranthisis can be ommited;
console.log(addOne(1))  // 2

// array function with no argument; then you have to specify an empty pair;
const addRandom = () => 1 + 2;
console.log(addRandom()); // 3

// ===========XXXX=============
// Imprtant data structure you work with in javascript are objects.
const person = {
    name1: 'Sanjay Murmu',
    age: 23,

    // greet: () => {
    //     console.log(`Hi this is ${this.name1}`); // this refers to the global scope not this object.
    // },

    greet: function () {
        console.log(`Hi this is ${this.name1}`);
    },
    // or 
    greet1() {
        console.log('Hi this is' + this.name1);
    }
}

console.log(person.greet1()); // Hi this is Sanjay Murmu

// Another important crucial data structure are arrays; 
const hobbies = ['Sports', 'Cocking', true, 1];

for (const hobby of hobbies) {
    console.log(hobby);  // Sports Cocking true 1
}

// // map gives/ return new array;
console.log(hobbies.map(hobby => 'Hobby: ' + hobby + 'hello')); // ['Hobby: Sportshello', 'Hobby: Cockinghello', 'Hobby: truehello', 'Hobby: 1hello']
console.log(hobbies); // 'Sports', 'Cocking', true, 1

// while const value editing we don't get error, bcs the reference 
//types only store an address pointing at the place in memory where the 
// array is stored but the address has not changed by adding a new elements.
hobbies.push('programming');
console.log(hobbies) // ['Sports', 'Cocking', true, 1, 'programming']

const copiesArr = hobbies.slice(); // slice copy an array and also can be narray down only needed array.
console.log(copiesArr)// ['Sports', 'Cocking', true, 1]

const copiesArr = [hobbies]; // we created nested array;
console.log(copiesArr)  // [['Sports', 'Cocking', true, 1]]

const copiesArr = [...hobbies, hello = 'world']; // spread operators pull out all the element or property and add them one by one to the new array.
const copiesArr = { ...person }; // for objects
console.log(copiesArr) //['Sports', 'Cocking', true, 1, 'world']


//Reat Operator merge multiple arguments into an array, using it in the argument list of a function then it is rest operator. 
const totalArr = (...args) => {
    return args
}

console.log(totalArr(1, 2, 3, 4)); //[1, 2, 3, 4]

// destructuring
const person = {
    name: 'max',
    age: 29,
    greet() {
        console.log('Hi I am ' + this.name);
    }
};

const printName = (personData) => {
    console.log(personData.name);
}

printName(person); // max
// or 
const printName = ({ name }) => { // pulling out only  name
    console.log(name);
}
printName(person); // max

const { name, age } = person;  // outputing are retrived via object destructuring;
console.log(name, age); // max 29


///destructoring array
const hobbies = ['Sports', 'Cooking'];
const [hobby1, hobby2] = hobbies;
console.log(hobby1, hobby2); //Sports Cooking

// or
const person2 = {
    name: 'Sanjay Kr Murmu',
    age: 23,

    greet() {
        console.log(`Hi this is ${this.name}`);
    }
}

const { name, age } = person2;

console.log(name, age); // Sanjay Kr Murmu 23


// ================ASYNC =================

// async code doesn't exicute code immediatly; 
// node js and javascript does not block code execution untill that is done
// indeed here it will recognize this so -called callback;
// it will execute all the synchronous code and then execute async code once this is done.
setTimeout(() => {
    console.log('Timer is done!');
}, 1);

console.log('hello');
console.log('Hi!')

// ANS: - hello, Hi!, then Timer is done!




const fetchData = callback => {
    setTimeout(() => {
        callback('Done')
    }, 1500)
}

//sycnc code
setTimeout(() => {
    console.log('Timer is done');
    fetchData(text => {
        console.log(text);
    })
}, 2000)


console.log('Hello');
console.log('Hi');
// ==================Promise==================

const fetchData = () => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Done!')
        }, 1500)
    });

    return promise;
}

setTimeout(() => {
    console.log('TImer is done');

    fetchData()
        .then(text => {
            console.log(text);
            return fetchData();
        })
        .then(text2 => {
            console.log(text2);
        });
}, 2000);


// console.log('Hello');
// console.log('Hi');