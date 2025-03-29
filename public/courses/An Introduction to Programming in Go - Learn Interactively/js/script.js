// List of lessons (populated from provided filenames)
const lessons = [
    { title: "Lesson 1: Variables & Inferred Typing", file: "lessons_html/1_Variables___inferred_typing.html" },
    { title: "Lesson 2: Constants", file: "lessons_html/2_Constants.html" },
    { title: "Lesson 3: Printing", file: "lessons_html/3_Printing.html" },
    { title: "Lesson 4: Packages and Imports", file: "lessons_html/4_Packages_and_Imports.html" },
    { title: "Lesson 5: Code Location", file: "lessons_html/5_Code_Location.html" },
    { title: "Lesson 6: Exported Names", file: "lessons_html/6_Exported_names.html" },
    { title: "Lesson 7: Functions and Return Values", file: "lessons_html/7_Functions_and_Return_values.html" },
    { title: "Lesson 8: Pointers", file: "lessons_html/8_Pointers.html" },
    { title: "Lesson 9: Mutability", file: "lessons_html/9_Mutability.html" },
    { title: "Lesson 10: Quiz on Go Variables", file: "lessons_html/10_Quiz_on_Go_Variables.html" },
    { title: "Lesson 11: Basic Types", file: "lessons_html/11_Basic_Types.html" },
    { title: "Lesson 12: Type Conversion", file: "lessons_html/12_Type_Conversion.html" },
    { title: "Lesson 13: Type Assertion", file: "lessons_html/13_Type_Assertion.html" },
    { title: "Lesson 14: Structs", file: "lessons_html/14_Structs.html" },
    { title: "Lesson 15: Initializing", file: "lessons_html/15_Initializing.html" },
    { title: "Lesson 16: Composition vs Inheritance", file: "lessons_html/16_Composition_vs_Inheritance.html" },
    { title: "Lesson 17: Quiz on Types", file: "lessons_html/17_Quiz_on_Types.html" },
    { title: "Lesson 18: Exercise on Composition", file: "lessons_html/18_Exercise_on_Composition.html" },
    { title: "Lesson 19: Working with Arrays", file: "lessons_html/19_Working_with_arrays_.html" },
    { title: "Lesson 20: Slices in Go", file: "lessons_html/20_Slices_in_Go.html" },
    { title: "Lesson 21: Range in For Loops", file: "lessons_html/21_Range_in_for_loops.html" },
    { title: "Lesson 22: Maps in Go", file: "lessons_html/22_Maps_in_Go.html" },
    { title: "Lesson 23: Quiz on Collection Types", file: "lessons_html/23_Quiz_on_Collection_Types.html" },
    { title: "Lesson 24: Exercise on Maps", file: "lessons_html/24_Exercise_on_Maps.html" },
    { title: "Lesson 25: IF Statement", file: "lessons_html/25_IF_Statement.html" },
    { title: "Lesson 26: FOR Loop", file: "lessons_html/26_FOR_Loop.html" },
    { title: "Lesson 27: Switch Case Statement", file: "lessons_html/27_Switch_Case_Statement.html" },
    { title: "Lesson 28: Exercise on For Loops", file: "lessons_html/28_Exercise_on_For_Loops.html" },
    { title: "Lesson 29: Quiz on Control Flow", file: "lessons_html/29_Quiz_on_Control_Flow.html" },
    { title: "Lesson 30: Exercise on Control Flow", file: "lessons_html/30_Exercise_on_Control_Flow.html" },
    { title: "Lesson 31: Introduction", file: "lessons_html/31_Introduction.html" },
    { title: "Lesson 32: Code Organization", file: "lessons_html/32_Code_Organization.html" },
    { title: "Lesson 33: Type Aliasing", file: "lessons_html/33_Type_Aliasing.html" },
    { title: "Lesson 34: Method Receivers", file: "lessons_html/34_Method_Receivers.html" },
    { title: "Lesson 35: Quiz on Go Methods", file: "lessons_html/35_Quiz_on_Go_Methods.html" },
    { title: "Lesson 36: Introduction", file: "lessons_html/36_Introduction.html" },
    { title: "Lesson 37: Satisfying Interfaces", file: "lessons_html/37_Satisfying_Interfaces.html" },
    { title: "Lesson 38: Returning Errors", file: "lessons_html/38_Returning_Errors.html" },
    { title: "Lesson 39: Quiz on Go Interfaces", file: "lessons_html/39_Quiz_on_Go_Interfaces.html" },
    { title: "Lesson 40: Exercise on Errors", file: "lessons_html/40_Exercise_on_Errors.html" },
    { title: "Lesson 41: Concurrent Programming", file: "lessons_html/41_Concurrent_Programming.html" },
    { title: "Lesson 42: Goroutines", file: "lessons_html/42_Goroutines.html" },
    { title: "Lesson 43: Channels", file: "lessons_html/43_Channels.html" },
    { title: "Lesson 44: Channels Through Illustrations", file: "lessons_html/44_Channels_Through_Illustrations.html" },
    { title: "Lesson 45: Buffered vs Unbuffered Channels", file: "lessons_html/45_Buffered_vs__Unbuffered_Channels_as_Illustrations.html" },
    { title: "Lesson 46: Range and Close", file: "lessons_html/46_Range_and_close.html" },
    { title: "Lesson 47: Select", file: "lessons_html/47_Select.html" },
    { title: "Lesson 48: Quiz on Concurrency", file: "lessons_html/48_Quiz_on_Concurrency.html" },
    { title: "Lesson 49: Solved Exercise - Step by Step Guide", file: "lessons_html/49_Solved_Exercise__Step_by_Step_Guide.html" },
    { title: "Lesson 50: OSX", file: "lessons_html/50_OSX.html" },
    { title: "Lesson 51: Windows", file: "lessons_html/51_Windows.html" },
    { title: "Lesson 52: Linux", file: "lessons_html/52_Linux.html" },
    { title: "Lesson 53: Extras", file: "lessons_html/53_Extras.html" },
    { title: "Lesson 54: Coding Challenges", file: "lessons_html/54_Coding_Challenges.html" },
    { title: "Lesson 55: Get Your Feet Wet", file: "lessons_html/55_Get_Your_Feet_Wet.html" },
    { title: "Lesson 56: Tips for Importing Packages", file: "lessons_html/56_Tips_for_Importing_Packages.html" },
    { title: "Lesson 57: Tips on Maps & Errors", file: "lessons_html/57_Tips_on_Maps___Errors.html" },
    { title: "Lesson 58: Tips on Compiler Optimization", file: "lessons_html/58_Tips_on_Compiler_Optimization.html" },
    { title: "Lesson 59: Tips on Constants in Go", file: "lessons_html/59_Tips_on_Constants_in_Go.html" }
];

