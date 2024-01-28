import db from "../config/db.js";

export const getTaskById = (taskId) => {
  return new Promise((resolve, reject) => {
    const query = "select workName, description, date, p.state, u.name from works as w inner join pendings as p on p.idWork = w.idWork inner join subjects as s on w.idSubject = s.idSubject inner join users as u on s.idTeacher = u.idUser where w.idWork = ?";
    db.execute(query, [taskId])
      .then((res) => resolve(res[0]))
      .catch((err) => reject(err));
  });
}

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
    const query = "update pendings set state = true where idWork = ?";
    db.execute(query, [idTask])
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getInvalidTasks = (idUser) => {
  return new Promise((resolve, reject) => {
    const query =
      "select w.workName, w.date, w.idWork, s.subjectName from works as w inner join pendings as p on p.idWork = w.idWork inner join subjects as s on s.idSubject = w.idSubject where p.idUser = ? and p.state = false;";
    db.execute(query, [idUser])
      .then((res) => resolve(res[0]))
      .catch((err) => reject(err));
  });
};
