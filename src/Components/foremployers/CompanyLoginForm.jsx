import React, { useState } from 'react';
import {
  Box,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Alert,
  AlertIcon,
  Container,
  Center,
  Flex,
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';

const CompanyLoginForm = () => {
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const ToggleEyeIcon = (icon) =>{
    setIsEyeOpen((prevIsEyeOpen) => !prevIsEyeOpen);
  }
  const navigate = useNavigate(); // Initialize useNavigate
  const [companyLogin, setCompanyLogin] = useState({
    employerID:'',
    registeredEmail: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [loginError, setLoginError] = useState(null);
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyLogin((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  

  const validateForm = () => {
    const errors = {};
    if (!companyLogin.employerID.trim()) {
      errors.registeredEmail = 'Employer ID is required';
    }

    if (!companyLogin.registeredEmail.trim()) {
      errors.registeredEmail = 'Email is required';
    }

    if (!companyLogin.password.trim()) {
      errors.password = 'Password is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:8081/company-login', companyLogin);
        console.log('Server Response:', response.data);
        setIsLoginSuccess(true);
        setLoginError(null);
        
        // Use navigate to redirect upon successful login
        navigate('/company-home');
      } catch (error) {
        console.error('Error:', error.message);
        setIsLoginSuccess(false);
        setLoginError('Invalid email or password. Please try again.');
      }
    }
  };

  return (
    <Container>
      <Box boxShadow='md' p='6' rounded='md' >
        <Heading as="h2" textAlign='center' size="xl" mb={4}>
          Employer Login
        </Heading>
        {loginError && (
          <Alert status="error" mb={4}>
            <AlertIcon />
            {loginError}
          </Alert>
        )}
        {isLoginSuccess && (
          <Alert status="success" mb={4}>
            <AlertIcon />
            Login successful!
          </Alert>
        )}
        <form style={{textAlign:"center"}} onSubmit={(e) => e.preventDefault()}>
          <FormControl mb={4} isInvalid={!!formErrors.registeredEmail}>
            <FormLabel>Employer ID</FormLabel>
            <Input type="text" name="employerID" value={companyLogin.employerID} onChange={handleChange} />
            <FormErrorMessage>{formErrors.registeredEmail}</FormErrorMessage>
          </FormControl>

          <FormControl mb={4} isInvalid={!!formErrors.registeredEmail}>
            <FormLabel>Registered Email</FormLabel>
              <Input type="email" name="registeredEmail" value={companyLogin.registeredEmail} onChange={handleChange} />
              <FormErrorMessage>{formErrors.registeredEmail}</FormErrorMessage>
          </FormControl>

          <FormControl mb={4} isInvalid={!!formErrors.password}>
            <FormLabel>Password</FormLabel>
            <Flex alignItems='center' justifyContent='flex-start'>
              <Input type={isEyeOpen ? 'text' : 'password'} name="password" value={companyLogin.password} onChange={handleChange} />
              <FontAwesomeIcon id='FaFaEye' style={{marginLeft:'-5.5%',cursor:'pointer',zIndex:1}} onClick={(event) => ToggleEyeIcon(event)} icon={isEyeOpen ? faEye : faEyeSlash} />
            </Flex>
            <FormErrorMessage>{formErrors.password}</FormErrorMessage>
          </FormControl>

          <Button type="submit" colorScheme="teal" style={{backgroundColor:"rgb(69,126,255)"}} onClick={handleLogin}>
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CompanyLoginForm;
