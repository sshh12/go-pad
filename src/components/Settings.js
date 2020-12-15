import React, { useState } from 'react';
import { Box, Text, Button, Link } from 'rebass';
import { Label, Textarea, Input } from '@rebass/forms';

export default function Settings({
  theme,
  setTheme,
  user,
  setUser,
  links,
  setLinks
}) {
  let [goCSV, setGoCSV] = useState('');
  let updateTheme = (newTheme) => {
    try {
      let th = JSON.parse(newTheme);
      setTheme(th);
    } catch (e) {}
  };
  let importGoLinks = () => {
    let newLinks = links.slice();
    for (let line of goCSV.split('\n')) {
      if (!line) continue;
      let [alias, ...forwards] = line.split(',');
      if (!forwards || forwards.length < 1) continue;
      newLinks = newLinks.filter((l) => l.alias != alias);
      newLinks.push({ alias: alias, forwards: forwards });
    }
    setLinks(newLinks);
    setGoCSV('');
  };
  return (
    <Box>
      <Box
        sx={{
          p: 4,
          color: 'text',
          bg: 'background',
          fontFamily: 'body',
          fontWeight: 'body',
          lineHeight: 'body'
        }}
      >
        <Box>
          <Label>
            <Text mr={2}>set theme</Text>
            <Link href="https://theme-ui.com/demo/">(theme-ui)</Link>
          </Label>
          <Textarea
            value={JSON.stringify(theme)}
            placeholder="..."
            onChange={(e) => updateTheme(e.target.value)}
            style={{ resize: 'vertical' }}
          />
        </Box>
        <Box mt={10}>
          <Label htmlFor="user">edit user id</Label>
          <Input
            value={user}
            onChange={(e) => setUser(e.target.value)}
            id="user"
            name="user"
            type="text"
            placeholder=""
          />
        </Box>
        <Box mt={10}>
          <Label>
            <Text mr={2}>import go link csv</Text>
          </Label>
          <Textarea
            value={goCSV}
            placeholder="google,https://google"
            onChange={(e) => setGoCSV(e.target.value)}
            style={{ resize: 'vertical' }}
          />
          {goCSV.length > 0 && (
            <Button onClick={importGoLinks} width={1}>
              Import
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}
