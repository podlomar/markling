const fs = require('fs');
const { Scanner } = require('./scanner');

const input = String(fs.readFileSync('tests/input.ling'));

const scanner = new Scanner(input);
let token = scanner.next();
while ((token = scanner.next()) !== Scanner.EOF) {
  console.log(token);
}
