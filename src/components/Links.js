import React, { useState } from 'react';
import { Box, Text, Button, Link, Flex } from 'rebass';
import { Label, Input } from '@rebass/forms';

export default function Links({ links, setLinks }) {
  let [linkText, setLinkText] = useState('');
  let [forwardTos, setForwardTos] = useState(['']);
  let editForward = (text, idx) => {
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
  };
  let addCurrent = () => {
    let forwards = forwardTos
      .map((ft) => ft.trim())
      .filter((ft) => ft.length > 0);
    if (
      !linkText ||
      forwards.length == 0 ||
      links.find((l) => l.alias == linkText)
    ) {
      return;
    }
    setLinks(links.concat([{ alias: linkText, forwards: forwards }]));
    setLinkText('');
    setForwardTos(['']);
  };
  let deleteLink = (link) => {
    setLinks(links.filter((l) => l.alias != link.alias));
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
          <Label htmlFor="alias">make go/</Label>
          <Input
            value={linkText}
            onChange={(e) => setLinkText(e.target.value)}
            id="alias"
            name="alias"
            type="text"
            placeholder="alias"
          />
        </Box>
        {forwardTos.map((ft, idx) => {
          let key = `url${idx}`;
          return (
            <Flex key={key}>
              <Box width={idx != forwardTos.length - 1 ? 1 : 7 / 8}>
                {idx == 0 && <Label htmlFor={key}>open</Label>}
                {idx != 0 && !ft && <Label htmlFor={key}>(and)</Label>}
                {idx != 0 && ft && <Label htmlFor={key}>and</Label>}
                <Input
                  onKeyPress={(e) => e.key == 'Enter' && addCurrent()}
                  value={ft}
                  onChange={(e) => editForward(e.target.value, idx)}
                  id={key}
                  name={key}
                  type={key}
                  placeholder="https://example.com"
                />
              </Box>
              {idx == forwardTos.length - 1 && (
                <Box width={1 / 8} mt={3}>
                  <Button mt={10} onClick={addCurrent}>
                    Add
                  </Button>
                </Box>
              )}
            </Flex>
          );
        })}
        <Box mt={4} ml={-3}>
          {links.map((link) => (
            <LinkRow
              key={link.alias}
              link={link}
              del={() => deleteLink(link)}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

function LinkRow({ link, del }) {
  const [hover, setHover] = useState(false);
  return (
    <Box
      mb={10}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Text textAlign={'left'} ml={20}>
        {hover && (
          <>
            <Link sx={{ color: 'secondary' }} onClick={del}>
              (delete){' '}
            </Link>
            <Link sx={{ color: 'primary' }} onClick={() => window.goLink(link)}>
              (open){' '}
            </Link>
          </>
        )}
        <b>/{link.alias}</b>{' '}
        <Text display={'inline'}>{link.forwards.join(', ')}</Text>
      </Text>
    </Box>
  );
}
