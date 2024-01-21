import db from "../../config/db.js";

export const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    const query = "select * from users";
    db.execute(query)
      .then((res) => resolve(res[0]))
      .catch((err) => reject(err));
  });
};

export const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = "select * from users where email = ?";
    db.execute(query, [email])
      .then((res) => resolve(res[0]))
      .catch((err) => reject(err));
  });
};

export const createUser = (name, email, password) => {
  return new Promise((resolve, reject) => {
    const query = "insert into users (name, email, password) values (?,?,?)";
    db.execute(query, [name, email, password])
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
