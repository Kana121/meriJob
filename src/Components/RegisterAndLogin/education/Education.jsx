import NavbarRegister from "../NavAndFooter/NavbarRegister";
import FooterRegister from "../NavAndFooter/FooterRegister";
import style from "./Education.module.css";
import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Text,
  Stack,
  Checkbox,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Education = () => {
  const navigate = useNavigate();
  const [educationData, setEducationData] = useState({
    qualification: [],
    course: "",
    specialize: "",
    uni: "",
    courseType: [],
    passYear: "",
  });
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    setEducationData({
      ...educationData,
      [e.target.name]: e.target.value,
    });
  };

  const handleQualificationChange = (qualification) => {
    // Update the qualification state based on checkbox selection
    setEducationData({
      ...educationData,
      qualification: qualification,
    });
  };

  const validateForm = () => {
    const errors = {};
    // Add your validation logic here
    if (!educationData.course) {
      errors.course = "Course is required";
    }
    if (!educationData.uni) {
      errors.uni = "University/Institute is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const saveEducationData = async (e) => {
	e.preventDefault();
    if (!validateForm() || isSaving) {
      return;
    }

    setIsSaving(true);

    try {
      await axios.post("http://your-api-url/api/education-save", educationData);
      console.log("Education data saved successfully");
      // You may navigate to the next page or perform other actions here
      navigate("/next-page"); // Replace with your desired route
    } catch (error) {
      console.error("Error saving education data:", error.message);
    } finally {
      setIsSaving(false);
    }
	
  };

  return (
    <div>
      <NavbarRegister />
      <div className={style.EducationPanes}>
        <Box className={style.EducationPanesUpper}>
          <Text fontSize="2xl">Education</Text>
          <Text>Employers prefer to</Text>
          <Text>know about your education</Text>
        </Box>

        <Box className={style.rightEducationBox}>
          <Heading size="lg">Mention your Education</Heading>
          <Text fontSize="md" mb="5">
            Adding education details will help recruiters know your value as a
            potential candidate
          </Text>

          <FormControl
            className={style.rightEducationForm}
            isInvalid={!!errors.course || !!errors.uni}
          >
            <div className={style.rightEducationFormDiv}>
              <div>
                <FormLabel htmlFor="qualification">
                  Highest Qualification
                </FormLabel>
                <Stack spacing={5} direction="row">
                  <Checkbox
                    colorScheme="green"
                    defaultChecked
                    onChange={() =>
                      handleQualificationChange("Graduation/Diploma")
                    }
                  >
                    Graduation/Diploma
                  </Checkbox>
                  <Checkbox
                    colorScheme="green"
                    onChange={() => handleQualificationChange("Masters")}
                  >
                    Masters
                  </Checkbox>
                  <Checkbox
                    colorScheme="green"
                    onChange={() => handleQualificationChange("High School")}
                  >
                    High School
                  </Checkbox>
                </Stack>
              </div>

              <div>
                <FormLabel htmlFor="course">Course</FormLabel>
                <Input
                  id="course"
                  type="text"
                  placeholder="Eg. BSc"
                  onChange={handleChange}
                />
              </div>

              <div>
                <FormLabel htmlFor="specialize">Specialization</FormLabel>
                <Input
                  id="specialize"
                  type="text"
                  placeholder="Eg. Electronics"
                  onChange={handleChange}
                />
              </div>

              <div>
                <FormLabel htmlFor="uni">University/Institute</FormLabel>
                <Input
                  id="uni"
                  type="text"
                  placeholder="Eg. NIT"
                  onChange={handleChange}
                />
              </div>

              <div>
                <FormLabel htmlFor="courseType">Course Type</FormLabel>
                <Stack spacing={5} direction="row">
                  <Checkbox colorScheme="green" defaultChecked>
                    Full-Time
                  </Checkbox>
                  <Checkbox colorScheme="green">Part-Time</Checkbox>
                </Stack>
              </div>

              <div>
                <FormLabel htmlFor="passYear">Passing Year</FormLabel>
                <Input
                  id="passYear"
                  type="number"
                  placeholder="Eg. 2020"
                  onChange={handleChange}
                />
              </div>

              <div>
                <div>{errors.course}</div>
                <Button colorScheme="blue" onClick={saveEducationData}>
                  Save and Continue
                </Button>
              </div>
            </div>
          </FormControl>

          <FooterRegister />
        </Box>
      </div>
    </div>
  );
};

export default Education;
