import { TypeOf, object, string } from "zod";


export const userSchema = object({

    body: object({
        email: string({
            required_error: "email is required"
        }).email("Not a valid email "),
        name: string({
            required_error: "name is required"
        }),
        password: string({
            required_error: "password is required"
        }),
        passwordConfirmation: string({
            required_error: "password confirmation is required"
        }),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "Passwords do not match",
        path: ["passwordConfirmation"]

    })
})

export type CreateUserInput = Omit<
    TypeOf<typeof userSchema>,
    "body.passwordConfirmation"
>;