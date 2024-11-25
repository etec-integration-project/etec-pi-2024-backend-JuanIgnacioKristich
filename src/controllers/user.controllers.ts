import { Request, Response } from 'express';
import { User } from '../entities/User';

export const createUser = async (req: Request, res: Response) => {

    try {
        const { firstname, Email, Password} = req.body;

        const user = new User();
        user.firstname = firstname;
        user.Email = Email;
        user.Password = Password;

        await user.save();

        return res.json(user);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }
    }

}

export const updateUser = async (req: Request, res: Response) => {

    try {
        const { id } = req.params;

        const user = await User.findOneBy({ id: parseInt(req.params.id) });

        if (!user) return res.status(404).json({ message: 'User does not exist' });

        await User.update({ id: parseInt(id) }, req.body);

        return res.sendStatus(204);

    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }
    }
}

export const deleteUser = async (req: Request, res: Response) => {

    try {
        const { id } = req.params;

        const result = await User.delete({ id: parseInt(id) });

        if (result.affected === 0) {
            return res.status(400).json({ message: 'User not found' });
        }

        return res.status(204);

    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }
    }

}

export const getUserDetails = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
  
      // Find the user by their ID
      const user = await User.findOneBy({ id: parseInt(userId) });
  
      // If user does not exist, return a 404 error
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Return user details (excluding sensitive information like password)
      const { id, firstname, Email } = user;
      return res.status(200).json({ id, firstname, Email });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
    }
  };
  