const express = require('express');
const router = express.Router();
const {Address}  = require('../models');

module.exports = router;

router.get('/display', async(req, res, next)=>{
    try{
        const address = await Address.findAll({});
        let obj = {};
        for(let singleAddress of address){
            const zip = parseInt(singleAddress.zipcode, 10);
            const zipKey = parseInt(zip/100, 10);
            if(obj.hasOwnProperty(zipKey)){
                obj[zipKey] = [...obj[zipKey], zip].sort((a,b) => a-b);
            }else{
                obj[zipKey] = [zip];
            }
        }

        let addressStr = '';
        let count = 0;
        for(const key in obj){
            if(obj[key].length > 1){
                const first = obj[key][0];
                const last = obj[key][obj[key].length - 1];
                addressStr += first + '-' + last;
            }else{
                addressStr += obj[key];
            }
            count++;
            if(count < Object.keys(obj).length){
                addressStr += ', ';
            }

            
        }

        console.log(addressStr);
        // res.json(address);
        res.send(addressStr);
    }catch(err){
        next(err);
    }
});

router.get('/has/:zipcode', async(req, res, next) =>{
    try{
        const zipcode = req.params.zipcode;
        const address = await Address.findOne({
            where: {
                zipcode
            }
        });

        // console.log(address.zipcode);
        if(address){
            console.log("true");
        }else{
            console.log("false");
        }

        res.send(address);
    }catch(err){
        next(err)
    }
});

router.post('/insert/:zipcode', async(req, res, next) => {

    try{
        const {zipcode} = req.params;
        
        const addressBody = {
            zipcode
        };

        const address = await Address.create(addressBody);
        res.json(address);
        console.log(`Zip code ${addressBody.zipcode} inserted`);
    }catch(err){
        next(err)
    }
});



router.delete('/delete/:zipcode', async(req, res, next)=>{
    try{
        const { zipcode } = req.params;
        await Address.destroy({
            where:{
                zipcode
            }
        });
        console.log(`Zip code ${zipcode} deleted`);
        res.sendStatus(204);
    }catch(err){
        next(err);
    }
});



