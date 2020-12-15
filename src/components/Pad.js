import React, { useState } from 'react';
import { Box, Card, Image, Heading, Text, Button, Flex, Link } from 'rebass';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Label, Textarea, Select, Input } from '@rebass/forms';

let FORMATS = ['text'].concat(SyntaxHighlighter.supportedLanguages);

const RenderNote = ({ text, format }) => {
  if (format == 'text') {
    return <code>{text}</code>;
  }
  return (
    <SyntaxHighlighter language={format} style={docco}>
      {text}
    </SyntaxHighlighter>
  );
};

export default function Pad() {
  let [note, setNote] = useState('');
  let [noteFormat, setNoteFormat] = useState('text');
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
        <Box textAlign={'left'}>
          <Label htmlFor="title">add note</Label>
          <Input
            id="title"
            name="title"
            type="text"
            placeholder="title [tag1] [tag2]"
          />
          <Select
            id="text"
            name="text"
            defaultValue={'text'}
            onChange={(e) => setNoteFormat(e.target.value)}
          >
            {FORMATS.map((lang) => (
              <option key={lang}>{lang}</option>
            ))}
          </Select>
          <Textarea
            value={note}
            placeholder="..."
            onChange={(e) => setNote(e.target.value)}
            style={{ resize: 'vertical' }}
          />
          <RenderNote text={note} format={noteFormat} />
        </Box>
      </Box>
      <Button mt={2} onClick={null}>
        Add
      </Button>
    </Box>
  );
}
