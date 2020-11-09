// Names of the directions Pacman can face
type Direction = 'north' | 'east' | 'south' | 'west';
// Only at these indices a Pacman can stand
type PossiblePoisition = 0 | 1 | 2 | 3 | 4;
// A touple representing a coordinate of Pacman
type Position = [PossiblePoisition, PossiblePoisition];
// Only possible change of direction that can happen when `move` is called
type PossibleOffset = -1 | 0 | 1;

/**
 * A Class containing all Pacman functionality
 *
 * @description
 * It can't be initialised with the initial position and direction
 * of Pacman as it's outlined in the readme that robot can be placed
 * only with `place` method.
 *
 * @tutorial
 * const p = new Pacman()
 * p
 * 	.place(1, 2, 'north')
 * 	.move()
 * 	.left()
 * 	.right()
 * 	.report()
 */
export class Pacman {
	// An array of directions for lookup
	private readonly possibleDirections: Direction[] = [
		'north',
		'east',
		'south',
		'west',
	];
	// when move is called these are the offsets by which Pacman should move
	// notice that they are in the same order as PossibleDirections
	private readonly offsets: [PossibleOffset, PossibleOffset][] = [
		[0, 1], // north
		[1, 0], // east
		[0, -1], // south
		[-1, 0], // west
	];
	private isPlaced = false;
	private position: Position = [0, 0];
	private direction: Direction = 'north';

	/**
	 * If Pacman hasn't been placed - lets user know that that's the case
	 * @returns the value of isPlaced for checks in other functions
	 */
	private isPacmanPlaced() {
		if (!this.isPlaced) {
			console.log("Can't do that. You have't placed the Pacman yet :/");
		}
		return this.isPlaced;
	}

	/**
	 * Function to determine if a
	 * @param x coordinate where user wants to put Pacman
	 * @param y coordinate where user wants to put Pacman
	 * @returns a boolean indicating if placement makes sense
	 */
	private isValidPlacement(x: number, y: number) {
		if (x > 4 || x < 0) return false;
		if (y > 4 || y < 0) return false;
		return true;
	}

	/**
	 * Turns the robot in said direction
	 * @param dir where should the robot turn?
	 * @description
	 * This generic function is private since I dont't want to expose it to user,
	 * because the instructions specify that robot should react to
	 * `left` or `right`, not `turn('left')`
	 * So since I have to write similar logic for both anyway might as well
	 * create a generic function that will be exposed only through the `left` and `right` methods
	 */
	private turn(dir: 'left' | 'right') {
		if (this.isPacmanPlaced()) {
			const currentDirectionIndex = this.possibleDirections.findIndex(
				(d) => d === this.direction,
			);
			// magic to make the new index be always between 0 and 4 (circular array)
			// reference: https://stackoverflow.com/a/54427125
			// i know, it does look awful...
			const newDirectionIndex =
				((((dir === 'left' ? -1 : 1) + currentDirectionIndex) % 4) + 4) % 4;

			this.direction = this.possibleDirections[newDirectionIndex];
		}
	}

	/**
	 * Used to determine if a move will be correct and what that move will result with
	 *
	 * @returns an object with:
	 * - `isValid` - `boolean` that signifies if the move is a valid one
	 * - `toBeMovedTo` - `[number, number]` tuple that is a placement of Pacman after that move.
	 * 	Can be invalid move. To know if its valid use `isValid`.
	 *
	 * @description
	 * we're keeping toBeMovedTo as vague number tuple so we can return
	 * the result of the calculations no matter if they are correct.
	 * we'll only useit if isValid is true - then we can cast it back
	 * to being a position to gain the typesafety back and have the calculation
	 * done so it doesn't have to be done twice
	 */
	private isValidMove(): {
		isValid: boolean;
		toBeMovedTo: [number, number];
	} {
		// the exclamation mark ensures TS that `findIndex` will return an index
		// and not index OR undefined. We can ensure that since there is no way
		// it won't find the direction
		const offset = this.possibleDirections.findIndex(
			(d) => d === this.direction,
		)!;

		const [x, y] = this.position;
		const [offX, offY] = this.offsets[offset];
		const isValid = this.isValidPlacement(x + offX, y + offY);
		// we need to cast it to a tuple so TS is not mad (annoying quirk)
		const toBeMovedTo = [x + offX, y + offY] as [number, number];

		return {
			isValid,
			toBeMovedTo,
		};
	}

	/**
	 * Places a Pacman on the board and makes it movable
	 * @param x coordinate (value: 0-4) for where to place Pacman; defaults to 0
	 * @param y coordinate (value: 0-4) for where to place Pacman; defaults to 0
	 * @param dir direction in thich Pacman should be facing; defaults to 'north'
	 */
	place(x: PossiblePoisition, y: PossiblePoisition, dir: Direction) {
		if (this.isValidPlacement(x, y)) {
			this.position = [x, y];
			this.direction = dir;
			this.isPlaced = true;
		} else {
			console.log('You can only place Pacman on a square from 0 to 4');
		}
		return this;
	}

	/**
	 * Moves Pacman in a direction he is currently facing
	 * It won't move it if it hasn't been placed though
	 */
	move() {
		if (this.isPacmanPlaced()) {
			const { isValid, toBeMovedTo } = this.isValidMove();
			if (isValid) {
				// since we now the move is valid we can `cast` it to be of
				// Position type again from just vague numbers
				this.position = toBeMovedTo as Position;
			} else {
				console.log("You can't move Pacman there");
			}
		}
		return this;
	}

	/**
	 * Turns pacman to the left
	 */
	left() {
		this.turn('left');
		return this;
	}

	/**
	 * Turns pacman to the right
	 */
	right() {
		this.turn('right');
		return this;
	}

	/**
	 * Reports a current `position` and `direction` of Pacman to the console
	 */
	report() {
		if (this.isPacmanPlaced()) {
			console.log(`${this.position.join(',')},${this.direction.toUpperCase()}`);
		}
		return this;
	}
}
