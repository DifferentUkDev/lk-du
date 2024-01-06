/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button, FormControl, FormErrorMessage, FormLabel, IconButton, Input, Select, Spinner, Text, VStack } from '@chakra-ui/react';
import { registerPartner, registerVoulontee } from "@/api/registerUsers";
import { CloseIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";

interface IHrefPageProps {

}

const HrefPage:FC<IHrefPageProps> = () => {
    const [isParnterPopup, setIsParnterPopup] = useState<boolean>(false);
    const [isVolounteePopup, setIsVolounteePopup] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm();

    const onSubmitVolountee = async (data: any) => {
        setIsLoading(true);

        const formattedPhoneNumber = data.phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');

        const formData = {
            ...data,
            age: parseInt(data.age, 10), // Преобразование возраста в число
            phone: formattedPhoneNumber,
            helpTypeMask: parseInt(data.helpTypeMask, 10),
            comment: '',
            status: 0,
        };

        console.log(formData)
        
        const resp = await registerVoulontee(
            formData.firstName,
            formData.lastName,
            formData.age,
            formData.ageType,
            formData.geo,
            formData.helpTypeMask,
            formData.description,
            formData.email,
            formData.phone,
            formData.comment,
            formData.status
        );

        console.log(resp)
        
        if (resp.status === 200) {
            setIsVolounteePopup(false);

            alert('Скоро придет уведомление на почту с вашим логином и паролем')
        }
    
        console.log(formData);
        // Здесь должна быть логика отправки данных
        setIsLoading(false);
    };

    const onSubmitPartner = async (data: any) => {
        setIsLoading(true);

        const formattedPhoneNumber = data.contactPhone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
        
        const dateParts = data.registrationDate.split('.'); // Разделение исходной даты
        const formattedDate = `${dateParts[0]}`; // Перестановка и форматирование

        const formData = {
            ...data,
            contactPhone: formattedPhoneNumber,
            helpTypeMask: parseInt(data.helpTypeMask, 10),
            registrationDate: formattedDate,
            comment: '',
        };

        console.log(formData)
        
        const resp = await registerPartner(
            formData.fullName,
            formData.legalType,
            formData.registrationDate,
            formData.registrationCity,
            formData.inn,
            formData.kpp,
            formData.ogrn,
            formData.webSite,
            formData.reportLink,
            formData.description,
            formData.contactFullName,
            formData.contactPhone,
            formData.contactEmail,
            formData.helpTypeMask,
            formData.comment,
        );

        console.log(resp)
        
        if (resp.status === 200) {
            setIsParnterPopup(false);

            alert('Скоро придет уведомление на почту с вашим логином и паролем')
        }
    
        console.log(formData);
        // Здесь должна быть логика отправки данных
        setIsLoading(false);
    };
    return (
        <>
            <Text textStyle='h2' color='primary.400'>Сайт</Text>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <Link to='/lk'><Text textStyle='p'>личный кабинет</Text></Link>

                <Button
                    w='100%'
                    justifyContent="left"
                    maxW='fit-content'
                    bg='#1e88e5'
                    color='white'
                    _hover={{color: 'white' }}
                    mt='3'
                    onClick={() => {setIsVolounteePopup(true);}}
                >
                    Заявка на регистрацию Волонтера
                </Button>

                <Button
                    w='100%'
                    justifyContent="left"
                    maxW='fit-content'
                    bg='#1e88e5'
                    color='white'
                    _hover={{color: 'white' }}
                    mt='3'
                    onClick={() => {setIsParnterPopup(true)}}
                >
                    Заявка на регистрацию Партнера
                </Button>

                {isVolounteePopup && (
                    <Box position='fixed' zIndex='1000' top='50%' mt='-30vh' left='50%' ml='-25%' w='50%' h='60vh' bg='white' borderRadius='30px' borderWidth='1px' borderColor='GrayText'>
                        <IconButton
                            aria-label='Close popup'
                            icon={<CloseIcon />}
                            position='absolute'
                            top={2}
                            right={2}
                            onClick={() => setIsVolounteePopup(false)}
                            bg='transparent'
                        />

                        <VStack as="form" onSubmit={handleSubmit(onSubmitVolountee)} pt={12} pl={8} pr={8}  spacing={2} alignItems='flex-start' maxH='55vh' overflowY='auto'>
                            {/* Имя */}
                            <FormControl isInvalid={!!errors.firstName}>
                                <FormLabel htmlFor="firstName">Имя</FormLabel>
                                <Input
                                id="firstName"
                                type="text"
                                {...register('firstName', { required: 'This field is required' })}
                                />
                                <FormErrorMessage>Заполните</FormErrorMessage>
                            </FormControl>

                            {/* Фамилия */}
                            <FormControl isInvalid={!!errors.lastName}>
                                <FormLabel htmlFor="lastName">Фамилия</FormLabel>
                                <Input
                                id="lastName"
                                type="text"
                                {...register('lastName', { required: 'This field is required' })}
                                />
                                <FormErrorMessage>Заполните</FormErrorMessage>
                            </FormControl>

                            {/* Возраст */}
                            <FormControl isInvalid={!!errors.age}>
                                <FormLabel htmlFor="age">Возраст</FormLabel>
                                <Input
                                id="age"
                                type='number'
                                {...register('age', { 
                                    required: 'This field is required',
                                    pattern: {
                                    value: /^\d+$/,
                                    message: 'Age must be a number'
                                    }
                                })}
                                />
                                <FormErrorMessage>Заполните</FormErrorMessage>
                            </FormControl>

                            {/* Местонахождение */}
                            <FormControl isInvalid={!!errors.geo}>
                                <FormLabel htmlFor="geo">Местонахождение</FormLabel>
                                <Input
                                id="geo"
                                type="text"
                                {...register('geo', { required: 'This field is required' })}
                                />
                                <FormErrorMessage>Заполните</FormErrorMessage>
                            </FormControl>

                            {/* Типы помощи */}
                            <FormControl isInvalid={!!errors.helpTypeMask}>
                                <FormLabel htmlFor="helpTypeMask">Вид помощи</FormLabel>
                                <Select
                                id="helpTypeMask"
                                {...register('helpTypeMask', { required: 'This field is required' })}
                                >
                                <option value="1">Психологическая</option>
                                <option value="2">Юридическая</option>
                                <option value="4">Гуманитарная</option>
                                <option value="8">Материальная</option>
                                <option value="16">Образование</option>
                                <option value="32">Жилье</option>
                                <option value="64">Работа</option>
                                <option value="128">Медицинская</option>
                                </Select>
                                <FormErrorMessage>Заполните</FormErrorMessage>
                            </FormControl>

                            {/* Описание */}
                            <FormControl isInvalid={!!errors.description}>
                                <FormLabel htmlFor="description">Опишите ваш опыт</FormLabel>
                                <Input
                                id="description"
                                type="text"
                                {...register('description', { required: 'This field is required' })}
                                />
                                <FormErrorMessage>Заполните</FormErrorMessage>
                            </FormControl>

                            {/* Телефон */}
                            <FormControl isInvalid={!!errors.phone}>
                                <FormLabel htmlFor="phone">Телефон (без +7/7/8)</FormLabel>
                                <Input
                                    id="phone"
                                    type="text"
                                    {...register('phone', {
                                        required: 'This field is required',
                                        validate: value => /^[0-9]{10}$/.test(value) || 'Phone number must have 10 digits'
                                    })}
                                />
                                <FormErrorMessage>Заполните</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={!!errors.email}>
                                <FormLabel htmlFor="email">Email</FormLabel>
                                <Input
                                id="email"
                                type="text"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid email address',
                                    },
                                })}
                                />
                                <FormErrorMessage>
                                    Заполните правильно
                                </FormErrorMessage>
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

                {isParnterPopup && (
                    <Box position='fixed' zIndex='1000' top='50%' mt='-30vh' left='50%' ml='-25%' w='50%' h='60vh' bg='white' borderRadius='30px' borderWidth='1px' borderColor='GrayText'>
                        <IconButton
                            aria-label='Close popup'
                            icon={<CloseIcon />}
                            position='absolute'
                            top={2}
                            right={2}
                            onClick={() => setIsParnterPopup(false)}
                            bg='transparent'
                        />

                        <VStack as="form" onSubmit={handleSubmit(onSubmitPartner)} pt={12} pl={8} pr={8}  spacing={2} alignItems='flex-start' maxH='55vh' overflowY='auto'>
                            {/* fullName */}
                            <FormControl isInvalid={!!errors.fullName}>
                                <FormLabel htmlFor="fullName">Полное наименование организации</FormLabel>
                                <Input
                                id="fullName"
                                type="text"
                                {...register('fullName', { required: 'This field is required' })}
                                />
                                <FormErrorMessage>Заполните</FormErrorMessage>
                            </FormControl>

                            {/* legalType */}
                            <FormControl isInvalid={!!errors.legalType}>
                                <FormLabel htmlFor="legalType">Организационно-правовая форма</FormLabel>
                                <Input
                                id="legalType"
                                type="text"
                                {...register('legalType', { required: 'This field is required' })}
                                />
                                <FormErrorMessage>Заполните</FormErrorMessage>
                            </FormControl>

                            {/* registrationDate */}
                            <FormControl isInvalid={!!errors.registrationDate}>
                                <FormLabel htmlFor="registrationDate">Дата регистрации</FormLabel>
                                <Input
                                id="registrationDate"
                                type="date"
                                {...register('registrationDate', { required: 'This field is required' })}
                                />
                                <FormErrorMessage>Заполните</FormErrorMessage>
                            </FormControl>

                            {/* registrationCity */}
                            <FormControl isInvalid={!!errors.registrationCity}>
                                <FormLabel htmlFor="registrationCity">Город регистрации</FormLabel>
                                <Input
                                id="registrationCity"
                                type="text"
                                {...register('registrationCity', { required: 'This field is required' })}
                                />
                                <FormErrorMessage>Заполните</FormErrorMessage>
                            </FormControl>

                            {/* inn */}
                            <FormControl isInvalid={!!errors.inn}>
                                <FormLabel htmlFor="inn">ИНН</FormLabel>
                                <Input
                                id="inn"
                                type="text"
                                {...register('inn', {
                                    required: 'This field is required',
                                    validate: value => /^[0-9]{8}$/.test(value) || 'inn must have 10 digits'
                                })}
                                />
                                <FormErrorMessage>Заполните</FormErrorMessage>
                            </FormControl>

                            {/* kpp */}
                            <FormControl isInvalid={!!errors.kpp}>
                                <FormLabel htmlFor="kpp">КПП</FormLabel>
                                <Input
                                id="kpp"
                                type="text"
                                {...register('kpp', {
                                    required: 'This field is required',
                                    validate: value => /^[0-9]{9}$/.test(value) || 'kpp must have 9 digits'
                                })}
                                />
                                <FormErrorMessage>Заполните</FormErrorMessage>
                            </FormControl>

                            {/* ogrn */}
                            <FormControl isInvalid={!!errors.ogrn}>
                                <FormLabel htmlFor="ogrn">ОГРН</FormLabel>
                                <Input
                                id="ogrn"
                                type="text"
                                {...register('ogrn', {
                                    required: 'This field is required',
                                    validate: value => /^[0-9]{12}$/.test(value) || 'ogrn must have 9 digits'
                                })}
                                />
                                <FormErrorMessage>Заполните</FormErrorMessage>
                            </FormControl>

                            {/* webSite */}
                            <FormControl isInvalid={!!errors.webSite}>
                                <FormLabel htmlFor="webSite">Ссылка на сайт</FormLabel>
                                <Input
                                id="webSite"
                                type="text"
                                {...register('webSite', { required: 'This field is required' })}
                                />
                                <FormErrorMessage>Заполните</FormErrorMessage>
                            </FormControl>

                            {/* reportLink */}
                            <FormControl isInvalid={!!errors.reportLink}>
                                <FormLabel htmlFor="reportLink">Ссылка на отчет мин.юс. за предыдущий год</FormLabel>
                                <Input
                                id="reportLink"
                                type="text"
                                {...register('reportLink', { required: 'This field is required' })}
                                />
                                <FormErrorMessage>Заполните</FormErrorMessage>
                            </FormControl>

                            {/* description */}
                            <FormControl isInvalid={!!errors.description}>
                                <FormLabel htmlFor="description">Описание деятельности</FormLabel>
                                <Input
                                id="description"
                                type="text"
                                {...register('description', { required: 'This field is required' })}
                                />
                                <FormErrorMessage>Заполните</FormErrorMessage>
                            </FormControl>

                            {/* contactFullName */}
                            <FormControl isInvalid={!!errors.contactFullName}>
                                <FormLabel htmlFor="contactFullName">ФИО ответственного за подачу заявки</FormLabel>
                                <Input
                                id="contactFullName"
                                type="text"
                                {...register('contactFullName', { required: 'This field is required' })}
                                />
                                <FormErrorMessage>Заполните</FormErrorMessage>
                            </FormControl>

                            {/* contactPhone */}
                            <FormControl isInvalid={!!errors.contactPhone}>
                                <FormLabel htmlFor="contactPhone">Телефон (без +7/7/8) контактного лица</FormLabel>
                                <Input
                                    id="contactPhone"
                                    type="text"
                                    {...register('contactPhone', {
                                        required: 'This field is required',
                                        validate: value => /^[0-9]{10}$/.test(value) || 'contactPhone number must have 10 digits'
                                    })}
                                />
                                <FormErrorMessage>Заполните</FormErrorMessage>
                            </FormControl>

                            {/* contactEmail */}
                            <FormControl isInvalid={!!errors.contactEmail}>
                                <FormLabel htmlFor="contactEmail">Email контактного лица</FormLabel>
                                <Input
                                id="contactEmail"
                                type="text"
                                {...register('contactEmail', {
                                    required: 'contactEmail is required',
                                    pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid contactEmail address',
                                    },
                                })}
                                />
                                <FormErrorMessage>
                                    Заполните правильно
                                </FormErrorMessage>
                            </FormControl>

                            {/* Типы помощи */}
                            <FormControl isInvalid={!!errors.helpTypeMask}>
                                <FormLabel htmlFor="helpTypeMask">Вид помощи</FormLabel>
                                <Select
                                id="helpTypeMask"
                                {...register('helpTypeMask', { required: 'This field is required' })}
                                >
                                <option value="1">Психологическая</option>
                                <option value="2">Юридическая</option>
                                <option value="4">Гуманитарная</option>
                                <option value="8">Материальная</option>
                                <option value="16">Образование</option>
                                <option value="32">Жилье</option>
                                <option value="64">Работа</option>
                                <option value="128">Медицинская</option>
                                </Select>
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
            </div>
        </>
    )
}

export default HrefPage;