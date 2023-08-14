import { successes } from "./successes.js";
import { sqlError } from "./errors.js";

//COUNT PRODUCTS
export default function getCount(res, data) {
  data.db.serialize(() => {
    if (data.options) {
      const stmt = data.db.prepare(
        `SELECT ${data.selectedItems} FROM ${data.table} ${data.options}`,
        data.values
      );
      stmt.get((err, rows) => {
        if (err) sqlError(res, err, 400);
        else successes(res, 201, rows);
      });
    } else {
      const stmt = data.db.prepare(
        `SELECT ${data.selectedItems} FROM ${data.table}`
      );
      stmt.get((err, rows) => {
        if (err) sqlError(res, err, 400);
        else successes(res, 201, rows);
      });
    }
  })
}
