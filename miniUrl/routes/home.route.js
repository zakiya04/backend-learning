import express from 'express';
import { handleGetUrls } from '../controllers/url.controller.js';

const homeRouter = express.Router();

homeRouter.get('/',(req,res)=>{
    if(!req.body) return res.redirect('/login');

 handleGetUrls(req,res)
});


homeRouter.get('/signup',(req,res)=>{
    return res.render('signup')
});
homeRouter.get('/login',(req,res)=>{
    return res.render('login')
})

export default homeRouter;