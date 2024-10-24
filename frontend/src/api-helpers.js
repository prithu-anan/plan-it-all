import axios from 'axios';

export const signup = async(req) => {

    let res;

    console.log(req);

    try{
         res = await axios.post(`user/signup`, {
            name: req.name,
            email: req.email,
            password: req.password
         })
    }catch(err){
        console.log(err);
    }

    console.log(res.data) ;
    return res.data;
};

export const login = async(req) => {

    let res;

    console.log(req);

    try{
         res = await axios.post(`user/login`, {
            email: req.email,
            password: req.password
         })
    }catch(err){
        console.log(err);
    }

    console.log(res.data) ;
    return res.data;
};