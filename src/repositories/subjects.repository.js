import db from "../config/db.js";

export const getEnrolledSubjects = (idStudent) => {
  return new Promise((resolve, reject) => {
    const query =
      "select e.idSubject, s.subjectName, s.idTeacher, s.code, u.name from enrolledsubjects as e inner join subjects as s on e.idSubject = s.idSubject inner join users as u on  u.idUser = e.idStudent where e.idStudent = ? and e.isTeacher = false;";
    db.execute(query, [idStudent])
      .then((res) => resolve(res[0]))
      .catch((err) => reject(err));
  });
};

export const getCreatedSubjects = (idTeacher) => {
  return new Promise((resolve, reject) => {
    const query =
      "select e.idSubject, s.subjectName, s.idTeacher, s.code, u.name from enrolledsubjects as e inner join subjects as s on e.idSubject = s.idSubject inner join users as u on u.idUser = s.idTeacher or u.idUser = e.idStudent where e.idStudent = ? and e.isTeacher = true;";
    db.execute(query, [idTeacher])
      .then((res) => resolve(res[0]))
      .catch((err) => reject(err));
  });
};

export const getSubjectById = (idSubject) => {
  return new Promise((resolve, reject) => {
    const query = "select * from subjects where idSubject = ?";
    db.execute(query, [idSubject])
      .then((res) => resolve(res[0]))
      .catch((err) => reject(err));
  });
};

export const getSubjectByCode = (code) => {
  return new Promise((resolve, reject) => {
    const query = "select * from subjects where code = ? ";
    db.execute(query, [code])
      .then((res) => resolve(res[0]))
      .catch((err) => reject(err));
  });
};

export const createSubject = (subjectName, idTeacher, code) => {
  return new Promise((resolve, reject) => {
    const query =
      "insert into subjects (subjectName, idTeacher, code) values (?, ?, ?)";
    db.execute(query, [subjectName, idTeacher, code])
      .then((res) => {
        const arrHeaderResponse = Object.values(res[0]);
        const idInsert = arrHeaderResponse[2];
        resolve({ id: idInsert, idTeacher, code });
      })
      .catch((err) => reject(err));
  });
};

export const enrolledsubject = (idSubject, idStudent, isTeacher = false) => {
  return new Promise((resolve, reject) => {
    const query =
      "insert into enrolledsubjects (idSubject, idStudent, isTeacher) values (?, ?, ?)";
    db.execute(query, [idSubject, idStudent, isTeacher])
      .then((res) => resolve(res[0]))
      .catch((err) => reject(err));
  });
};

export const getSubjectAndTeacher = (idTeacher, idSubject) => {
  console.log(idTeacher, idSubject);
  return new Promise((resolve, reject) => {
    const query =
      "select idSubject,subjectName,idTeacher, u.name  from subjects as s inner join users as u on s.idSubject = u.idUser where s.idSubject = ? and u.idUser = ?";
    db.execute(query, [idSubject, idTeacher])
      .then((res) => resolve(res[0]))
      .catch((err) => reject(err));
  });
};
