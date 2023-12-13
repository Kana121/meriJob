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
  
} from "@chakra-ui/react";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    // Fetch job list data from the API
    axios.get("http://localhost:8081/get-job-list")
      .then((response) => setJobs(response.data))
      .catch((error) => console.error("Error fetching job list:", error));
  }, []);

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  return (
    <>
    <Flex  boxShadow='2xl' p='6' m='5' rounded='md' bg='white'>
      {/* Left side - Job Titles */}
      <Box  flex="1">
        <VStack align="center" spacing="4" p="4">
          <Text fontSize="lg" fontWeight="bold">
            Recent Job Post
          </Text>
          <Accordion allowToggle>
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
      <Box flex="2" p="4" textAlign='center' borderLeft='2px solid black'>
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
    </>
  );
};

export default JobList;
