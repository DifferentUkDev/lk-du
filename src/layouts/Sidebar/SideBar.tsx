/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, VStack, Text, Button } from '@chakra-ui/react';
import { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaHandHoldingHeart } from 'react-icons/fa';

interface ISideBarProps {
    isOpen: any;
}

const Sidebar: FC<ISideBarProps> = ({isOpen}) => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <Box position="relative" display={isOpen ? 'block' : 'none'} left="0" top="0" w={isOpen ? "200px" : "60px"}>
      <VStack align="stretch" spacing={0} w='100%'>
        <VStack spacing={2} w='100%'>
        <Text
            p={2}
            fontWeight="semibold"
            fontSize="lg" // Больший размер шрифта для заголовка
            borderBottomWidth="1px" // Линия под текстом для выделения
            borderColor="gray.200" // Цвет линии
            mb={4} // Отступ снизу для разделения от остальных элементов
        >
            Действия
        </Text>
          <NavLink to="/tasks">
          <Button
            leftIcon={<FaHandHoldingHeart />}
            w='100%'
            justifyContent="left"
            bg={isActive('/users/users') ? '#1e88e5' : 'transparent'}
            _hover={{ bg: '#1e88e5', color: 'white' }}
          >
            Заявки
          </Button>
        </NavLink>
        </VStack>
      </VStack>
    </Box>
  );
};

export default Sidebar;