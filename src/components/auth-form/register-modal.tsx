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
  Text,
  Input
} from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAppDispatch, useAppSelector } from '@src/hooks/redux.hook';
import { InputRegisterDto } from '@src/models/auth.model';
import { fetchRegister } from '@src/redux/auth/auth.slice';

export interface IRegisterModalProps {
  isOpen: boolean;
  setIsOpen: Function;
}

const schema = yup
  .object({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    phone: yup.string().max(15, 'Invalid phone number'),
    email: yup.string().required('Email is required').email('Invalid Email'),
    password: yup.string().required('Password is required').min(8, 'Password is too short'),
    rePassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
  })
  .required();

export default function RegisterModal(props: IRegisterModalProps) {
  const { isOpen, setIsOpen } = props;

  // redux
  const dispatch = useAppDispatch();
  const fetchingRegister = useAppSelector((state) => state.auth.fetchingRegister);
  const fetchRegisterMsg = useAppSelector((state) => state.auth.fetchRegisterMsg);

  const { register, formState, handleSubmit } = useForm<InputRegisterDto>({
    resolver: yupResolver(schema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
      rePassword: '',
      firstName: '',
      lastName: '',
      phone: ''
    }
  });

  const onSubmit: SubmitHandler<InputRegisterDto> = (data) => {
    dispatch(fetchRegister(data));
  };

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
            <ModalHeader>{'Register'}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isInvalid={!!formState.errors.email}>
                <FormLabel>{'Email'}</FormLabel>
                <Input {...register('email')} />
                <FormErrorMessage>{formState.errors.email?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!formState.errors.firstName}>
                <FormLabel>{'First name'}</FormLabel>
                <Input {...register('firstName')} />
                <FormErrorMessage>{formState.errors.firstName?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!formState.errors.lastName}>
                <FormLabel>{'Last name'}</FormLabel>
                <Input {...register('lastName')} />
                <FormErrorMessage>{formState.errors.lastName?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!formState.errors.phone}>
                <FormLabel>{'Phone number'}</FormLabel>
                <Input {...register('phone')} />
                <FormErrorMessage>{formState.errors.phone?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!formState.errors.password}>
                <FormLabel>{'Password'}</FormLabel>
                <Input type="password" {...register('password')} />
                <FormErrorMessage>{formState.errors.password?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!formState.errors.rePassword}>
                <FormLabel>{'Confirm password'}</FormLabel>
                <Input type="password" {...register('rePassword')} />
                <FormErrorMessage>{formState.errors.rePassword?.message}</FormErrorMessage>
              </FormControl>

              {!fetchingRegister && !!fetchRegisterMsg && (
                <Text color="red.400" textAlign="center" mt="3">
                  {fetchRegisterMsg}
                </Text>
              )}
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="purple" mr={3} type="submit">
                {'Register'}
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
