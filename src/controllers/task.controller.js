import * as taskService from "../services/task.service.js";

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
export const getCountPendingTasksByUserIdController = async (req, res) => {
  try {
    const { idUser } = req.params;
    const id = parseInt(idUser, 10)
    const initialTasks = await taskService.getPendingTasksByUserIdService(
      id
    );
    // Obtener la longitud inicial de las tareas
    const initialTasksLength = initialTasks.length;
    const updatedTasks = await taskService.checkForUpdates(
      id,
      initialTasksLength
    );
    res.status(200).json({ count: updatedTasks.length });
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
    const response = await taskService.createTaskService(req.body);
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const updateTaskStateController = async (req, res) => {
  try {
    const { idTask } = req.params;
    const response = await taskService.updateTaskStateService(idTask);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
