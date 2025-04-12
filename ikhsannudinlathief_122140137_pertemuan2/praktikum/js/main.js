// Import dari module lain
import { formatDate, capitalizeString } from "./modules/utils.js";
import { sampleData } from "./modules/data.js";
import {
  demoVariables,
  demoArrowFunctions,
  demoTemplateLiterals,
  demoDestructuring,
  demoSpreadRest,
  demoDefaultParams,
  demoClasses,
  demoObjectLiterals,
  demoArrayMethods,
  demoAdvancedArrays,
  demoPromises,
  demoAsyncAwait,
} from "./app.js";

// DOM elements
const outputElement = document.getElementById("output");
const runButton = document.getElementById("runBtn");
const clearButton = document.getElementById("clearBtn");

// Fungsi untuk menambahkan output ke DOM
function addOutput(title, code, result) {
  const outputItem = document.createElement("div");
  outputItem.className = "output-item";

  const titleEl = document.createElement("div");
  titleEl.className = "output-title";
  titleEl.textContent = title;

  const codeEl = document.createElement("div");
  codeEl.className = "code";
  codeEl.textContent = code;

  const resultEl = document.createElement("div");
  resultEl.className = "result";

  if (typeof result === "object") {
    resultEl.textContent = JSON.stringify(result, null, 2);
  } else {
    resultEl.textContent = result;
  }

  outputItem.appendChild(titleEl);
  outputItem.appendChild(codeEl);
  outputItem.appendChild(resultEl);

  outputElement.appendChild(outputItem);
}

// Event listener untuk tombol Run
runButton.addEventListener("click", () => {
  clearOutput();
  runAllDemos();
});

// Event listener untuk tombol Clear
clearButton.addEventListener("click", clearOutput);

function clearOutput() {
  outputElement.innerHTML = "";
}

// Fungsi utama untuk menjalankan semua demo
function runAllDemos() {
  // Demo akan diimplementasikan pada langkah berikutnya
  console.log("Demo akan dijalankan di sini");
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  console.log("JavaScript Next Gen Demo Ready!");
});

