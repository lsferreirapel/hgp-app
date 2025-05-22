import { useController } from 'react-hook-form'

import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from '@ui/form-control'
import { AlertCircleIcon } from '@ui/icon'
import { Input, InputField } from '@ui/input'

type InputFieldProps = React.ComponentProps<typeof InputField>

interface TextFieldProps {
  name: string
  control: any
  label?: string
  helperText?: string
  placeholder?: string
  type?: InputFieldProps['type']
}

export function TextField({
  name,
  control,
  type = 'text',
  ...props
}: TextFieldProps) {
  const {
    field,
    fieldState: { invalid, error },
    formState: {},
  } = useController({
    name,
    control,
    rules: { required: true },
  })

  return (
    <FormControl isInvalid={invalid} isReadOnly={false} isRequired={false}>
      {!!props?.label && (
        <FormControlLabel>
          <FormControlLabelText>{props.label}</FormControlLabelText>
        </FormControlLabel>
      )}
      <Input>
        <InputField
          ref={field.ref}
          onChangeText={(text) => field.onChange(text)}
          onBlur={field.onBlur}
          placeholder={props?.placeholder ?? 'Digite aqui'}
          type={type}
        />
      </Input>
      {!!props?.helperText && (
        <FormControlHelper>
          <FormControlHelperText>{props.helperText}</FormControlHelperText>
        </FormControlHelper>
      )}
      {!!error?.message && (
        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} />
          <FormControlErrorText>{error?.message}</FormControlErrorText>
        </FormControlError>
      )}
    </FormControl>
  )
}
