//Lab Week 2

//Use Visual Studio Code (VSCode) for these exercises
//VSCode format shortcut: Shift + Option + F (Mac) and Shift + Alt + F (Windows)

//Start node in the command line app (Terminal on Mac). Test your solutions in command-line node by copying parts of your code from VSCode 
//and pasting them in node command-line app. You can copy/paste several lines at a time.

//If you want to run an entire nodeJS file, exit the command-line node (Ctrl + D), and type: node yourfilename.js

//Exercises

//1. Create an object "user" containing information about the user's: 
//	- first name
//	- last name
//	- department
//	- campus

class User {
    // constructor(firstName, lastName, department, campus, university) {
    //     this.firstName = firstName;
    //     this.lastName = lastName;
    //     this.department = department;
    //     this.campus = campus;
    //     this.university = university;
    // }
    constructor(obj) {
        this.firstName = obj.firstName;
        this.lastName = obj.lastName;
        this.department = obj.department;
        this.campus = obj.campus;
        this.university = obj.university;
    }

    isTermCoop(year, term) {
        if (year === 1 && term === "S" || year === 2 && term === "W") {
            return true;
        }
        return false;
    }
}

var user = new User({
    firstName: 'First',
    lastName: 'Last',
    department: 'dep',
    campus: 'campus',
    university: 'university',
});

//2. Change the value of "department".

user.department = "MGMT";

//3. Delete the attribute "campus" (both key and value).

delete user.campus;

//4. Add new attribute "university" and assign to it a value of your choice.

user.university = "UW";

//5. Write a one-line statement to get the list of attribute names (i.e. keys).

const userKeys = Object.keys(user);

//6. Write a one-line statement to count the number of attributes the object "user" has.

const userNumberOfKeys = userKeys.length+1;

//7. Write a for...in loop to achieve the same result as in Exercise #5.

var counter = 0;
for (key in user) {
    counter++;
}

//8. Write a method "isTermCoop" for object "user". The method will take two arguments (year, term) and will calculate 
// whether the user is on co-op term or not. The method should return a Boolean variable (true, false). The logic for the 
// calculation is as follows:
//
// - year 1, term "S" --> co-op;
// - year 2, term "W" --> co-op;
// - everything else --> not coop.
//
// Call this method with various parameters. What do you see?

var isTermCoop = user.isTermCoop(1, "F");
var isTermCoop = user.isTermCoop(1, "S");

//9. Create a second object "user2" with the same keys as "user", but different values. Create an array "users" containing objects "user" and "user2". 
//How would you print to console the value of a given attribute (e.g., "lastName") of the second element of the array?

var user2 = new User({
    firstName: 'First2',
    lastName: 'Last2',
    department: 'dep2',
    campus: 'campus2',
    university: 'university2',
});

var users = [user, user2];

console.log(users[1].lastName);

//10. Create a prototype class "student" with attributes: 
//firstName: ""
//lastName: ""
//program: "",
//year: 1,
//term: 'F', 
//university: "University of Waterloo",
//
//and the following methods: 
//startNewTerm(year, term), which will assign new values to "year" and "term" attributes
//isTermCoop(year, term). Keep this method as a placeholder only (throw an error if called). See Slide 15 on Lect_2-1.pdf.

//Note: You can use either ES5 (function) or ES6 (class declaration). See two examples in the file ES5_vs_ES6_syntax.js posted on Learn.

class Student extends User {
    constructor(obj) {
        super(obj);
    }
    startNewTerm(year, term) {
        this.year = year;
        this.term = term;
    }
    isTermCoop(year, term) {
        throw new Error("Function cannot be called")
    }
}

//11. Create an instance (object) of "student" class. 
//a) Call "startNewTerm(year, term)" method.
//b) Call "isTermCoop(year, term)" method. What do you see? 

var userX = new Student({
    firstName: 'First2',
    lastName: 'Last2',
    department: 'dep2',
    campus: 'campus2',
    university: 'university2',
});

userX.startNewTerm(3, 'A');
// userX.isTermCoop();

//12. Create a subclass "MEngStudent" which will inherit the prototype of "student". See Slide 16.
//Extend this class by defining a new isTermCoop(year, term) method, following the logic in Exercise #8 above.

function MEngStudent(obj) {
    this.user = new Student(obj)

    isTermCoop = function(year, term) {
        return (year === 1 && term === "S" || year === 2 && term === "W") ? true : false;
    }
}

MEngStudent.prototype = userMEng;
MEngStudent.prototype.__proto__ = Student.prototype; 

//13. Create an instance (object) of "MengStudent" class, and assign specific values to attributes. Call the methods "startNewTerm()", "isTermCoop(year, term)".
//What do you see?

var userMEng = new MEngStudent({
    firstName: 'First2',
    lastName: 'Last2',
    department: 'dep2',
    campus: 'campus2',
    university: 'university2',
});

userMEng.isTermCoop(1, 'S');

console.log(userMEng.isTermCoop)

