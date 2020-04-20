const mongoose = require('mongoose');
//this method use form locally connection with db 

// mongoose.connect('mongodb://127.0.0.1:27017/mean-app', {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true 
// });

//This method user for Globally connection with colester 

mongoose.connect('mongodb+srv://mean-app:'+process.env.DB_PASSWORD+'@cluster0-h4blz.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
 })
.then((result) => {
    console.log("connected with Database");
    
}).catch((err) => {
    console.log(err);
    
});