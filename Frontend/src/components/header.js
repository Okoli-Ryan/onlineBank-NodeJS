import React from "react";
import styles from "../styles/header.module.css";
import User from "../assets/user.svg";
// import { Flex, Box, Spacer, Heading, Text } from "@chakra-ui/react";

export default function Header() {
  return (
    // <Flex h="100px" bg="green.50">
    //   <Box w="100px">
    //     <Heading ml={2} as="h2" size="md">
    //       OnlineBanking
    //     </Heading>
    //   </Box>
    //   <Spacer />
    //   <Box w="100px">
    //     <Text fontSize="lg">Guest</Text>
    //   </Box>
    // </Flex>
    <div className={styles.header}>
      <h2 className={styles.app_name}>OnlineBank</h2>
      <div className={styles.right_container}>
        <div className={styles.name_container}>
          <button className={`button ${styles.user}`}>
            <img src={User} alt="" className={styles.user_icon} />
            User
          </button>
        </div>
        <button className="button">Sign Out</button>
      </div>
    </div>
  );
}
