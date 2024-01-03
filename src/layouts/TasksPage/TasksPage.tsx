/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";
import MainLayout from "../MainLayout/MainLayout";
import { Box, Button, FormControl, FormErrorMessage, FormLabel, IconButton, Input, Spinner, Text, VStack } from "@chakra-ui/react";
import { CloseIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { createBeneficiaryVerification } from "@/api/createTask";
import Cookies from "js-cookie";
import { getBeneficiaryVerificationAttempt } from "@/api/getTasks";

interface ITasksPageProps {}

const TasksPage:FC<ITasksPageProps> = () => {
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>();
    const [isLoading, setIsLoading] = useState<boolean>()

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm();

    const token = Cookies.get('token');
    const userId = Cookies.get('id')

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        const userUserType = Cookies.get('userType')
        const userUserRole = Cookies.get('userRole')

        const formData = {
            beneficiary: {
                id:  userId ? parseInt(userId, 10) : 0,
                uuid: Cookies.get('uuid'),
                userType: userUserType ? parseInt(userUserType, 10) : 0,
                userRole: userUserRole ? parseInt(userUserRole, 10) : 0,
                token: token,
            },
            numberOfAdults: parseInt(data.numberOfAdults, 10),
            numberOfChildren: parseInt(data.numberOfChildren, 10),
            numberOfOld: parseInt(data.numberOfOld, 10),
            numberOfDisabled: parseInt(data.numberOfDisabled, 10),
            numberOfPregnant: parseInt(data.numberOfPregnant, 10),
            description: data.description,
            documents: [
                "s"
            ],
            comment: '',
            verificationStatus: 0,
        };

        const resp = await createBeneficiaryVerification(
            token,
            formData.beneficiary,
            formData.numberOfAdults,
            formData.numberOfChildren,
            formData.numberOfOld,
            formData.numberOfDisabled,
            formData.numberOfPregnant,
            formData.description,
            formData.documents,
            formData.comment,
            formData.verificationStatus,
        );

        console.log(resp)

        if (resp.status === 200) {
            alert('Заявка успешно создана!')

            setIsPopupOpen(false);

            location.reload();
        }
    
        console.log(formData);
        // Здесь должна быть логика отправки данных
        setIsLoading(false);
    };

    const getUserTask = async () => {
        const resp = await getBeneficiaryVerificationAttempt(token, userId ? parseInt(userId, 10) : 0)

        console.log(resp)
    }

    useEffect(() => {
        getUserTask()
    })
    return (
        <MainLayout>
            <Box>
                <Text textStyle='h4' as='h1'>Заявки</Text>
                <Button
                    rightIcon={<PlusSquareIcon />}
                    w='100%'
                    justifyContent="left"
                    bg='#1e88e5'
                    _hover={{color: 'white' }}
                    mt='4'
                    onClick={() => setIsPopupOpen(true)}
                >
                    Новая заявка
                </Button>

                {isPopupOpen && (
                    <Box position='fixed' zIndex='1000' top='50%' mt='-30vh' left='50%' ml='-25%' w='50%' h='60vh' bg='white' borderRadius='30px' borderWidth='1px' borderColor='GrayText'>
                        <IconButton
                            aria-label='Close popup'
                            icon={<CloseIcon />}
                            position='absolute'
                            top={2}
                            right={2}
                            onClick={() => setIsPopupOpen(false)}
                            bg='transparent'
                        />

                        <VStack as="form" onSubmit={handleSubmit(onSubmit)} pt={12} pl={8} pr={8}  spacing={2} alignItems='flex-start' maxH='55vh' overflowY='auto'>
                            {/* Взрослые */}
                            <FormControl isInvalid={!!errors.numberOfAdults}>
                                <FormLabel htmlFor="numberOfAdults">Кол-во взрослых</FormLabel>
                                <Input
                                    id="numberOfAdults"
                                    type='number'
                                    {...register('numberOfAdults', { 
                                        required: 'This field is required',
                                        pattern: {
                                        value: /^\d+$/,
                                        message: 'numberOfAdults'
                                        }
                                    })}
                                />
                                <FormErrorMessage>Заполните</FormErrorMessage>
                            </FormControl>

                            {/* Дети */}
                            <FormControl isInvalid={!!errors.numberOfChildren}>
                                <FormLabel htmlFor="numberOfChildren">Кол-во детей</FormLabel>
                                <Input
                                    id="numberOfChildren"
                                    type='number'
                                    {...register('numberOfChildren', { 
                                        required: 'This field is required',
                                        pattern: {
                                        value: /^\d+$/,
                                        message: 'numberOfChildren'
                                        }
                                    })}
                                />
                                <FormErrorMessage>Заполните</FormErrorMessage>
                            </FormControl>

                            {/* Старики */}
                            <FormControl isInvalid={!!errors.numberOfOld}>
                                <FormLabel htmlFor="numberOfOld">Кол-во пожилых</FormLabel>
                                <Input
                                    id="numberOfOld"
                                    type='number'
                                    {...register('numberOfOld', { 
                                        required: 'This field is required',
                                        pattern: {
                                        value: /^\d+$/,
                                        message: 'numberOfOld'
                                        }
                                    })}
                                />
                                <FormErrorMessage>Заполните</FormErrorMessage>
                            </FormControl>

                            {/* Инвалиды */}
                            <FormControl isInvalid={!!errors.numberOfDisabled}>
                                <FormLabel htmlFor="numberOfDisabled">Кол-во инвалидов</FormLabel>
                                <Input
                                    id="numberOfDisabled"
                                    type='number'
                                    {...register('numberOfDisabled', { 
                                        required: 'This field is required',
                                        pattern: {
                                        value: /^\d+$/,
                                        message: 'numberOfDisabled'
                                        }
                                    })}
                                />
                                <FormErrorMessage>Заполните</FormErrorMessage>
                            </FormControl>
                            
                            {/* Беременные */}
                            <FormControl isInvalid={!!errors.numberOfPregnant}>
                                <FormLabel htmlFor="numberOfPregnant">Кол-во беременных</FormLabel>
                                <Input
                                    id="numberOfPregnant"
                                    type='number'
                                    {...register('numberOfPregnant', { 
                                        required: 'This field is required',
                                        pattern: {
                                        value: /^\d+$/,
                                        message: 'numberOfPregnant'
                                        }
                                    })}
                                />
                                <FormErrorMessage>Заполните</FormErrorMessage>
                            </FormControl>

                            {/* Фамилия */}
                            <FormControl isInvalid={!!errors.description}>
                                <FormLabel htmlFor="description">Опишите ситуацию</FormLabel>
                                <Input
                                id="description"
                                type="text"
                                {...register('description', { required: 'This field is required' })}
                                />
                                <FormErrorMessage>Заполните</FormErrorMessage>
                            </FormControl>

                            {/* Кнопка отправки */}
                            <Button
                                mt={4}
                                colorScheme="primary.600"
                                color='primary.600'
                                borderWidth='1px'
                                borderColor='#1e88e5'
                                isLoading={isLoading}
                                type="submit"
                            >
                                {!isLoading ? 'Отправить' : <Spinner />}
                            </Button>
                        </VStack>
                    </Box>
                )}
            </Box>
            
        </MainLayout>
    )
}

export default TasksPage;
