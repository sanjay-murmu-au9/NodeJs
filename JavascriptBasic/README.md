<!-- JavaScript Refresher Module;
# JS is a weakly typed Programming language, its an object oriented Programming langauge & 
its very versatile langauge.
 
# weakly type means :- No explicit type assignment;
			# Data types can be switched dynamically;

# object oriented Programming:- # Data can be origanized in logical objects.
			        # Primitive and reference type;
			      
	
its means data type can be switched dynamically;

=======================XXXXX===================================
# Puri function:-

var name = "Max";
var age = 29,
var hosHobbies = true;

function perifunction(userName,userAge, userHasHobby){
      return(
	 'Name is' + userAge + 'and the user has hobbies' + userHasHobby 
    );
} 

console.log(perifunction(name, age, hasHobbies));  --> Name is Max age is 29 and the user has hobbies: true.

<!-- ==============================XXX===================================
# Next jen JavaScripts syntax; 
var/let,
const:- never reassign again with same name;

# reference type:- 

# Rest & Spread Operator; 

# Spred Operaor --> Copy from reference value(obj, arr), and  does not disturb the original arr;

const person = {
	name:'Max',
	age: 29,
	greet(){
	  console.log('Hi, I am' + this.name);
	}
     };

const copiedPerson = {...person};
console.log(copiedPerson); ----> {name: 'Max', age: 29, greet:[function: greet]}

# Array;
const hobbies = ['sports','Cooking'];
const copiedArray = [...hobbies];
console.log(copiedArray); ----> ['sports','Cooking'];

----------------------------------------REST --------------------------------------

const toArray=(arg1, arg2, arg3)=>{
	return[arg1,arg2,arg3];
}

console.log(toArray(1,2,3)) ---> [1,2,3]


const toArray=(...args)=>{
	return args;
}

console.log(toArray(1,2,3,4)) --->[1,2,3,4]


------------------------XXX-----------------XXX-------------------------------
# Objects, Properties & Methods;
const person ={
	name : 'Max',
	age: 29,
	greet:function(){
	  console.log('Hi, I am' + this.name);  //--> this refer to the surrounding object 
	& . "dot" to access properties or methods;
       }
	//or
	greet(){
	  console.log('Hi, I am ' + this.name); // arry function will not work.
    }
 
};


person.greet() ---> Hi, I am Max;
====================Destructuring==========XXX================================
const person = {
	name:'Max',
	age:29,
	greet(){
	 console.log('Hi My name is'+ this.name + "I'm" + this.age);
    }
};

const printName = (personData) =>{
 console.log(personData.name);
}
or

const printName =({name})=>{  //-> destructure;
 console.log(name)
}

printName(person); //----> Max // ----> Max

//or
const {name,age} = person;
console.log(name,age) // ==>Max,29

or

const hobbies = ['Sports','Cooking'];
const [hobby1,hobby2] = hobbies;
console.log(hobby1,hobby2) // ---> Sports, Cooking

====================================XXXX======================================
const hobbies = ['Sports','Cooking'];
for(let hobby of hobbies){
	console.log(hobby); //-----> Sport, Cooking
  }

------------------------XXX-------------------------------XXX-----------------

hobbies.map(); --->Map allow you to transfer an array into new array without disturbing 		    
	existing array; Map take function to edit that arr or how to define the elements; 
    & that will be execute on every element in the arr. and return with the updated arr.

console.log(hobbies.map(hobby => 'Hobby: '+ hobby)); ---> ['Hobby: Sports', 'Hobby: Cooking']

console.log(hobbies);

const printName=(personData)=>{
	console.log(personData.name)
   }

-----------------------------------XXX--------------------------------XXX----------;
# Primitive Values				Reference Value
   a. String					 Object
   b. Number					 Array(part of object only)
   c. Bolloean
   d. Undefined
   e. Null
   f. Symbol

# STACK;  Primitive Values are store on STACK;	 
# Reference Value are store in HEAP Reference value :-
	(it can able to hold much more info. perfect for bigger amount of data & it take little bit time to access);

# When created object, value is store in the heap but reference to the Stack and it point to the variable, so whenever some thing is added it merge into the value object; 
							()
------------------------XXX-------------------XXX-----------------------;
printName(person); --------------> Max

------------destrucing syntex;

const printName=({name})=>{
	console.log(name)
   }

printName(person); --------------> Max;


const {name, age} = person;
console.log(name, age); ----------> Max 29

# same from Arr destructing;
const hobbies = ['Sports', 'Cooking'];
const [hobby1,hobby2] = hobbies;

console.log(hobby1,hobby2); ------------------> Sport Cooking  //--> no bracket


===============Async Code & Promises==========XXX=============;

Asynchronous code does not finish execute immediately take a little time, 

setTimeout(()=>{
   console.log('Timer is done');
},1000);

--------------------
//synchronous code
console.log('Hello!');
console.log(hi)

------------------------------------------
function fetchData(callback){
	setTimeout(()=>{
	 callback('Done!');
   },1500);
}; 

setTimeout(()=> {
   console.log('Timer is done!'); //// after 2 sec it is called,
   fetchData(text =>{console.log(text)}); // after 2 sec it is called,
},2000); 

console.log('Hello!');
console.log('Hi!');


--------Ans:---
Hello!
Hi!
Timer is done!
Done!


## Promises

function fetchData(){
	const promise = new Promise((resolve,reject)=>{ 

		setTimeout(()=>{
	          callback('Done!');
            },1500);
        });

       return promise;
     }; 

setTimeout(()=> {
   console.log('Timer is done!');
   fetchData()
     .then(text =>{
	console.log(text);
     return fetchData();
    })
      .then(text2 =>{
       console.log(text2) 
     });
 },2000);

console.log('Hello!');
console.log('Hi!');


Ans -->
	Hello!
	Hi!
	Timer is done!
	done!
	done!


==================




 --> -->
