import React, { useEffect } from 'react';
import axios from 'axios';
import * as SQLite from 'expo-sqlite';
import NetInfo from '@react-native-community/netinfo';
import { View } from 'react-native';

const db = SQLite.openDatabase('mydatabase.db');

const SyncComponent = () => {
  const syncDataWhenOnline = async () => {
    const isConnected = await checkInternetConnectivity();
    if (isConnected) {
      try {
        const clientData = await fetchClientData();
        const clientMeasurementsData = await fetchClientMeasurementsData();
        const exchangesData = await fetchExchangesData();
        const ExchangesDistrib = await fetchExchangesDistribData();
        const mealTitle = await fetchMealtitleData();
        const meal = await fetchMealData();
        const mealPlan = await fetchMealPlanData();

        // Create the expected data array for the PHP server
        const combinedData = {
          client: clientData,
          client_measurements: clientMeasurementsData,
          exchanges: exchangesData,
          distribution_exchange: ExchangesDistrib,
          meal_title: mealTitle,
          meal: meal,
          meal_plan: mealPlan,
        };

        await syncDataToMySQL(combinedData);

        console.log('All data synchronized successfully!');
      } catch (error) {
        console.log('Error synchronizing data:', error);
      }
    }
  };

  const syncDataToMySQL = async (combinedData) => {
    try {
      const endpoint = 'https://nutriwise.website/api/syncData.php';

      const response = await axios.post(endpoint, combinedData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Data synchronization response:', response.data);
      await markRecordsAsSynced();
    } catch (error) {
      console.log('Data synchronization error:', error);
    }
  };


  const markRecordsAsSynced = async () => {
    try {
      await updateTable('client');
      await updateTable('client_measurements');
      await updateTable('exchanges');
      await updateTable('distribution_exchange');
      await updateTable('meal_title');
      await updateTable('meal');
      await updateTable('meal_plan');
      console.log('All records marked as synced');
    } catch (error) {
      console.log('Error marking records as synced:', error);
    }
  };
  
  const updateTable = async (tableName) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `UPDATE ${tableName} SET syncData = 1 WHERE syncData = 0;`,
          [],
          (_, { rowsAffected }) => {
            console.log(`${rowsAffected} records in ${tableName} marked as synced`);
            resolve();
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  };
  

  const checkInternetConnectivity = async () => {
    const netInfoState = await NetInfo.fetch();
    return netInfoState.isConnected;
  };

  const fetchClientData = async () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM client WHERE syncData = 0',
          [],
          (_, { rows }) => {
            resolve(rows._array);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  };
  
  const fetchClientMeasurementsData = async () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM client_measurements WHERE syncData = 0',
          [],
          (_, { rows }) => {
            resolve(rows._array);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  };
  
  const fetchExchangesData = async () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM exchanges WHERE syncData = 0',
          [],
          (_, { rows }) => {
            resolve(rows._array);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  };

  const fetchExchangesDistribData = async () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM distribution_exchange WHERE syncData = 0',
          [],
          (_, { rows }) => {
            resolve(rows._array);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  };

  const fetchMealtitleData = async () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM meal_title WHERE syncData = 0',
          [],
          (_, { rows }) => {
            resolve(rows._array);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  };

  const fetchMealData = async () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM meal WHERE syncData = 0',
          [],
          (_, { rows }) => {
            resolve(rows._array);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  };

  const fetchMealPlanData = async () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM meal_plan WHERE syncData = 0',
          [],
          (_, { rows }) => {
            resolve(rows._array);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  };
  

  const combineRecords = (data, tableName) => {
    return data.map((record) => {
      return {
        ...record,
        table: tableName,
      };
    });
  };

  useEffect(() => {
    // Sync data when online initially
    syncDataWhenOnline();
  }, []);

  return (
    <View>
      {/* You can add any UI elements related to the SyncComponent here */}
    </View>
  );
};

export default SyncComponent;
