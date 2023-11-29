import { Request, Response } from "express";
import {AppDataSource} from "../db"
import {User} from "../entities/User"




export const login = async (req:Request, res: Response) => {
    const {Email, Password} = req.body
    try{
        const comparador = await AppDataSource.manager.findOne(User, {where:{Email, Password}})
        if (comparador) {res.json({mensaje: "ingreso correcto"})}
        else {res.status(400).json({mensaje: "ingreso fallido"})}
    }
    catch(error){
        console.log(error)
    }
}