// Fungsi utama untuk menjalankan semua demo
function runAllDemos() {
  // Demo Promises
  addOutput("11. Promises", "Penanganan operasi asinkron dengan Promise", "");
  const promiseOutput = demoPromises();
  document
    .querySelector(".output-item:last-child .result")
    .appendChild(promiseOutput);

  // Demo Async/Await
  addOutput(
    "12. Async/Await",
    "Penanganan operasi asinkron dengan syntax yang lebih bersih",
    ""
  );
  const asyncOutput = demoAsyncAwait();
  document
    .querySelector(".output-item:last-child .result")
    .appendChild(asyncOutput);
  // Demo Array Methods
  const arrayMethodsResults = demoArrayMethods();
  addOutput(
    "9. Modern Array Methods",
    "Higher-Order Functions pada array",
    `map: ${JSON.stringify(arrayMethodsResults.map)}
filter (evenNumbers): ${JSON.stringify(arrayMethodsResults.filter.evenNumbers)}
filter (activeUsers): ${arrayMethodsResults.filter.activeUsers}
find: ${JSON.stringify(arrayMethodsResults.find)}
some (hasAdult): ${arrayMethodsResults.some}
every (allAdults): ${arrayMethodsResults.every}
reduce (sum): ${arrayMethodsResults.reduce.sum}
reduce (oldest): ${arrayMethodsResults.reduce.oldest}
chaining (activeUsersNames): ${JSON.stringify(
      arrayMethodsResults.chaining.activeUsersNames
    )}
chaining (totalActiveAge): ${arrayMethodsResults.chaining.totalActiveAge}`
  );

  // Demo Advanced Arrays
  const advArraysResults = demoAdvancedArrays();
  addOutput(
    "10. Advanced Arrays",
    "Fitur array lanjutan",
    `Clone: ${JSON.stringify(advArraysResults.clone)}
Concat: ${JSON.stringify(advArraysResults.concat.combinedArrays)}
Array.from: ${JSON.stringify(advArraysResults.arrayFrom.withMapFn)}
Array.of: ${JSON.stringify(advArraysResults.arrayOf)}
flat: ${JSON.stringify(advArraysResults.flatAndFlatMap.flattened)}
deepFlat: ${JSON.stringify(advArraysResults.flatAndFlatMap.deepFlattened)}
flatMap: ${JSON.stringify(advArraysResults.flatAndFlatMap.flatMapped)}
includes: ${advArraysResults.includes}`
  );
  // Demo Default Parameters
  const defaultParamsResults = demoDefaultParams();
  addOutput(
    "6. Default Parameters",
    "Nilai default untuk parameter fungsi",
    `Old way: ${defaultParamsResults.oldWay}
Old way with params: ${defaultParamsResults.oldWayParams}
New way: ${defaultParamsResults.newWay}
New way with params: ${defaultParamsResults.newWayParams}
With expression: ${JSON.stringify(defaultParamsResults.withExpression)}
Using previous params: ${JSON.stringify(defaultParamsResults.usingPrevious)}`
  );

  // Demo Classes
  const classesResults = demoClasses();
  addOutput(
    "7. Classes",
    "Penggunaan class dan inheritance",
    `User: ${classesResults.user.info}
User created: ${classesResults.user.createdDate}
Admin: ${classesResults.admin.info}
Admin created: ${classesResults.admin.createdDate}
Admin has access: ${classesResults.admin.hasAccess}
user instanceof User: ${classesResults.isUserInstance}
admin instanceof User: ${classesResults.isAdminInstance}`
  );

  // Demo Enhanced Object Literals
  const objectLiteralsResults = demoObjectLiterals();
  addOutput(
    "8. Enhanced Object Literals",
    "Penulisan objek yang lebih ringkas",
    `Property shorthand: ${JSON.stringify(objectLiteralsResults.newWay)}
Method shorthand: ${objectLiteralsResults.methods.new}
Computed properties: ${JSON.stringify(objectLiteralsResults.computedProps)}
Dynamic properties: ${JSON.stringify(objectLiteralsResults.dynamicProps)}`
  );
  // Demo Destructuring
  const destructuringResults = demoDestructuring();
  addOutput(
    "4. Destructuring",
    "Ekstraksi nilai dari objek dan array",
    `Object basic: ${JSON.stringify(destructuringResults.objectBasic)}
Object renamed: ${JSON.stringify(destructuringResults.objectRenamed)}
Object default: ${destructuringResults.objectDefault}
Object nested: ${JSON.stringify(destructuringResults.objectNested)}
Array basic: ${JSON.stringify(destructuringResults.arrayBasic)}
Array skipped: ${destructuringResults.arraySkipped}
Array with rest: ${JSON.stringify(destructuringResults.arrayRest)}
Swapped variables: ${JSON.stringify(destructuringResults.swapped)}`
  );

  // Demo Spread dan Rest Operators
  const spreadRestResults = demoSpreadRest();
  addOutput(
    "5. Spread dan Rest Operators",
    "Pengggunaan ... untuk array dan objek",
    `Spread in array: ${JSON.stringify(spreadRestResults.spreadArray)}
Copy array: ${JSON.stringify(spreadRestResults.copyArray)}
Merged arrays: ${JSON.stringify(spreadRestResults.mergedArrays)}
Spread in object: ${JSON.stringify(spreadRestResults.spreadObject)}
Rest in function (sum): ${spreadRestResults.restSum}
Rest with regular params: ${JSON.stringify(spreadRestResults.restProcess)}`
  );

  // Demo Let dan Const
  const varResults = demoVariables();
  addOutput(
    "1. Let dan Const",
    "var vs let/const dan block scope",
    `var (function scope): ${varResults.oldVar}
    let (block scope): ${varResults.newLet}
    const (immutable): ${varResults.PI}
    const object (mutable content): ${JSON.stringify(varResults.user)}`
  );

  // Demo Arrow Functions
  const arrowResults = demoArrowFunctions();
  addOutput(
    "2. Arrow Functions",
    "Perbandingan fungsi reguler dan arrow functions",
    `Regular function: ${arrowResults.regularSum}
    Arrow function: ${arrowResults.arrowSum}
    Short arrow: ${arrowResults.shortArrowSum}
    No params: ${arrowResults.sayHello}
    Single param: ${arrowResults.square}`
  );

  // Demo Template Literals
  const templateResults = demoTemplateLiterals();
  addOutput(
    "3. Template Literals",
    "String concatenation vs template literals",
    `Old way: ${templateResults.oldWay}
    New way: ${templateResults.newWay}
    With expression: ${templateResults.expression}
    Multi-line: ${templateResults.multiLine}`
  );
}