// Populate the sidebar

let currentIndex = 0; // Track current lesson index
const lessonList = document.getElementById("lesson-list");
const lessonFrame = document.getElementById("lesson-frame");
const prevButton = document.getElementById("prev-lesson");
const nextButton = document.getElementById("next-lesson");

// lessons.forEach(lesson => {
//     let li = document.createElement("li");
//     li.textContent = lesson.title;
//     li.addEventListener("click", () => {
//         lessonFrame.src = lesson.file; // Load lesson into iframe
//     });
//     lessonList.appendChild(li);
// });



// Function to load lesson
function loadLesson(index) {
    if (index >= 0 && index < lessons.length) {
        currentIndex = index;
        lessonFrame.src = lessons[index].file;
        updateButtons();
        updateSidebar();
    }
}

// Update sidebar highlight
function updateSidebar() {
    document.querySelectorAll("#lesson-list li").forEach((li, index) => {
        li.classList.toggle("active", index === currentIndex);
    });
}

// Populate sidebar with lessons
lessons.forEach((lesson, index) => {
    let li = document.createElement("li");
    li.textContent = lesson.title;
    li.addEventListener("click", () => loadLesson(index));
    lessonList.appendChild(li);
});

// Update navigation buttons
function updateButtons() {
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === lessons.length - 1;
}

// Event listeners for navigation
prevButton.addEventListener("click", () => loadLesson(currentIndex - 1));
nextButton.addEventListener("click", () => loadLesson(currentIndex + 1));

// Load the first lesson initially
loadLesson(0);