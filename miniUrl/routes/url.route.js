import express from 'express';
import { handleCreateUrl } from '../controllers/url.controller.js';

export const router = express.Router();

router.post('/',handleCreateUrl)

