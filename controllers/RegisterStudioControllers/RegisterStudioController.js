const jwt = require("jsonwebtoken")
const accountSid = "ACe6405bb519bcf6993d8491227ec766a5"
const authToken = "f6dd52c88dde4c8e04e5d7b543bdb4c3";
const serviceID = "VA40a0309fe840817eedeb6faf56b07813"
const client = require('twilio')(accountSid, authToken);
const UserBookingModel = require("../../models/BookingModels/UserBookingModel.js")
const dotenv = require("dotenv");
const MobileAuthModel = require("../../models/AuthModels/MobileAuthModel.js");
const TeamMebersModel = require("../../models/AdminModels/TeamModels/TeamMembersModel.js")
const { response } = require("express");
dotenv.config();


class RegisterStudioController {

  static SendOtp = async (req, res) => {
    // send the verification code to the user mobile register mobile number
    await client.verify.v2.services('VA40a0309fe840817eedeb6faf56b07813')
      .verifications
      .create({ friendlyName: 'Pixel Perfect Registe as a studio', to: '+91' + req.body.phone, channel: 'sms' })
      .then((verification) => {
        console.log(verification)
        if (verification.sid != "" && verification.status != '400') {
          res.json({ otpSent: true, somethingwentwrong: false })
        }
      })
      .catch((error) => {
        console.log(error)
        res.json({ otpSent: false, somethingwentwrong: true })
      })
  }

  // verify the given otp
  static verifyOTP = async (req, res) => {
    let userOTP = req.body.otp;
    let givenPhone = req.body.phone;

    try {
      // verify the otp 
      client.verify.v2.services(serviceID)
        .verificationChecks
        .create({ to: '+91' + givenPhone, code: userOTP })
        .then(async (verification_status) => {
          console.log(verification_status)
          if (verification_status.status === "approved" && verification_status.valid) {
            // save the user auth
            await MobileAuthModel.updateOne({ Mobile: givenPhone }, { Mobile: givenPhone, OTP: userOTP }, { upsert: true })
              .then((resolve) => {
                // generate the token and send to the user
                let token = jwt.sign(req.body, process.env.SECRETE_KEY, { expiresIn: '30d' });
                res.json({ otpVerified: true, IsOrignaMobile: true, valid: true, token: "Bearer " + token });
              })
              .catch((error) => console.log(error))
          } else {
            res.json({ otpVerified: false, IsOrignaMobile: false, valid: false });
          }
        })
        .catch((error) => {
          console.log(error);
          res.json({ otpVerified: false, IsOrignaMobile: false, valid: false });
        })
    } catch (error) {
      console.log(error);
      res.json({ otpVerified: false, IsOrignaMobile: false, valid: false });

    }

  }

  // book my slot
  static BookmyShoot = async (req, res) => {
    let UserShootType = req.body.shootingtype;

    // getting the sender body
    let Userdetails = req.body;
    var memberContact;
    try {
      let members = await TeamMebersModel.find();
      if (members) {
        console.log(members)
        memberContact = members.find((m) => m.ShootingType === UserShootType);
      }
      let bookingModel = new
        UserBookingModel({
          Name: Userdetails.fullname, Email: Userdetails.email, Mobile: Userdetails.mobile,
          Date: Userdetails.datetime, ShootingType: Userdetails.shootingtype,
          Location: Userdetails.address, BookingPrice: Userdetails.bookingprice, ShootingContact: memberContact?.Mobile
        });
      await bookingModel.save()
        .then((response) => {
          console.log(response)
          res.json({ bookingSuccessfully: true, somethingwentwrong: false, bookingDetail: response })
        })
        .catch((error) => {
          console.log(error)
          res.json({ bookingSuccessfully: false, somethingwentwrong: true })
        })
    }
    catch (error) {
      console.log(error);
      res.json({ bookingSuccessfully: false, somethingwentwrong: true })
    }
  }


  // get my bookings
  static getBookings=async(req,res)=>{
    try{
      let Bookings=await UserBookingModel.find({Mobile:req.mobile});
      if(Bookings){
        res.json({bookings:Bookings,somethingwentwrong:false})
      }
      else{
          res.json({bookings:null,somethingwentwrong:true})
      }
    }catch(error){
      console.log(error);
      res.json({bookings:null,somethingwentwrong:true})
    }
  }







}

module.exports = RegisterStudioController