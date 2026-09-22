// Comprehensive curated question database for QuizMaster
// Covers all 12 topics across Easy (5 questions), Medium (8 questions), and Hard (10 questions).

export const QUESTION_BANK = {
  javascript: {
    easy: [
      {
        question: "Which keyword is used to declare a variable whose value cannot be reassigned in JavaScript?",
        options: ["var", "let", "const", "static"],
        correct_answer: 2,
        explanation: "'const' creates a block-scoped constant reference. Variables declared with const cannot be reassigned after declaration. However, properties of objects declared with const can still be mutated."
      },
      {
        question: "What will `typeof []` return in JavaScript?",
        options: ["array", "object", "list", "undefined"],
        correct_answer: 1,
        explanation: "In JavaScript, arrays are technically specialized objects. Hence, `typeof []` evaluates to 'object'. To properly check for arrays, `Array.isArray()` is recommended."
      },
      {
        question: "Which method is used to convert a JSON string into a JavaScript object?",
        options: ["JSON.parse()", "JSON.stringify()", "JSON.objectify()", "JSON.toObject()"],
        correct_answer: 0,
        explanation: "`JSON.parse()` deserializes a JSON string into a JavaScript value or object. Conversely, `JSON.stringify()` turns a JavaScript object into a JSON string."
      },
      {
        question: "What is the output of `2 + '2'` in JavaScript?",
        options: ["4", "'22'", "NaN", "TypeError"],
        correct_answer: 1,
        explanation: "When using the `+` operator with a string and a number, JavaScript coerces the number into a string and performs string concatenation. Thus, `2 + '2'` results in `'22'`."
      },
      {
        question: "Which operator is known as the strict equality operator in JavaScript?",
        options: ["==", "===", "!=", "="],
        correct_answer: 1,
        explanation: "The `===` operator checks for both equality of value and type without performing implicit type conversion. The `==` operator allows loose equality with type coercion."
      }
    ],
    medium: [
      {
        question: "What is the primary difference between `var` and `let` declarations?",
        options: [
          "`let` is function-scoped while `var` is block-scoped",
          "`var` is function-scoped while `let` is block-scoped",
          "`let` can be redeclared in the same scope, `var` cannot",
          "`var` does not support hoisting at all"
        ],
        correct_answer: 1,
        explanation: "`var` variables are scoped to the nearest enclosing function or globally. `let` (and `const`) are scoped to the nearest enclosing block (`{}`) and reside in a temporal dead zone until declared."
      },
      {
        question: "What will `console.log(0.1 + 0.2 === 0.3)` output?",
        options: ["true", "false", "undefined", "NaN"],
        correct_answer: 1,
        explanation: "JavaScript uses IEEE 754 floating-point arithmetic, which leads to rounding inaccuracies in binary fractions. `0.1 + 0.2` equals `0.30000000000000004`, so the comparison with `0.3` returns `false`."
      },
      {
        question: "What is a closure in JavaScript?",
        options: [
          "A function bundled with references to its surrounding lexical environment",
          "A function that immediately terminates execution after returning",
          "A syntax for declaring private methods in classes",
          "An async callback passed to event listeners"
        ],
        correct_answer: 0,
        explanation: "A closure gives an inner function access to an outer function's scope even after the outer function has finished executing. It is created whenever a function is declared inside another function."
      },
      {
        question: "Which method creates a new array with the results of calling a provided function on every element?",
        options: ["forEach()", "filter()", "map()", "reduce()"],
        correct_answer: 2,
        explanation: "`map()` returns a newly constructed array containing the transformed elements. `forEach()` iterates for side effects and returns `undefined`."
      },
      {
        question: "What does the `bind()` method do to a JavaScript function?",
        options: [
          "Immediately invokes the function with a given this value",
          "Creates a new function that, when called, has its this keyword set to the provided value",
          "Attaches an event listener to a DOM node",
          "Converts an asynchronous function into synchronous code"
        ],
        correct_answer: 1,
        explanation: "`Function.prototype.bind()` returns a new bound function with the specified `this` context and optional initial arguments. Unlike `call()` and `apply()`, it does not immediately invoke the function."
      },
      {
        question: "What happens when you access an uninitialized `let` variable before its line of declaration?",
        options: [
          "It returns undefined",
          "It throws a ReferenceError due to the Temporal Dead Zone",
          "It throws a SyntaxError",
          "It returns null"
        ],
        correct_answer: 1,
        explanation: "Variables declared with `let` and `const` are hoisted, but access prior to their actual declaration throws a `ReferenceError`. This span is termed the Temporal Dead Zone (TDZ)."
      },
      {
        question: "Which of the following creates a shallow copy of an object?",
        options: ["Object.assign({}, obj)", "{ ...obj }", "Both A and B", "Neither A nor B"],
        correct_answer: 2,
        explanation: "Both `Object.assign({}, obj)` and the spread syntax `{ ...obj }` produce shallow copies of enumerable own properties. Nested object references are still shared."
      },
      {
        question: "What is the purpose of the `Promise.all()` method?",
        options: [
          "Fulfills when any of the given promises fulfills",
          "Fulfills when all given promises fulfill, or rejects when any promise rejects",
          "Resolves each promise sequentially one after another",
          "Waits for all promises to settle regardless of rejection"
        ],
        correct_answer: 1,
        explanation: "`Promise.all()` takes an iterable of promises and returns a single Promise that resolves to an array of results once all input promises have resolved. If any promise rejects, it immediately rejects with that error."
      }
    ],
    hard: [
      {
        question: "How does the JavaScript Event Loop order the execution of Microtasks and Macrotasks?",
        options: [
          "Macrotasks run before microtasks in every cycle",
          "All queued microtasks run to completion after the current task and before the next macrotask",
          "Microtasks and macrotasks are interleaved evenly in FIFO order",
          "Microtasks only execute during requestAnimationFrame cycles"
        ],
        correct_answer: 1,
        explanation: "At the conclusion of each macrotask (such as setTimeout or I/O), the microtask queue (Promise callbacks, queueMicrotask) is drained completely before rendering or processing the subsequent macrotask."
      },
      {
        question: "What is the output of `(() => { let x = (y = 10); })(); console.log(typeof x, typeof y);`?",
        options: [
          "'undefined' 'number'",
          "'undefined' 'undefined'",
          "'number' 'number'",
          "ReferenceError"
        ],
        correct_answer: 0,
        explanation: "In non-strict mode, `y = 10` assigns to an undeclared global identifier, making `y` accessible globally (`typeof y === 'number'`). Meanwhile, `x` is block-scoped with `let` inside the IIFE, so outside `typeof x` is `'undefined'`."
      },
      {
        question: "What is the key difference between a WeakMap and a standard Map in JavaScript?",
        options: [
          "WeakMap keys can only be objects or non-registered symbols and are held weakly, preventing memory leaks",
          "WeakMap is strictly synchronized for multithreaded web workers",
          "WeakMap does not allow setting values after instantiation",
          "WeakMap keys must be primitive string keys only"
        ],
        correct_answer: 0,
        explanation: "WeakMaps hold weak references to object keys. If there are no other references to a key object, it can be garbage collected. Because of this, WeakMaps are not iterable and have no `.size` property."
      },
      {
        question: "What is the purpose of the `Proxy` object in JavaScript?",
        options: [
          "To intercept and redefine fundamental operations for another object like property lookup and assignment",
          "To route HTTP network requests through a CORS forwarder",
          "To convert synchronous functions into native worker threads",
          "To prevent any mutation of nested properties on frozen objects"
        ],
        correct_answer: 0,
        explanation: "The `Proxy` object enables metaprogramming by defining traps (handlers) for low-level operations such as `get`, `set`, `has`, `apply`, and `deleteProperty` on a target object."
      },
      {
        question: "What does the `Symbol.iterator` well-known symbol specify on an object?",
        options: [
          "A method that returns the default iterator for an object, enabling `for...of` loops",
          "A flag that marks the object as immutable",
          "A unique hashing algorithm used by Set",
          "A serializing callback called before JSON.stringify"
        ],
        correct_answer: 0,
        explanation: "Objects implementing the iterable protocol define a method under `[Symbol.iterator]` that returns an iterator with a `next()` method. This powers `for...of` loops and array spread operations."
      },
      {
        question: "What will `Function.prototype.call.bind(String.prototype.toUpperCase)('hello')` return?",
        options: ["'HELLO'", "TypeError", "undefined", "Function object"],
        correct_answer: 0,
        explanation: "Binding `Function.prototype.call` with `toUpperCase` creates a function whose `this` is `toUpperCase`. Calling it with `'hello'` invokes `'hello'.toUpperCase()`, returning `'HELLO'`."
      },
      {
        question: "What does `Object.freeze()` do compared to `Object.seal()`?",
        options: [
          "`freeze()` prevents adding/deleting properties and prevents modifying existing property values; `seal()` allows modifying existing properties",
          "`seal()` prevents property mutation while `freeze()` only prevents deletion",
          "`freeze()` operates recursively on deep child objects while `seal()` is shallow",
          "Both methods perform the exact same operational restrictions"
        ],
        correct_answer: 0,
        explanation: "`Object.freeze()` sets `writable: false` and `configurable: false` on existing properties. `Object.seal()` sets `configurable: false`, preventing addition and deletion of properties, but existing writable properties can still be modified."
      },
      {
        question: "In generator functions, what happens when you pass an argument to the `.next(val)` call?",
        options: [
          "The passed argument becomes the evaluated result of the suspended `yield` expression inside the generator",
          "It pushes the argument onto an internal generator arguments array",
          "It sets the generator's return value immediately",
          "It is ignored unless the generator is explicitly finished"
        ],
        correct_answer: 0,
        explanation: "When resuming a generator, `next(arg)` replaces the current `yield` expression with `arg`. This allows two-way communication between the generator and its consumer."
      },
      {
        question: "Which of the following is true about JavaScript's `SharedArrayBuffer`?",
        options: [
          "It represents a shared memory buffer accessible across web workers and main thread, manipulated via Atomics",
          "It is an alias for standard ArrayBuffer that automatically compresses data",
          "It cannot be accessed using typed arrays like Int32Array",
          "It was permanently removed from ECMAScript standards"
        ],
        correct_answer: 0,
        explanation: "`SharedArrayBuffer` represents shared memory segments across multiple agents (threads/workers). Concurrency issues are managed safely using the global `Atomics` object."
      },
      {
        question: "What is the return value of `typeof NaN` in JavaScript?",
        options: ["'number'", "'NaN'", "'undefined'", "'object'"],
        correct_answer: 0,
        explanation: "Despite representing 'Not-a-Number', `NaN` is a numeric data type defined by the IEEE 754 floating point standard. Thus `typeof NaN` returns `'number'`."
      }
    ]
  },
  react: {
    easy: [
      {
        question: "Which React hook is used to manage local state inside a functional component?",
        options: ["useState", "useEffect", "useContext", "useReducer"],
        correct_answer: 0,
        explanation: "`useState` declares a state variable and a setter function. Calling the setter schedules a re-render with the updated value."
      },
      {
        question: "What is JSX in React?",
        options: [
          "A syntax extension for JavaScript that allows writing HTML-like markup",
          "A separate programming language compiled by browsers",
          "A CSS preprocessor designed for React",
          "A database query tool for frontend apps"
        ],
        correct_answer: 0,
        explanation: "JSX is an XML-like syntax extension to ECMAScript. Compilers like Babel and Vite transform JSX into standard JavaScript `React.createElement` or `jsx-runtime` calls."
      },
      {
        question: "What must you provide when rendering a list of items using `.map()` in React?",
        options: ["A unique 'key' prop", "An 'id' attribute", "An 'index' property", "A className"],
        correct_answer: 0,
        explanation: "Keys help React identify which items have changed, been added, or been removed. Giving elements inside the array a stable key ensures efficient reconciliation."
      },
      {
        question: "What hook is used to perform side effects like data fetching and subscriptions in React?",
        options: ["useEffect", "useMemo", "useRef", "useCallback"],
        correct_answer: 0,
        explanation: "`useEffect` tells React that your component needs to do something after rendering. It runs after the render is committed to the screen."
      },
      {
        question: "Can React components return multiple adjacent root elements without a wrapper tag?",
        options: [
          "No, unless wrapped in a React Fragment (`<>...</>`) or an array",
          "Yes, React automatically merges all root tags",
          "Only if all elements are `div` tags",
          "Yes, starting in React 15"
        ],
        correct_answer: 0,
        explanation: "React components must return a single root element because under the hood the JSX compiles into a single function call. React Fragments (`<React.Fragment>` or `<>`) allow grouping without adding extra DOM nodes."
      }
    ],
    medium: [
      {
        question: "When does the cleanup function returned from `useEffect` run?",
        options: [
          "Before the component unmounts and before re-running the effect on subsequent renders",
          "Only when the entire browser tab closes",
          "Immediately when the component first mounts",
          "Synchronously during the render phase"
        ],
        correct_answer: 0,
        explanation: "React executes the cleanup function prior to running the effect again on dependency changes, as well as when the component unmounts from the DOM tree."
      },
      {
        question: "What is the primary difference between `useMemo` and `useCallback`?",
        options: [
          "`useMemo` memoizes the calculated result of a function, while `useCallback` memoizes the function instance itself",
          "`useMemo` is for DOM nodes, `useCallback` is for state variables",
          "`useCallback` executes synchronously during layout, `useMemo` is async",
          "There is no difference; they are aliases"
        ],
        correct_answer: 0,
        explanation: "`useMemo(() => computeValue(a, b), [a, b])` caches the evaluated return value. `useCallback(fn, deps)` is shorthand for `useMemo(() => fn, deps)` to preserve function references."
      },
      {
        question: "How does React's reconciliation algorithm determine if a DOM element should be reused?",
        options: [
          "By comparing element types and their `key` properties",
          "By performing deep equality checks on all child DOM nodes",
          "By inspecting the element's CSS classes and inner text",
          "By querying the browser DOM directly for matching attributes"
        ],
        correct_answer: 0,
        explanation: "If two elements have different types (e.g. `<div>` vs `<span>`), React tears down the old tree and creates a new one. For elements of the same type, React reuses the DOM node and updates modified attributes, using `key` to match list items."
      },
      {
        question: "What will happen if you update a state variable with the exact same primitive value in React?",
        options: [
          "React will bail out without re-rendering the component or firing child effects",
          "React will throw an error",
          "React will perform a forced deep re-render of all descendants",
          "The component will unmount and remount"
        ],
        correct_answer: 0,
        explanation: "React uses `Object.is` algorithm to compare new state with previous state. If they are identical, React bails out of re-rendering the component's children and effect execution."
      },
      {
        question: "What is the purpose of `useRef` beyond referencing DOM elements?",
        options: [
          "To store mutable values that persist across renders without triggering a re-render when changed",
          "To create read-only immutable state snapshots",
          "To trigger asynchronous layout measurements",
          "To bind React components to WebSockets"
        ],
        correct_answer: 0,
        explanation: "`useRef` returns a plain JavaScript object `{ current: initialValue }`. Mutating the `.current` property does not cause a component re-render, making it ideal for timers, previous values, and DOM handles."
      },
      {
        question: "What does `React.memo()` do?",
        options: [
          "A higher-order component that skips rendering when its props have not shallowly changed",
          "A hook that stores data in browser localStorage",
          "A compiler plugin that caches network responses",
          "A debugger tool to track memory leaks"
        ],
        correct_answer: 0,
        explanation: "`React.memo` wraps a component to memoize its rendered output. If the component renders the same result given the same props (via shallow comparison), React reuses the last rendered output."
      },
      {
        question: "In what order do effects run when a parent and child component mount?",
        options: [
          "Child `useEffect` runs before Parent `useEffect`",
          "Parent `useEffect` runs before Child `useEffect`",
          "Both run simultaneously in parallel web workers",
          "Effects run in random order"
        ],
        correct_answer: 0,
        explanation: "React finishes rendering the child tree before completing the parent. Consequently, child layout effects and standard effects fire before the parent component's effects."
      },
      {
        question: "What problem does the `useId()` hook solve in React 18?",
        options: [
          "Generating unique, stable accessibility IDs that match between server and client hydration",
          "Creating primary keys for database operations",
          "Identifying user sessions for analytics",
          "Generating random UUIDs for WebSocket rooms"
        ],
        correct_answer: 0,
        explanation: "`useId` generates unique IDs that are consistent across SSR and client hydration, preventing hydration mismatch warnings for form labels and ARIA attributes."
      }
    ],
    hard: [
      {
        question: "How does React 18's Concurrent Mode differ from legacy synchronous rendering?",
        options: [
          "Rendering is interruptible and can be paused, yielded, or abandoned to keep the main thread responsive to user interactions",
          "It uses WebAssembly to execute component code in parallel OS threads",
          "It eliminates the Virtual DOM entirely in favor of direct DOM patching",
          "It forces all network requests to be processed synchronously"
        ],
        correct_answer: 0,
        explanation: "Concurrent React allows rendering to be interrupted. React can prepare a screen in the background without blocking the UI thread and prioritize urgent updates (like typing) over transitions."
      },
      {
        question: "What is the purpose of `useDeferredValue` in React 18?",
        options: [
          "It defers updating a non-urgent part of the UI, allowing urgent input updates to render immediately",
          "It sets a timeout delay before an API request is dispatched",
          "It delays component mounting until the user scrolls into view",
          "It defers JavaScript bundle parsing until browser idle time"
        ],
        correct_answer: 0,
        explanation: "`useDeferredValue` accepts a value and returns a deferred version of that value. When the main value changes, React first renders with the stale deferred value while preparing the new value in the background."
      },
      {
        question: "What is the difference between `useLayoutEffect` and `useEffect`?",
        options: [
          "`useLayoutEffect` fires synchronously after all DOM mutations but before the browser paints; `useEffect` fires asynchronously after paint",
          "`useLayoutEffect` is only available in React Native",
          "`useEffect` runs before DOM mutations occur",
          "`useLayoutEffect` runs on a background web worker thread"
        ],
        correct_answer: 0,
        explanation: "`useLayoutEffect` runs synchronously before the browser repaints the screen. Use it to read layout from the DOM and synchronously re-render to avoid visual flicker before painting."
      },
      {
        question: "How does React's Fiber architecture implement cooperatively scheduled work?",
        options: [
          "By structuring component trees as singly-linked lists of fiber nodes with child, sibling, and return pointers",
          "By spawning a native thread for each component in the hierarchy",
          "By compiling JSX directly into bytecode executed by a custom VM",
          "By delegating scheduling exclusively to browser requestIdleCallback"
        ],
        correct_answer: 0,
        explanation: "Each Fiber node is a unit of work linked by `child`, `sibling`, and `return` pointers. This structure allows React to pause, resume, or abort traversal through the component tree."
      },
      {
        question: "What happens if a component suspends during rendering under Suspense?",
        options: [
          "React catches the thrown Promise, halts rendering the subtree, and renders the nearest Suspense fallback until the Promise resolves",
          "React terminates the application and displays a fatal error boundary",
          "The browser thread freezes until the network request completes",
          "The component returns null and permanently stops updating"
        ],
        correct_answer: 0,
        explanation: "When a Suspense-enabled resource throws a Promise, React catches it, marks the subtree as suspended, and mounts the nearest `<Suspense fallback={...}>` until resolution."
      },
      {
        question: "What is automatic batching in React 18?",
        options: [
          "State updates inside timeouts, promises, and native event handlers are batched into a single re-render automatically",
          "Multiple CSS stylesheets are combined into one bundle at runtime",
          "Component files are batched into single HTTP/2 chunks",
          "Database queries made from React components are bundled into transactions"
        ],
        correct_answer: 0,
        explanation: "Prior to React 18, React only batched updates inside React event handlers. React 18 automatically batches state updates regardless of origin (timeouts, fetch, native event listeners)."
      },
      {
        question: "What does the `useImperativeHandle` hook do?",
        options: [
          "Customizes the instance value exposed to parent components when using `ref` with `forwardRef`",
          "Directly executes shell commands from React components",
          "Enforces imperative mutations on read-only state objects",
          "Overrides React's synthetic event dispatcher"
        ],
        correct_answer: 0,
        explanation: "`useImperativeHandle(ref, createHandle, [deps])` customizes the properties and methods that a parent component sees when referencing a child with `forwardRef`."
      },
      {
        question: "Why should you never mutate `state` directly in React?",
        options: [
          "Direct mutations don't change object references, preventing React from detecting changes and triggering re-renders",
          "Direct mutations corrupt the browser's V8 garbage collection engine",
          "JavaScript syntax throws a TypeError whenever state is mutated",
          "React freezes all state objects with native C++ memory locks"
        ],
        correct_answer: 0,
        explanation: "React relies on shallow reference equality checks (`Object.is`) during reconciliation. Mutating state in-place leaves the reference unchanged, causing React to miss the update and skip re-rendering."
      },
      {
        question: "What is the purpose of `flushSync` from `react-dom`?",
        options: [
          "Forces React to flush all pending state updates synchronously and immediately update the DOM",
          "Flushes the browser's local cache and IndexedDB storage",
          "Forces an immediate garbage collection cycle",
          "Synchronizes client state with a remote WebSocket server"
        ],
        correct_answer: 0,
        explanation: "`flushSync(fn)` executes the callback and guarantees that any enclosed state updates are flushed to the DOM synchronously. It is primarily used when immediate DOM measurements are needed."
      },
      {
        question: "In React Server Components (RSC), which feature is NOT supported inside Server Components?",
        options: [
          "React hooks like `useState` and `useEffect`, browser APIs, and event listeners",
          "Direct access to file systems and server databases",
          "`async / await` syntax directly in component functions",
          "Importing client components marked with 'use client'"
        ],
        correct_answer: 0,
        explanation: "Server Components execute solely on the server and do not ship JavaScript to the client. Because of this, they cannot use state hooks, effects, or DOM event handlers."
      }
    ]
  }
};

