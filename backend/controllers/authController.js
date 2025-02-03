import User from '../models/user.js';
import { hashPassword, comparePassword } from '../helpers/auth.js';
import jwt from 'jsonwebtoken';


//register endpoint

export const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        if(!name) {
            return res.json({
                error: 'name is required'
            })
        };
        if(!password || password.length < 6) {
            return res.json({
                error: 'Password is required and should be at least 6 chars long'
            })
        };
        // Check email
        const exist = await User.findOne({email})
        // do the same for username
        if(exist) {
            return res.json({
                error: 'Email is already taken'
            })
        };

        const hashedPassword = await hashPassword(password)

        //create user in database
        const user = await User.create({
            name, 
            email, 
            password: hashedPassword,
        });

        return res.json(user)
    } catch (error) {
        console.log(error)
        
    }

}

//login endpoint
export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        // check if user exists
        const user = await User.findOne({email});
        if(!user) {
            return res.json({
                error: 'No user found'
            })
        }

        // check if passwords match
        const match = await comparePassword(password, user.password)
        if(match) {
            jwt.sign({email: user.email, id: user._id, name: user.name}, process.env.JWT_SECRET, {}, (err, token) => {
                if(err) throw err;
                res.cookie('token', token).json(user)
            })
        }
        if(!match) {
            res.json({
                error: "Passwords do not match"
            })
        }
    } catch (error) {
        console.log(error)
    }
}

//profile
export const getProfile = (req, res) => {
const {token} = req.cookies
if(token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
        if(err) throw err;
        res.json(user)
    })
} else {
    res.json(null)
}
}
