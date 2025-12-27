import { createUrl, getUrl, getClicks, getAllUrls} from "../models/url.model.js";
import {nanoid} from "nanoid";

export async function handleCreateUrl(req,res){
    const {url} = req.body;
    const creater = req.user.id;
    const shortUrl = nanoid(8);

    if(!url){
      return  res.status(400).json({message:"URL not provided!"})
    }

    try{
    const newUrl = await createUrl(url,shortUrl, creater);
    return res.render('home',{id:newUrl.short_url})
    }
    catch(err){
      console.log(err)
     return res.status(500).json({message:"Could'nt Create URL!"})
    }
};

export async function handleGetUrl(req,res){
   const url = req.params.shortId;
   
    if(!url){
    return res.status(400).json({message:"Enter your url"});
   }

   try{
    const realUrl = await getUrl(url);
     console.log(realUrl);
    return res.redirect(realUrl.redirect_url)
  }
   catch(err){
    console.log(err);
    res.status(500).json({message:"Could not get the URL"})
  }
   
};

export async function handleAnalytics(req,res){
  const url = req.params.shorturl;
  if(!url){
   return res.status(400).json({message:"Insert Url"})
  }
  try{ 
    const number = await getClicks(url);
    return res.status(200).json({totalClicks:number})
  }
  catch(err){
    console.log(err);
    return res.status(500).json({message:"Couldn't Get the user"})
  }
};

export async function handleGetUrls(req,res){
  const creater = req.user.id;
  try{
    const urls = await getAllUrls(creater);

    if(!urls){
    return res.status(400).json({message:"Couldnt get urls"})
    }
    return res.render('home',{urls})
  }
  catch(err){
    console.log(err);
   return res.status(500).json({message:"Couldn't Get the urls"})
  }
};