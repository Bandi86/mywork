import { sqlError } from "./errors.js";
import { successes } from "./successes.js";
import { deleteEntry } from "./crud.js";

const timestamp = Date.now();

// INCREASE DECREASE ENTRY
export default function increaseDecreaseEntry(res, data, listData, deleteData) {
    data.db.serialize(() => {
      const stmtRead = data.db.prepare(
        `SELECT * FROM ${listData.table} ${listData.options}`,
        listData.values
      );
      stmtRead.get((lstErr, lstRow) => {
        if (lstErr) sqlError(res, lstErr, 400);
        else {
          if (lstRow.updated_at) {
            // IF THERE IS updated_at
            if (data.action == "-") {
              const newAmount = lstRow[data.column] - data.amount;
              console.log(newAmount)
              if (newAmount <= 0) {
                deleteEntry(res, deleteData);
              } else {
                const stmt = data.db.prepare(
                  `UPDATE ${data.table} SET ${data.column}='${newAmount}', updated_at='${timestamp}' ${data.options}`, data.values
                );
                stmt.run((err, result) => {
                  if (err) sqlError(res, err, 400);
                  else successes(res, 201, result);
                });
              }
            } else if (data.action == "+") {
              const newAmount = lstRow[data.column] + data.amount;
              const stmt = data.db.prepare(
                `UPDATE ${data.table} SET ${data.column}='${newAmount}', updated_at='${timestamp}' ${data.options}`,
                data.values
              );
              stmt.run((err, result) => {
                if (err) sqlError(res, err, 400);
                else successes(res, 201, result);
              });
            }
          } else {
            // IF THERE IS NO updated_at
            if (data.action == "-") {
              const newAmount = lstRow[data.column] - data.amount;
              if (newAmount <= 0) {
                deleteEntry(res, deleteData);
              } else {
                const stmt = data.db.prepare(
                  `UPDATE ${data.table} SET ${data.column}='${newAmount}' ${data.options}`, data.values
                );
                stmt.run((err, result) => {
                  if (err) sqlError(res, err, 400);
                  else successes(res, 201, result);
                });
              }
            } else if (data.action == "+") {
              const newAmount = lstRow[data.column] + data.amount;
              const stmt = data.db.prepare(
                `UPDATE ${data.table} SET ${data.column}='${newAmount}' ${data.options}`,
                data.values
              );
              stmt.run((err, result) => {
                if (err) sqlError(res, err, 400);
                else successes(res, 201, result);
              });
            }
          }
        }
      });
    });
  }