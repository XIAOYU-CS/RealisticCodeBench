package org.real.temp;

import org.junit.Test;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;
import static org.real.temp.Answer.canClassToDict;

public class Tester {
    static class Person {
        String name;
        int age;

        Person(String name, int age) {
            this.name = name;
            this.age = age;
        }
    }

    static class Car {
        String make;
        String model;

        Car(String make, String model) {
            this.make = make;
            this.model = model;
        }
    }

    static class Dog {
        String name;
        String breed;
        private int age = 5;

        Dog(String name, String breed) {
            this.name = name;
            this.breed = breed;
        }
    }

    static class EmptyClass {
    }

    static class Student {
        static String schoolName = "Example School";
        String name;
        String grade = "A";

        Student(String name) {
            this.name = name;
        }
    }

    @Test
    public void personStyleInstanceCanBeTreatedAsDictionary() {
        assertTrue(canClassToDict(new Person("Alice", 30)));
    }

    @Test
    public void regularClassInstanceCanBeTreatedAsDictionary() {
        assertTrue(canClassToDict(new Car("Toyota", "Corolla")));
    }

    @Test
    public void instanceWithPrivateAttributeCanBeTreatedAsDictionary() {
        assertTrue(canClassToDict(new Dog("Buddy", "Golden Retriever")));
    }

    @Test
    public void emptyClassInstanceCanBeTreatedAsDictionary() {
        assertTrue(canClassToDict(new EmptyClass()));
    }

    @Test
    public void instanceFromClassWithClassVariableCanBeTreatedAsDictionary() {
        assertTrue(canClassToDict(new Student("John")));
    }

    @Test
    public void primitivesCannotBeTreatedAsDictionaries() {
        assertFalse(canClassToDict(42));
        assertFalse(canClassToDict("name"));
        assertFalse(canClassToDict(null));
    }
}
