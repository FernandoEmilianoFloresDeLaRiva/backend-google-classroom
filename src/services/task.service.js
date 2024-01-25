import * as taskRepository from "../repositories/task.repository.js";
import { getEnrolledUsersBySubject } from "../repositories/users.repository.js";

export const getTasksBySubjectIdService = async (subjectId) => {
  try {
    const res = await taskRepository.getTasksBySubjectId(subjectId);
    return res;
  } catch (err) {
    throw new Error(err);
  }
};

export const getPendingTasksByUserIdService = async (userId) => {
  try {
    const res = await taskRepository.getPendingTasksByUserId(userId);
    const dateCreated = new Date().toDateString()
    const resFilter = res.filter((task) => {
      return new Date(task.date)>= new Date(dateCreated);
    });
    return resFilter;
  } catch (err) {
    throw new Error(err);
  }
};

export const getFullFiledTasksByUserIdService = async (userId) => {
  try {
    const res = await taskRepository.getFullFiledTasksByUserId(userId);
    return res;
  } catch (err) {
    throw new Error(err);
  }
};

export const createTaskService = async (taskReq) => {
  try {
    const { idSubject, workname, description, date } = taskReq;
    const res = await taskRepository.createTask(
      idSubject,
      workname,
      description,
      date
    );
    const usersEnrolled = await getEnrolledUsersBySubject(idSubject);
    usersEnrolled.map(async (user) => {
      const { id } = res;
      if (!user?.isTeacher)
        await taskRepository.createPendingTask(id, user?.idUser);
    });

    return res;
  } catch (err) {
    throw new Error(err);
  }
};

export const updateTaskStateService = async (idTask) => {
  try {
    const res = await taskRepository.updateTaskState(idTask);
    return res;
  } catch (err) {
    throw new Error(err);
  }
};

export const getInvalidTasksServices = async (userId) => {
  try {
    const res = await taskRepository.getInvalidTasks(userId);
    const resFilter = res.filter((task) => new Date() > new Date(task.date));
    return resFilter;
  } catch (err) {
    throw new Error(err);
  }
};

export const checkForUpdates = async (userId, currentTasksLength) => {
  return new Promise(async (resolve, reject) => {
    try {
      const currentTasks = await taskRepository.getPendingTasksByUserId(userId);
      console.log(currentTasksLength);
      // Compara la longitud del array actual con la longitud anterior
      if (currentTasks.length > currentTasksLength) {
        resolve(currentTasks.length);
      } else {
        // Si no hay nuevas tareas, espera y vuelve a verificar después de un tiempo
        setTimeout(async () => {
          const updatedTasks = await checkForUpdates(
            userId,
            currentTasksLength
          );
          resolve(updatedTasks);
        }, 5000);
      }
    } catch (err) {
      reject(err);
    }
  });
};
