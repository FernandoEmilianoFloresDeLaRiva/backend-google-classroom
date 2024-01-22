import * as subjectRepository from "../repositories/subjects.repository.js";

export const getEnrolledSubjectsService = async (idStudent) => {
  try {
    const res = await subjectRepository.getEnrolledSubjects(idStudent);

    return res
  } catch (err) {
    throw new Error(err);
  }
};

export const getSubjectByIdService = async (idSubject) => {
  try {
    const res = await subjectRepository.getSubjectById(idSubject);
    console.log(res)
    return res;
  } catch (err) {
    throw new Error(err);
  }
};

export const createSubjectService = async (reqSubject) => {
  try {
    const { subjectName, idTeacher, code } = reqSubject;
    const res = await subjectRepository.createSubject(
      subjectName,
      idTeacher,
      code
    );
    return res;
  } catch (err) {
    throw new Error(err);
  }
};

export const enrolledSubjectService = async (reqSubject) => {
  try {
    const { code, idUser } = reqSubject;
    const existingSubject = await subjectRepository.getSubjectByCode(code);
    console.log(existingSubject);
    if (existingSubject.length) {
      const { idSubject } = existingSubject[0];
      const res = await subjectRepository.enrolledsubject(idSubject, idUser);
      return res;
    }
    throw new Error("No existe una materia con ese código");
  } catch (err) {
    throw new Error(err);
  }
};
