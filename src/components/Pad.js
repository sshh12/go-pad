import React, { useState } from 'react';
import { Box, Text, Button, Link } from 'rebass';
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

export default function Pad({ notes, setNotes }) {
  let [title, setTitle] = useState('');
  let [note, setNote] = useState('');
  let [noteFormat, setNoteFormat] = useState('text');
  let addCurrent = () => {
    if (!note || !noteFormat) return;
    let newNotes = notes.concat([
      { title: title, text: note, format: noteFormat }
    ]);
    setTitle('');
    setNote('');
    setNoteFormat('text');
    setNotes(newNotes);
  };
  let sameTitle = notes.find((n) => n.title == title);
  let moveToEdit = (note) => {
    let newNotes = notes.filter((n) => n.title != note.title);
    setTitle(note.title);
    setNote(note.text);
    setNoteFormat(note.format);
    setNotes(newNotes);
  };
  return (
    <Box textAlign={'left'}>
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
          <Box textAlign={'left'}>
            {sameTitle && <Label htmlFor="title">replace note</Label>}
            {!sameTitle && <Label htmlFor="title">add note</Label>}
            <Input
              value={title}
              id="title"
              name="title"
              type="text"
              placeholder="title [tag1] [tag2]"
              onChange={(e) => setTitle(e.target.value)}
            />
            <Select
              id="text"
              name="text"
              value={noteFormat}
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
        <Button mt={2} onClick={addCurrent}>
          Add
        </Button>
      </Box>
      <Box ml={4}>
        {notes.map((note) => (
          <Note
            key={note.title}
            note={note}
            moveToEdit={() => moveToEdit(note)}
          />
        ))}
      </Box>
    </Box>
  );
}

function Note({ note, moveToEdit }) {
  let [hover, setHover] = useState(false);
  let tags = [...note.title.matchAll(/\[(\S+)\]/g)].map((m) => m[1]);
  let title = note.title.replaceAll(/\[(\S+)\]/g, '').trim();
  return (
    <Box
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {hover && (
        <Link sx={{ color: 'secondary' }} mr={2} onClick={moveToEdit}>
          (remove to editor){' '}
        </Link>
      )}
      <Text display={'inline'}>
        <b>{title}</b>{' '}
        <Box display={'inline'}>
          {tags.map((t, idx) => (
            <Button
              ml={idx == 0 ? 3 : 2}
              bg={'secondary'}
              pt={0}
              pl={1}
              pb={0}
              pr={1}
            >
              venmo-research
            </Button>
          ))}
        </Box>
      </Text>
      <RenderNote text={note.text} format={note.format} />
      <hr />
    </Box>
  );
}
