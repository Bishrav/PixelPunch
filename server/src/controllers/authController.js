import pool from "../db.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req , res) => {
    try{
        const{email , password} = req.body;
        const hashed = await bcrypt.hash(password ,10);

        const result = await pool.query(
            "INSERT INTO users (email,password) VALUES($1, $2) RETURNING id , email",
            [email , hashed]
        )
        res.json({user : result.rows[0]});

    }catch(err){
        console.error(err);
        res.status(500).json({error:"Registration failed"})
    }
};
export const loginUser = async (req , res) => {
    try {
        const {email , password} = req.body;
        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );
        if(result.rows.length === 0)
            return res.status(400).json({error:"User not found "});
        const user = result.rows[0];

        const match = await bcrypt.compare(password, user.password);
        if(!match)
            return res.status(400).json({error : "Invalid credentials"});
        const token = jwt.sign({id : user.id}, "SECRET123",{expiresIn: "1d"});
        res.json({token});
    }catch(err){
        console.error(err);
        res.status(500).json({error : "Login Failed"})
    }
    
}