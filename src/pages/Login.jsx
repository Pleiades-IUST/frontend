import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Box, Input, Button, Heading, Text } from '@chakra-ui/react';
import AuthContext from '@/contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ email, password });
    navigate('/');
  };

  return (
    <Flex align="center" justify="center" height="100vh">
      <Box
        p={8}
        maxWidth="400px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
      >
        <Heading mb={6}>Log In</Heading>
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="Email"
            mb={3}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            mb={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" width="full">
            Log In
          </Button>
        </form>
        <Text mt={4} textAlign="center">
          Don't have an account?{' '}
          <Text
            as="span"
            color="blue.500"
            cursor="pointer"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </Text>
        </Text>
      </Box>
    </Flex>
  );
}
