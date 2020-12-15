import './App.css';
import React from 'react';
import { ThemeProvider } from 'theme-ui';
import theme from './theme';
import { Box, Card, Image, Heading, Text, Button, Flex, Link } from 'rebass';
import { Label, Input } from '@rebass/forms';
import Links from './components/Links';

function App() {
  // pathname
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Flex px={2} color="white" bg="black" alignItems="center">
          <Text p={2} fontWeight="bold">
            Go Pad
          </Text>
          <Box mx="auto" />
          <Link
            variant="nav"
            href="#!"
            sx={{
              display: 'inline-block',
              fontWeight: 'bold',
              px: 2,
              py: 1,
              color: 'inherit'
            }}
          >
            Links
          </Link>
          <Link
            variant="nav"
            href="#!"
            sx={{
              display: 'inline-block',
              fontWeight: 'bold',
              px: 2,
              py: 1,
              color: 'inherit'
            }}
          >
            Pad
          </Link>
          <Link
            variant="nav"
            href="#!"
            sx={{
              display: 'inline-block',
              fontWeight: 'bold',
              px: 2,
              py: 1,
              color: 'inherit'
            }}
          >
            Settings
          </Link>
        </Flex>
        <Links />
      </div>
    </ThemeProvider>
  );
}

export default App;
