import React, { useState } from 'react';
import { Box, Card, Image, Heading, Text, Button, Flex, Link } from 'rebass';
import { Label, Input } from '@rebass/forms';

export default function Links() {
  let [linkText, setLinkTest] = useState('');
  let [forwardTos, setForwardTos] = useState(['']);
  let [links, setLinks] = useState([]);
  function editForward(text, idx) {
    let newForwards = Object.assign([], forwardTos, { [idx]: text });
    if (text && idx == forwardTos.length - 1) {
      newForwards.push('');
    }
    while (
      newForwards.length >= 2 &&
      newForwards[newForwards.length - 1] +
        newForwards[newForwards.length - 2] ==
        ''
    ) {
      newForwards.pop();
    }
    setForwardTos(newForwards);
  }
  function addCurrent() {
    let forwards = forwardTos
      .map((ft) => ft.trim())
      .filter((ft) => ft.length > 0);
    if (!linkText || forwards.length == 0) {
      return;
    }
    setLinks(links.concat([{ alias: linkText, forwards: forwards }]));
  }
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
          <Label htmlFor="alias">go/</Label>
          <Input
            value={linkText}
            onChange={(e) => setLinkTest(e.target.value)}
            id="alias"
            name="alias"
            type="text"
            placeholder="alias"
          />
        </Box>
        {forwardTos.map((ft, idx) => (
          <Box>
            {idx == 0 && <Label htmlFor="url">should open</Label>}
            {idx != 0 && !ft && <Label htmlFor="url">(and)</Label>}
            {idx != 0 && ft && <Label htmlFor="url">and</Label>}
            <Input
              value={ft}
              onChange={(e) => editForward(e.target.value, idx)}
              id="url"
              name="url"
              type="url"
              placeholder="https://example.com"
            />
          </Box>
        ))}
        <Button mt={10} onClick={addCurrent}>
          Add
        </Button>
        <Box>
          {links.map((link) => (
            <li style={{ listStyle: 'none' }}>
              <Box mb={10}>
                <Text textAlign={'left'} ml={20}>
                  <b>/{link.alias}</b> {link.forwards.join(', ')}
                </Text>
              </Box>
            </li>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
