import { test, expect } from '@playwright/test';


test('test my first test', async () => {
  console.log("Hello world of tests");
});


test('test var, let and const', async () => {
  function varExample() {
    if (true) {
      var x = 10;
      console.log(x); // Output: 10
    }
    console.log(x); // Output: 10
  }
  function letExample() {
    if (true) {
      let y = 20;
      console.log(y); // Output: 20
    }
    // console.log(y); // ReferenceError: y is not defined
  }
  function constExample() {
    const z = 30;
    console.log(z); // Output: 30

    // z = 40; // TypeError: Assignment to constant variable
  }



});


test('test person class 0', async () => {
  class Person {

    name: string; // This is a public field by default
    constructor(name: string) {
      this.name = name;
    }
  }

  let person: Person = new Person("Itai");
  console.log(person.name);
});

test('test freate class with getter and setter', async () => {
  class Person {

    private _name: string;

    constructor(name: string) {
      this._name = name;
    }

    get name() {
      return this._name;
    }

    set name(name: string) {
      this._name = name;
    }
  }

  let person: Person = new Person("Itai");
  person.name = "Moshe";
  console.log(person.name);
});

test('test create class', async () => {
  class Person {
    constructor(public name: string) {
    }

  }

  let person: Person = new Person("Itai");
  console.log(person.name);
});

test('test relations between classes', async () => {
  class Person {
    constructor(public name: string) { }
  }
  class Shape {
    constructor(public name: string) { }
  }

  let shape: Shape = new Person("Itai");

});
test('test relalation between classes (inhertiance)', async () => {
  class Person {
    constructor(public name: string) { }

  }
  class Employee {
    constructor(public name: string, public role: string) { }
  }
  let person: Person = new Employee("Itai", "Developer");
});

test('test interfaces without implements', async () => {
  interface named {
    name: string;
  }
  class Person {
    constructor(public name: string) { }
  }
  function printName(obj: named) {
    console.log(obj.name);
  }
  let person: named = new Person("Itai");
  printName(person);
});

test('test promise example', async () => {
  function fetchData(): Promise<string> {
    return new Promise((resolve, reject) => {
      // Simulating an asynchronous operation (e.g., fetching data)
      setTimeout(() => {
        const success = true; // Simulating success or failure
        if (success) {
          resolve("Data fetched successfully");
        } else {
          reject("Error fetching data");
        }
      }, 2000);
    });
  }

  // Using the Promise
  fetchData()
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.error(error);
    });

});

test('test promise example 2', async () => {
  function fetchData(): Promise<string> {
    return new Promise((resolve, reject) => {
      // Simulating an asynchronous operation (e.g., fetching data)
      setTimeout(() => {
        const success = true; // Simulating success or failure
        if (success) {
          resolve("Data fetched successfully");
        } else {
          reject("Error fetching data");
        }
      }, 2000);
    });

    async function fetchDataAsync() {
      try {
        const result = await fetchData();
        console.log(result);
      } catch (error) {
        throw error;
      }
    }
    fetchDataAsync();
  }


});
