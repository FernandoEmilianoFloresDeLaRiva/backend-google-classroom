import db from "../config/db.js";

export const getTasksBySubjectId = (subjectId) => {
  return new Promise((resolve, reject) => {
    const query = "select * from works where idSubject = ?";
    db.execute(query, [subjectId])
      .then((res) => resolve(res[0]))
      .catch((err) => reject(err));
  });
};

export const getPendingTasksByUserId = (userId) => {
  return new Promise((resolve, reject) => {
    const query =
      "select w.workName, w.date, w.idWork, s.subjectName from works as w inner join pendings as p on p.idWork = w.idWork inner join subjects as s on s.idSubject = w.idSubject where p.idUser = ? and p.state = false;";
    db.execute(query, [userId])
      .then((res) => resolve(res[0]))
      .catch((err) => reject(err));
  });
};

export const getFullFiledTasksByUserId = (userId) => {
  return new Promise((resolve, reject) => {
    const query =
      "select w.workName, w.date, w.idWork, s.subjectName from works as w inner join pendings as p on p.idWork = w.idWork inner join subjects as s on s.idSubject = w.idSubject where p.idUser = ? and p.state = true;";
    db.execute(query, [userId])
      .then((res) => resolve(res[0]))
      .catch((err) => reject(err));
  });
};

export const createTask = (idSubject, workname, description, date) => {
  return new Promise((resolve, reject) => {
    const query =
      "insert into works (idSubject, workName, description, date) values (?,?,?,?)";
    db.execute(query, [idSubject, workname, description, new Date(date)])
      .then((res) => {
        const arrHeaderResponse = Object.values(res[0]);
        const idInsert = arrHeaderResponse[2];
        return resolve({ id: idInsert });
      })
      .catch((err) => reject(err));
  });
};

export const createPendingTask = (idWork, idUser) => {
  return new Promise((resolve, reject) => {
    const query = "insert into pendings (idWork, idUser, state) values (?,?,0)";
    db.execute(query, [idWork, idUser])
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const updateTaskState = (idTask) => {
  return new Promise((resolve, reject) => {
    const query = "update pendings set status = true where idWork = ?";
    db.execute(query, [idTask])
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
