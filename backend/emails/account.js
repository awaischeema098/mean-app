
const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user : process.env.EMAIL,
        pass : process.env.PASSWORD,
    
    }
})
const sendWelcomeEmail = (email, name, password, token,urlhost)=>{
    transporter.sendMail({
        to: email,
        from: process.env.EMAIL,
        subject: 'This is my first creation!',
        html: `<!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Document</title>
            </head>
            <style>
                *{
                    margin: 0;
                    padding: 0;
                }
                td{
                    padding-left: 2%;
                }
                table{
                    margin: 0px auto;
                }
            </style>
        <body style="font-family: "open sans", sans-serif;">
            <div>
                <span><font color="#888888"></font></span>
            <table width="75%" cellspacing="3" cellpadding="3" bgcolor="#F5F5F5" align="center">
                <tbody>
                    <tr>
                        <td colspan="2" valign="middle" bgcolor="#044767" style="color: #fff;" align="center" height="120"><h1>WELCOME TO FRIEND ZONE</h1></td>
                    </tr>
                    <tr>
                        <td colspan="2">&nbsp;</td>
                    </tr>
                    <tr>
                        <td><h3>Thank you <strong style="color: #748255;">${name}</strong> for signing up!</h3><br></td>    
                    </tr>
                    <tr>
                        <td><h4>Your account has been created, you can login with the following credentials after you have activated your account by Clicking the Active Button below. <br> </h4></td>
                    </tr>
                    <tr>
                        <td colspan="2" valign="middle">
                            <h4>Here is your login information for Help.pk <br></h4>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" valign="middle" align="left" style="text-decoration: none;"><b>Email: </b>${email}</td>
                    </tr>
                    <tr>
                        <td colspan="2" valign="middle" align="left">
                            <b>Password: </b>${password} <br>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" valign="middle" align="left">
                           
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" valign="middle" align="center">
                            <h3>NEXT STEP</h3>
                            <h2 style="color: #77A4D3; font-size: 15px;">Please confirm your email address to get started.</h2>
                            <form action="${urlhost}/auth/activate/${token}">
                                <button type="submit" style="padding: 16px ; margin: 10px; border-radius: 7px; background-color: #ED8E20; font-size: 16px; color: white; margin:25px 0px 75px 0px; " >Conform Account</button>
                            </form>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-left: 0px;" >
                            <table width="100%">
                                    <tr bgcolor="#1B9BA3">
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                        <td valign="middle" align="center" >
                                            <a href="localhost/shaikh/assets/php/include/verify.php?email='.$email.'&tokken='.$tokken.'" style="text-decoration: none; color:#fff; font-size: 26px;">Please Click This Button to Activate Your Account</a>
                                        </td>
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                    </tr>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        </body>
        </html>
`
    
})
}
const sendGoodbayEmail = (email, name)=>{
    transporter.sendMail({
        to: email,
        from: 'cheemadeveloper098@gmail.com',
        subject: 'Goodbay',
        text: 'We are sad because your not more with us'
    })
}


module.exports = {
    sendWelcomeEmail,
    sendGoodbayEmail
}