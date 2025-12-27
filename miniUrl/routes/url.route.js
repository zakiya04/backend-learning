import express from 'express';
import { handleCreateUrl, handleAnalytics, handleGetUrl} from '../controllers/url.controller.js';

export const urlRouter = express.Router();

urlRouter.post('/', handleCreateUrl);
urlRouter.get('/:shortId', handleGetUrl);
urlRouter.get("/analytics/:shorturl", handleAnalytics)

