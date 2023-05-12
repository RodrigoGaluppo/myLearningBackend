import { Request,Response } from "express";
import api from "../../../global/api"
import ICustomerAuthenticated from "../../../global/ICustomerAuthenticated";


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

async function changeActiveStatus(req:Request, res:Response )
{
    try{    

    const {id} = req.params
    
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

export default {
    list,
    get,
    changeActiveStatus
}