import supabase from "../config/database.js"
import bcrypt from "bcrypt"

export const getShelterRequests = async(req, res)=>{
    try{
        const {mode} = req.body
        
        const {data, err} = 
        await supabase.rpc('get_shelter_requests', {
            p_status: mode
        })

        if (err) {
            console.log("an error occurred when getting shelter requests", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        res.status(200).json(data);
    }
    catch(err){
        console.log("an error occured when getting shelter requests", err)
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getShelterRequestsDetails = async (req, res) => {
    const id = req.params.id
    // console.log("shelter details model")
    try{
        const {data, err} = 
        await supabase.rpc('get_shelter_requests_details', { shelter_id_input:  id}) //, { id: 1 }

        if (!data || data.length === 0) {
            // If no data found, return 404
            return res.status(404).send({ message: 'Request not found' });
        }

        if (err) {
            console.log("an error occurred when getting shelter requests", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        res.status(200).json(data);
    }
    catch(err){
        console.log("error", err)
    }
}

//Documents in general jd gina retrieve ani
export const getImage = async (req, res) => {
    try{
        const { document_1, document_2 } = req.query;

        const { data: urlData1, error: error1 } = supabase.storage
            .from('images')
            .getPublicUrl(`${document_1}`);

        const { data: urlData2, error: error2 } = supabase.storage
            .from('images')
            .getPublicUrl(`${document_2}`);

        // Check for errors in either request
        if (error1 || error2) {
            console.error("Error occurred while fetching images", error1 || error2);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        res.status(200).json({ image1: urlData1, image2: urlData2 });
    }
    catch(Err){
        console.log("error getting image", Err)
    }
}

export const update_reviewFunction = async (req, res) => {
    try{
        const {id, req_status, req_response, admin_id } = req.body 

        const { data, error } = await supabase
        .rpc('update_shelter_request', { 
            verified_status: req_status, verification: req_response, s_id: id, reviewer_id: admin_id 
        });

        if(error){
            console.log("u stupid", error)
        }
        else {
            console.log('Shelter verified:');
        }
    }
    catch(err){
        console.log("error getting image", err)
    }
}

export const statusDisplay = async (req, res)=>{
    try{
        const {data, err} = await supabase.rpc('countstatus')
        if (err) {
            console.log("Error:", err);
        } else {
            return res.status(200).json(data);
        }
    }
    catch(err){
        console.log("error", err)
    }
}

export const addBreed = async (req, res) =>{
    try{
        const { category, breed, description } = req.body
        
        const { data, error } = await supabase.rpc('insert_breed', {
            _breedname: breed,
            _pet_category: category,
            _pet_description: description
        });
    
        if (error) {
            console.error("Error inserting data:", error); 
            return res.status(500).json({ error: "Internal Server Error" });
            // Log the error details
            // Handle the error (e.g., show a message to the user)
        }           
            res.status(200).json(data);
    }
    catch(err){
        console.log("err", err)
    }
}

export const insertPetCategory = async (req, res)=>{
    try{
        const { category } = req.body
        
        const { data, error } = await supabase.rpc('insert_pet_category', {
            _pet_category: category,
        });
    
        if (error) {
            console.error("Error inserting data:", error); 
            return res.status(500).json({ error: "Internal Server Error" });
            // Log the error details
            // Handle the error (e.g., show a message to the user)
        }           
            res.status(200).json(data);
    }
    catch(err){
        console.log("error", err)
    }
}

export const insertVaccineCategory = async (req, res)=>{
    try{
        const { vaccine, category } = req.body
        const { data, error } = await supabase.rpc('insertvaccinecategory', {
            _vaccine_name: vaccine, 
            _pet_category: category,
        });
    
        if (error) {
            console.error("Error inserting data:", error); 
            return res.status(500).json({ error: "Internal Server Error" });
            // Log the error details
            // Handle the error (e.g., show a message to the user)
        }           
        res.status(200).json(data);
    }
    catch(err){
        console.log("error", err)
    }
}

export const loadPetCategory = async (req, res) => {
    try{
        const {data, error} = await supabase.rpc('retrieve_pet_category')
        if (error) {
            console.log("Error:", error);
        } else {
            return res.status(200).json(data);
        }
    }
    catch(err){
        console.log("error", err)
    }    
}

export const loadAdminPositions = async (req, res) => {
    try{
        // console.log("admin position loading")
        const {data, error} = await supabase.rpc('retrieve_positions')
        if (error) {
            console.log("Error:", error);
        } else {
            // console.log(data)
            return res.status(200).json(data);
        }
    }
    catch(err){
        console.log("error", err)
    }
}

export const registerAdminAccount = async (req, res) => {
    try{
        console.log("admin position loading")

        const { firstname, lastname, username, password, email, position } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10)
        const { data, error } = await supabase.rpc('insert_user_and_admin', {
            _user_email: email,               
            _user_password: hashedPassword,          
            _admin_username: username,   
            _admin_position_id: position,          
            _admin_firstname: firstname,       
            _admin_lastname: lastname,        
        });

        if (error) {
            console.log("Error:", error);
        } else {
            // console.log
            return res.status(200).json({
                "success": true
              });
        }
    }
    catch(err){
        console.log("error", err)
    }
}