// import { Request, Response } from 'express';
// import { User } from '../entities/User';

// export const createUser = async (req: Request, res: Response) => {

//     try {
//         const { firstname, Email, Password} = req.body;

//         const user = new User();
//         user.firstname = firstname;
//         user.Email = Email;
//         user.Password = Password;

//         await user.save();

//         return res.json(user);
//     } catch (error) {
//         if (error instanceof Error) {
//             return res.status(400).json({ message: error.message });
//         }
//     }

// }

// export const updateUser = async (req: Request, res: Response) => {

//     try {
//         const { userId } = req.params;

//         const user = await User.findOneBy({ userId: parseInt(req.params.id) });

//         if (!user) return res.status(404).json({ message: 'User does not exist' });

//         await User.update({ userId: parseInt(userId) }, req.body);

//         return res.sendStatus(204);

//     } catch (error) {
//         if (error instanceof Error) {
//             return res.status(400).json({ message: error.message });
//         }
//     }
// }

// export const deleteUser = async (req: Request, res: Response) => {

//     try {
//         const { userId } = req.params;

//         const result = await User.delete({ userId: parseInt(userId) });

//         if (result.affected === 0) {
//             return res.status(400).json({ message: 'User not found' });
//         }

//         return res.status(204);

//     } catch (error) {
//         if (error instanceof Error) {
//             return res.status(400).json({ message: error.message });
//         }
//     }

// }

// export const getUserDetails = async (req: Request, res: Response) => {
//     try {
//       const { userId } = req.params;
  
//       // Find the user by their ID
//       const user = await User.findOneBy({ userId: parseInt(userId) });
  
//       // If user does not exist, return a 404 error
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }
  
//       // Return user details (excluding sensitive information like password)
//       const { userId, firstname, Email } = user;
//       return res.status(200).json({ userId, firstname, Email });
//     } catch (error) {
//       if (error instanceof Error) {
//         return res.status(500).json({ message: error.message });
//       }
//     }
//   };
  

import { Request, Response } from 'express';
import { User } from '../entities/User';
import bcrypt from 'bcrypt';

export const createUser = async (req: Request, res: Response) => {
    try {
        console.log('Creating user with request body:', req.body);
        const { firstname, Email, Password } = req.body;

        // Hash the password for security
        const hashedPassword = await bcrypt.hash(Password, 10);

        const user = new User();
        user.firstname = firstname;
        user.Email = Email;
        user.Password = hashedPassword;

        await user.save();
        console.log('User created successfully:', user);

        return res.json(user);
    } catch (error) {
        console.error('Error creating user:', error);
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        console.log('Updating user with params:', req.params);
        const { userId: userIdParam } = req.params;

        const user = await User.findOneBy({ userId: parseInt(userIdParam) });
        console.log('User found:', user);

        if (!user) {
            console.log('User does not exist with ID:', userIdParam);
            return res.status(404).json({ message: 'User does not exist' });
        }

        if (req.body.Password) {
            req.body.Password = await bcrypt.hash(req.body.Password, 10);
        }

        await User.update({ userId: parseInt(userIdParam) }, req.body);
        console.log('User updated successfully with ID:', userIdParam);

        return res.sendStatus(204);
    } catch (error) {
        console.error('Error updating user:', error);
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        console.log('Deleting user with params:', req.params);
        const { userId: userIdParam } = req.params;

        const result = await User.delete({ userId: parseInt(userIdParam) });
        console.log('Delete result:', result);

        if (result.affected === 0) {
            console.log('User not found with ID:', userIdParam);
            return res.status(400).json({ message: 'User not found' });
        }

        console.log('User deleted successfully with ID:', userIdParam);
        return res.sendStatus(204);
    } catch (error) {
        console.error('Error deleting user:', error);
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }
    }
};

export const getUserDetails = async (req: Request, res: Response) => {
    try {
        console.log('Getting user details with params:', req.params);
        const { userId: userIdParam } = req.params;

        // Find the user by their ID
        const user = await User.findOneBy({ userId: parseInt(userIdParam) });
        console.log('User found:', user);

        // If user does not exist, return a 404 error
        if (!user) {
            console.log('User not found with ID:', userIdParam);
            return res.status(404).json({ message: 'User not found' });
        }

        // Return user details (excluding sensitive information like password)
        const { userId, firstname, Email } = user;
        console.log('Returning user details:', { userId, firstname, Email });
        return res.status(200).json({ userId, firstname, Email });
    } catch (error) {
        console.error('Error getting user details:', error);
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
