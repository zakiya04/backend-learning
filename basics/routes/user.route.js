import express from 'express';
import{handlegetAllUsers, handleGetUser, handlePutUser, handleDeleteUser, handleCreateUser} from '../controllers/user.controller.js';

const router = express.Router();

router.route("/").get(handlegetAllUsers).post(handleCreateUser);

router.route("/:id").get(handleGetUser).patch(handlePutUser).delete(handleDeleteUser);


export default router