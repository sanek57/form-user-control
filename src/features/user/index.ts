import type { ILabel, IUser } from '../../shared/types'
import { formUserControl, type IFormControl } from './formControl'

class UserControl implements IFormControl<IUser> {
    prepareSetUser(user: IUser): IUser {
        if (user.labels) {
            user.labelsArr = user.labels
                ?.split(';')
                .filter(l => l.trim().length)
                .map((label: string) => ({ text: label.trim() }) as ILabel)
        }

        if (user.type === 'LDPA') user.password = null

        if (user.id) {
            return { ...user }
        }
        return { ...user, id: Date.now() }
    }
    prepareGetUsers(users: IUser[]): IUser[] {
        return users.map((user: IUser) => ({
            ...user,
            labels: user.labelsArr?.map(l => l.text).join('; '),
        }))
    }
}

export const userControl = formUserControl(new UserControl())