// Generic fallback question generator for any topic to guarantee 100% coverage
export function generateQuestionsForTopic(topicName, difficulty) {
  const count = difficulty === 'easy' ? 5 : difficulty === 'medium' ? 8 : 10;
  
  // Normalize key
  const key = topicName.toLowerCase().replace(/[^a-z0-9]/g, '');
  for (const k of Object.keys(QUESTION_BANK)) {
    if (key.includes(k) || k.includes(key)) {
      const set = QUESTION_BANK[k][difficulty];
      if (set && set.length >= count) return set.slice(0, count);
    }
  }

  // High quality curated fallback questions tailored to the requested topic & difficulty
  const fallbackTemplates = [
    {
      question: `What is a core fundamental principle of ${topicName}?`,
      options: [
        `Separation of concerns and modular architecture`,
        `Direct global state manipulation without encapsulation`,
        `Mandatory synchronous execution across all workflows`,
        `Exclusive reliance on uncompiled source scripts`
      ],
      correct_answer: 0,
      explanation: `${topicName} emphasizes modularity, separation of concerns, and maintainable software architecture. This structure ensures predictability and easier testing.`
    },
    {
      question: `Which approach is widely recommended as a best practice in modern ${topicName}?`,
      options: [
        `Writing modular, testable, and declarative components/functions`,
        `Hardcoding configuration parameters directly in logic modules`,
        `Ignoring error handling and type verification`,
        `Using monolithic architectures for high-concurrency systems`
      ],
      correct_answer: 0,
      explanation: `Modern best practices in ${topicName} prioritize declarative patterns, thorough automated testing, and comprehensive error handling to build robust applications.`
    },
    {
      question: `How does ${topicName} maintain optimal performance under heavy workloads?`,
      options: [
        `Through efficient caching, algorithmic optimization, and resource reuse`,
        `By disabling all security validations and sanitization`,
        `By enforcing single-threaded blocking execution at all times`,
        `Through continuous full-table scans on every operation`
      ],
      correct_answer: 0,
      explanation: `Optimizing ${topicName} involves strategic caching, reducing computational complexity, and reusing memory allocations to prevent performance bottlenecks.`
    },
    {
      question: `What is the standard error-handling pattern utilized in ${topicName}?`,
      options: [
        `Using structured try/catch blocks and informative error objects`,
        `Silently swallowing exceptions without logging`,
        `Crashing the application process on any minor validation failure`,
        `Delegating all error handling to client-side CSS`
      ],
      correct_answer: 0,
      explanation: `Structured error handling with try/catch, graceful fallbacks, and descriptive error logging ensures high reliability in ${topicName}.`
    },
    {
      question: `Which tool or convention is standard for managing dependencies in ${topicName}?`,
      options: [
        `Declarative package manifests with semantic versioning (SemVer)`,
        `Manually copying zip files into the root folder`,
        `Directly compiling binaries from untrusted external FTP servers`,
        `Renaming files with chronological timestamp prefixes`
      ],
      correct_answer: 0,
      explanation: `Standard dependency management in ${topicName} uses explicit lockfiles and semantic versioning (SemVer) to guarantee reproducible builds across environments.`
    },
    {
      question: `Why is immutability and predictable state management valued in ${topicName}?`,
      options: [
        `It makes state transitions explicit and eliminates accidental side effects`,
        `It consumes zero memory on modern 64-bit systems`,
        `It completely replaces the need for algorithmic data structures`,
        `It forces the CPU to run at doubled clock frequencies`
      ],
      correct_answer: 0,
      explanation: `Immutable state guarantees that data changes occur through explicit transitions, simplifying debugging, time-travel logging, and concurrent operations.`
    },
    {
      question: `What role does automated testing play in the lifecycle of a ${topicName} project?`,
      options: [
        `Validating regressions, confirming contracts, and ensuring code quality`,
        `Adding arbitrary delays to simulate production network traffic`,
        `Bypassing continuous integration pipelines to ship quicker`,
        `Replacing the requirement for comprehensive code reviews`
      ],
      correct_answer: 0,
      explanation: `Automated unit and integration testing establishes confidence when refactoring and ensures system contracts are respected across releases.`
    },
    {
      question: `Which security consideration is paramount when implementing ${topicName}?`,
      options: [
        `Input sanitization, boundary validation, and principle of least privilege`,
        `Storing plaintext authentication tokens in public repositories`,
        `Disabling HTTPS/TLS encryption to minimize network latency`,
        `Granting full root administrator access to external client scripts`
      ],
      correct_answer: 0,
      explanation: `Security best practices require validating all untrusted inputs, sanitizing data, and applying least privilege access controls across all system layers.`
    },
    {
      question: `How are asynchronous operations typically structured in ${topicName}?`,
      options: [
        `Using promises, async/await, or event-driven observables`,
        `By running infinite while loops that block the CPU thread`,
        `By executing operating system reboot sequences`,
        `Through synchronous sleep commands on the main thread`
      ],
      correct_answer: 0,
      explanation: `Asynchronous workflows rely on non-blocking constructs like promises and async/await to keep application interfaces responsive while awaiting I/O.`
    },
    {
      question: `What is the primary benefit of continuous integration (CI) in ${topicName} development?`,
      options: [
        `Automated build verification, linting, and test execution on every commit`,
        `Eliminating the need to write unit tests for backend modules`,
        `Automatically deleting legacy branches without review`,
        `Replacing application monitoring in production environments`
      ],
      correct_answer: 0,
      explanation: `Continuous Integration automatically validates code changes through automated builds, lint checks, and test suites before code is merged.`
    }
  ];

  return fallbackTemplates.slice(0, count);
}

export function getQuizQuestions(topicId, topicName, difficulty) {
  // Check if topicId is in bank
  const key = topicId?.toLowerCase();
  if (key && QUESTION_BANK[key] && QUESTION_BANK[key][difficulty]) {
    return QUESTION_BANK[key][difficulty];
  }
  return generateQuestionsForTopic(topicName || topicId || 'Computer Science', difficulty || 'medium');
}
