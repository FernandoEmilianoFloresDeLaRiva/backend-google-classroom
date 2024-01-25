import db from "../config/db.js";

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
      .then((res) => {
        console.log(name);
        const arrHeaderResponse = Object.values(res[0]);
        const idInsert = arrHeaderResponse[2];
        resolve({ id: idInsert, email, password });
      })
      .catch((err) => reject(err));
  });
};

export const getEnrolledUsersBySubject = (idSubject) => {
  return new Promise((resolve, reject) => {
    const query =
      "select u.name, u.idUser, e.isTeacher from enrolledsubjects as e inner join users as u on u.idUser = e.idStudent where e.idSubject = ?;";
    db.execute(query, [idSubject])
      .then((res) => resolve(res[0]))
      .catch((err) => reject(err));
  });
};
