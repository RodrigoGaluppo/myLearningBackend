import { Request,Response } from "express";

import containerClient from "../../../services/azureStorage"
import path from "path"
import api from "../../../global/api"

async function get(req:Request, res:Response )
{
    try{    
    const id = req.params.id

    if (id == "")
    {
        return res.status(400).json({
            message:"videoLesson id is required"
        })
    }
        const apiRes = await api.get(`videoLesson/${id}`)

        return res.json(apiRes.data)

    }
    catch(e:any)
    {
        
        if(e.response != null && e?.response?.status != null && e?.response?.data != null)
        {  
            return res
                .status(e?.response?.status)
                .json({
                    message:e.response.data
                })
        }
        
        return res.status(500).json({
            message:"app error"
        })
    }

    
}


async function del(req:Request, res:Response )
{
    try{    
    const id = req.params.id

    if (id == "")
    {
        return res.status(400).json({
            message:"videoLesson id is required"
        })
    }
        const apiRes = await api.delete(`videoLesson/${id}`)

        return res.json(apiRes.data)

    }
    catch(e:any)
    {
        
        if(e.response != null && e?.response?.status != null && e?.response?.data != null)
        {  
            return res
                .status(e?.response?.status)
                .json({
                    message:e.response.data
                })
        }
        
        return res.status(500).json({
            message:"app error"
        })
    }

    
}

async function put(req:Request, res:Response )
{
    try{    

    const {
        lessonId,
        title,
        url 
      } = req.body
    const id = req.params.id

    if (id == "")
    {
        return res.status(400).json({
            message:"id is required"
        })
    }

    if (title == "" || lessonId == "" || url == "")
    {
        return res.status(400).json({
            message:"required parameters not"
        })
    }

    const apiRes = await api.put(`ressourceLesson`,{
        lessonId,
        title,
        url 
        })

    return res.json(apiRes.data)

    }
    catch(e:any)
    {
        
        if(e.response != null && e?.response?.status != null && e?.response?.data != null)
        {  
            return res
                .status(e?.response?.status)
                .json({
                    message:e.response.data
                })
        }
        
        return res.status(500).json({
            message:"app error"
        })
    }

    
}

async function putVideo(req:Request, res:Response )
{
    try{    

  
    const id = req.params.id

    if (id == "")
    {
        return res.status(400).json({
            message:"id is required"
        })
    }

    try{
        // delete last file 
        const responseData = await api.get(`/VideoLesson/${id}`) 

        const {url} = responseData.data // get last video

        const lastFilName = path.basename(url)

        const blockBlobClient = containerClient.getBlockBlobClient(lastFilName);

        await blockBlobClient.deleteIfExists() // deletes if exist
    }
    catch(e){
        console.log(e);
        
    }

    const apiRes = await api.put(`VideoLesson/Video/${id}`,{
        Url:req.file?.filename
    })

    return res.json(apiRes.data)

    }
    catch(e:any)
    {
        
        if(e.response != null && e?.response?.status != null && e?.response?.data != null)
        {  
            return res
                .status(e?.response?.status)
                .json({
                    message:e.response.data
                })
        }
        
        return res.status(500).json({
            message:"app error"
        })
    }

    
}

async function post(req:Request, res:Response )
{
    try{    
    const {
        lessonId,
        title,
        url 
      } = req.body

    if (title == "" || lessonId == "" || url == "")
    {
        return res.status(400).json({
            message:"required parameters not"
        })
    }

    const apiRes = await api.post(`ressourceLesson`,{
        lessonId,
        title,
        url 
    })

    return res.json(apiRes.data)

    }
    catch(e:any)
    {
        
        if(e.response != null && e?.response?.status != null && e?.response?.data != null)
        {  
            return res
                .status(e?.response?.status)
                .json({
                    message:e.response.data
                })
        }
        
        return res.status(500).json({
            message:"app error"
        })
    }

    
}

export default {
    get,
    put,
    putVideo,
    post,
    del
}