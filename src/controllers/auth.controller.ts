// Library Zone
const bcrypt = require("bcrypt")
const {client} = require('../wa');
const { v4 : uuidv4 } = require('uuid');
const jsonwebtoken = require('jsonwebtoken');
import { Request, Response } from "express";
require('dotenv').config();

// database Zone
const {User} = require("../db/models")

// Types Zone
import UserCreateType from "../types/user.type"
import UserRequestData from "../types/user.type";

// Module Zone
import { registerValidation } from "../validations/auth.validation";

exports.registerUser = async (req: Request, res: Response) => {
    try{

        // memvalidasi sebuah request yang masuk
        const {error, value} = registerValidation(req.body)

        // jika request tidak sesuai ketentuan akan mengirimkan pesan error
        if (error) {
            const errorMessage = error.details.map(d => d.message);
            return res.status(422).json({ message: errorMessage });
        }

        // mendapatkan nilai dari hasil validasi
        const {fullname, password, username} = value;
        const phone = `62${value.phone.slice(1)}`;

        // validasi jika phone tidak boleh sama dengan yang lain
        const userPhone = await User.findOne({
            where: {
                phone
            }
        })

        if(userPhone){
            return res.status(409).json({
                message: "Phone already exists"
            });
        }

        // // cek apakah phone terdaftar di wa
        const isRegistered = await client.isRegisteredUser(`${phone}@c.us`)

        if(!isRegistered){
            return res.status(404).json({
                message: "Phone not registered in whatsapp"
            });
        }
        
        const kode = Math.floor(100000 + Math.random() * 900000)
                
        try{

            
            const user: UserCreateType = await User.create({
                id: uuidv4(),
                fullname,
                username,
                password : await bcrypt.hash(password, await bcrypt.genSalt(10)),
                phone,
                role: "user",
                kode,
                verified: false
            })
            
            await client.sendMessage(`${phone}@c.us`, `Halo ${fullname}, Selamat datang di aplikasi kami. Silahkan verifikasi akun anda dengan kode berikut: ${kode}`);
            
            return res.status(201).json({
                message: "User created successfully",
                user
            });

            
        }catch(error){
            // send respond error wa server
            return res.status(500).json({
                message: "Error when create account user",
                error
            });
        }

    } catch (error){
        res.status(500).json({
            message: "Internal server error",
            error
        });
    }
}

exports.verifyUser = async (req: Request, res: Response) => {
    try{
        const {id, kode} = req.body;
        
        // search user by id
        const userData = await User.findOne({
            where: {
                id
            }
        })        

        if(!userData || userData.kode != kode){
            return res.status(401).json({
                message: "Id or Kode invalid"
            });
        }

        // kirim pesan berhasil di validasi
        await client.sendMessage(`${userData.phone}@c.us`, 
            `Halo ${userData.fullname}, akun anda berhasil diverifikasi`);

        await User.update({
            verified: true,
            kode: null
        }, {
            where: {
                id
            }
        })

        // return token
        const token: String = jsonwebtoken.sign({
            id: userData.id,
            fullname: userData.fullname,
            phone: userData.phone,
            role: userData.role,
        }, process.env.JWT_KEY, {
            expiresIn: process.env.TIMEEXPIRES
        });

        res.status(201).json({
            message: "User verified successfully",
            token,
        });

    }

    catch(error){
        res.status(500).json({
            message: "Internal server error",
            error
        });
    }
}

exports.loginUser = async (req: Request, res: Response) => {
    const {password} = req.body;
    const phone = `62${req.body.phone.slice(1)}`;

    try{
        // cari user by phone
        const userData = await User.findOne({
            where: {
                phone
            }
        })

        // jika user tidak ditemukan
        if(!userData){
            return res.status(401).json({
                message: "Auth failed"
            });
        }

        // jika user ditemukan, cek password
        const isPasswordValid = await bcrypt.compare(password, userData.password);

        // jika password salah
        if(!isPasswordValid){
            return res.status(401).json({
                message: "Auth failed"
            });
        }

        // jika tidak verified
        if(!userData.verified){
            return res.status(401).json({
                message: "User not verified"
            });
        }

        // jika password benar, generate token
        const token = jsonwebtoken.sign({
            id: userData.id,
            fullname: userData.fullname,
            username: userData.username,
            email: userData.email,
            phone: userData.phone,
            role: userData.role,
            verified: userData.verified
        }, process.env.JWT_KEY, {
            expiresIn: process.env.TIMEEXPIRES
        });

        res.status(200).json({
            message: "Auth successful",
            token
        });

    }catch(error){
        res.status(500).json({
            message: "Internal server error",
            error
        });
    }
}

exports.sendTokenChangePassword = async (req: UserRequestData, res: Response) => {
    // make token jwt for forgot token password
    const {id} = req.userData ;

    try{
        const userData = await User.findOne({
            where: {
                id
            }
        })

        if(!userData){
            return res.status(401).json({
                message: "Id invalid"
            });
        }

        const token: String = jsonwebtoken.sign({
            id: userData.id,
            kode: Math.floor(100000 + Math.random() * 900000)
        }, process.env.JWT_KEY, {
            expiresIn: process.env.EXPIRESRESETPASSWORD
        });

        try{
            await client.sendMessage(`${userData.phone}@c.us`, `Halo ${userData.fullname}, Silahkan klik link berikut untuk mengubah password anda: 
                ${process.env.BASE_URL}/auth/change-password?token=${token}`);
        }catch(error){
            // send respond error wa server
            return res.status(500).json({
                message: "Wa Error",
                error
            });
        }

        return res.status(200).json({
            message: "Token sent",
            token
        });

    } catch (error){
        return res.status(500).json({
            message: "Internal server error",
            error
        });
    }
}

exports.validateTokenChangePassword = async (req: Request, res: Response) => {
    const {token} = req.query;
    try{
        const decoded = jsonwebtoken.verify(token, process.env.JWT_KEY);
        return res.status(200).json({
            message: "Token valid",
            decoded
        });
    } catch (error){
        return res.status(401).json({
            message: "Token invalid",
            error
        });
    }
}

exports.changePassword = async (req: Request, res: Response) => {

    const {password, token} = req.body;
    
    try{
        const decoded = jsonwebtoken.verify(token, process.env.JWT_KEY);

        const user = await User.update({
            password : await bcrypt.hash(password, await bcrypt.genSalt(10)),
            reset_password_token : null
        }, {
            where: {
                id: decoded.id,
                reset_password_token : token
            }
        })

        console.log(user)

        if(user[0] == false){
            return res.status(401).json({
                "message" : "token invalid"
            });
        }

        res.status(200).json({
            message: "Password changed successfully",
            user
        });

    } catch (error){
        return res.status(500).json({
            message: "Internal server error",
            error
        });
    }

}