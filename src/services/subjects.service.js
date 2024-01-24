import * as subjectRepository from "../repositories/subjects.repository.js";
import { createKey } from "../utils/createKey.js";

export const getEnrolledSubjectsService = async (idStudent) => {
  try {
    const res = await subjectRepository.getEnrolledSubjects(idStudent);

    return res;
  } catch (err) {
    throw new Error(err);
  }
};

export const getCreatedSubjectsService = async (idTeacher) => {
  try {
    const res = await subjectRepository.getCreatedSubjects(idTeacher);
    return res;
  } catch (err) {
    throw new Error(err);
  }
};

export const getSubjectByIdService = async (idSubject) => {
  try {
    const subjectById = await subjectRepository.getSubjectById(idSubject);
    const { idTeacher } = subjectById[0];
    const res = await subjectRepository.getSubjectAndTeacher(
      idTeacher,
      idSubject
    );
    console.log(res);
    return idTeacher;
  } catch (err) {
    throw new Error(err);
  }
};

export const createSubjectService = async (reqSubject) => {
  try {
    const { subjectName, idTeacher } = reqSubject;
    const code = createKey();
    const res = await subjectRepository.createSubject(
      subjectName,
      idTeacher,
      code
    );
    const { id } = res;
    const resEnrrolled = await subjectRepository.enrolledsubject(
      id,
      idTeacher,
      true
    );
    return resEnrrolled;
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

export const getSubjectAndTeacherService = async (idTeacher, idSubject) => {
  try {
    const res = await subjectRepository.getSubjectAndTeacher(
      idTeacher,
      idSubject
    );
    console.log(res);
    return res;
  } catch (err) {
    throw new Error(err);
  }
};
