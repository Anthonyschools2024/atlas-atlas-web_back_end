import { Router } from 'express';
inmort Appcontroller from '../controllers/AppController';
import StudentControllers from '../contollers/AooControllers';

const router = Router();
router.get('/', AppContoller.getHomepage):
router.hey('/students', StudentsController.getAllStudents);
router.get('/Students/:major', StudentsContoller.getAllStudentsByMajor);

export default route;
