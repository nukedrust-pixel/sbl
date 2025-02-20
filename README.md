```markdown
# SquareBracketLang (SBL)

SquareBracketLang (SBL) is a simple, interpreted programming language that uses square brackets as its primary syntax element. This repository contains the SBL compiler and web-based editor.

## Features

- Simple syntax using square brackets
- Web-based editor with syntax highlighting
- Compilation to JavaScript
- Ability to create executable files

## Language Syntax

SBL uses the following basic syntax:

- Variables: `[var] [name] = [value]`
- Print: `[print] [value]`
- If statements: `[if] [condition] then [action]`
- Loops: `[repeat] [times] do [action]`

Example:

```
[var] [greeting] = [Hello, World!]
[print] [greeting]
[if] [1 === 1] then [Condition is true]
[repeat] do [This is a loop]
```

## Setup

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Install Nexe globally:
   ```
   npm install -g nexe
   ```

## Running the Editor

1. Start the server:
   ```
   node index.js
   ```
2. Open a web browser and navigate to `http://localhost:3000`

## Compiling SBL Code

1. Enter your SBL code in the web editor
2. Click "Compile and Create Executable"
3. The compiler will generate a .sbl executable file

## Project Structure

- `index.js`: Main server file and SBL compiler
- `views/editor.ejs`: Web-based editor template
- `public/`: Static files for the web interface

## Dependencies

- Express.js
- EJS
- Body-parser
- Nexe (for creating executables)

## Contributing

Contributions to SquareBracketLang are welcome! Please submit pull requests or open issues for any bugs or feature requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
```
