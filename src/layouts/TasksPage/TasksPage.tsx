/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";
import MainLayout from "../MainLayout/MainLayout";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Badge, Box, Button, FormControl, FormErrorMessage, FormLabel, HStack, IconButton, Input, Spinner, Text, VStack } from "@chakra-ui/react";
import { CloseIcon, EditIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { createBeneficiaryVerification, resubmitBeneficiaryVerification } from "@/api/createTask";
import Cookies from "js-cookie";
import { getBeneficiaryVerificationAttempt } from "@/api/getTasks";
import { colorBadge, status } from "@/utils/status";

interface ITasksPageProps {}

const TasksPage:FC<ITasksPageProps> = () => {
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>();
    const [isLoading, setIsLoading] = useState<boolean>();
    const [isSubmit, setIsSubmit] = useState<boolean>(true);
    const [userTask, setUserTask] = useState<{
        comment?: string,
        description?: string,
        numberOfAdults?: number,
        numberOfChildren?:number,
        numberOfDisabled?:number,
        numberOfOld?:number,
        numberOfPregnant?:number,
        verificationStatus?:number,
    }>();

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm();

    const token = Cookies.get('token');
    const userId = Cookies.get('id')
    const userUuid = Cookies.get('uuid')

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

        const resp = isSubmit ? 
            await createBeneficiaryVerification(
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
        ) : await resubmitBeneficiaryVerification(
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

            setIsSubmit(true)

            location.reload();
        }
    
        console.log(formData);
        // Здесь должна быть логика отправки данных
        setIsLoading(false);
    };

    const getUserTask = async () => {
        const resp = await getBeneficiaryVerificationAttempt(token, userUuid ? userUuid : '')
        console.log(resp)
        if (resp.status === 200) {
            setUserTask(resp.data)
        }

        console.log('TASK', userTask)
    }

    useEffect(() => {
        getUserTask()
    }, [])

    return (
        <MainLayout>
            <Box w='100%'>
                <Text textStyle='h4' as='h1'>Заявки</Text>
                <Button
                    rightIcon={<PlusSquareIcon />}
                    w='100%'
                    justifyContent="left"
                    maxW='fit-content'
                    bg='#1e88e5'
                    _hover={{color: 'white' }}
                    mt='4'
                    onClick={() => setIsPopupOpen(true)}
                >
                    Новая заявка
                </Button>

                <Accordion defaultIndex={[0]} allowMultiple mt='20px' p='5px'>
                    <AccordionItem w='100%' borderWidth='1px' borderColor='#1e88e5' borderRadius='15px'>
                        <AccordionButton w='100%'>
                            <HStack 
                                as="span" 
                                flex='1' 
                                textAlign='left'  
                                justifyContent='space-between' 
                                alignItems='center'
                            >
                                <Text as='h4' textStyle='h4'>Заявка на верификацию</Text>
                                
                                <Badge 
                                    colorScheme={colorBadge(userTask?.verificationStatus)} 
                                    mr='3' 
                                    fontSize='md' 
                                    borderRadius='5px' 
                                    textTransform='lowercase'
                                >
                                    {status(userTask?.verificationStatus)}
                                </Badge>
                            </HStack>
                            <AccordionIcon />
                        </AccordionButton>

                        <AccordionPanel>
                            <Box>
                                <Text as='p' textStyle='p'>Кол-во взрослых: {userTask?.numberOfAdults}</Text>
                                <Text as='p' textStyle='p'>Кол-во детей: {userTask?.numberOfChildren}</Text>
                                <Text as='p' textStyle='p'>Кол-во инвалидов: {userTask?.numberOfDisabled}</Text>
                                <Text as='p' textStyle='p'>Кол-во пожилых: {userTask?.numberOfOld}</Text>
                                <Text as='p' textStyle='p'>Кол-во беременных: {userTask?.numberOfPregnant}</Text>
                                <Text as='p' textStyle='p'>Описание ситуации: {userTask?.description}</Text>
                            </Box>
                            
                            {userTask?.verificationStatus === 2 && (
                                <Box borderTopWidth='1px' borderColor='#1e88e5' pt='2' mt='3'>
                                    <Text as='p' textStyle='p'>Комментарий админимтратора: {userTask?.comment}</Text>

                                    <Button
                                        rightIcon={<EditIcon />}
                                        w='100%'
                                        justifyContent="left"
                                        maxW='fit-content'
                                        bg='#1e88e5'
                                        color='white'
                                        _hover={{color: 'white' }}
                                        mt='2'
                                        onClick={() => {setIsPopupOpen(true); setIsSubmit(false)}}
                                    >
                                        редактировать
                                    </Button>
                                </Box>
                            )}
                            
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>

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
