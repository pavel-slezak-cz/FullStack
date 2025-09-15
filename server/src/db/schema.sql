CREATE TABLE IF NOT EXISTS events (
                                      id INTEGER PRIMARY KEY AUTOINCREMENT,
                                      title TEXT NOT NULL,
                                      location TEXT,
                                      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS dates (
                                     id INTEGER PRIMARY KEY AUTOINCREMENT,
                                     event_id INTEGER NOT NULL,
                                     timestamp INTEGER NOT NULL,
                                     FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
    );

CREATE TABLE IF NOT EXISTS responses (
                                         id INTEGER PRIMARY KEY AUTOINCREMENT,
                                         date_id INTEGER NOT NULL,
                                         name TEXT NOT NULL,
                                         answer TEXT CHECK(answer IN ('yes', 'no', 'maybe')) NOT NULL,
    FOREIGN KEY (date_id) REFERENCES dates(id) ON DELETE CASCADE
    );
