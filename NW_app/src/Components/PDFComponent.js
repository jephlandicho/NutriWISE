import React, { useState, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('mydatabase.db');

export const generatePdf = async (mealNameId, columns) => {
  const [dataFromDB, setDataFromDB] = useState([]);

  useEffect(() => {
    displayData();
  }, []);

  const displayData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT DISTINCT c.name, c.birthdate, c.sex, m.*, mt.meal_title, mp.*
        FROM client AS c
        INNER JOIN client_measurements AS cm ON c.id = cm.client_id
        INNER JOIN exchanges AS e ON cm.id = e.measurement_id
        INNER JOIN meal_title AS mt ON e.id = mt.exchanges_id
        INNER JOIN meal AS m ON mt.id = m.meal_title_id
        INNER JOIN meal_plan AS mp ON m.id = mp.meal_name_id
        WHERE m.meal_title_id = ?
        `,
        [mealNameId],
        (_, { rows }) => {
          const content = [];
          for (let i = 0; i < rows.length; i++) {
            content.push(rows.item(i));
          }
          setDataFromDB(content);
        },
        (error) => {
          console.log('Error while fetching data: ', error);
        }
      );
    });
  };

  const generateHtml = () => {
    let htmlContent = `
      <html>
        <head>
          <style>
            h1 {
              text-align: center;
            }
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid black;
              padding: 8px;
              text-align: left;
            }
          </style>
        </head>
        <body>
          <h1>Data from Database</h1>
          <table>
            <tr>
    `;

    columns.forEach((column) => {
      htmlContent += `<th>${column}</th>`;
    });

    htmlContent += `</tr>`;

    dataFromDB.forEach((item) => {
      htmlContent += `<tr>`;
      columns.forEach((column) => {
        htmlContent += `<td>${item[column.toLowerCase()]}</td>`;
      });
      htmlContent += `</tr>`;
    });

    htmlContent += `
          </table>
        </body>
      </html>
    `;

    return htmlContent;
  };

  const generatePdf = async () => {
    if (dataFromDB.length === 0) {
      console.log('No data to generate PDF');
      return;
    }

    const html = generateHtml();
    const timestamp = new Date().getTime(); // Get current timestamp
    const fileUri = `${FileSystem.documentDirectory}data_${timestamp}.pdf`;

    try {
      const file = await printToFileAsync({
        html: html,
        width: 612,
        height: 792,
        base64: false,
      });

      await FileSystem.moveAsync({
        from: file.uri,
        to: fileUri,
      });

      await shareAsync(fileUri);
    } catch (error) {
      console.log('Error while generating PDF: ', error);
    }
  };

  // Call the generatePdf function when the component is rendered
  useEffect(() => {
    generatePdf();
  }, []);

  return <></>; // No need to return anything here, as the component doesn't render any visible content
};

export default PDFComponent;
