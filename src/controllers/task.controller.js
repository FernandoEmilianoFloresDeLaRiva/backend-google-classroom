import * as taskService from "../services/task.service.js";

export const getTaskController = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await taskService.getTaskService(taskId);
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getTasksBySubjectIdController = async (req, res) => {
  try {
    const { idSubject } = req.params;
    const initialTasks = await taskService.getTasksBySubjectIdService(
      idSubject
    );
    res.status(200).json(initialTasks);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getInvalidTaskByUserIdController = async (req, res) => {
  try {
    const { idUser } = req.params;
    const response = await taskService.getInvalidTasksServices(idUser);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getPendingTasksByUserIdController = async (req, res) => {
  try {
    const { idUser } = req.params;
    const response = await taskService.getPendingTasksByUserIdService(idUser);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

//long pulling
let resArr = [];
export const getCountPendingTasksByUserIdController = async (req, res) => {
  try {
    const { idUser } = req.params;
    const objectRes = {
      res,
      id: idUser,
    };
    resArr.push(objectRes);
    req.on("close", () => {
      const index = resArr.length - 1;
      resArr = resArr.slice(index, 1);
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getFullFiledTasksByUserIdController = async (req, res) => {
  try {
    const { idUser } = req.params;
    const response = await taskService.getFullFiledTasksByUserIdService(idUser);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const createTaskController = async (req, res) => {
  try {
    const idTask = await taskService.createTaskService(req.body);
    responseClients();
    res.status(201).json(idTask);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const updateTaskStateController = async (req, res) => {
  try {
    const { idTask } = req.params;
    const response = await taskService.updateTaskStateService(parseInt(idTask));
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

async function responseClients() {
  for (const resObject of resArr) {
    const { res, id } = resObject;
    const tasks = await taskService.getPendingTasksByUserIdService(id);
    const taskLength = tasks.length;
    res.status(200).json(taskLength);
  }
}
