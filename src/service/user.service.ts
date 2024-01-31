import { FilterQuery } from 'mongoose';
import UserModel, { UserDocument, UserInput } from '../models/user.model';
import { omit } from 'lodash';

export async function createUser(input: UserInput) {

    try {
        const user = await UserModel.create(input)

        return omit(user.toJSON(), "password")
    } catch (err: any) {

        throw new Error(err)

    }

}

export async function validatePassword({ email, password }: { email: string, password: string }) {
    const user = await UserModel.findOne({ email })

    if (!user) {
        return false;
    }
    const isValid = await user.comparePassword(password)
    if (!isValid) return false;
    return omit(user.toJSON(), "password")
}


export async function findUser(query: FilterQuery<UserInput>) {

    return UserModel.findOne(query).lean()
}