CREATE TABLE escape_rooms(
	roomID int,
    title VARCHAR(50),
    theme VARCHAR(50),
    difficulty int,
    duration int,
    PRIMARY KEY(roomID)
);

CREATE TABLE puzzles(
	puzzleID int,
    roomID int,
    name VARCHAR(50),
    description VARCHAR(100),
    type VARCHAR(50),
    difficulty int,
    PRIMARY KEY(puzzleID),
    FOREIGN KEY(roomID) REFERENCES escape_rooms(roomID)
);

CREATE TABLE teams(
	teamID int,
    name VARCHAR(50),
    start_time datetime,
    end_time datetime,
    completion_status ENUM("Solved", "Timed out", "Ongoing"),
    roomID int,
    PRIMARY KEY(teamID),
    FOREIGN KEY(roomID) REFERENCES escape_rooms(roomID)
);

CREATE TABLE players(
	playerID int,
    name VARCHAR(50),
    nickname VARCHAR(50),
    email VARCHAR(50),
    teamID int,
    PRIMARY KEY(playerID),
    FOREIGN KEY(teamID) REFERENCES teams(teamID)
);

CREATE TABLE team_progress(
	progressID int,
	teamID int,
    puzzleID int,
    start_time datetime,
    end_time datetime,
    solved_status bool,
    PRIMARY KEY(progressID),
    FOREIGN KEY(teamID) REFERENCES teams(teamID),
    FOREIGN KEY(puzzleID) REFERENCES puzzles(puzzleID)
);

CREATE TABLE hints(
	hintID int,
    puzzleID int,
    hint_text VARCHAR(100),
    usage_count int,
    PRIMARY KEY(hintID),
    FOREIGN KEY(puzzleID) REFERENCES puzzles(puzzleID)
);

CREATE TABLE player_actions(
	actionID int,
    playerID int,
    puzzleID int,
    action_type ENUM("Attempt", "Hint request", "Cry about it"),
    PRIMARY KEY(actionID),
    FOREIGN KEY(playerID) REFERENCES players(playerID),
    FOREIGN KEY(puzzleID) REFERENCES puzzles(puzzleID)
);
    
/* Escape Rooms */
INSERT INTO escape_rooms (roomID, title, theme, difficulty, duration)
VALUES (0, "The Mystery of Jane Doe", "Detective", 7, 90);

INSERT INTO escape_rooms (roomID, title, theme, difficulty, duration)
VALUES (1, "Chaos in Dragon Vale", "Fantasy", 9, 90);

INSERT INTO escape_rooms (roomID, title, theme, difficulty, duration)
VALUES (2, "Escape the Mad Doctor", "Scary", 5, 90);

/* Puzzles */  
INSERT INTO puzzles (puzzleID, roomID, name, description, type, difficulty)
VALUES (0, 0, "Find the envelope", "There's an envelope describing who Jane Doe was. Let's find it.", "Seek", 1);

INSERT INTO puzzles (puzzleID, roomID, name, description, type, difficulty)
VALUES (1, 1, "Gold at the bottom of the well", "The gold has been hidden at the bottom of the well. However, it's filled with water at the moment so I can't get it.", "Patterns", 7);

INSERT INTO puzzles (puzzleID, roomID, name, description, type, difficulty)
VALUES (2, 2, "Find the key!", "Your friend is locked behind bars, find a key quickly! The mad doctor will be back any minute now!", "Timed", 4);

/* Teams */   
INSERT INTO teams (teamID, name, start_time, end_time, completion_status, roomID)
VALUES (0, "The Mean Green Bean Machine", "2024-10-13 15:30:00", "2024-10-13 17:00:00", "Solved", 0);

INSERT INTO teams (teamID, name, start_time, end_time, completion_status, roomID)
VALUES (1, "35C4P3 N3RD5", "2024-10-13 15:30:00", "2024-10-13 17:00:00", "Timed out", 1);

INSERT INTO teams (teamID, name, start_time, end_time, completion_status, roomID)
VALUES (2, "Gamer Gurls >w<", "2024-10-13 15:30:00", "2024-10-13 17:00:00", "Solved", 2);

/* Players */
INSERT INTO players (playerID, name, nickname, email, teamID)
VALUES (0, "Victor", "LotzBoi", "victorlotz37@gmail.com", 0);

/* Jeg kommer ikke til at tilføje flere rækker. Det her er for alvor spild af tid. */