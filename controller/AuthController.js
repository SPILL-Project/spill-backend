const {User} = require("../models")
const bcrypt = require("bcrypt")
const {client:wa} = require('../wa');
const { v4 : uuidv4 } = require('uuid');
const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config();

exports.registerUser = async (req, res) => {
    try{
        const {fullname, password, phone} = req.body;

        // phone dan email tidak boleh sama
        const userPhone = await User.findOne({
            where: {
                phone
            }
        })

        if(userPhone){
            return res.status(400).json({
                message: "Phone already exists"
            });
        }
        
        const kode = Math.floor(100000 + Math.random() * 900000)
        
        try{
            await wa.sendMessage(`${phone}@c.us`, `Halo ${fullname}, Selamat datang di aplikasi kami. Silahkan verifikasi akun anda dengan kode berikut: ${kode}`);
        }catch(error){
            // send respond error wa server
            return res.status(500).json({
                message: "Wa Error",
                error
            });
        }
        
        const user = await User.create({
            id: uuidv4(),
            fullname,
            password : await bcrypt.hash(password, await bcrypt.genSalt(10)),
            phone,
            role: "user",
            kode,
            verified: false
        });

        res.status(201).json({
            message: "User created successfully",
            user
        });
        
    } catch (error){
        console.log(error)
        res.status(500).json({
            message: "Internal server error",
            error
        });
    }
}

exports.verifyUser = async (req, res) => {
    try{
        const {id, kode} = req.body;
        
        // search user by id
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

        if(userData.kode != kode){
            return res.status(401).json({
                message: "Kode invalid"
            });
        }

        const user = await User.update({
            verified: true,
            kode: null
        }, {
            where: {
                id
            }
        })

        // return token
        const token = jsonwebtoken.sign({
            id: userData.id,
            fullname: userData.fullname,
            role: userData.role
        }, process.env.JWT_KEY, {
            expiresIn: process.env.TIMEEXPIRES
        });

        res.status(200).json({
            message: "User verified successfully",
            token,
            user
        });

    }

    catch(error){
        res.status(500).json({
            message: "Internal server error",
            error
        });
    }
}

exports.loginUser = async (req, res) => {
    const {phone, password} = req.body;

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

    }catch{
        console.log(e)
        res.status(500).json({
            message: "Internal server error",
            error
        });
    }
}

exports.sendTokenChangePassword = async (req, res) => {
    // make token jwt for forgot token password
    const {id} = req.userData;

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

        try{
            await wa.sendMessage(`${
                userData.phone
            }@c.us`, `Halo ${
                userData.fullname
            }, Silahkan klik link berikut untuk mengubah password anda: ${
                process.env.BASE_URL
            }/auth/change-password/${
                token
            }`);
        }catch(error){
            // send respond error wa server
            return res.status(500).json({
                message: "Wa Error",
                error
            });
        }

    } catch (error){
        return res.status(500).json({
            message: "Internal server error",
            error
        });
    }
}

exports.validateTokenChangePassword = async (req, res) => {
    const {token} = req.params;

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

exports.changePassword = async (req, res) => {

    const {id} = req.userData;
    const {password} = req.body;

    try{
        const user = await User.update({
            password : await bcrypt.hash(password, await bcrypt.genSalt(10))
        }, {
            where: {
                id
            }
        })

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