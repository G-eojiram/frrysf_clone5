import express from "express";
import multer from "multer";

import {
  checkUser,
  insertUser,
  Userlogout, //user
  shelterrequests,
  shelterrequestdetails,
  Image,
  reviewFunction,
  displayStatus,
  displayPetCategory,
  addBreedCategory,
  addPetCategory,
  addVaccineCategory, //admin
  getAdminPosition,
  insertAdminAccount,
} from "../controllers/user.js";

import {
  insertShelterAddress,
  getShelterDetails,
  insertShelterLink,
  getProfile,
  getPetProfile,
  getPetBreed,
  getVaccineCategory,
  getSterilization,
  getPetStatus,
  insertPetProfile,
  updatePetProfile,
  searchUserName,
  loadInboxMessages,
  insertMessage,
  getUserFullName,
  insertNewChat,
  fetchAllShelters, //added fetchAllShelters
} from "../controllers/shelter_functions.js";

const storage = multer.memoryStorage({
  destination: (req, file, cb) => {
    cb(null, "images/documents");
  },
  filename: (req, file, cb) => {
    const filename = Date.now() + "-" + file.originalname;
    cb(null, filename);
  },
}); //storage path
const upload = multer({ storage }); //storage path for upload/retrieve

const storage2 = multer.memoryStorage(); // Use memory storage
const upload2 = multer({ storage: storage2 });

const router = express.Router();

// creation/registration/login paths
router.post("/login", checkUser);
router.post("/buddy-registration", upload.any(), insertUser);
router.post("/shelter-registration", upload.array("documents"), insertUser);
router.post("/logout", Userlogout);

//admin redering paths
router.post("/registration", shelterrequests);
router.get("/request_preview/:id", shelterrequestdetails);
router.get("/request_preview/:id/image", Image);
router.post("/response", reviewFunction);
router.get("/status", displayStatus);
router.get("/load-category", displayPetCategory);
router.post("/add-breed", addBreedCategory);
router.post("/add-pet-category", addPetCategory);
router.post("/add-pet-vaccine", addVaccineCategory);
router.get("/get-position", getAdminPosition);
router.post("/add-admin-account", insertAdminAccount);

//shelter redering and function paths
//shelter functions || used in my shelter
router.post("/update-shelter-details", insertShelterAddress);
router.post("/edit_shelterprofile", getShelterDetails);
router.post("/save_shelterprofile", upload.single("image"), insertShelterLink);
router.post("/image", getProfile);

//shelter functions || used in animal profile
router.post("/profile", getPetProfile);
router.post("/pet_breed", getPetBreed);
router.post("/vaccine", getVaccineCategory);
router.post("/sterilization", getSterilization);
router.get("/pet_status", getPetStatus);
router.post("/save_pet_profile", upload2.any(), insertPetProfile);
router.post("/update_pet_profile", upload2.any(), updatePetProfile);
//chat
router.post("/search", searchUserName);
router.post("/loadinbox", loadInboxMessages);
router.post("/sendmessage", upload2.any(), insertMessage);
router.post("/getfullname", getUserFullName);
router.post("/newchat", insertNewChat);

//New router for map - by salpocial
router.get("/shelters", fetchAllShelters);

export default router;
