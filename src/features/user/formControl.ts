import type { IUser } from '../../shared/types'

export interface IFormControl<T> {
    prepareGetUsers: (arg: T[]) => T[]
    prepareSetUser: (arg: T) => T
}

class FormControl implements IFormControl<IUser> {
    private control: IFormControl<IUser>

    constructor(control: IFormControl<IUser>) {
        this.control = control
    }

    prepareSetUser(user: IUser): IUser {
        try {
            return this.control.prepareSetUser(user)
        } catch (error) {
            console.error(error)
            return user
        }
    }
    prepareGetUsers(users: IUser[]): IUser[] {
        try {
            return this.control.prepareGetUsers(users)
        } catch (error) {
            console.error(error)
            return users
        }
    }
}

export const formUserControl = (formControl: IFormControl<IUser>) => {
    return new FormControl(formControl)
}
