import {
  addShelterAddress,
  retrieveShelterDetails,
  saveShelter_and_Link,
  retrieveProfile,
  retrievePetProfile,
  retrievePetBreed,
  retrieveVaccineCategory,
  retrieveSterilization,
  retrievePetStatus,
  savepetprofie,
  updatepetprofile,
  searchUser,
  loadInbox,
  sendMessage,
  getFullName,
  createNewChat,
  getAllShelters, //added getAllShelters from salpocial's code
} from "../model/shelterFunctionsModel.js";

export const insertShelterAddress = (req, res) => {
  addShelterAddress(req, res);
};
export const getShelterDetails = (req, res) => {
  retrieveShelterDetails(req, res);
};
export const insertShelterLink = (req, res) => {
  saveShelter_and_Link(req, res);
};
export const getProfile = (req, res) => {
  retrieveProfile(req, res);
};
export const getPetProfile = (req, res) => {
  retrievePetProfile(req, res);
};
export const getPetBreed = (req, res) => {
  retrievePetBreed(req, res);
};
export const getVaccineCategory = (req, res) => {
  retrieveVaccineCategory(req, res);
};
export const getSterilization = (req, res) => {
  retrieveSterilization(req, res);
};
export const getPetStatus = (req, res) => {
  retrievePetStatus(req, res);
};
export const insertPetProfile = (req, res) => {
  savepetprofie(req, res);
};
export const updatePetProfile = (req, res) => {
  updatepetprofile(req, res);
};
export const searchUserName = (req, res) => {
  searchUser(req, res);
};
export const loadInboxMessages = (req, res) => {
  loadInbox(req, res);
};
export const insertMessage = (req, res) => {
  sendMessage(req, res);
};
export const getUserFullName = (req, res) => {
  getFullName(req, res);
};
export const insertNewChat = (req, res) => {
  createNewChat(req, res);
};

// New function to fetch all shelters for the map - from salpocial's code
export const fetchAllShelters = (req, res) => {
  getAllShelters(req, res);
};
