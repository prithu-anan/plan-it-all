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


export const getRoutes = async ({ lat, lon, dest }) => {
    let res;

    // Format lat and lon to 2 decimal places
    const formattedLat = parseFloat(lat).toFixed(2);
    const formattedLon = parseFloat(lon).toFixed(2);

    console.log(formattedLat, formattedLon, dest);

    try {
        res = await axios.get(`user/route?lat=${formattedLat}&lon=${formattedLon}&dest=${dest}`);
    } catch (err) {
        console.log(err);
    }

    console.log(res.data);
    return res.data;
};

export const getPOI = async ({ lat, lon }) => {
    let res;

    // Format lat and lon to 2 decimal places
    const formattedLat = parseFloat(lat).toFixed(2);
    const formattedLon = parseFloat(lon).toFixed(2);

    console.log(formattedLat, formattedLon);

    try {
        res = await axios.get(`user/pois?lat=${formattedLat}&lon=${formattedLon}`);
    } catch (err) {
        console.log(err);
    }

    console.log(res.data);
    return res.data;
}
