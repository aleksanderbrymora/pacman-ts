import { Pacman } from './Pacman';

const p1 = new Pacman();
p1.place(0, 0, 'north').move().report();

console.log('============================');

const p2 = new Pacman();
p2.place(0, 0, 'north').left().report();

console.log('============================');

const p3 = new Pacman();
p3.place(1, 2, 'east').move().move().left().move().report();
