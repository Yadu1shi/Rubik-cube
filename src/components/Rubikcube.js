// Rubikcube.js
export class Rubikcube {
  constructor() {
    this.faces = {
      T: this.createFace('W'), // Top (White)
      D: this.createFace('Y'), // Down (Yellow)
      F: this.createFace('G'), // Front (Green)
      B: this.createFace('B'), // Back (Blue)
      L: this.createFace('O'), // Left (Orange)
      R: this.createFace('R'), // Right (Red)
    };
    this.scramblemoves = [];
  }

  createFace(color) {
    return [
      [color, color, color],
      [color, color, color],
      [color, color, color],
    ];
  }

  rotateFace(face) {
    if (!this.faces[face]) throw new Error(`Face ${face} does not exist`);
    const oldFace = this.faces[face];
    const newFace = [
      [oldFace[2][0], oldFace[1][0], oldFace[0][0]],
      [oldFace[2][1], oldFace[1][1], oldFace[0][1]],
      [oldFace[2][2], oldFace[1][2], oldFace[0][2]],
    ];
    this.faces[face] = newFace;

    let top, right, bottom, left;

    switch (face) {
      case 'F':
        top = [...this.faces['T'][2]];
        right = [this.faces['R'][0][0], this.faces['R'][1][0], this.faces['R'][2][0]];
        bottom = [...this.faces['D'][0]];
        left = [this.faces['L'][0][2], this.faces['L'][1][2], this.faces['L'][2][2]];

        this.faces['L'][0][2] = top[2];
        this.faces['L'][1][2] = top[1];
        this.faces['L'][2][2] = top[0];

        this.faces['D'][0][0] = left[0];
        this.faces['D'][0][1] = left[1];
        this.faces['D'][0][2] = left[2];

        this.faces['R'][0][0] = bottom[2];
        this.faces['R'][1][0] = bottom[1];
        this.faces['R'][2][0] = bottom[0];

        this.faces['T'][2][0] = right[2];
        this.faces['T'][2][1] = right[1];
        this.faces['T'][2][2] = right[0];
        break;

      case 'B':
        top = [...this.faces['T'][0]];
        right = [this.faces['L'][0][0], this.faces['L'][1][0], this.faces['L'][2][0]];
        bottom = [...this.faces['D'][2]];
        left = [this.faces['R'][0][2], this.faces['R'][1][2], this.faces['R'][2][2]];

        this.faces['L'][0][0] = top[2];
        this.faces['L'][1][0] = top[1];
        this.faces['L'][2][0] = top[0];

        this.faces['D'][2][0] = right[0];
        this.faces['D'][2][1] = right[1];
        this.faces['D'][2][2] = right[2];

        this.faces['R'][0][2] = bottom[2];
        this.faces['R'][1][2] = bottom[1];
        this.faces['R'][2][2] = bottom[0];

        this.faces['T'][0][0] = left[2];
        this.faces['T'][0][1] = left[1];
        this.faces['T'][0][2] = left[0];
        break;

      case 'T':
        top = [...this.faces['B'][0]];
        right = [this.faces['R'][0][0], this.faces['R'][0][1], this.faces['R'][0][2]];
        bottom = [...this.faces['F'][0]];
        left = [this.faces['L'][0][0], this.faces['L'][0][1], this.faces['L'][0][2]];

        this.faces['L'][0][0] = top[2];
        this.faces['L'][0][1] = top[1];
        this.faces['L'][0][2] = top[0];

        this.faces['F'][0][0] = left[0];
        this.faces['F'][0][1] = left[1];
        this.faces['F'][0][2] = left[2];

        this.faces['R'][0][0] = bottom[2];
        this.faces['R'][0][1] = bottom[1];
        this.faces['R'][0][2] = bottom[0];

        this.faces['B'][0][0] = right[2];
        this.faces['B'][0][1] = right[1];
        this.faces['B'][0][2] = right[0];
        break;

      case 'D':
        top = [...this.faces['F'][2]];
        right = [this.faces['R'][2][0], this.faces['R'][2][1], this.faces['R'][2][2]];
        bottom = [...this.faces['B'][2]];
        left = [this.faces['L'][2][0], this.faces['L'][2][1], this.faces['L'][2][2]];

        this.faces['L'][2][0] = top[2];
        this.faces['L'][2][1] = top[1];
        this.faces['L'][2][2] = top[0];

        this.faces['B'][2][0] = left[0];
        this.faces['B'][2][1] = left[1];
        this.faces['B'][2][2] = left[2];

        this.faces['R'][2][0] = bottom[2];
        this.faces['R'][2][1] = bottom[1];
        this.faces['R'][2][2] = bottom[0];

        this.faces['F'][2][0] = right[2];
        this.faces['F'][2][1] = right[1];
        this.faces['F'][2][2] = right[0];
        break;

      case 'L':
        top = [this.faces['T'][0][0], this.faces['T'][1][0], this.faces['T'][2][0]];
        right = [this.faces['F'][0][0], this.faces['F'][1][0], this.faces['F'][2][0]]; 
        bottom = [this.faces['D'][0][0], this.faces['D'][1][0], this.faces['D'][2][0]];
        left = [this.faces['B'][2][2], this.faces['B'][1][2], this.faces['B'][0][2]];

        this.faces['B'][2][2] = top[0];
        this.faces['B'][1][2] = top[1];
        this.faces['B'][0][2] = top[2];

        this.faces['D'][0][0] = left[2];
        this.faces['D'][1][0] = left[1];
        this.faces['D'][2][0] = left[0];

        this.faces['F'][0][0] = bottom[0];
        this.faces['F'][1][0] = bottom[1];
        this.faces['F'][2][0] = bottom[2];

        this.faces['T'][0][0] = right[0];
        this.faces['T'][1][0] = right[1];
        this.faces['T'][2][0] = right[2];
        break;

      case 'R':
        top = [this.faces['T'][0][2], this.faces['T'][1][2], this.faces['T'][2][2]];
        right = [this.faces['B'][0][0], this.faces['B'][1][0], this.faces['B'][2][0]];
        bottom = [this.faces['D'][0][2], this.faces['D'][1][2], this.faces['D'][2][2]];
        left = [this.faces['F'][0][2], this.faces['F'][1][2], this.faces['F'][2][2]];

        this.faces['F'][0][2] = top[0];
        this.faces['F'][1][2] = top[1];
        this.faces['F'][2][2] = top[2];

        this.faces['D'][0][2] = left[0];
        this.faces['D'][1][2] = left[1];
        this.faces['D'][2][2] = left[2];

        this.faces['B'][0][0] = bottom[0];
        this.faces['B'][1][0] = bottom[1];
        this.faces['B'][2][0] = bottom[2];

        this.faces['T'][0][2] = right[0];
        this.faces['T'][1][2] = right[1];
        this.faces['T'][2][2] = right[2];
        break;

      default:
        throw new Error("Invalid face: " + face);
    }
  }

  scramble() {
    const moves = ["F", "B", "T", "D", "L", "R"];
    this.scramblemoves = [];

    for (let i = 0; i < 20; i++) {
      const move = moves[Math.floor(Math.random() * 6)];
      this.rotateFace(move);
      this.scramblemoves.push(move);
    }
    console.log("Scrambled with moves:", this.scramblemoves);
  }

  makeWhiteCross() {
    const sideFaces = ["F", "B", "L", "R"];
    for (const face of sideFaces) {
      if (this.faces[face][0][1] === "W") {
        this.rotateFace(face);
        this.rotateFace(face);
      }
      if (this.faces[face][1][0] === "W") {
        this.rotateFace(face);
      }
      if (this.faces[face][1][2] === "W") {
        this.rotateFace(face);
      }
      if (this.faces[face][2][1] === "W") {
        this.rotateFace(face);
        this.rotateFace(face);
      }
    }
    console.log("Attempted to make white cross");
  }

  printFace() {
    console.log("RUBIK CUBE");
    for (const [face, grid] of Object.entries(this.faces)) {
      console.log(`\n${face} face:`);
      grid.forEach((row) => {
        console.log("     " + row.join(" "));
      });
    }
  }
}