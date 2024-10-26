import supabase from "../config/database.js";

//REGISTRATION FUNCTIONS

//create buddy in buddy tbl 
export const createBuddy = async (userID, user) => {
    try {
        const { data, error } = await supabase
            .from('tbl_buddy')
            .insert([
                { user_id: userID } // Insert the userID into the buddy table
            ])
            .select() //retrieve created row/buddy

           
        if (error) {
            console.error("Error creating buddy:", error);
            throw error; 
        } else {
            const buddyid = data[0]?.buddy_id
            createBuddyDetails(buddyid, user) //create buddy in tbl buddy details 
        }
    } catch (err) {
        console.error("Unexpected error:", err);
        throw err;
    }
};

//create buddy in buddy details
export const createBuddyDetails = async (buddyid, user)=> {
    try{
        const {data, error} = await supabase
        .from ('tbl_buddy_details')
        .insert([
            {   buddy_id: buddyid,
                user_name: user.username,
                firstname: user.firstname,
                lastname: user.lastname, 
                dob: user.dob, 
                gender: user.gender, 
            }
        ])
        .select() //retrieve created row in buddy details

        if (error) {
            console.error("Error creating buddy:", error);
        } 
    }
    catch (err){
        console.log("Create buddy details error: ", err)
    }
}
export default createBuddy;