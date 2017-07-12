import bfs from './bfs';

describe("bfs tests", function() {
	
	it('should generate empty rooms correctly', function(){
		let exampleRoom = [
			[-1, -1, -1, -1],
			[-1, -1, -1, -1],
			[-1, -1, -1, -1],
			[-1, -1, -1, -1],
			[-1, -1, -1, -1]
		];
		
		expect(bfs.createRoomMap(4, 5)).toEqual(exampleRoom);
		expect(bfs.createRoomMap(1,1)).toEqual([[-1]]);
	});
	
	it('should check for unused steps correctly', function(){
		let finishedRoom = [
			[-1, -1, -1, -1],
			[-1, -1, -1, -1],
			[-1,  0,  0, -1],
			[-1, -1, -1, -1],
			[-1, -1, -1, -1]
		];

		let notFinishedRoom = [
			[-1, -1, -1, -1],
			[-1, -1, -1, -1],
			[-1,  0,  1, -1],
			[-1, -1, -1, -1],
			[-1, -1, -1, -1]
		];
		expect(bfs.checkDistanceLeft(finishedRoom)).toEqual(false);
		expect(bfs.checkDistanceLeft(notFinishedRoom)).toEqual(true);
	});

	it('should find next unused step correctly', function(){	
		let notFinishedRoom = [
			[-1, -1, -1, -1],
			[-1, -1,  0, -1],
			[-1,  0,  1, -1],
			[-1, -1,  0, -1],
			[-1, -1, -1, -1]
		];
		expect(bfs.findNotFinishedCoord(notFinishedRoom)).toEqual({x: 2, y: 2});
	});
	
	it('should return step map', function(){	
		let sampleRoom = [
			[0,  1,  1,  1],
			[0,  1,  1,  1],
			[0,  0,  1,  2],
			[0,  0,  0,  1],
			[0,  0,  1,  1]
		];
		let sampleStepMap = [
			[-1, -1, -1, -1],
			[-1, -1,  0, -1],
			[-1, -1,  0,  0],
			[-1, -1, -1, -1],
			[-1, -1, -1, -1]
		];
		
		
		expect(bfs.bfs(sampleRoom, { x : 2, y : 2 }, 1, 1)).toEqual(sampleStepMap);
	});
	
	it('should return step map for maps with holes', function(){	
		let sampleRoom = [
			[6,  6,  6,  6],
			[6,  6,  6,  6],
			[6,  0,  0,  6],
			[6,  6,  6,  6],
			[6,  6,  6,  6]
		];
		let sampleStepMap = [
			[-1, -1,  0,  0],
			[-1,  0,  0,  0],
			[-1, -1, -1,  0],
			[-1,  0,  0,  0],
			[-1, -1,  0,  0]
		];
		
		
		expect(bfs.bfs(sampleRoom, { x : 3, y : 2 }, 3, 1)).toEqual(sampleStepMap);
	});

	it('should return step map for maps with gradual elevation', function(){	
		let sampleRoom = [
			[4,  5,  5,  6],
			[4,  5,  5,  6],
			[4,  5,  5,  6],
			[4,  4,  5,  6],
			[3,  4,  5,  6]
		];
		let sampleStepMap = [
			[-1,  0,  0,  0],
			[ 0,  0,  0,  0],
			[-1,  0,  0,  0],
			[-1, -1,  0, -1],
			[-1, -1, -1, -1]
		];		
		
		expect(bfs.bfs(sampleRoom, { x : 2, y : 1 }, 2, 1)).toEqual(sampleStepMap);
	});

	it('should return step map for maps with sudden elevation', function(){	
		let sampleRoom = [
			[2,  2,  2,  2],
			[2,  2,  2,  2],
			[2,  7,  7,  2],
			[2,  2,  2,  2],
			[2,  2,  2,  2]
		];
		let sampleStepMap = [
			[-1, -1,  0,  0],
			[-1,  0,  0,  0],
			[-1, -1, -1,  0],
			[-1,  0,  0,  0],
			[-1, -1,  0,  0]
		];
		
		expect(bfs.bfs(sampleRoom, { x : 3, y : 2 }, 3, 1)).toEqual(sampleStepMap);
	});
});

