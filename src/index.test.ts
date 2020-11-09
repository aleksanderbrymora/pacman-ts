import { Pacman } from './Pacman';

describe('Unit tests for each method', () => {
	let p: Pacman;
	let consoleSpy: jest.SpyInstance;

	beforeEach(() => {
		consoleSpy = jest.spyOn(console, 'log');
		p = new Pacman();
	});

	it('Creates an instance of Pacman', () => {
		expect(p).not.toBeUndefined();
	});

	it("Doesn't let you do anything unless you placed Pacman", () => {
		const notPlaced = "Can't do that. You have't placed the Pacman yet :/";
		p.left();
		expect(consoleSpy).toHaveBeenCalledWith(notPlaced);
		p.move();
		expect(consoleSpy).toHaveBeenCalledWith(notPlaced);
		p.report();
		expect(consoleSpy).toHaveBeenCalledWith(notPlaced);
	});

	it('Logs the position of placement after being placed', () => {
		p.place(0, 0, 'north').report();
		expect(consoleSpy).toHaveBeenCalledWith('0,0,NORTH');
	});

	it('Changes the direction after calling left and right method', () => {
		p.place(0, 0, 'north').left().report();
		expect(consoleSpy).toHaveBeenCalledWith('0,0,WEST');
		p.right().report();
		expect(consoleSpy).toHaveBeenCalledWith('0,0,NORTH');
	});

	it('Moves by one tile', () => {
		p.place(0, 0, 'north').move().report();
		expect(consoleSpy).toHaveBeenCalledWith('0,1,NORTH');
	});

	it("Doesn't move if it's on the edge", () => {
		p.place(0, 0, 'north').left().move().report();
		expect(consoleSpy).toHaveBeenCalledWith('0,0,WEST');
	});
});
