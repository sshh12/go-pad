import './App.css';
import React, { useState } from 'react';
import { ThemeProvider } from 'theme-ui';
import theme from './theme';
import { Box, Card, Image, Heading, Text, Button, Flex, Link } from 'rebass';
import { Label, Input } from '@rebass/forms';
import Links from './components/Links';
import Pad from './components/Pad';

const TABS = {
  links: Links,
  pad: Pad,
  settings: null
};

function getTab() {
  let path = window.location.pathname.replace('/', '');
  if (Object.keys(TABS).includes(path)) {
    return path;
  }
  return 'links';
}

function App() {
  let [tab, setTab] = useState(getTab());
  let TabView = TABS[tab];
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Flex px={2} color="white" bg="black" alignItems="center">
          <Text p={2} fontWeight="bold">
            Go Pad
          </Text>
          <Box mx="auto" />
          {Object.keys(TABS).map((tb) => (
            <Link
              key={tb}
              variant="nav"
              href={`${tb}`}
              sx={{
                display: 'inline-block',
                fontWeight: 'bold',
                px: 2,
                py: 1,
                color: 'inherit'
              }}
            >
              {tb}
            </Link>
          ))}
        </Flex>
        <TabView />
      </div>
    </ThemeProvider>
  );
}

export default App;
