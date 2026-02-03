import { UserBaseSchema } from '@/shared/form-data-schemas/user-form-data-schema'
import type { IUser } from '@/shared/types'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'

export const useCreateUserForm = (initialValues: IUser) => {
  const { handleSubmit, setErrors } = useForm({
    validationSchema: toTypedSchema(UserBaseSchema),
    initialValues,
  })

  return {
    setErrors,
    handleSubmit,
  }
}
