const Token = Object.freeze({
  EOF: Symbol('EOF'),
  LS: Symbol('LS'),
  CHUNK: Symbol('CHUNK'),
});

class Scanner {
  constructor(input) {
    this.input = input;
    this.pos = -1;
    this.token = null;
  }

  next() {
    if (this.pos === this.input.length) {
      return Scanner.EOF;
    }

    const char = this.input[this.pos];

    if (this.pos === -1 || char === '\n') {
      return this.readLineStart();
    }

    return this.readChunk();
  }

  readLineStart() {
    this.pos += 1;
    const indent = this.skipSpaces();
    return { type: Token.LS, indent };
  }

  skipSpaces() {
    let count = 0;
    while (this.pos < this.input.length && this.input[this.pos] === ' ') {
      count += 1;
      this.pos += 1;
    }

    return count;
  }

  readChunk() {
    let chunk = '';
    this.skipSpaces();

    let spaces = 0;
    while (this.pos < this.input.length) {
      const char = this.input[this.pos];
      if (char === '\n') {
        break;
      }

      if (char === ' ') {
        spaces = this.skipSpaces();
      } else {
        if (spaces > 0) {
          chunk += ' ';
        }

        chunk += char;
        this.pos += 1;
        spaces = 0;
      }
    }

    return { type: Token.CHUNK, chunk };
  }
}

Scanner.EOF = { type: Token.EOF };

module.exports = { Token, Scanner };
