import 'react-native-url-polyfill/auto'

import { useForm } from 'react-hook-form'
import { Alert, View } from 'react-native'

import { TextField } from '@components/atomic/molecules/text-field'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@ui/button'
import { Text } from '@ui/text'

import { supabase } from '@/config/supabase'
import { InferZodType, zod } from '@/utils/zod'

const authSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6),
})
type AuthValues = InferZodType<typeof authSchema>

export default function AuthScreen() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(authSchema),
  })

  async function onSubmit(values: AuthValues) {
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    })
    if (error) Alert.alert(error.message)
  }

  return (
    <View className="flex w-full h-full justify-center items-center">
      <View className="w-1/2 px-10 py-20 gap-2 shadow-md shadow-gray-400 rounded-lg">
        <Text bold size="2xl" className="mb-2">
          Faça login
        </Text>
        <TextField control={control} name="email" label="E-mail" />
        <TextField
          control={control}
          name="password"
          type="password"
          label="Senha"
        />
        <Button
          onPress={handleSubmit(onSubmit)}
          variant="outline"
          className="mt-4"
        >
          Entrar
        </Button>
      </View>
    </View>
  )
}
