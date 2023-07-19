import SQLite from 'react-native-sqlite-storage';

const DB_NAME = 'my_database.db';
const TABLE_NAME = 'meals';

const defaultHouseholdMeasure = 'some_default_value'; // Set the default value for Vegetable data without household_measure

const initializeDatabase = () => {
  return new Promise((resolve, reject) => {
    const db = SQLite.openDatabase(
      {
        name: DB_NAME,
        location: 'default',
      },
      () => {
        db.transaction((tx) => {
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
              id INTEGER PRIMARY KEY,
              household_measure TEXT
            );`,
            [],
            () => {
              resolve(db);
            },
            (_, error) => {
              reject(error);
            }
          );
        });
      },
      (error) => {
        reject(error);
      }
    );
  });
};

const breakfast = '{"Fruit": [{"household_measure": "13 pcs", "id": 98, "meal_group": "Fruit", "meal_name": "Alimuran", "meal_weight": 119}, {"household_measure": "1 pc", "id": 99, "meal_group": "Fruit", "meal_name": "Atis", "meal_weight": 100}], "Rice A": [{"household_measure": "1/3 cup", "id": 123, "meal_group": "Rice A", "meal_name": "Kanin, “protein-reduced”", "meal_weight": 55}], "Rice B": [{"household_measure": "1/2 cup", "id": 137, "meal_group": "Rice B", "meal_name": "Pinawa, sinaing", "meal_weight": 80}], "Rice C": [{"household_measure": "1 1/2 pcs", "id": 150, "meal_group": "Rice C", "meal_name": "Bread, wheat", "meal_weight": 40}], "Vegetable": [{"id": 18, "meal_group": "Vegetable", "meal_name": "Alagaw, Dahon", "meal_weight": 0}, {"id": 19, "meal_group": "Vegetable", "meal_name": "Ampalaya, dahon", "meal_weight": 0}]}';
const parsedbreakfast = typeof breakfast === 'string' ? JSON.parse(breakfast) : breakfast;

const dataArray = Object.values(parsedbreakfast).flat();

const saveDataToDatabase = async () => {
  try {
    const db = await initializeDatabase();

    db.transaction((tx) => {
      dataArray.forEach((item) => {
        let householdMeasureToSave = item.household_measure; // Use the data's household_measure by default

        if (!item.household_measure) {
          // If it's Vegetable and has no household_measure, use the default value
          householdMeasureToSave = defaultHouseholdMeasure;
        }

        tx.executeSql(
          `INSERT INTO ${TABLE_NAME} (id, household_measure) 
          VALUES (?, ?);`,
          [item.id, householdMeasureToSave],
          (_, result) => {
            console.log(`Inserted item with id ${item.id}`);
          },
          (_, error) => {
            console.log('Error inserting item', error);
          }
        );
      });
    });
  } catch (error) {
    console.log('Error initializing database:', error);
  }
};

saveDataToDatabase();
