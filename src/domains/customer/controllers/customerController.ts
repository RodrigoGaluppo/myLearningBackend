import { Request,Response } from "express";
import jwt from "jsonwebtoken"
import api from "../../../global/api"
import path from "path"
import containerClient from "../../../services/azureStorage"

import ICustomerAuthenticated from "../../../global/ICustomerAuthenticated";

async function login(req:Request,res:Response){

    try{
        let {email,password}:{email:string,password:string} = req.body

        if(email == "" || password == ""){
            return res.status(400).json({
                message:"required parameters not supplied"
            })
        }

        const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        console.log( req.headers['X-Client-IP']);
        
       
        

        email = email.toLowerCase()
        const JWTSECRET = process.env.JWTSECRET

        api.post("customer/login",{
            email,password
        })
        .then((response)=>{

            const {id} = response.data
            
            if(JWTSECRET){
                jwt.sign({user_id:id},JWTSECRET,{subject:id,expiresIn:"1d"},
                (err,token)=>{

                    if(err){
                        return res.json({message:"internal server error"}).status(500)
                    }
                    
                    return res.json({
                        token,
                        customer:response.data
                    })
                })
                
            }else{
                
                return res.json({message:"internal server error"}).status(500)
            }
        })
        .catch((err)=>{
            
            if(err.response.status == 400)
            {
                res.status(400)
                return res.json({"message":err.response.data})
            }
            else{
                res.status(500)
                return res.json({"message":"could not connect to the server"})
            }
        })

    }
    catch(e:any){
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

async function get(req:ICustomerAuthenticated, res:Response )
{
    try{    
    const id = req?.customer?.id

    if (id == "")
    {
        return res.status(400).json({
            message:"customer id is required"
        })
    }
        const apiRes = await api.get(`customer/${id}`)

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

async function putImage(req:ICustomerAuthenticated, res:Response )
{
    try{    
        const id = req?.customer?.id

        if (id == "")
        {
            return res.status(400).json({
                message:"customer id is required"
            })
        }

        try{
            // delete last file 
            const responseData = await api.get(`/customer/${id}`) 

            const {imgUrl} = responseData.data // get last customer img name

            const lastFilName = path.basename(imgUrl)

            const blockBlobClient = containerClient.getBlockBlobClient(lastFilName);

            await blockBlobClient.deleteIfExists() // deletes if exist
        }
        catch(e){
            console.log(e);
            
        }
        
        const user = await api.put(`/customer/image/${id}`,{
            imgUrl:req.file?.filename // send the filename which is actually the url to access file
        })

        return res.json(user.data)

    }
    catch(e:any)
    {
        console.log(e);
        
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

async function changeActiveStatus(req:ICustomerAuthenticated, res:Response )
{
    try{    

    const id = req?.customer?.id
    
    let {
        active
    } = req.body

    if (id == "" || active == null)
    {
        return res.status(400).json({
            message:"required parameters not supplied"
        })
    }
        const apiRes = await api.put(`customer/active/${id}`,{
            active
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

async function put(req:ICustomerAuthenticated, res:Response )
{
    try{    

    const id = req?.customer?.id
    
    let {
        firstName,
        lastName,
        username,
        gender,
        birthDate
    } = req.body

    if (id == "")
    {
        return res.status(400).json({
            message:"customer id is required"
        })
    }

    if (firstName == "" || lastName == ""  || username == "" || gender == "" || birthDate == "")
    {

        return res.status(400).json({
            message:"required parameters not supplied"
        })
    }

    const apiRes = await api.put(`customer/${id}`,{
        firstName,
        lastName,

        username,
        gender,
        birthDate
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

async function list(req:ICustomerAuthenticated, res:Response )
{
    try{    

    const page = req.params.page
    
    if (page == null)
    {
        return res.status(400).json({
            message:"page is required"
        })
    }

    
    const apiRes = await api.get(`customer/list/?page=${page}`)

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

    let {
        firstName,
        lastName,
        email,
        username,
        password,
        gender,
        birthDate
    } = req.body

    if (firstName == "" || lastName == "" || email == "" || username == "" || password == "" || gender == "" || birthDate == "")
    {

        return res.status(400).json({
            message:"required parameters not supplied"
        })
    }

        const apiRes = await api.post("customer",
        {
            firstName,
            lastName,
            email,
            username,
            password,
            gender,
            birthDate
        }
        )

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
    post,
    login,
    get,
    changeActiveStatus,
    put,
    putImage,
    list
}