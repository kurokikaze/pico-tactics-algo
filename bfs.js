function createRoomMap(x, y) {
	var room = [];
	for (var i = 0; i < y; i++) {
		room[i] = [];
		for (var j = 0; j < x; j++) {
			room[i][j] = -1;
		}
	}
	return room;
}

function bfs(room, pos, distance, jumpheight) {
	var roomMap = createRoomMap(room[0].length, room.length);
	
	// Начальная позиция и кол-во шагов
	roomMap[pos.y][pos.x] = distance;
	var safetyCounter = 0;
	var maxx = room[0].length - 1;
	var maxy = room.length - 1;
	console.log('maxx', maxx, 'maxy', maxy)
	
	while(checkDistanceLeft(roomMap) == true && safetyCounter < 100) {
		safetyCounter++;
		var nextCoords = findNotFinishedCoord(roomMap);
		var steps = roomMap[nextCoords.y][nextCoords.x];
		var myHeight = room[nextCoords.y][nextCoords.x];
		roomMap[nextCoords.y][nextCoords.x] = steps - 1;

		// up
		if (nextCoords.y > 0 && nodeReachable(myHeight, room[nextCoords.y - 1][nextCoords.x], jumpheight)) {
			var thatDist = roomMap[nextCoords.y - 1][nextCoords.x];
			if (thatDist < steps - 1) {
				roomMap[nextCoords.y - 1][nextCoords.x] = steps - 1;
			}
		}
		// right
		if (nextCoords.x < maxx && nodeReachable(myHeight, room[nextCoords.y][nextCoords.x  + 1], jumpheight)) {
			var thatDist = roomMap[nextCoords.y][nextCoords.x + 1];
			if (thatDist < steps - 1) {
				roomMap[nextCoords.y][nextCoords.x + 1] = steps - 1;
			}
		}
		// down
		if (nextCoords.y < maxy && nodeReachable(myHeight, room[nextCoords.y + 1][nextCoords.x], jumpheight)) {
			var thatDist = roomMap[nextCoords.y + 1][nextCoords.x];
			if (thatDist < steps - 1) {
				roomMap[nextCoords.y + 1][nextCoords.x] = steps - 1;
			}
		}
		// left
		if (nextCoords.x > 0 && nodeReachable(myHeight, room[nextCoords.y][nextCoords.x - 1], jumpheight)) {
			var thatDist = roomMap[nextCoords.y][nextCoords.x - 1];
			if (thatDist < steps - 1) {
				roomMap[nextCoords.y][nextCoords.x - 1] = steps - 1;
			}
		}
	}
	
	return roomMap;
}

function checkDistanceLeft(roomMap) {
	return roomMap.filter(row => row.filter(ch => ch > 0).length > 0).length > 0;
}

function findNotFinishedCoord(roomMap) {
	var maxx = roomMap[0].length;
	var maxy = roomMap.length;
	var result = false;
	
	for (var i = 0; i < maxy; i++) {
		for (var j = 0; j < maxx; j++) {
			if (roomMap[i][j] > 0) {
				
				result = {
					x: j,
					y: i
				};
				
				break;
			}
		}
	}
	
	return result;
}

function nodeReachable(myHeight, nodeHeight, jumpHeight) {
	return (nodeHeight > 0 && Math.abs(myHeight - nodeHeight) <= jumpHeight);
}

export default {
	bfs,
	checkDistanceLeft,
	createRoomMap,
	findNotFinishedCoord
}