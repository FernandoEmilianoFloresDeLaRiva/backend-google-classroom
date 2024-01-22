import db from "../config/db.js";

export const getEnrolledSubjects = (idStudent) => {
  return new Promise((resolve, reject) => {
    const query =
      "select e.idSubject, s.subjectName, s.idTeacher, s.code from enrolledsubjects as e inner join subjects as s where e.idSubject = s.idSubject and e.idStudent = ?;";
    db.execute(query, [idStudent])
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
      .then((res) => resolve(res[0]))
      .catch((err) => reject(err));
  });
};

export const enrolledsubject = (idSubject, idStudent) => {
  return new Promise((resolve, reject) => {
    const query =
      "insert into enrolledsubjects (idSubject, idStudent) values (?, ?)";
    db.execute(query, [idSubject, idStudent])
      .then((res) => resolve(res[0]))
      .catch((err) => reject(err));
  });
};
