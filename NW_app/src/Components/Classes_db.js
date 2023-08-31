import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('mydatabase.db');

const createTables = () => {
  const createClassesTableQuery = `
    CREATE TABLE IF NOT EXISTS classes (
      id INTEGER PRIMARY KEY,
      professor_id INTEGER,
      class_name TEXT,
      class_code TEXT,
      description TEXT
    );
  `;

  return new Promise((resolve, reject) => {
    db.transaction((transaction) => {
      transaction.executeSql(createClassesTableQuery, [], resolve, (_, error) => reject(error));
    });
  });
};

const insertClass = (id, professorId, className, classCode, description) => {
  const insertClassQuery = `
    INSERT INTO classes (id,professor_id, class_name, class_code, description)
    VALUES (?, ?, ?, ?,?);
  `;

  return new Promise((resolve, reject) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        insertClassQuery,
        [id, professorId, className, classCode, description],
        resolve,
        (_, error) => reject(error)
      );
    });
  });
};

export { createTables, insertClass };
