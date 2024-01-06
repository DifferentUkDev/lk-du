/* eslint-disable @typescript-eslint/no-explicit-any */
import { registerBeneficiaries } from "@/api/registerUsers";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Box, Button, FormControl, FormErrorMessage, FormLabel, IconButton, Input, InputGroup, InputRightElement, Select, Spinner, Text, VStack } from "@chakra-ui/react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";

interface IRegisterPageProps {

}

const RegisterPage:FC<IRegisterPageProps> = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const navigate = useNavigate()

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data: any) => {
        setIsLoading(true);

        const dateParts = data.dateOfDeparture.split('.'); // Разделение исходной даты
        const formattedDate = `${dateParts[0]}`; // Перестановка и форматирование
        const formattedPhoneNumber = data.phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');

        const formData = {
            ...data,
            age: parseInt(data.age, 10), // Преобразование возраста в число
            maritalStatus: parseInt(data.maritalStatus, 10), // Преобразование семейного статуса в число
            socialStatus: parseInt(data.socialStatus, 10), // Преобразование социального статуса в число
            dateOfDeparture: formattedDate,
            phone: formattedPhoneNumber,
        };

        console.log(formData)
        
        const resp = await registerBeneficiaries(
            formData.firstName,
            formData.lastName,
            formData.age,
            formData.maritalStatus,
            formData.geo,
            formData.geoFrom,
            formData.dateOfDeparture,
            formData.socialStatus,
            formData.email,
            formData.password,
            formData.phone,
        );

        
        
        if (resp.status === 200) {
            
            alert('Сейчас вы перейдете на страницу логина')

            navigate('/login')
        }
    
        console.log(formData);
        // Здесь должна быть логика отправки данных
        setIsLoading(false);
    };


    return (
        <Box display='flex' w='100%' flexDirection='column' alignItems='center'>
            <Box h='50px' bg='white' borderWidth='1px' w='100%' display='flex' justifyContent='center' alignItems='center'>
                <Text as='h3' textStyle='h4' color='primary.600'>LK du (Регистрация)</Text>
            </Box>

            <VStack as="form" onSubmit={handleSubmit(onSubmit)} spacing={2} maxW='400px' mt='50px'>
                {/* ... Поля Email и Пароль ... */}
                
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

                {/* Семейное положение */}
                <FormControl isInvalid={!!errors.maritalStatus}>
                    <FormLabel htmlFor="maritalStatus">Семейное положение</FormLabel>
                    <Select
                    id="maritalStatus"
                    {...register('maritalStatus', { required: 'This field is required' })}
                    >
                    <option value="0">Не женат/не замужем</option>
                    <option value="1">Женат/замужем</option>
                    <option value="2">В разводе</option>
                    </Select>
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

                {/* Откуда вы приехали */}
                <FormControl isInvalid={!!errors.geoFrom}>
                    <FormLabel htmlFor="geoFrom">Откуда вы приехали</FormLabel>
                    <Input
                    id="geoFrom"
                    type="text"
                    {...register('geoFrom', { required: 'This field is required' })}
                    />
                    <FormErrorMessage>Заполните</FormErrorMessage>
                </FormControl>

                {/* Дата убытия */}
                <FormControl isInvalid={!!errors.dateOfDeparture}>
                    <FormLabel htmlFor="dateOfDeparture">Дата убытия</FormLabel>
                    <Input
                    id="dateOfDeparture"
                    type="date"
                    {...register('dateOfDeparture', { required: 'This field is required' })}
                    />
                    <FormErrorMessage>Заполните</FormErrorMessage>
                </FormControl>

                {/* Социальный статус */}
                <FormControl isInvalid={!!errors.socialStatus}>
                    <FormLabel htmlFor="socialStatus">Социальный статус</FormLabel>
                    <Select
                    id="socialStatus"
                    {...register('socialStatus', { required: 'This field is required' })}
                    >
                    <option value="0">Гражданин</option>
                    <option value="1">Беженец</option>
                    <option value="2">Переселенец</option>
                    </Select>
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

                <FormControl isInvalid={!!errors.password}>
                    <FormLabel htmlFor="password">Пароль</FormLabel>
                    <InputGroup>
                        <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 4,
                                message: 'Password must be at least 6 characters',
                            },
                            })}
                        />

                        <InputRightElement>
                            <IconButton
                            icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                            onClick={togglePasswordVisibility}
                            variant="unstyled"
                            size="sm"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                            />
                        </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                        Пароль должен содержать больше 6 символов
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
                    {!isLoading ? 'Регистрация' : <Spinner />}
                </Button>
            </VStack>

            <Box mt='4' mb='50px'>
                <Text textStyle='p' as='h4'>Есть учетная запись? <NavLink to='/login'><Text color='#1e88e5'>логин</Text></NavLink></Text>
            </Box>
        </Box>
    )
}

export default RegisterPage;
