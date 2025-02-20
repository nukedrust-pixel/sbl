const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const { exec } = require('child_process');
const path = require('path');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.render('editor');
});

app.post('/compile', async (req, res) => {
  try {
    const code = req.body.code;
    const { output, jsCode } = compileSBL(code);
    
    // Save JS code to a file
    await fs.writeFile('output.js', jsCode);

    // Use Nexe to create an executable with full path
    exec('C:\\Users\\Alumno\\AppData\\Roaming\\npm\\nexe.cmd output.js -o output.sbl --target 14.15.3', { cwd: __dirname }, (error, stdout, stderr)  => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return res.json({ output: output, executable: 'Error creating executable: ' + error.message });
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return res.json({ output: output, executable: 'Error creating executable: ' + stderr });
      }
      res.json({ output: output, executable: 'Executable created successfully!' });
    });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ output: '', executable: 'Server error occurred' });
  }
});

function compileSBL(code) {
  const lines = code.split('\n');
  let output = '';
  let jsCode = '';
  const variables = {};

  for (const line of lines) {
    const tokens = line.match(/\[([^\]]+)\]/g);
    if (!tokens) continue;

    const command = tokens[0].slice(1, -1).trim();

    switch (command) {
      case 'var':
        if (tokens.length === 3) {
          const varName = tokens[1].slice(1, -1).trim();
          const varValue = tokens[2].slice(1, -1).trim();
          variables[varName] = varValue;
          jsCode += `let ${varName} = "${varValue}";\n`;
          output += `Variable ${varName} set to ${varValue}\n`;
        }
        break;
      case 'print':
        if (tokens.length === 2) {
          const printValue = tokens[1].slice(1, -1).trim();
          jsCode += `console.log("${printValue}");\n`;
          output += `Printed: ${printValue}\n`;
        }
        break;
      case 'if':
        if (tokens.length === 3) {
          const condition = tokens[1].slice(1, -1).trim();
          const action = tokens[2].slice(1, -1).trim();
          jsCode += `if (${condition}) { console.log("${action}"); }\n`;
          output += `If statement: ${condition} then ${action}\n`;
        }
        break;
      case 'repeat':
        if (tokens.length === 3) {
          const times = parseInt(tokens[1].slice(1, -1).trim());
          const action = tokens[2].slice(1, -1).trim();
          jsCode += `for (let i = 0; i < ${times}; i++) { console.log("${action}"); }\n`;
          output += `Repeat ${times} times: ${action}\n`;
        }
        break;
      default:
        output += `Unknown command: ${command}\n`;
    }
  }

  return { output, jsCode };
}

app.listen(port, () => {
  console.log(`SBL Editor running at http://localhost:${port}`);
});
