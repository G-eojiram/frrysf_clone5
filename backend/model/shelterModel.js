import supabase from "../config/database.js";
import multer from "multer"
import fs from "fs"
import paht from "path"

//moved img/docu upload for better access 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'documents/'); 
    },
    filename: (req, file, cb) =>{
        cb(null, date.now() + '-' + file.originalname);
    }
})
const upload = multer ({storage}); 

// const uploadDocument = async (req, res)=>{
//     const files = req.files;
//     try{
//         const uploadResults = [];
//         for (const file of files){
//             const filePath = path.join(__dirname, '../images/documents', file.filename);
//             const fileContent = fs.readFileSync (filePath);

//             const {data, error} = await supabase.storage 
//             .fromt('images')
//             .upload(file.filename, fileContent,{
//                 constentType: file.mimetype
//             })

//             if (error) throw error;

//             uploadResults.push(data);
      
//             // Clean up the file from the server
//             fs.unlinkSync(filePath);
//         }
//     }
//     catch(err){
//         res.status(500).json({ error: err.message });
//     }
// }

//REGISTRATION FUNCTIONS
//create shelter in shelter tbl 
export const createShelter = async (userID, sheltername, documents, email)=> {
    try{

        const {data, error} = await supabase 
            .from('tbl_shelter')
            .insert([
                {user_id: userID}
            ])
            .select() //retrieves create row in shelter
        
            const shelterid = data[0]?.shelter_id;
            if(error){
                console.error("error creating user:", error)
                throw error; 
            }else{
                createShelterDetails(shelterid, sheltername, email)
                saveDocuments(shelterid, documents) //image testing
            }
    }
    catch(err){
        console.log("error in shelter model: ", err);
        throw err;
    }
}
//create shelter details 
export const createShelterDetails = async (shelterId, shelterName, shelterEmail)=> { 
    //create shelter details and shelter documents are created at the same time
    try{
        const {data, error} = await supabase
        .from('tbl_shelter_details')
        .insert([
            {shelter_id: shelterId, shelter_name: shelterName, shelter_email: shelterEmail}
        ])
    }
    catch(err){
        console.log("error in shelter model, creating shelter details: ", err)
    }
}
//save documents to supabase storage
export const saveDocuments = async (shelterid, documents) => { //image testing
    //create shelter details and shelter documents are created at the same time
    try {      
        if (!documents || documents.length === 0) {
            console.log("No files to upload");
            return;
        }

        // Create an array to store the file metadata for bulk insertion into the database
        const fileMetadataArray = [];

        // Map through each document to handle file uploads
        const uploadPromises = documents.map(async (file) => {
            if (!file) {
                console.log("Invalid file detected:", file);
                return null;
            }

            const filePath = `documents/${Date.now()}_${file.originalname}`;

            // Upload file to Supabase storage
            const { data, error } = await supabase.storage
                .from('images')
                .upload(filePath, file.buffer, {
                    contentType: file.mimetype,
                });

            if (error) {
                console.error("Upload error:", error);
                return null;
            }

            // Store file metadata to insert into the database later
            fileMetadataArray.push({
                shelter_id: shelterid,
                docu_url: filePath,
                uploaded_at: new Date(),
            });

            return { uploadData: data };
        });

        // Wait for all uploads to complete
        await Promise.all(uploadPromises);

        // After all files are uploaded, insert metadata into the database in bulk
        if (fileMetadataArray.length > 0) {
            const { data, error } = await supabase
                .from('tbl_shelter_documents')
                .insert(fileMetadataArray); // Insert all rows at once

            if (error) {
                console.error("Database insert error:", error);
            } else {
                console.log("Database insert success");
            }
        }
    } catch (err) {
        console.log("Error in saving documents", err);
    }
}

//LOGIN FUNCTIONS 
export const verifyShelter = async (userID, req, res) => { 
    // verify if shelter is verified
    try {
        const { data, error } = await supabase  
            .from('tbl_shelter')
            .select('verified, shelter_id')
            .eq('user_id', userID);
        
        const shelter_id = data[0]?.shelter_id;
        const shelter_status = data[0]?.verified;

        if (shelter_status) {
            // Call checkShelterAddress and pass the shelter_id
            const addressExists = await checkShelterAddress(shelter_id, req, res);
            if(addressExists == true){
                console.log("retrieve current data")
                return { success: true,  address: true};
            }
            else{
                console.log("show map prompt")
                return {success: true , address: false}
            }
        } else {
            return { success: false };
        }
    } catch (err) {
        console.log("Error in verifying shelter: ", err);
        throw err;
    }
}

export const checkShelterAddress = async (shelterID, req, res) => {
    console.log("Shelter ID:", shelterID);

    try {
        const { data, error } = await supabase
            .from('tbl_shelter_details')
            .select('shelter_id, address, latitude, longitude')
            .eq('shelter_id', shelterID);

        if (error) {
            throw error;
        }

        if (!data[0]?.address){
            return false;
        }
        else{
            return true;
        }
    } catch (err) {
        console.log("Error in checking shelter address: ", err);
        throw err;
    }
}


export default createShelter;    
