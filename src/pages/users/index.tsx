import React, { useEffect } from 'react';
import {
  Box,
  Heading,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Text,
  Avatar,
  Textarea,
  Input,
  HStack,
  VStack,
  useColorMode
} from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Meta } from '@src/layouts/meta';
import { Main as MainTemplate } from '@src/templates/main';
import { useGetMe } from '@src/hooks/auth.hook';
import TitleHeading from '@src/components/title-heading';
import { CustomColumn, CustomRow } from '@src/components/custom-grid';
import { UpdateUserDto } from '@src/models/user.model';
import { useAppDispatch, useAppSelector } from '@src/hooks/redux.hook';
import { fetchUpdateMe } from '@src/redux/auth/auth.slice';

const schema = yup
  .object({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    phone: yup.string().max(15, 'Invalid phone number'),
    email: yup.string().required('Email is required').email('Invalid Email'),
    bio: yup.string().max(255, 'Bio is too long')
  })
  .required();

export default function UserPage() {
  const dispatch = useAppDispatch();
  const { isAuth, user } = useGetMe();
  const { colorMode } = useColorMode();

  const fetchingUpdateMe = useAppSelector((state) => state.auth.fetchingUpdateMe);
  const fetchUpdateMeMsg = useAppSelector((state) => state.auth.fetchUpdateMeMsg);

  const { register, formState, handleSubmit, setValue } = useForm<UpdateUserDto>({
    resolver: yupResolver(schema),
    mode: 'onTouched',
    defaultValues: {
      email: user?.email,
      firstName: user?.firstName,
      lastName: user?.lastName,
      phone: user?.phone,
      bio: user?.bio
    }
  });

  const onSubmit: SubmitHandler<UpdateUserDto> = (data) => {
    dispatch(fetchUpdateMe(data));
  };

  useEffect(() => {
    if (isAuth && !!user) {
      setValue('email', user.email);
      setValue('firstName', user.firstName);
      setValue('lastName', user.lastName);
      setValue('phone', user.phone);
      setValue('bio', user.bio);
    }
  }, [isAuth, setValue, user]);

  return (
    <MainTemplate meta={<Meta title="User | Gerpan Blog" description="Gerpan Blog" />}>
      <Heading as="h1" hidden={true}>
        {'User'}
      </Heading>
      {!isAuth && !user ? (
        <p>{'You need to log in to see this page'}</p>
      ) : (
        <Box>
          <TitleHeading title={'User profile'} />
          <CustomRow justify="center">
            <CustomColumn sm={12} md={4} lg={4}>
              <VStack>
                <Avatar size="xl" name={user?.firstName} src={user?.avatar} />
                <Button size="sm" variant="outline" colorScheme="purple">{'Change avatar'}</Button>
              </VStack>
            </CustomColumn>

            <CustomColumn sm={12} md={8} lg={6}>
              <Box bg={colorMode === 'light' ? 'white' : 'gray.700'} p="5" rounded="xl">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <HStack mb="5">
                    <FormControl isInvalid={!!formState.errors.email}>
                      <FormLabel>{'First name'}</FormLabel>
                      <Input {...register('firstName')} />
                      <FormErrorMessage>{formState.errors.firstName?.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={false}>
                      <FormLabel>{'Last name'}</FormLabel>
                      <Input {...register('lastName')} />
                      <FormErrorMessage>{formState.errors.lastName?.message}</FormErrorMessage>
                    </FormControl>
                  </HStack>

                  <FormControl isInvalid={false} mb="5">
                    <FormLabel>{'Email'}</FormLabel>
                    <Input {...register('email')} readOnly />
                    <FormErrorMessage>{formState.errors.email?.message}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={false} mb="5">
                    <FormLabel>{'Phone number'}</FormLabel>
                    <Input {...register('phone')} />
                    <FormErrorMessage>{formState.errors.phone?.message}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={false} mb="8">
                    <FormLabel>{'Bio'}</FormLabel>
                    <Textarea {...register('bio')} rows={5} resize="none" />
                    <FormErrorMessage>{formState.errors.bio?.message}</FormErrorMessage>
                  </FormControl>

                  <Button w="100%" colorScheme="purple" type="submit" isLoading={fetchingUpdateMe}>
                    {'Update profile'}
                  </Button>
                </form>
              </Box>
            </CustomColumn>
          </CustomRow>
        </Box>
      )}
    </MainTemplate>
  );
}
