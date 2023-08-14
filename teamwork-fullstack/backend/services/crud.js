import { sqlError } from "./errors.js";
import { successes } from "./successes.js";

// ADD ENTRY TO TABLE IN PARAMETER ACCORDING TO PARAMATERS

export function createEntry(res, data, dontSendResponseData) {
  const timestamp = Date.now();

  // EXAMPLE DATA THAT IS REQUIRED FROM HTTP REQUEST:
  // {
  //     "name": "new1618"
  // }

  // EXAMPLE DATA OBJECT AND DECLARATIONS WHICH IS REQUIRED TO CREATE:
  // const id = nanoid(16)
  // const data = {
  //     db: db,
  //     table: table,
  //     columns: 'id, name, created_at, updated_at',
  //     placeholder: '$id, $name, $created_at, $updated_at',
  //     values: { $id: id, $name: req.body.name, $created_at: timestamp, $updated_at: timestamp }
  // }

  data.db.serialize(() => {
    if (data.columns && data.values) {
      const stmt = data.db.prepare(
        `INSERT INTO ${data.table} (${data.columns}) VALUES (${data.placeholder})`,
        data.values
      );
      stmt.run((err) => {
        if (dontSendResponseData) {
          if (err) sqlError(res, err, 400);
        } else {
          if (err) sqlError(res, err, 400);
          else successes(res, 201);
        }
      });
    }
  });
}

// LIST ENTRY FROM TABLE IN PARAMETER ACCORDING TO PARAMATERS

export function readEntry(res, data) {
  const timestamp = Date.now();
  // EXAMPLE FOR SINGLE LIST USAGE:
  // const { id } = req.params;
  // const columns = 'id'
  // const placeholder = '$id'
  // const data = {
  //     db: db,
  //     table: table,
  //     selectedItems: "*",
  //     values: { $id: id },
  //     options: `WHERE ${columns} = ${placeholder}`
  // }
  // readEntry(res, data)

  // EXAMPLE FOR LIST ALL USAGE
  // const data = {
  //     db: db,
  //     table: table,
  //     selectedItems: "*",
  // }
  // readEntry(res, data)

  data.db.serialize(() => {
    if (data.options) {
      const stmt = data.db.prepare(
        `SELECT ${data.selectedItems} FROM ${data.table} ${data.options}`,
        data.values
      );
      stmt.all((err, rows) => {
        if (err) sqlError(res, err, 400);
        else successes(res, 201, rows);
      });
    } else {
      const stmt = data.db.prepare(
        `SELECT ${data.selectedItems} FROM ${data.table}`
      );
      stmt.all((err, rows) => {
        if (err) sqlError(res, err, 400);
        else successes(res, 201, rows);
      });
    }
  });
}

// UPDATE ENTRY FROM TABLE IN PARAMETER

export function updateEntry(res, data, listData, dontSendResponseData) {
  const timestamp = Date.now();
  // EXAMPLE DATA WHICH IS REQUIRED FROM HTTP REQUEST:
  // {
  //     "columns": "id=$id, name=$name",
  //     "data": {
  //         "$id": "MB-mrn9OYgwBUez-",
  //         "$name": "popo"
  //     }
  // }

  // EXAMPLE DECLARATIONS:
  // const { id } = req.params;
  // const patchColumns = req.body.columns
  // const patchData = req.body.data

  // const listColumns ='id'
  // const listPlaceholder = '$id'

  // EXAMPLE DATA OBJECT WHICH IS REQUIRED TO MODIFY:
  // const data = {
  //     db: db,
  //     table: table,
  //     values: patchData,
  //     columns: patchColumns,
  //     options: `WHERE id=$id`
  // }

  // EXAMPLE LISTDATA WHICH IS REQUIRED TO MODIDY:
  // const listData = {
  //     db: db,
  //     table: table,
  //     values: { $id: id },
  //     options: `WHERE ${listColumns} = ${listPlaceholder}`
  // }
  // updateEntry(res, data, listData);

  data.db.serialize(() => {
    const stmtRead = data.db.prepare(
      `SELECT * FROM ${listData.table} ${listData.options}`,
      listData.values
    );
    stmtRead.get((lstErr, lstRow) => {
      if (lstErr) sqlError(res, lstErr, 400);
      else {
        // 1 ROW
        // if (lstRow.length< 2) {
        if (lstRow.updated_at) {
          console.log(
            `UPDATE ${data.table} SET ${data.columns}, updated_at='${timestamp}' ${data.options}`,
            data.values
          );
          const stmt = data.db.prepare(
            `UPDATE ${data.table} SET ${data.columns}, updated_at='${timestamp}' ${data.options}`,
            data.values
          );
          stmt.run((err, result) => {
            if (dontSendResponseData) {
              if (err) sqlError(res, err, 400);
            } else {
              if (err) sqlError(res, err, 400);
              else successes(res, 201, result);
            }
          });
        } else {
          const stmt = data.db.prepare(
            `UPDATE ${data.table} SET ${data.columns} ${data.options}`,
            data.values
          );
          stmt.run((err, result) => {
            if (dontSendResponseData) {
              if (err) sqlError(res, err, 400);
            } else {
              if (err) sqlError(res, err, 400);
              else successes(res, 201, result);
            }
          });
        }
        // }
        // // MULTIPLE ROWS
        // else {
        //   lstRow.array.forEach(element => {
        //     if (lstRow.updated_at) {
        //       const stmt = data.db.prepare(
        //         `UPDATE ${data.table} SET ${data.columns}, updated_at=${timestamp} ${data.options}`,
        //         data.values
        //       );
        //       stmt.run((err, result) => {
        //         if (err) sqlError(res, err, 400);
        //         else successes(res, 201, result);
        //       });
        //     } else {
        //       const stmt = data.db.prepare(
        //         `UPDATE ${data.table} SET ${data.columns} ${data.options}`,
        //         data.values
        //       );
        //       stmt.run((err, result) => {
        //         if (err) sqlError(res, err, 400);
        //         else successes(res, 201, result);
        //       });
        //     }
        //   });
        // }
      }
    });
  });
}

// DELETE ENTRY FROM TABLE IN PARAMETER
export function deleteEntry(res, data, dontSendResponseData) {
  const timestamp = Date.now();
  // USAGE EXAMPLE:
  // const { id } = req.params;
  //     const data = {
  //       db: db,
  //       table: table,
  //       columns: "id",
  //       placeholder: "$id",
  //       values: { $id: id },
  //     };

  //     deleteEntry(res, data);
  data.db.serialize(() => {
    if (data.options) {
      const stmt = data.db.prepare(
        `DELETE FROM ${data.table} WHERE ${data.columns} = ${data.placeholder} ${data.options}`,
        data.values
      );
      stmt.run(function (err) {
        if (err) sqlError(res, err, 400);
        else {
          if (dontSendResponseData) return;
          else res.json({ success: this.changes > 0 ? true : false });
        }
      });
    } else {
      const stmt = data.db.prepare(
        `DELETE FROM ${data.table} WHERE ${data.columns} = ${data.placeholder}`,
        data.values
      );
      stmt.run(function (err) {
        if (err) sqlError(res, err, 400);
        else {
          if (dontSendResponseData) return;
          else res.json({ success: this.changes > 0 ? true : false });
        }
      });
    }
  });
}
