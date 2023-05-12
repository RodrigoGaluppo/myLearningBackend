import { Request,Response } from "express";
import api from "../../../global/api"
import ICustomerAuthenticated from "../../../global/ICustomerAuthenticated";
import IAuthenticatedInterface from "../../../global/ICustomerAuthenticated";


async function get(req:IAuthenticatedInterface, res:Response )
{
    try{    
        const id = req.params.id
        const customerId = req.customer?.id

        if (id == "" || customerId == "" )
        {
            return res.status(400).json({
                message:"course id and customer id are required"
            })
        }

        const customerCourseRes = await api.get(`customercourse/getbycustomerId?customerId=${customerId}&courseId=${id}`) // verify if user has access to this course

        const getAccomplishedLessons = await api.get(`AccomplisehdLesson/listAccomplishedLesson?customerId=${customerId}&courseId=${id}`) // get accomplisehd and lessons count
                
        if(customerCourseRes !== null)
        {
            const apiRes = await api.get(`course/${id}`)
            return res.json({...apiRes.data,...getAccomplishedLessons.data, customerCourseId:customerCourseRes.data.id})
        }
        else{
            throw new Error()
        }
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

async function list(req:ICustomerAuthenticated, res:Response )
{
    
    
    try{    
    const page = req.query.page

    if (page == "")
    {
        return res.status(400).json({
            message:"page id is required"
        })
    }
        const apiRes = await api.get(`course/listbyCustomer?page=${page}&customerId=${req.customer?.id}`)

        return res.json(apiRes.data)

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


export default {
    get,list
}