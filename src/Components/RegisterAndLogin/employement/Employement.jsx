import React, { useState } from "react";
import NavbarRegister from "../NavAndFooter/NavbarRegister";
import FooterRegister from "../NavAndFooter/FooterRegister";
import style from "./Employement.module.css";
import axios from "axios";
import {
	Box,
	Heading,
	FormControl,
	FormLabel,
	Input,
	Text,
	InputGroup,
	InputLeftAddon,
	Stack,
	Checkbox,
	Select,
	Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Employement = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		employed: true,
		experienceYears: "0",
		experienceMonths: "0",
		prevCompany: "",
		prevJob: "",
		city: "",
		annualSalary: "",
	});
	const routeChange = async () => {
		if (
			formData.prevCompany.trim() === "" ||
			formData.prevJob.trim() === "" ||
			formData.city.trim() === "" ||
			formData.annualSalary.trim() === ""
		) {
			alert("Please fill in all required fields.");
			return;
		}
		try {
			const response = await axios.post("http://localhost:8081/employment-save", formData);

			if (response.status === 200) {
				navigate("/education");
			} else {
				console.error("Failed to save data");
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	const handleCheckboxChange = (e) => {
		setFormData({ ...formData, employed: e.target.value === "Yes" });
	};

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.id]: e.target.value });
	};

	return (
		<div>
			<NavbarRegister />
			<div className={style.EmployementPanes}>
				<Box className={style.EmployementPanesUpper}>
					<Text fontSize="2xl">Employement</Text>
					<Text>Your experience is your</Text>
					<Text>success story, talk about it</Text>
				</Box>

				<Box className={style.rightEmployementBox}>
					<Heading size="lg">Add your Employement</Heading>
					<Text fontSize="md" mb="5">
						Employement details help recruiters understand your background
					</Text>

					<FormControl className={style.rightEmployementForm}>
						<div className={style.rightEmployementFormDiv}>
							<div>
								<FormLabel htmlFor="employed">
									Are you currently employed?
								</FormLabel>
								<Stack spacing={5} direction="row">
									<Checkbox colorScheme="green" defaultChecked={formData.employed}
										onChange={handleCheckboxChange}>
										Yes
									</Checkbox>
									<Checkbox colorScheme="green"
										defaultChecked={!formData.employed}
										onChange={handleCheckboxChange}
									>No</Checkbox>
								</Stack>
							</div>

							<div>
								<FormLabel htmlFor="experience">
									Total Work Experience
								</FormLabel>
								<Stack spacing={5} direction="row">
									<Select placeholder="0 Year" w="150px">
										<option value="1">1 Year</option>
										<option value="2">2 Years</option>
										<option value="3">3 Years</option>
									</Select>
									<Select placeholder="0 Month" w="150px">
										<option value="1">1 Month</option>
										<option value="2">2 Months</option>
										<option value="3">3 Months</option>
									</Select>
								</Stack>
							</div>

							<div>
								<FormLabel htmlFor="prevCompany" isRequired>
									Previous Company
								</FormLabel>
								<Input
									id="prevCompany"
									type="text"
									placeholder="Eg. Amazon"
									value={formData.prevCompany}
									onChange={handleChange}
									isRequired
								/>
							</div>

							<div>
								<FormLabel htmlFor="prevJob" isRequired>
									Previous Job Title
								</FormLabel>
								<Input
									id="prevJob"
									type="text"
									placeholder="Eg. Software Developer"
									value={formData.prevJob}
									onChange={handleChange}
									isRequired
								/>
							</div>

							<div>
								<FormLabel htmlFor="city" isRequired>
									Current city
								</FormLabel>
								<Input
									id="city"
									type="text"
									placeholder="Mention the current city you live in"
									value={formData.city}
									onChange={handleChange}
									isRequired
								/>
							</div>
							<div>
								<FormLabel htmlFor="salary" isRequired>
									Annual Salary
								</FormLabel>
								<InputGroup>
									<InputLeftAddon children="₹" />
									<Input
										placeholder="Eg. 5,64,000"
										value={formData.annualSalary}
										onChange={(e) =>
											setFormData({
												...formData,
												annualSalary: e.target.value.replace(/[^0-9]/g, ""), // Allow only numeric input
											})
										}
										isRequired
									/>
								</InputGroup>
							</div>

							<div>
								<Button colorScheme="blue" onClick={routeChange}>
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

export default Employement;
