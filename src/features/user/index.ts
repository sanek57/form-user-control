import type { ILabel, IUser } from '../../shared/types'
import { formUserControl, type IFormControl } from './formControl'

class UserControl implements IFormControl<IUser> {
    prepareSetUser(user: Omit<IUser, 'id'>): IUser {
        if (user.labels && typeof user.labels === 'string') {
            user.labels = user.labels
                ?.split(';')
                .map((label: string) => ({ text: label.trim() }) as ILabel)
        }

        if (user.type === 'LDPA') user.password = null

        return { ...user, id: Date.now() }
    }
    prepareGetUsers(users: IUser[]): IUser[] {
        return users.map((user: IUser) => ({
            ...user,
            labels: (user.labels as ILabel[])?.map(l => l.text).join(';'),
        }))
    }
}

export const userControl = formUserControl(new UserControl())
