import { Box, Image, Button, ColorModeContext, Container, Flex, HStack, Text, useColorMode, } from '@chakra-ui/react'; // Added Text import
import React from 'react';
import { Link } from 'react-router-dom';
import { PlusSquareIcon } from '@chakra-ui/icons';

import { IoMoon } from 'react-icons/io5';
import { LuSun } from 'react-icons/lu';
import smiski_logo from '../components/smiski_logo.png';

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Container maxW={"100%"} px={8} bg= {"#FFEB2F"}>
        <Flex
            h={20}
            alignItems={"center"}
            justifyContent={"space-between"}
            flexDir={{
            base: "column",
            sm: "row"
            }}
        >
            

            <Image 
            src={smiski_logo} 
            alt="Logo" 
            boxSize={{ base: "95px", sm: "190px" }} 
            objectFit="contain" 
            />



            <HStack spacing={6} alignItems={"center"}>

            <Link to={"/products"}>
            <Button variant={"link"}>
                <Text fontSize={20} textColor={'green.500'} fontFamily="'Comic Sans MS', cursive">Products</Text>
                </Button>
            </Link>
            <Link to={"/"}>
            <Button variant={"link"}>
                <Text fontSize={20} textColor={'green.500'} fontFamily="'Comic Sans MS', cursive">Log Out</Text>
                </Button>
            </Link>
                <Button variant = "link" onClick={toggleColorMode}>
                    {colorMode === "light" ? <IoMoon/> : 
                    <LuSun size='20'/> }
                </Button>
            </HStack>
        </Flex>
        </Container>
    );
}

export default Navbar;
