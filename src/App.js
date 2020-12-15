import './App.css';
import React, { useState } from 'react';
import { ThemeProvider } from 'theme-ui';
import { Box, Text, Flex, Link } from 'rebass';
import Links from './components/Links';
import Pad from './components/Pad';
import Settings from './components/Settings';

const TABS = {
  links: Links,
  pad: Pad,
  settings: Settings
};

function getTab() {
  let path = window.location.pathname.replace('/', '');
  if (Object.keys(TABS).includes(path)) {
    return path;
  }
  return 'links';
}

function App() {
  let [tab, _] = useState(getTab());
  let [theme, setTheme] = useState(
    JSON.parse(localStorage.getItem('gopad:theme'))
  );
  let [user, setUser] = useState(localStorage.getItem('gopad:user'));
  let [links, setLinks] = useState(
    JSON.parse(localStorage.getItem('gopad:links'))
  );
  let [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem('gopad:notes'))
  );
  let setLSTheme = (newTheme) => {
    localStorage.setItem('gopad:theme', JSON.stringify(newTheme));
    setTheme(newTheme);
  };
  let setLSUser = (user) => {
    localStorage.setItem('gopad:user', user);
    setUser(user);
  };
  let setLSLinks = (links) => {
    links = links.filter((l) => !(l.alias in TABS));
    links.sort((a, b) => a.alias.localeCompare(b.alias));
    localStorage.setItem('gopad:links', JSON.stringify(links));
    setLinks(links);
  };
  let setLSNotes = (notes) => {
    localStorage.setItem('gopad:notes', JSON.stringify(notes));
    setNotes(notes);
  };
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
        <TabView
          theme={theme}
          setTheme={setLSTheme}
          user={user}
          setUser={setLSUser}
          links={links}
          setLinks={setLSLinks}
          notes={notes}
          setNotes={setLSNotes}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
