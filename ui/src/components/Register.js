import {
    Box,
    Text,
    Button,
    Stack,
    useColorModeValue,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Heading,
    CloseButton,
    Checkbox, 
    Radio, 
    RadioGroup,
  } from '@chakra-ui/react';

import { useState, useCallback } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

export default function SignupCard({ onRegisterChange }) {
    const closeModal = useCallback(event => {
      onRegisterChange(event.target.value)
    }, [onRegisterChange])

    const [showPassword, setShowPassword] = useState(false);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [postcode, setPostcode] = useState('');
    const [taxcode, setTaxcode] = useState('');
    const [visitor, setVisitor] = useState('1');

    const usernameChangeHandler = (event) => {
      setUsername(event.target.value);
    };
    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
    };
    const confirmChangeHandler = (event) => {
      setConfirm(event.target.value);
  };
    const firstnameChangeHandler = (event) => {
      setFirstname(event.target.value);
    };
    const lastnameChangeHandler = (event) => {
        setLastname(event.target.value);
    };
    const emailChangeHandler = (event) => {
      setEmail(event.target.value);
    };
    const phoneChangeHandler = (event) => {
        setPhone(event.target.value);
    };
    const countryChangeHandler = (event) => {
      setCountry(event.target.value);
    };
    const addressChangeHandler = (event) => {
        setAddress(event.target.value);
    };
    const postcodeChangeHandler = (event) => {
      setPostcode(event.target.value);
    };
    const taxcodeChangeHandler = (event) => {
        setTaxcode(event.target.value);
    };
    const visitorChangeHandler = (event) => {
      setVisitor(event.target.value);
    };
    const submitHandler = (event) => {
      event.preventDefault();

    const error = {};
    if (password !== confirm) {
      error['match'] = "Passwords should match";
    }

      const body = {
        username,
        password,
        firstname,
        lastname,
        email,
        phone,
        country,
        address,
        postcode,
        taxcode,
        visitor
      };
  
      try {
        fetch('http://localhost:5000/register', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });
        setUsername('');
        setPassword('');
        setFirstname('');
        setLastname('');
        setEmail('');
        setPhone('');
        setCountry('');
        setAddress('');
        setPostcode('');
        setTaxcode('');
        setVisitor('');
      } catch (err) {
        console.error(err.message);
      }
    };

    return (
        <Stack spacing={8} mx={'auto'} maxW={'lg'} px={6}>
          <Box 
            style={{ zIndex: "1" }}
            position={"absolute"}
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={9}>
            <CloseButton style={{float: 'right'}} onClick={closeModal}/>
            <Stack align={'center'}>
                <Heading fontSize={'4xl'} textAlign={'center'}>
                  Sign up
                </Heading>
                <Text fontSize={'lg'} color={'gray.600'} paddingBottom={7}>
                  to enjoy all of our cool features ✌️
                </Text>
          </Stack>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="username" isRequired>
                    <FormLabel>Username</FormLabel>
                    <Input type="text" onChange={usernameChangeHandler}/>
                  </FormControl>
                </Box>
                <RadioGroup defaultValue='1' id="visitor" onChange={visitorChangeHandler}>
                  <Stack spacing={5} direction='row'>
                  <Radio colorScheme='purple' value='1'>
                    as Bidder
                  </Radio>
                  <Radio colorScheme='purple' value='2'>
                    as Seller
                  </Radio>
                  </Stack>
                </RadioGroup>
              </HStack>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input type="text" onChange={firstnameChangeHandler}/>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName" isRequired>
                    <FormLabel>Last Name</FormLabel>
                    <Input type="text" onChange={lastnameChangeHandler}/>
                  </FormControl>
                </Box>
              </HStack>
              <HStack>
                <Box>
                  <FormControl id="email" isRequired>
                    <FormLabel>Email address</FormLabel>
                    <Input type="email" onChange={emailChangeHandler}/>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="phone" isRequired>
                    <FormLabel>Phone number</FormLabel>
                    <Input type="tel" onChange={phoneChangeHandler}/>
                  </FormControl>
                </Box>
              </HStack>

              <HStack>
                <Box>
                  <FormControl id="country" isRequired>
                    <FormLabel>Country</FormLabel>
                    <Input type="text" onChange={countryChangeHandler}/>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="address" isRequired>
                    <FormLabel>Address</FormLabel>
                    <Input type="text" onChange={addressChangeHandler}/>
                  </FormControl>
                </Box>
              </HStack>

              <HStack>
                <Box>
                  <FormControl id="postcode" isRequired>
                    <FormLabel>Postcode</FormLabel>
                    <Input type="text" onChange={postcodeChangeHandler}/>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="taxcode" isRequired>
                    <FormLabel>Tax Code</FormLabel>
                    <Input type="text" onChange={taxcodeChangeHandler}/>
                  </FormControl>
                </Box>
              </HStack>


              <HStack>
                <Box>
                  <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                    <Input onChange={passwordChangeHandler} type={showPassword ? 'text' : 'password'} />
                </FormControl>
                </Box>
                <Box>
                    <FormControl id="confirm" isRequired>
                    <FormLabel>Confirm password</FormLabel>
                    <InputGroup>
                      <Input onChange={confirmChangeHandler} type={showPassword ? 'text' : 'password'} />
                      <InputRightElement h={'full'}>
                        <Button
                          variant={'ghost'}
                          onClick={() =>
                            setShowPassword((showPassword) => !showPassword)
                          }>
                          {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                </Box>
              </HStack>
              
              
              <FormControl id="checkbox" isRequired>
                <Checkbox size='lg' colorScheme='purple' defaultChecked>
                <FormLabel>
                  I have read and accept the terms and conditions.
                </FormLabel>
                </Checkbox>
              </FormControl>

              <Stack spacing={10} pt={2}>
                <Button
                  onClick={submitHandler}
                  loadingText="Submitting"
                  size="lg"
                  bg={'purple.400'}
                  color={'white'}
                  _hover={{
                    bg: 'purple.500',
                  }}>
                  Sign up
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
    );
  }