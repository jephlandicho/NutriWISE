import React, { useState, useRef, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, TextInput, ScrollView } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { Provider as PaperProvider, DataTable, Button, Divider, Portal, Provider, TextInput as PaperTextInput, Avatar } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import MyTheme from '../Components/MyTheme';
import * as FileSystem from 'expo-file-system';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { ResultContext } from '../Components/ResultContext';
import foods from '../meals/foods.json';

const db = SQLite.openDatabase('mydatabase.db');

function MealPlanName() {
  const [dataFromDB, setDataFromDB] = useState([]);
  const [exchangeData, setexchangeData] = useState([]);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([10, 20, 30]);
  const [itemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[0]);
  const [tableData, setTableData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [anotherModalVisible, setAnotherModalVisible] = useState(false);
  const [mealTitle, setMealTitle] = useState('');
  const [selectedExchangesId, setSelectedExchangesId] = useState(null);
  const {C_meal_titleID,setC_meal_titleID} = useContext(ResultContext);

  const generateHtml = (dataFromDB) => {
    const name = dataFromDB.length > 0 ? dataFromDB[0].name : "";
    const birthdate = dataFromDB.length > 0 ? dataFromDB[0].birthdate : "";
    const today = new Date();
    const birthdateArray = birthdate.split('-');
    const birthdateObj = new Date(
      birthdateArray[0],
      birthdateArray[1] - 1,
      birthdateArray[2]
    );
    const ageDiff = today - birthdateObj;
    const ageDate = new Date(ageDiff);
    const years = Math.abs(ageDate.getUTCFullYear() - 1970);
    const age =  years.toString();
    const sex = dataFromDB.length > 0 ? dataFromDB[0].sex : "";
    const waistCircum = dataFromDB.length > 0 ? dataFromDB[0].waistCircum : "";
    const hipCircum = dataFromDB.length > 0 ? dataFromDB[0].hipCircum : "";
    const weight = dataFromDB.length > 0 ? dataFromDB[0].weight : "";
    const height = dataFromDB.length > 0 ? dataFromDB[0].height : "";
    const physicalActLevel = dataFromDB.length > 0 ? dataFromDB[0].physicalActLevel : "";
    const whr = dataFromDB.length > 0 ? dataFromDB[0].WHR : "";
    const bmi = dataFromDB.length > 0 ? dataFromDB[0].BMI : "";
    const remarks = dataFromDB.length > 0 ? dataFromDB[0].remarks : "";
    const DBW = dataFromDB.length > 0 ? dataFromDB[0].DBW : "";
    const cmTER = dataFromDB.length > 0 ? dataFromDB[0].cmTER : "";
    const cmCarbs = dataFromDB.length > 0 ? dataFromDB[0].cmCarbs : "";
    const cmProtein = dataFromDB.length > 0 ? dataFromDB[0].cmProtein : "";
    const cmFats = dataFromDB.length > 0 ? dataFromDB[0].cmFats : "";
    // exchanges
    const vegetables = dataFromDB.length > 0 ? dataFromDB[0].vegetables: "0";
    const fruit = dataFromDB.length > 0 ? dataFromDB[0].fruit: "0";
    const milk = dataFromDB.length > 0 ? dataFromDB[0].milk: "0";
    const sugar = dataFromDB.length > 0 ? dataFromDB[0].sugar: "0";
    const riceA = dataFromDB.length > 0 ? dataFromDB[0].riceA: "0";
    const riceB = dataFromDB.length > 0 ? dataFromDB[0].riceB: "0";
    const riceC = dataFromDB.length > 0 ? dataFromDB[0].riceC: "0";
    const lfMeat = dataFromDB.length > 0 ? dataFromDB[0].lfMeat: "0";
    const mfMeat = dataFromDB.length > 0 ? dataFromDB[0].mfMeat: "0";
    const hfMeat = dataFromDB.length > 0 ? dataFromDB[0].hfMeat: "0";
    const fat = dataFromDB.length > 0 ? dataFromDB[0].fat: "0";
    const TER = dataFromDB.length > 0 ? dataFromDB[0].TER: "0";
    const carbohydrates = dataFromDB.length > 0 ? dataFromDB[0].carbohydrates: "0";
    const protein = dataFromDB.length > 0 ? dataFromDB[0].protein: "0";
    const fats = dataFromDB.length > 0 ? dataFromDB[0].fats: "0";
    const meal_title = dataFromDB.length > 0 ? dataFromDB[0].meal_title: "0";

    let htmlContent = `
      <html>
        <head>
          <style>
            h1 {
              text-align: center;
            }
            .table-container {
              width: 100%;
              text-align: center;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              text-align: left;
              margin: auto;
            }
            tr, td,th {
              padding: 8px;
            
            }
            .marginBottom {
              margin-bottom: 5px;
            }
            .header {
              text-align: center;
            }
            .table {
              width: 100%;
              border-collapse: collapse;
              text-align: center;
              margin: auto;
            }
            .cells {
              border: 1px solid black;
              padding: 8px;
              text-align: center;
            }
            .cells2 {
              border: 1px solid black;
              padding: 8px;
              text-align: left;
            }
            .cells3 {
              border: 1px solid black;
              text-align: left;
            }
            .foodgroup{
              width: 30%;
              border: 1px solid black;
              padding: 8px;
              text-align: center;
            }
            .othercells {
              width: 10%;
              border: 1px solid black;
              padding: 8px;
              text-align: center;
            }
            .table-container table {
              /* Set a fixed width for the table */
              width: 100%;
            }
          
            /* Set equal width for columns with colspan="2" */
            .cells[colspan="2"],
            .cells2[colspan="2"],
            .cells3[colspan="2"] {
              width: 50%; /* Half of the table width */
            }
          </style>
        </head>
        <body>
        <div>College of Nursing and Alied Health Services</div>
        <br>
        <div class="header"> <b>Nutritional and Dietetics Department</b></div>
        <div class="header"><b>Nutritional Assessment</b></div>
        <br>
        <div class="table-container">
        <table>
        <tr class="marginBottom">
        <td colspan="4" class="cells"><b>Client Data</b></td>
        </tr>
        <tr class="marginBottom">
          <td colspan="4" class="cells2"><b>FullName: </b> ${name}</td>
        </tr>
        <tr>
          <td colspan="2" class="cells3"><b>Age: </b> ${age}</td>
          <td colspan="2" class="cells3"><b>Body Mass Index: </b> ${bmi} kg/m²</td>
        </tr>
        <tr>
        <td colspan="2" class="cells3"><b>Height: </b> ${height} m</td>
        <td colspan="2" class="cells3"><b>Nutritional Status: </b> ${remarks}</td>
        </tr>
        <tr>
        <td colspan="2" class="cells3"><b>Weight: </b> ${weight} kg </td>
        <td colspan="2" class="cells3"><b>Desirable Body Weight: </b> ${DBW} kg</td>
        </tr>
        <tr>
        <td colspan="2" class="cells3"><b>Waist Circumference:</b> ${waistCircum} cm</td>
        <td colspan="2" class="cells3"><b>Hip Circumference:</b> ${hipCircum} cm</td>
        </tr>
        <tr>
        <td colspan="4" class="cells3"><b>Waist-Hip Ratio:</b> ${whr} cm</td>
        </tr>
        <tr>
          <td colspan="5" class="header"><b> <i> Diet Rx </i></b></td>
        </tr>
        <tr>
          <td><b>KCAL:</b> ${cmTER} kcal</td>
          <td><b>Carbohydrates:</b> ${cmCarbs} g</td>
          <td><b>Protein:</b> ${cmProtein} g</td>
          <td><b>Fats:</b> ${cmFats} g</td>
        </tr>
        </table>`;
          const vegetableData = exchangeData.find((item) => item.food_group === 'Vegetable') || {};
          const {
            breakfast: vegBreakfast = '',
            am_snacks: vegAMSnacks = '',
            lunch: vegLunch = '',
            pm_snacks: vegPmSnacks = '',
            dinner: vegDinner = '',
          } = vegetableData;

          const FruitData = exchangeData.find((item) => item.food_group === 'Fruit') || {};
          const {
            breakfast: FruitBreakfast = '',
            am_snacks: FruitAMSnacks = '',
            lunch: FruitLunch = '',
            pm_snacks: FruitPmSnacks = '',
            dinner: FruitDinner = '',
          } = FruitData;

          const RiceAData = exchangeData.find((item) => item.food_group === 'Rice A') || {};
          const {
            breakfast: RiceABreakfast = '',
            am_snacks: RiceAAMSnacks = '',
            lunch: RiceALunch = '',
            pm_snacks: RiceAPmSnacks = '',
            dinner: RiceADinner = '',
          } = RiceAData;

          const RiceBData = exchangeData.find((item) => item.food_group === 'Rice B') || {};
          const {
            breakfast: RiceBBreakfast = '',
            am_snacks: RiceBAMSnacks = '',
            lunch: RiceBLunch = '',
            pm_snacks: RiceBPmSnacks = '',
            dinner: RiceBDinner = '',
          } = RiceBData;

          const RiceCData = exchangeData.find((item) => item.food_group === 'Rice C') || {};
          const {
            breakfast: RiceCBreakfast = '',
            am_snacks: RiceCAMSnacks = '',
            lunch: RiceCLunch = '',
            pm_snacks: RiceCPmSnacks = '',
            dinner: RiceCDinner = '',
          } = RiceCData;

          const MilkData = exchangeData.find((item) => item.food_group === 'Milk') || {};
          const {
            breakfast: MilkBreakfast = '',
            am_snacks: MilkAMSnacks = '',
            lunch: MilkLunch = '',
            pm_snacks: MilkPmSnacks = '',
            dinner: MilkDinner = '',
          } = MilkData;

          const LFMeatData = exchangeData.find((item) => item.food_group === 'LF Meat') || {};
          const {
            breakfast: LFMeatBreakfast = '',
            am_snacks: LFMeatAMSnacks = '',
            lunch: LFMeatLunch = '',
            pm_snacks: LFMeatPmSnacks = '',
            dinner: LFMeatDinner = '',
          } = LFMeatData;

          const MFMeatData = exchangeData.find((item) => item.food_group === 'MF Meat') || {};
          const {
            breakfast: MFMeatBreakfast = '',
            am_snacks: MFMeatAMSnacks = '',
            lunch: MFMeatLunch = '',
            pm_snacks: MFMeatPmSnacks = '',
            dinner: MFMeatDinner = '',
          } = MFMeatData;

          const HFMeatData = exchangeData.find((item) => item.food_group === 'HF Meat') || {};
          const {
            breakfast: HFMeatBreakfast = '',
            am_snacks: HFMeatAMSnacks = '',
            lunch: HFMeatLunch = '',
            pm_snacks: HFMeatPmSnacks = '',
            dinner: HFMeatDinner = '',
          } = HFMeatData;

          const FatData = exchangeData.find((item) => item.food_group === 'Fat') || {};
          const {
            breakfast: FatBreakfast = '',
            am_snacks: FatAMSnacks = '',
            lunch: FatLunch = '',
            pm_snacks: FatPmSnacks = '',
            dinner: FatDinner = '',
          } = FatData;

          const SugarData = exchangeData.find((item) => item.food_group === 'Sugar') || {};
          const {
            breakfast: SugarBreakfast = '',
            am_snacks: SugarAMSnacks = '',
            lunch: SugarLunch = '',
            pm_snacks: SugarPmSnacks = '',
            dinner: SugarDinner = '',
          } = SugarData;

          htmlContent += `
          
          <!-- Exchanges Table -->
          <table class="table">
            <tr class="cells">
              <th colspan="3" class="foodgroup">Food Groups</th>
              <th class="othercells">Number of Exchanges</th>
              <th class="othercells">Breakfast</th>
              <th class="othercells">Morning Snack</th>
              <th class="othercells">Lunch</th>
              <th class="othercells">Afternoon Snack</th>
              <th class="othercells">Supper</th>
            </tr>
            <tr class="cells2">
            <td colspan="3" class="cells2">Vegetable</td>
            <td class="cells">${vegetables}</td>
            <td class="cells">${vegBreakfast}</td>
            <td class="cells">${vegAMSnacks}</td>
            <td class="cells">${vegLunch}</td>
            <td class="cells">${vegPmSnacks}</td>
            <td class="cells">${vegDinner}</td>
          </tr>
          <tr class="cells2">
          <td colspan="3" class="cells2">Fruit</td>
          <td class="cells">${fruit}</td>
          <td class="cells">${FruitBreakfast}</td>
          <td class="cells">${FruitAMSnacks}</td>
          <td class="cells">${FruitLunch}</td>
          <td class="cells">${FruitPmSnacks}</td>
          <td class="cells">${FruitDinner}</td>
          </tr>
          <tr class="cells2">
          <td rowspan="4"  class="cells2">Rice</td>
          </tr>
          <tr class="cells2">
          <td class="cells2" colspan="2">A - Low Protein</td>
          <td class="cells" >${riceA}</td>
          <td class="cells">${RiceABreakfast}</td>
          <td class="cells">${RiceAAMSnacks}</td>
          <td class="cells">${RiceALunch}</td>
          <td class="cells">${RiceAPmSnacks}</td>
          <td class="cells">${RiceADinner}</td>
          </tr>
          <tr class="cells2">
          <td class="cells2" colspan="2">B - Medium Protein </td>
          <td class="cells">${riceB}</td>
          <td class="cells">${RiceBBreakfast}</td>
          <td class="cells">${RiceBAMSnacks}</td>
          <td class="cells">${RiceBLunch}</td>
          <td class="cells">${RiceBPmSnacks}</td>
          <td class="cells">${RiceBDinner}</td>
          </tr>
          <tr class="cells2">
          <td class="cells2" colspan="2">C - High Protein</td>
          <td class="cells">${riceC}</td>
          <td class="cells">${RiceCBreakfast}</td>
          <td class="cells">${RiceCAMSnacks}</td>
          <td class="cells">${RiceCLunch}</td>
          <td class="cells">${RiceCPmSnacks}</td>
          <td class="cells">${RiceCDinner}</td>
          </tr>
          <tr class="cells2">
          <td colspan="3" class="cells2">Milk</td>
          <td class="cells">${milk}</td>
          <td class="cells">${MilkBreakfast}</td>
          <td class="cells">${MilkAMSnacks}</td>
          <td class="cells">${MilkLunch}</td>
          <td class="cells">${MilkPmSnacks}</td>
          <td class="cells">${MilkDinner}</td>
          </tr>
          <tr class="cells2">
          <td rowspan="4" class="cells2">Meat</td>
          </tr>
          <tr class="cells2">
          <td class="cells2" colspan="2">Low Fat</td>
          <td class="cells">${lfMeat}</td>
          <td class="cells">${LFMeatBreakfast}</td>
          <td class="cells">${LFMeatAMSnacks}</td>
          <td class="cells">${LFMeatLunch}</td>
          <td class="cells">${LFMeatPmSnacks}</td>
          <td class="cells">${LFMeatDinner}</td>
          </tr>
          <tr class="cells2">
          <td class="cells2" colspan="2">Medium Fat</td>
          <td class="cells">${mfMeat}</td>
          <td class="cells">${MFMeatBreakfast}</td>
          <td class="cells">${MFMeatAMSnacks}</td>
          <td class="cells">${MFMeatLunch}</td>
          <td class="cells">${MFMeatPmSnacks}</td>
          <td class="cells">${MFMeatDinner}</td>
          </tr>
          <tr class="cells2">
          <td class="cells2" colspan="2">High Fat</td>
          <td class="cells">${hfMeat}</td>
          <td class="cells">${HFMeatBreakfast}</td>
          <td class="cells">${HFMeatAMSnacks}</td>
          <td class="cells">${HFMeatLunch}</td>
          <td class="cells">${HFMeatPmSnacks}</td>
          <td class="cells">${HFMeatDinner}</td>
          </tr>
          <tr class="cells2">
          <td colspan="3" class="cells2">Fat</td>
          <td class="cells">${fat}</td>
          <td class="cells">${FatBreakfast}</td>
          <td class="cells">${FatAMSnacks}</td>
          <td class="cells">${FatLunch}</td>
          <td class="cells">${FatPmSnacks}</td>
          <td class="cells">${FatDinner}</td>
          </tr>
          <tr class="cells2">
          <td colspan="3" class="cells2">Sugar</td>
          <td class="cells">${sugar}</td>
          <td class="cells">${SugarBreakfast}</td>
          <td class="cells">${SugarAMSnacks}</td>
          <td class="cells">${SugarLunch}</td>
          <td class="cells">${SugarPmSnacks}</td>
          <td class="cells">${SugarDinner}</td>
          </tr>
          </table>
          <br>
          <table>

          <tr>
          <td colspan="5" class="header"><b> <i> Diet Prescription </i></b></td>
          </tr>
          <tr>
            <td><b>KCAL:</b> ${TER} kcal</td>
            <td><b>Carbohydrates:</b> ${carbohydrates} g</td>
            <td><b>Protein:</b> ${protein} g</td>
            <td><b>Fats:</b> ${fats} g</td>
          </tr>
          </table>
          <br>
          <br>
          <br>
          <br>
          `;

          htmlContent += `
          </table>
          <br>
          <h3> Meal Plan </h3>
          <h5> ${meal_title} </h5>
          <!-- Third Table -->
          <table class="table">
            <tr class="cells">
              <th class="cells">Meal</th>
              <th class="cells">Food Group List</th>
              <th class="cells">No of Exchange</th>
              <th class="cells">Sample Menu</th>
              <th class="cells">Household Measure</th>
            </tr>
      `;
      
      let mealTimeGroups = {};
      let meal_group = '';

      dataFromDB.forEach((item) => {
        if (!mealTimeGroups[item.meal_time]) {
          mealTimeGroups[item.meal_time] = [];
        }
        mealTimeGroups[item.meal_time].push(item);
      });
      
      for (const mealTime in mealTimeGroups) {
        const mealTimeData = mealTimeGroups[mealTime];
        
        const mealTimeTableRows = mealTimeData.map((item, index) => {
          const foodInfo = foods.find((food) => food.id === item.food_id);
          if (!foodInfo) {
            console.error(`Food info not found for food_id: ${item.food_id}`);
            return ''; // Return an empty string if food info is not found
          }
          const rowspan = mealTimeData.length + 1;

          const mealNameCell =
            index === 0
              ? `<td class="cells" rowspan="${rowspan}">${mealTime}</td><td class="cells"></td><td class="cells"></td><td class="cells">${item.meal_name}</td><td class="cells"></td>`
              : '';
      
              let rowData = `
              ${mealNameCell}
              <tr>`;
            if (foodInfo.meal_group === meal_group) {
              rowData += `<td class="cells"></td>`;
              rowData += `<td class="cells"></td>`;
            } 
             else {
              rowData += `<td class="cells">${foodInfo.meal_group}</td>`;
              rowData += `<td class="cells">${item.exchange_distribution}</td>`;
              meal_group = foodInfo.meal_group
            }
            rowData += `
              <td class="cells">${foodInfo.meal_name}</td>`;
            
            if (foodInfo.meal_group === 'Vegetable' && index === 0) {
              rowData += `<td class="cells">${item.household_measurement}</td>`;
            } else {
              rowData += `<td class="cells">${foodInfo.household_measure}</td>`;
            }
            
            rowData += '</tr>';
            return rowData;
        });
      
        htmlContent += mealTimeTableRows.join('');
      }
  
  
    htmlContent += `
    </table>
        </div>
      </body>
    </html>
    `;

    return htmlContent;
  };
  

  const generateAndSharePdf = async (html) => {
    // Copy the generatePdf function from the first code snippet
    // ...
    if (dataFromDB.length === 0) {
      
      console.log('No data to generate PDF');
      return;
    }

    try {
      const file = await printToFileAsync({
        html: html,
        width: 612,
        height: 792,
        base64: false,
      });
  
      const timestamp = new Date().getTime(); // Get current timestamp
      const fileUri = `${FileSystem.documentDirectory}data_${timestamp}.pdf`;
  
      await FileSystem.moveAsync({
        from: file.uri,
        to: fileUri,
      });
  
      await shareAsync(fileUri);
    } catch (error) {
      console.log('Error while generating PDF: ', error);
    }
  };

  const route = useRoute();
  const { id,e_ID } = route.params;
  const openAnotherModal = () => {
    setAnotherModalVisible(true);
  };

  const closeAnotherModal = () => {
    setAnotherModalVisible(false);
  };

  let generatedCodes = [];

  function generateUniqueSixDigitCode() {
    let code = '';

    do {
      code = Math.floor(100000 + Math.random() * 900000).toString();
    } while (generatedCodes.includes(code));

    generatedCodes.push(code);

    return code;
  }
  React.useEffect(() => {
    setPage(0);
    refreshTableData();
    getExchangeData();
    const mt_ID = generateUniqueSixDigitCode();
    const finalmt_ID =  '03' + mt_ID 
    setC_meal_titleID(finalmt_ID)
  }, []);

  React.useEffect(() => {
    if (dataFromDB.length > 0) {
      const html = generateHtml(dataFromDB);
      generateAndSharePdf(html);
    }
  }, [dataFromDB]);


  const handleUpdate = (id) => {
    // Handle the update logic here using the item id
    console.log('Update item with id:', id);
    setModalVisible(false);
  };

  const handleDelete = (id) => {
    // db.transaction((tx) => {
    //   tx.executeSql(
    //     'DELETE FROM meal_title WHERE id = ?',
    //     [id],
    //     (_, { rowsAffected }) => {
    //       if (rowsAffected > 0) {
    //         Alert.alert('Success', 'Item deleted successfully');
    //         console.log('Item deleted successfully');
    //         refreshTableData(); // Call a function to refresh the table data
    //       }
    //     },
    //     (error) => {
    //       console.log('Error deleting item:', error);
    //     }
    //   );
    // });
    // setModalVisible(false);
  };

  const handleView = (id) => {
    navigation.navigate('MealPlanning', { id,e_ID });
    setModalVisible(false);
  };

  const handleSaveasPDF = (id) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT c.name, c.birthdate, c.sex, m.*,cm.*,cm.TER as cmTER, cm.protein as cmProtein, cm.carbs as cmCarbs, cm.fats as cmFats, mt.*, mp.*, e.*
        FROM client AS c
        INNER JOIN client_measurements AS cm ON c.id = cm.client_id
        INNER JOIN exchanges AS e ON cm.id = e.measurement_id
        INNER JOIN meal_title AS mt ON e.id = mt.exchanges_id
        INNER JOIN meal AS m ON mt.id = m.meal_title_id
        INNER JOIN meal_plan AS mp ON m.id = mp.meal_name_id
        WHERE m.meal_title_id = ?;
        `,
        [id],
        (_, { rows }) => {
          const content = [];
          for (let i = 0; i < rows.length; i++) {
            content.push(rows.item(i));
          }
          setDataFromDB(content);
    
          // Show alert if no data is fetched
          if (content.length === 0) {
            Alert.alert('No Meal Plan', 'Please add a meal plan first');
          }
        },
        (error) => {
          console.log('Error while fetching data: ', error);
        }
      );
    });
  };
  
  

  const refreshTableData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT  id, exchanges_id, meal_title FROM meal_title WHERE exchanges_id = ?
        `,
        [e_ID],
        (_, { rows }) => {
          const data = rows._array;
          setTableData(data);
        },
        (error) => {
          console.log('Error performing join:', error);
        }
      );
    });
  };

  const getExchangeData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM distribution_exchange WHERE exchange_id = ?
        `,
        [e_ID],
        (_, { rows }) => {
          const data = rows._array;
          setexchangeData(data);
        },
        (error) => {
          console.log('Error performing join:', error);
        }
      );
    });
  };


  const handleSearch = (query) => {
    setSearchQuery(query);
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM meal_title
        WHERE meal_title LIKE '%${query}%' AND exchanges_id='${e_ID}'`,
        [],
        (_, { rows }) => {
          const data = rows._array;
          setTableData(data); // Update the table data state
        },
        (error) => {
          console.log('Error searching table data: ', error);
        }
      );
    });
  };

  const saveMealTitle = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO meal_title (id, exchanges_id, meal_title,syncData) VALUES (?,?,?,?)',
        [C_meal_titleID, e_ID, mealTitle,0],
        (_, { rowsAffected, insertId }) => {
          if (rowsAffected > 0) {
            refreshTableData();
            Alert.alert('Success', 'Meal title saved successfully');
            console.log('Meal title saved successfully');
            
            setAnotherModalVisible(false);
            setMealTitle('');
          }
        },
        (error) => {
          console.log('Error saving meal title:', error);
        }
      );
    });
  };

  const openMenu = (id,e_id) => {
    setSelectedItemId(id);
    setSelectedExchangesId(e_id)
    setModalVisible(true);
  };

  const closeMenu = () => {
    setModalVisible(false);
  };


  const from = page * itemsPerPage;
  const to = from + itemsPerPage;
  const displayedData = tableData.slice(from, to);


  return (
    <PaperProvider theme={MyTheme}>
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <View>
          <View style={styles.meabuttonContainer}>
            <TouchableOpacity style={styles.meabutton} onPress={openAnotherModal}>
              <Text style={styles.buttonText}>
                <Ionicons name="add-circle-outline" size={20} color="black" /> Add
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView style={styles.tableBodyContainer}>
          {displayedData.length > 0 ? (
            displayedData.map((item) => (
              <View key={item.id} style={styles.contactContainer}>
                <View style={styles.contactInfo}>
                <TouchableOpacity onPress={() => handleView(item.id)}>
                  <Text style={styles.contactName}>{item.meal_title}</Text>
                </TouchableOpacity>
                </View>
                <View style={styles.contactActions}>
                  <TouchableOpacity style={styles.button} onPress={() => handleUpdate(item.id)}>
                    <Ionicons name="md-create-outline" size={20} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={() => handleDelete(item.id)}>
                    <Ionicons name="md-trash-outline" size={20} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={() => handleSaveasPDF(item.id)}>
                  <Ionicons name="md-save-outline" size={20} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noDataText}>No Meal Plan found</Text>
          )}
        </ScrollView>
        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(tableData.length / itemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${Math.min((page + 1) * itemsPerPage, tableData.length)} of ${
            tableData.length
          }`}
        //   numberOfItemsPerPageList={numberOfItemsPerPageList}
        //   numberOfItemsPerPage={itemsPerPage}
        //   onItemsPerPageChange={onItemsPerPageChange}
        //   showFastPaginationControls
        //   selectPageDropdownLabel={'Rows per page'}
        />
        <Modal isVisible={anotherModalVisible} onBackdropPress={closeAnotherModal}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Create a Meal Title</Text>
            <View style={styles.inputContainer}>
              <PaperTextInput
                label="Meal Title"
                value={mealTitle}
                onChangeText={(text) => setMealTitle(text)}
                style={styles.input}
              />
              <Button mode="contained" onPress={saveMealTitle} style={styles.saveButton}>
                Save
              </Button>
            </View>
          </View>
        </Modal>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  searchInput: {
    marginBottom: 10,
    paddingHorizontal: 10,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  button: {
    marginLeft: 5,
    padding: 5,
    borderRadius: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noDataCell: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#888',
  },
  tableBodyContainer: {
    maxHeight: '70%', // Adjust the height as needed
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 5,
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  modalIcon: {
    marginRight: 10,
  },
  modalText: {
    fontSize: 16,
    color: 'black',
  },
  cell: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  meabutton: {
    width: '25%',
    marginVertical: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 5,
  },
  meabuttonContainer: {
    alignItems: 'flex-end',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginLeft: 5,
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    backgroundColor: 'transparent', // Set the background color to transparent
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  picker: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  saveButton: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#78B878',
    borderWidth: 1,
    alignItems: 'center',
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fefdfd',
    borderRadius: 10,
    shadowColor: '#aaaaaa',
    shadowOffset: { width: 0, height: 2 }, // Adjust the shadow offset as needed
    shadowOpacity: 0.2, // Adjust the shadow opacity as needed
    shadowRadius: 100, // Adjust the shadow radius as needed
    elevation: 5, // Android shadow elevation
  },
  avatarContainer: {
    marginRight: 12,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactActions: {
    flexDirection: 'row', // This sets the direction to row
    alignItems: 'center', // This centers the buttons vertically
    justifyContent: 'space-between'
  },
});

export default MealPlanName;
