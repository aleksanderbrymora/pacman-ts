import { Pacman } from './Pacman';

it('Creates an instance of Pacman', () => {
	const p = new Pacman();
	expect(p).not.toBeUndefined();
});

it('Logs the position of placement after being placed', () => {
	const consoleSpy = jest.spyOn(console, 'log');
	const p = new Pacman();
	p.place(0, 0, 'north').report();
	expect(consoleSpy).toHaveBeenCalledWith('0,0,NORTH');
});

it('Changes the direction after calling left and right method', () => {
	const consoleSpy = jest.spyOn(console, 'log');
	const p = new Pacman();
	p.place(0, 0, 'north').left().report();
	expect(consoleSpy).toHaveBeenCalledWith('0,0,WEST');
	p.right().report();
	expect(consoleSpy).toHaveBeenCalledWith('0,0,NORTH');
});

it('Moves by one tile', () => {
	const consoleSpy = jest.spyOn(console, 'log');
	const p = new Pacman();
	p.place(0, 0, 'north').move().report();
	expect(consoleSpy).toHaveBeenCalledWith('0,1,NORTH');
});

it("Doesn't move if it's on the edge", () => {
	const consoleSpy = jest.spyOn(console, 'log');
	const p = new Pacman();
	p.place(0, 0, 'north').left().move().report();
	expect(consoleSpy).toHaveBeenCalledWith('0,0,WEST');
});
