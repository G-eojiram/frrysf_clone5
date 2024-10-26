import bcrypt from "bcrypt"
import supabase from "../config/database.js"
import { createBuddy } from "./buddyModel.js"
import { createShelter, verifyShelter } from "./shelterModel.js";
import { createToken, createRefreshToken } from "../middleware/jwt.js"

//LOGIN | check if user credentials exist in DATABASE
export const validateUser = async (req, res) => {
    try{
        const { email, password } = req.body

        const { data, error } = await supabase 
            .from('tbl_user')
            .select('user_id, user_email, user_password')
            .eq('user_email', email)

        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }

        //if something is retrieved from user  table, then will check shelter and buddy table
        if (data && data.length > 0) {
            const user = data[0];

                const passwordMatch = await bcrypt.compare(password, user.user_password); // Compare salted hash password to input

                if (!passwordMatch) {
                    res.status(401).json({ success: false, message: 'Invalid email or password' });
                    return;
            }

            const userID = user.user_id;

            const { data: shelterData, error: shelterError } = await supabase //checks if user exist in shelter table
                .from('tbl_shelter')
                .select('shelter_id')
                .eq('user_id', userID)
                .select() //select data retrieved from users table
                
            //nothing is returned from shelter
            if (shelterError) {
                res.status(500).json({ error: shelterError.message });
                return;
            }
        
            //IF user is shelter 
            if (shelterData && shelterData.length > 0) {
                const shelter_id = (shelterData[0].shelter_id)
                const verificationResult = await verifyShelter(userID); //check if shelter is document verified

                // console.log(verificationResult)
                // return
                if (verificationResult.success) {
                    const token = createToken({ userID, userType: 'shelter' });
                    const refreshToken = createRefreshToken({ userID, userType: 'shelter' });

                    const addressExists = verificationResult.address
                    
                    res.cookie('refreshToken', refreshToken, {
                        httpOnly: true,
                        secure: 'false', //process.env.NODE_ENV === 'production', // Dynamic based on environment
                        sameSite: 'Lax',
                        path: '/' // Consistent cookie path
                    });
                
                    res.status(200).json({ 
                        success: true, 
                        message: 'User validated and shelter verified successfully',
                        userID: userID, 
                        userType: 'shelter', 
                        characterId: shelter_id, 
                        address_exists: addressExists,
                        token 
                    });
                    return;
                } else {
                    // Shelter is not verified
                    res.status(403).json({ success: false, message: 'Shelter is not verified' });
                    return;
                }
            }
        
            const { data: buddyData, error: buddyError } = await supabase //if user doesnt exist in shelter, checks buddy
                .from('tbl_buddy')
                .select('buddy_id')
                .eq('user_id', userID)
                .select()

        
            if (buddyError) {
                res.status(500).json({ error: buddyError.message });
                return;
            }
        
            //IF User is a buddy
            if (buddyData && buddyData.length > 0) {
                // console.log(buddyData)
                const buddy_id = (buddyData[0].buddy_id)
                const token = createToken({ userID, userType: 'buddy' });
                const refreshToken = createRefreshToken({userID, userType: 'buddy'})

                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,  // Can't be accessed via JavaScript (secure from XSS)
                    secure: false,    // Use secure: true in production (HTTPS)
                    sameSite: 'Lax',  // Optional: Prevents the cookie from being sent in cross-site requests
                    path: '/'
                });

                res.status(200).json({ 
                    success: true, 
                    message: 'User validated successfully', 
                    userID: userID, 
                    userType: 'buddy', 
                    characterId: buddy_id, 
                    token 
                });

            }

            const { data: admindata, error: adminError } = await supabase //if user doesnt exist in shelter, checks buddy
                .from('tbl_admin')
                .select('admin_id')
                .eq('user_id', userID)
                .select();

        
            if (adminError) {
                res.status(500).json({ error: adminError.message });
                return;
            }

            if (admindata && admindata.length > 0) {
                const admin_id = (admindata[0].admin_id)

                const token = createToken({ userID, userType: 'admin' });
                const refreshToken = createRefreshToken({userID, userType: 'admin'})

                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,  // Can't be accessed via JavaScript (secure from XSS)
                    secure: false,    // Use secure: true in production (HTTPS)
                    sameSite: 'Lax',  // Optional: Prevents the cookie from being sent in cross-site requests
                    path: '/'
                });

                res.status(200).json({ 
                    success: true, 
                    message: 'User validated successfully', 
                    userID: userID, 
                    userType: 'admin', 
                    characterId: admin_id, 
                    token 
                });
            }
        
            // If the user is not found in either table, consider it an error
            //res.status(401).json({ success: false, message: 'User type not determined' });
        
        } else {
            // User not found or credentials don't match
            res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    } catch(err){
        console.log("error in verifying user", err)
    }
};

//REGISTRATION | create user in DATABASE
export const createUser = async (req, res) =>{
    try{
        const user = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            gender: req.body.gender,
            dob: req.body.dob,
            username: req.body.username
        }
    
        if(typeof req.body.email && typeof req.body.password != 'string'){
            console.log("not strings")
        }
        else{
            console.log(typeof req.body.email);  // Should be "string"
            console.log(typeof req.body.password);  // Should be "string"
            console.log("string?")
        }

        //EMAIL VERIFICATION STILL WAITING FOR RESEND TO VERIFY DOMAIN
        //             // Ensure that you're getting strings from the form, not arrays
        // const { userr, error: authError } = await supabase.auth.signUp(
        //     {
        //       email: req.body.email,
        //       password: req.body.password
        //     },
        //     {
        //       redirectTo: 'http://localhost:8080/confirm-email'  // Change this to your confirm route
        //     }
        //   );
          
    
        // if (authError){
        //     console.log(authError)
        //     throw new Error(`Auth Error: ${authError.message}`);
        // }

        // console.log("hehe tite")
        // this.message = 'Registration successful! Please check your email to verify your account.';
        // this.messageType = 'is-success';

        const password = req.body.password
        const email = req.body.email
        const regtype = req.body.regtype
    
        const sheltername = req.body.sheltername
        const documents = req.files 
            
        const hashedPassword = await bcrypt.hash(password, 10) //create a salted-hash password 
    
        // user to user tbl
        const {data, error } = await supabase 
        .from('tbl_user')
        .insert([
            {user_email: email, user_password: hashedPassword }
        ])
        .select() //retrieve created row
    
        if(error){
            if (error.code.match('23505')) { // PostgreSQL error code for unique violation
                res.status(409).json({success: false, message: 'Email already exists'});
            } else {
                res.status(401).json({ success: false, message: 'Error Inserting Data' });
            }
        } else {
            //sample logic
            const userID = data[0]?.user_id; //retrieves userid from data
            if(regtype.match("buddy")){
                await createBuddy(userID, user); //user holds all user detials
            }
            else{
                await createShelter(userID, sheltername, documents, email); 
            }
           res.status(200).json({success: true, message: 'User Successfully added', user: data});
        }
    }
    catch (err){
        console.log("error in create user: ", err)
    }
    
};

export const logoutUser = async (req, res) =>{
    try{
        res.cookie('refreshToken', '', {
            httpOnly: true,
            expires: new Date(0), // Set expiration date to the past
            path: '/', // Ensure the path matches the cookie's path
        });

        res.status(200).send('Cookie and Localstorage cleared');
    }
    catch(err){
        console.log(err)
    }
}

