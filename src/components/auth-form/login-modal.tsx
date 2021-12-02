import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input
} from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { LoginDto } from '@src/models/auth.model';
import { postLogin } from '@src/api/auth.api';

export interface ILoginModals {
  isOpen: boolean;
  setIsOpen: Function;
}

const schema = yup
  .object({
    email: yup.string().required('Email is required').email('Invalid Email'),
    password: yup.string().required('Password is required')
  })
  .required();

export default function LoginModal(props: ILoginModals) {
  const { isOpen, setIsOpen } = props;
  const { register, formState, handleSubmit } = useForm<LoginDto>({
    resolver: yupResolver(schema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit: SubmitHandler<LoginDto> = (data) => postLogin(data);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        isCentered
        motionPreset="slideInBottom"
      >
        <ModalOverlay />

        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader>{'Login'}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isInvalid={!!formState.errors.email}>
                <FormLabel>{'Email'}</FormLabel>
                <Input {...register('email')} />
                <FormErrorMessage>{formState.errors.email?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!formState.errors.password}>
                <FormLabel>{'Password'}</FormLabel>
                <Input type="password" {...register('password')} />
                <FormErrorMessage>{formState.errors.password?.message}</FormErrorMessage>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="purple" mr={3} type="submit">
                {'Login'}
              </Button>
              <Button variant="ghost" onClick={() => setIsOpen(false)}>
                {'Close'}
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}
