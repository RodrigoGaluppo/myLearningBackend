import { Request,Response } from "express";
import path from "path"
import api from "../../../global/api"
import appErrorMessages from "../../../global/appErrorMessages";
import googleCloudStorage from "../../../services/googleCloudStorage";

async function get(req:Request, res:Response )
{
    try{    
    const id = req.params.id

    if (id == "")
    {
        return res.status(400).json({
            message:"course id is required"
        })
    }
        const apiRes = await api.get(`course/${id}`)

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

async function list(req:Request, res:Response )
{
    try{    
    const page = req.query.page

    if (page == "")
    {
        return res.status(400).json({
            message:"page id is required"
        })
    }
        const apiRes = await api.get(`course/list?page=${page}`)

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
            message:"course id is required"
        })
    }
        const apiRes = await api.delete(`course/${id}`)

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

async function putImage(req:Request, res:Response )
{
    try{    
        const {id} = req.params

        if (id == "")
        {
            return res.status(400).json({
                message:"course id is required"
            })
        }

        try{
            // delete last file 
            const responseData = await api.get(`/course/${id}`)

            const {imgUrl} = responseData.data

            const lastFilName = path.basename(imgUrl)

            const fileGC = googleCloudStorage.storage.bucket('russocode').file(lastFilName)

            await fileGC.delete()
        }
        catch(e){
            console.log(e);
            
        }
        
  
        const user = await api.put(`/course/image/${id}`,{
            imgUrl:req.file?.filename
        })

        return res.json(user.data)

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
        subjectId,
        name,
        description,
        price

    } = req.body
    const id = req.params.id

    if (id == "")
    {
        return res.status(400).json({
            message:"course id is required"
        })
    }

    if (subjectId == null || name == "" || description == "" || price == null )
    {
        return res.status(400).json({
            message:appErrorMessages.parametersError
        })
    }
        const apiRes = await api.put(`course`,{
            subjectId,
            name,
            description,
            price
       
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
        subjectId,
        name,
        description,
        price,
        
    } = req.body


    if (subjectId == null || name == "" || description == "" || price == null )
    {
        return res.status(400).json({
            message:appErrorMessages.parametersError
        })
    }
        const apiRes = await api.post(`course`,{
            subjectId,
            name,
            description,
            price
      
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
    list,
    putImage,
    post,
    del
}