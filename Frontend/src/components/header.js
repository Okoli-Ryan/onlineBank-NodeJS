import React from "react";
import styles from "../styles/header.module.css";
import User from "../assets/user.svg";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authAction } from "../store/actions/authAction";

// import { Flex, Box, Spacer, Heading, Text } from "@chakra-ui/react";

export default function Header() {
  const dispatch = useDispatch();
  const history = useHistory();

  const signOut = () => {
    //*sign out backend
    dispatch(authAction({}));
    history.push("/login");
  };

  const user = useSelector((state) => state.authReducer);

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
      {user && (
        <div className={styles.right_container}>
          <div className={styles.name_container}>
            <button className={`button ${styles.user}`}>
              <img src={User} alt="" className={styles.user_icon} />
              User
            </button>
          </div>
          <button className="button" onClick={signOut}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
