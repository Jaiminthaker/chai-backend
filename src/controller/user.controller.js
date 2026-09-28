import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.models.js";

const registerUser = asyncHandler(async (req, res) => {
    //1. get user details from frontend
    // 2. Validation - not emty
    // 3. Check if user already exists: userName, email
    // 4. check for images & check for avatar
    // 5. upload them to cloudinary
    // 6. create user object in db
    // 7. remove password and refreash toke from response
    // 8. check for userCreation
    // 9. return response


  // 1. Get user details from frontend
    const { userName, email, fullName, password } = req.body ?? {};

    if ([fullName, userName, email, password].some((field) => !field?.trim())) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({
        $or: [{ userName }, { email }],
    });

    if(existedUser){
        throw new ApiError(409, "User already exists");
    }

    const user = await User.create(
        {
            fullName,
            userName: userName.toLowerCase(),
            email,
            password
        }
    )

    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    return res.status(201).json(
        new ApiResponse(201, "User created successfully", createdUser)
    );
        
    })

const loginUser = asyncHandler(async (req, res) => {
    const { userName, email, password } = req.body ?? {};
    const identifier = userName?.trim() || email?.trim();

    if (!identifier || !password?.trim()) {
        throw new ApiError(400, "Username or email and password are required");
    }

    const user = await User.findOne({
        $or: [
            { userName: identifier.toLowerCase() },
            { email: identifier.toLowerCase() },
        ],
    });

    if (!user || !(await user.isPasswordCorrect(password))) {
        throw new ApiError(401, "Invalid username/email or password");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    const loggedInUser = await User.findById(user._id)
        .select("-password -refreshToken");

    return res.status(200).json(
        new ApiResponse(200, "User logged in successfully", {
            user: loggedInUser,
            accessToken,
            refreshToken,
        })
    );
});

export {
    registerUser,
    loginUser,
}