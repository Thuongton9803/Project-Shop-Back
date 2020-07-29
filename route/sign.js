const router = require('express').Router();
const nodemailer = require("nodemailer");
// lay du lieu
let User = require('../models/sign.models');
//truen ra 
router.route('/').get((req, res)=>{
    User.find()
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' +err));
});

//add vao
router.route('/signup').post((req,res)=>{
    const fname=req.body.fname;
    const lname=req.body.lname;
    const token=req.body.token;
    const quen='user'
    const email = req.body.email;
    const phone=req.body.phone;
    const birth=req.body.birth;
    const pass = req.body.pass;
    const type=req.body.type;
    const check='no';

    const newUser = new User({
        fname,
        lname,
        token,
        quen,
        email,
        phone,
        birth,
        pass,
        type,
        check,
    });

    newUser.save()
    
    .then(ok=>{
  
        var transporter =  nodemailer.createTransport({ // config mail server
            service: 'Gmail',
            auth: {
                user: 'thuonglovevietnam@gmail.com',
                pass: '30031998thuong'
            }
        });
        const link='http://localhost:3000/check/'+ok.token
       
        var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
            from: 'Thuong',
            to: ok.email,
            subject: 'This is Thuong!!!!',
            
            html:`Click To Active`.link(link),
        
        }
        transporter.sendMail(mainOptions, function(err, info){
            if (err) {
                console.log(err);
               
            } else {
                console.log('Message sent: ' +  info.response);
               
            }
        });
       
       //settime doi sau khoan thoi gian
       setTimeout(()=>{
        var crypto = require("crypto");
        ok.token = crypto.randomBytes(20).toString('hex');
        ok.save()
       
       }, 360000);
    }
    
    )
    .then((ok)=>res.json('ok'))
       
    .catch(err => res.status(400).json('Error: '+err));
    
  
  
});

//id
router.route('/:id').get((req,res)=>{
    User.findById(req.params.id)
        .then(sign=>res.json(sign))
        .catch(err => res.status(400).json('Error: '+err));
})
//delete
router.route('/:id').delete((req,res)=>{
    User.findByIdAndDelete(req.params.id)
        .then(() =>res.json('user deleted.'))
        .catch(err => res.status(400).json('Error: '+err));
})

//check 

router.route('/check/:id').get((req,res)=>{
    User.findById(req.params.id)
        .then(sign=>res.json(sign))
        .catch(err => res.status(400).json('Error: '+err));
})

router.route('/check/:id').post((req,res)=>{
   
    User.find({token:req.params.id})
    .then(sign=>{
            
        sign[0].check = req.body.check;
      
        
        sign[0].save()
       
           
            //settime doi sau khoan thoi gian
            setTimeout(()=>{
             var crypto = require("crypto");
             sign[0].token = crypto.randomBytes(20).toString('hex');
             sign[0].save()
            
            }, 360000)
        
        
   .then(()=>res.json('user update!'))
   .catch(err => res.status(400).json('Error: '+ err));
    })
    .catch(err => res.status(400).json('Error: '+ err));
       
})
//check if check=no
router.route('/nocheck/:id').post((req,res)=>{
    
    User.findById(req.params.id)
    .then(ok=>{
  
        var transporter =  nodemailer.createTransport({ // config mail server
            service: 'Gmail',
            auth: {
                user: 'thuonglovevietnam@gmail.com',
                pass: '30031998thuong'
            }
        });
        const link='http://localhost:3000/check/'+ok.token
        var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
            from: 'Thuong',
            to: ok.email,
            subject: 'This is Thuong!!!!',
            
            html:`Click To Active`.link(link),
        }
        transporter.sendMail(mainOptions, function(err, info){
            if (err) {
                console.log(err);
               
            } else {
                console.log('Message sent: ' +  info.response);
                
            }
        });
       
       //settime doi sau khoan thoi gian
       setTimeout(()=>{
        var crypto = require("crypto");
        ok.token = crypto.randomBytes(20).toString('hex');
        ok.save()
       
       }, 360000);
    }
    
    )
    .then((ok)=>res.json('ok'))
       
    .catch(err => res.status(400).json('Error: '+err));
    
  
    
    
    
  
  
});
//doi mat khau
router.route('/forget/:id').post((req,res)=>{
    
    User.find({token:req.params.id})

    .then(ok=>{
        
        var transporter =  nodemailer.createTransport({ // config mail server
            service: 'Gmail',
            auth: {
                user: 'thuonglovevietnam@gmail.com',
                pass: '30031998thuong'
            }
        });
        const link='http://localhost:3000/reset/'+ok[0].token
        const t=`Click To Reset Password`.link(link);
        var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
            from: 'Thuong',
            to: ok[0].email,
            subject: 'This is Thuong!!!!',
            //.link(link) hien tex la link kich vao text la link
            html:'<b>Hello!! </b><br> Please click Link To Reset Password:<br />'+t,
        }
        transporter.sendMail(mainOptions, function(err, info){
            if (err) {
                console.log(err);
                
            } else {
                console.log('Message sent: ' +  info.response);
                
            }
        });
      
       //settime doi sau khoan thoi gian
       setTimeout(()=>{
        var crypto = require("crypto");
        ok[0].token = crypto.randomBytes(20).toString('hex');
        ok[0].save();
       
       }, 36000);
    })

})
//doi mat khau
router.route('/newpass/:id').post((req,res)=>{
    const newpass=req.body.newpass
    
    //luu ys
    User.find({token:req.params.id})

    .then(ok=>{
        
        ok[0].pass=newpass
        ok[0].save()
       //settime doi sau khoan thoi gian
      
    })

})





module.exports = router;