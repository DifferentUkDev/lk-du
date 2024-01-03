import MainLayout from "@/layouts/MainLayout/MainLayout";
import { Text } from "@chakra-ui/react";
import { FC } from "react";

interface ILkPageProps {

}

const LkPage:FC<ILkPageProps> = () => {

    return (
        <MainLayout>
            <Text textStyle='h3' as='h1'>ЛК</Text>
        </MainLayout>
    )
}

export default LkPage;
