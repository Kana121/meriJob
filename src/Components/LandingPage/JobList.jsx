import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Flex,
  Text,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  Button,
  Select,
  Container,
} from "@chakra-ui/react";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);

  useEffect(() => {
    fetchData();
  }, [page, size]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/get-job-list?page=${page}&size=${size}`
      );
      console.log('API Response:', response.data);
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching job list:", error);
    }
  };

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  return (
    <>
      <Flex boxShadow="2xl" p="6" m="5" rounded="md" bg="white">
        {/* Left side - Job Titles */}
        <Box flex="1">
          <VStack align="center" spacing="4" p="4">
            <Text fontSize="lg" fontWeight="bold">
              Recent Job Post
            </Text>

           


            {/* Job list with Chakra UI Accordion */}
            <Accordion allowToggle mt={4}>
              {jobs.map((job) => (
                <AccordionItem key={job.id}>
                  <AccordionButton onClick={() => handleJobClick(job)}>
                    <Box flex="1" textAlign="left">
                      {job.title}
                    </Box>
                  </AccordionButton>
                </AccordionItem>
              ))}
            </Accordion>
          </VStack>
        </Box>

        {/* Right side - Job Description */}
        <Box flex="2" p="4">
          <Text fontSize="lg" fontWeight="bold">
            Job Description
          </Text>
          {selectedJob ? (
            <Box>
              <Text fontSize="xl" fontWeight="bold" mb="2">
                {selectedJob.title}
              </Text>
              <Text>{selectedJob.description}</Text>
              <Text>{selectedJob.location}</Text>
              <Text>{selectedJob.requirements}</Text>
            </Box>
          ) : (
            <Text>Select a job to view the description.</Text>
          )}
        </Box>
      </Flex>
      <Container>
       <Button onClick={() => setPage(page - 1)} disabled={page === 0}>
              Previous
            </Button>
            <span>Page {page + 1}</span>
            <Button onClick={() => setPage(page + 1)}>Next</Button>
       {/* Pagination controls */}
       </Container>
      </>
  );
};

export default JobList;
