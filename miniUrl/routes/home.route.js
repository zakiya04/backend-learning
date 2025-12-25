import express from 'express';
import { handleGetUrls } from '../controllers/url.controller.js';

export const homeRouter = express.Router();


homeRouter.get('/',handleGetUrls)

export default homeRouter;