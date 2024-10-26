import { validateUser, createUser, logoutUser} from "../model/userModel.js";

import { getShelterRequests, getShelterRequestsDetails, getImage,
         update_reviewFunction, statusDisplay, loadPetCategory,
         addBreed, insertPetCategory, insertVaccineCategory, 
         loadAdminPositions, registerAdminAccount } from "../model/adminModel.js" 

// import { insertShelterAddress } from "../model/shelterFunctionsModel.js"

//user models
export const checkUser = (req, res)=>{ //check if user exists 
    validateUser (req,res);
}

export const insertUser = (req, res)=>{
    createUser(req, res); //create user 
}

export const Userlogout = (req, res)=>{
    logoutUser(req, res); //logout req for cookies
}

//admin 
export const shelterrequests = (req, res) => {
    getShelterRequests(req, res)
}
export const shelterrequestdetails = (req, res) => {
    getShelterRequestsDetails(req, res)
}
export const Image = (req, res) => {
    getImage (req, res)
}
export const reviewFunction = (req, res) =>{
    update_reviewFunction (req, res)
}
export const displayStatus = (req, res) => {
    statusDisplay (req, res)
}
export const displayPetCategory = (req, res) => {
    loadPetCategory (req, res)
}
export const addBreedCategory = (req, res)=>{
    addBreed (req, res)
}
export const addPetCategory = (req, res)=>{
    insertPetCategory (req, res)
}
export const addVaccineCategory = (req, res)=>{
    insertVaccineCategory (req, res)
}
export const getAdminPosition = (req, res) => {
    loadAdminPositions (req,res)
}
export const insertAdminAccount = (req, res) => {
    registerAdminAccount (req,res)
}

// //shelter functions 
// export const addshelteraddress = (req, res) => {
//     insertShelterAddress (req, res)
// }