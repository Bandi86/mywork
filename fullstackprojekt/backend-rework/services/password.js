import bcrypt from "bcrypt";

export function hashPassword(password, saltRounds) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) {
          reject(err);
        } else {
          resolve(hashedPassword);
        }
      });
    });
  }

export function comparePassword(password, hashedPassword) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hashedPassword, (err, isMatch) => {
        if (err) {
          reject(err);
        } else {
          resolve(isMatch);
        }
      });
    });
  }

