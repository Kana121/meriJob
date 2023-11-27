import axios from "axios";
import {
	Box,
	Heading,
	FormControl,
	FormLabel,
	FormHelperText,
	Input,
	InputLeftAddon,
	InputGroup,
	Icon,
	Text,
	Flex,
	Select,
	Checkbox,
	Button,
	Stack,
	Divider,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import style from "./Register.module.css";
import { FaSuitcase, FaBook } from "react-icons/fa";
// import { GiSchoolBag } from "react-icons/gi";
import { RiWhatsappFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import NavbarRegister from "../NavAndFooter/NavbarRegister";
import FooterRegister from "../NavAndFooter/FooterRegister";
import LeftPane from "./LeftPane";
import { useDispatch, useSelector } from "react-redux";
import { registerAPI } from "../storeRegister/actionsRegister";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
	const dispatch = useDispatch();
	let navigate = useNavigate();


	const [regCreds, setRegCreds] = useState({
		name: "",
		emailId: "",
		mobileNumber: "",
		password: "",
		workStatus: "",
	});

	const handleRegChange = (e) => {
		const { name, value } = e.target;
		setRegCreds({
			...regCreds,
			[name]: value,
		});
	};

	const handleRegFormSubmit = async (e) => {
		e.preventDefault();
		dispatch(registerAPI(regCreds));

		try {

			const response = await axios.post(
				"http://localhost:8081/save",
				regCreds
			);
			console.log(response.data);
			navigate("/otp");
		} catch (error) {
			// Handle errors, e.g., display an error message
			console.error("Registration failed:", error.message);
		}
	};

	const { isReg } = useSelector((state) => state.register);

	useEffect(() => {
		if (isReg) {
			navigate("/otp");
		}
	}, [navigate, isReg]);

	return (
		<>
			<NavbarRegister />

			<div className={style.contentRegister}>
				<LeftPane />

				{/* Right pane */}
				<div>
					<div className={style.rightRegister}>
						<Box className={style.rightRegisterBox}>
							<Heading size="lg" mb="5">
								Find a job & grow your career
							</Heading>

							<form action="submit" onSubmit={handleRegFormSubmit}>
								<FormControl className={style.rightRegisterForm}>
									<div>
										<FormLabel htmlFor="fullName">First Name</FormLabel>
										<Input
											id="fullName"
											type="text"
											placeholder="What is your name?"
											name="name"
											value={regCreds.name}
											onChange={handleRegChange}
											isRequired
										/>
									</div>

									<div>
										<FormLabel htmlFor="email">Email id</FormLabel>
										<Input
											id="email"
											type="email"
											placeholder="Tell us your Email ID"
											name="emailId"

											value={regCreds.emailId}
											onChange={handleRegChange}
											isRequired
										/>
										<FormHelperText>
											We'll send you relevant jobs in your mail
										</FormHelperText>
									</div>

									<div>
										<FormLabel htmlFor="password">Password</FormLabel>
										<Input
											id="password"
											type="password"
											placeholder="Create a password for your account"
											name="password"
											value={regCreds.password}
											onChange={handleRegChange}
											isRequired
										/>
										<FormHelperText>
											Minimum 6 characters required
										</FormHelperText>
									</div>

									<div>
										<FormLabel htmlFor="mobileNumber">Mobile Number</FormLabel>
										<InputGroup>
											<InputLeftAddon children="+91" bg="white" />
											<Input
												type="tel"
												placeholder="Mobile Number"
												name="mobileNumber"
												value={regCreds.mobileNumber}
												onChange={handleRegChange}
												isRequired
											/>
										</InputGroup>
										<FormHelperText>
											Recruiters will call you on this number
										</FormHelperText>
									</div>

									<div>
										<FormLabel htmlFor="workStatus">Work Status</FormLabel>
										<Select
											placeholder="Select work status"
											name="workStatus"
											value={regCreds.workStatus}
											onChange={handleRegChange}
											isRequired
										>
											<option value="experienced">I'm Experienced</option>
											<option value="fresher">I'm a Fresher</option>
										</Select>
									</div>

									{/* resume code here pending work..... */}

									<div>
										<Checkbox
											size="sm"
											colorScheme="orange"
											defaultChecked
											color="#8d8aad"
										>
											Send me important updates on{" "}
											<Icon as={RiWhatsappFill} color="green" /> WhatsApp
										</Checkbox>
									</div>

									<div>
										<Text color="#8d8aad" fontFamily="sm">
											By clicking Register, you agree to the{" "}
											<span className={style.endSpan}>
												Terms and Conditions
											</span>{" "}
											& <span className={style.endSpan}>Privacy Policy</span> of
											MeriJob.com
										</Text>
									</div>

									<div>
										<Button
											colorScheme="blue"
											borderRadius="20"
											type="submit">
											Register Now
										</Button>
									</div>
								</FormControl>
							</form>
						</Box>

						<Box>
							<Stack direction="row" h="250px" className={style.orGoogle}>
								<Divider
									orientation="vertical"
									className={style.orGoogleDivider}
								/>
								<div className={style.orGoogleDividerOR}>OR</div>
								<div style={{ display: "flex", flexDirection: "column" }}>
									<Text>Continue with</Text>
									<Button
										leftIcon={<FcGoogle />}
										colorScheme="blue"
										variant="outline"
										borderRadius="20px"
									>
										Google
									</Button>
								</div>
							</Stack>
						</Box>
					</div>
				</div>
			</div>
			<FooterRegister />
		</>
	);
};

export default RegisterPage;
