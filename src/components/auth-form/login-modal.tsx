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
import { LoginDto } from '@src/models/auth.model';
import { fetchLogin } from '@src/redux/auth/auth.slice';

export interface ILoginModalProps {
  isOpen: boolean;
  setIsOpen: Function;
}

const schema = yup
  .object({
    email: yup.string().required('Email is required').email('Invalid Email'),
    password: yup.string().required('Password is required'),
    remember: yup.boolean().default(true)
  })
  .required();

export default function LoginModal(props: ILoginModalProps) {
  const { isOpen, setIsOpen } = props;

  // redux
  const dispatch = useAppDispatch();
  const fetchingLogin = useAppSelector((state) => state.auth.fetchingLogin);
  const fetchLoginMsg = useAppSelector((state) => state.auth.fetchLoginMsg);

  const { register, formState, handleSubmit } = useForm<LoginDto>({
    resolver: yupResolver(schema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
      remember: true
    }
  });

  const onSubmit: SubmitHandler<LoginDto> = (data) => {
    dispatch(fetchLogin(data));
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

              {!fetchingLogin && !!fetchLoginMsg && (
                <Text color="red.400" textAlign="center" mt="3">
                  {fetchLoginMsg}
                </Text>
              )}
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
