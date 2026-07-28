describe("canClassToDict", () => {
    class Person {
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }
    }

    class Car {
        constructor(make, model) {
            this.make = make;
            this.model = model;
        }
    }

    class Dog {
        constructor(name, breed) {
            this.name = name;
            this.breed = breed;
            this._age = 5;
        }
    }

    class EmptyClass {}

    class Student {
        constructor(name) {
            this.name = name;
            this.grade = "A";
        }
    }

    Student.schoolName = "Example School";

    test("person-style instance can be treated as a dictionary", () => {
        expect(canClassToDict(new Person("Alice", 30))).toBe(true);
    });

    test("regular class instance can be treated as a dictionary", () => {
        expect(canClassToDict(new Car("Toyota", "Corolla"))).toBe(true);
    });

    test("instance with private-like attribute can be treated as a dictionary", () => {
        expect(canClassToDict(new Dog("Buddy", "Golden Retriever"))).toBe(true);
    });

    test("empty class instance can be treated as a dictionary", () => {
        expect(canClassToDict(new EmptyClass())).toBe(true);
    });

    test("instance from class with class variable can be treated as a dictionary", () => {
        expect(canClassToDict(new Student("John"))).toBe(true);
    });

    test("primitive values cannot be treated as dictionaries", () => {
        expect(canClassToDict(42)).toBe(false);
        expect(canClassToDict("name")).toBe(false);
        expect(canClassToDict(null)).toBe(false);
        expect(canClassToDict([])).toBe(false);
    });
});
