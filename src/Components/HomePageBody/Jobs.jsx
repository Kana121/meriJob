import { Box, Flex, HStack, Link,Text } from "@chakra-ui/react";

import React, { useEffect, useState } from 'react';
import styles from "./Jobs.module.css"
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";


const Jobs = () => {

  const navigate =useNavigate();

  let handleJobpage=()=>{
    navigate("/jobrecomandation")
  }
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    // Replace with actual API endpoint for fetching jobs
    fetch('http://localhost:8081/jobs')
      .then((response) => response.json())
      .then((data) => setJobs(data))
      .catch((error) => console.error('Error fetching jobs:', error));
  }, []);

  const handleJobPage = () => {
    navigate('/jobrecomandation');
  };
  return (
    <Box
    className={styles.recomended}
      w={"100%"}
      h="350px"
      boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
      bg={"#fff"}
      mt="2"
    >
       <Text p={'4'} fontWeight={'bold'}>
        {jobs.length} New Recommended Job(s)
      </Text>
      <hr />
      <Box className={styles.head} w={"100%"} p="6" >
        <Text  fontSize={"15px"} color="gray.700" fontWeight={"bold"}>
          Freelancing Job
        </Text>
        <Text fontSize={"xs"} fontWeight="medium" color={"gray.600"}>
          SRENIX STAR PRIVATE LIMITED
        </Text>
      </Box>
      <Box>
      <div className={styles.textDiv}>
      <Flex p={"2"} gap="10">
        <HStack color={"gray.600"}>
          <ion-icon name="briefcase-outline"></ion-icon>
          <Text>0-5 Years</Text>
        </HStack>
        <HStack color={"gray.600"}>
          <ion-icon name="location-outline"></ion-icon>
          <Text>Delhi/NCR</Text>
        </HStack>
      </Flex>
      <Flex mt={"-2"} p={"2"} gap="4" alignItems={"center"} color={"gray.600"}>
        <ion-icon name="layers-outline"></ion-icon>
        <Text fontSize={"14px"}>
          KeyskillsCustomer Service,Typing,Back Office Processing,Typing
          Speed,Home Based Job...
        </Text>
      </Flex>
      <Flex mt={"-2"} p={"2"} gap="4" alignItems={"center"} color={"gray.600"}>
        <ion-icon name="reader-outline"></ion-icon>
        <Text fontSize={"14px"} display={{}}>
          Urgent Hiring for Computer/Data Entry Operator Basic Typing speed,
          Basic Computer...
        </Text>
      </Flex>
      <Flex justifyContent={'space-between'} p='2' alignItems={'center'}>
        <Flex p={"2"} color={"gray.600"} alignItems={"center"} gap="4">
          <ion-icon name="wallet-outline"></ion-icon>
          <Text>250000 - 425000 PA</Text>
        </Flex>
        <Text pr={'2'} color={"gray.600"} fontSize={'xs'}>Posted 1 Day Ago</Text>
      </Flex>
      <Link pr={'4'} color='twitter.500' float={'right'} onClick={handleJobpage}>View All</Link>
      </div>
      </Box>
    </Box>
  );
};

export default Jobs;
