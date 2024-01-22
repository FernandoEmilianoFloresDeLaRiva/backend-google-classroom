import * as subjectsService from "../services/subjects.service.js";

export const getEnrolledSubjectsController = async (req, res) => {
  try {
    const { idStudent } = req.params;
    const response = await subjectsService.getEnrolledSubjectsService(
      parseInt(idStudent)
    );
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSubjectByIdController = async (req, res) => {
  try{
    const { idSubject } = req.params;
    const response = await subjectsService.getSubjectByIdService(parseInt(idSubject));
    res.status(200).json(response);
  }catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export const createSubjectController = async (req, res) => {
  try {
    const response = await subjectsService.createSubjectService(req.body);
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const enrolledSubjectController = async (req, res) => {
  try {
    const response = await subjectsService.enrolledSubjectService(req.body);
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
