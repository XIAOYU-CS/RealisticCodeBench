package org.real.temp;

import org.junit.*;
import javax.sound.midi.*;
import java.io.*;
import java.nio.file.*;
import java.util.*;

import static org.junit.Assert.*;
import static org.real.temp.Answer.*;
public class Tester {

    private Path basicMidiPath;
    private Path silenceMidiPath;
    private Path multiTrackMidiPath;

    @Before
    public void setUp() throws IOException, InvalidMidiDataException {
        basicMidiPath = createTestMidi(
            Arrays.asList(Arrays.asList(
                new MidiEvent(createTempoMessage(500000), 0),
                new MidiEvent(createNoteOnMessage(69, 64), 0),
                new MidiEvent(createNoteOffMessage(69, 64), 480)
            ))
        );

        silenceMidiPath = createTestMidi(
            Arrays.asList(Arrays.asList(
                new MidiEvent(createNoteOnMessage(60, 64), 240),
                new MidiEvent(createNoteOffMessage(60, 64), 720)
            ))
        );

        multiTrackMidiPath = createTestMidi(
            Arrays.asList(
                Arrays.asList(
                    new MidiEvent(createNoteOnMessage(60, 64), 0),
                    new MidiEvent(createNoteOffMessage(60, 64), 480)
                ),
                Arrays.asList(
                    new MidiEvent(createNoteOnMessage(64, 64), 0),
                    new MidiEvent(createNoteOffMessage(64, 64), 480)
                )
            )
        );
    }

    @After
    public void tearDown() {
        deleteIfExists(basicMidiPath);
        deleteIfExists(silenceMidiPath);
        deleteIfExists(multiTrackMidiPath);
    }

    private void deleteIfExists(Path path) {
        if (path != null && Files.exists(path)) {
            try {
                Files.delete(path);
            } catch (IOException e) {
            }
        }
    }

    private Path createTestMidi(List<List<MidiEvent>> tracks) throws IOException {
        Path tempFile = null;
        try {
            tempFile = Files.createTempFile("test", ".mid");
            Sequence sequence = new Sequence(Sequence.PPQ, 480);

            for (List<MidiEvent> trackEvents : tracks) {
                Track track = sequence.createTrack();
                for (MidiEvent event : trackEvents) {
                    track.add(event);
                }
            }

            MidiSystem.write(sequence, 1, tempFile.toFile());
            return tempFile;
        } catch (InvalidMidiDataException e) {
            if (tempFile != null) {
                try {
                    Files.delete(tempFile);
                } catch (IOException ignored) {}
            }
            throw new IOException("Failed to create MIDI file", e);
        }
    }

    private MetaMessage createTempoMessage(int tempo) throws InvalidMidiDataException {
        MetaMessage metaMessage = new MetaMessage();
        byte[] data = new byte[3];
        data[0] = (byte) ((tempo >> 16) & 0xFF);
        data[1] = (byte) ((tempo >> 8) & 0xFF);
        data[2] = (byte) (tempo & 0xFF);
        metaMessage.setMessage(0x51, data, 3);
        return metaMessage;
    }

    private ShortMessage createNoteOnMessage(int note, int velocity) {
        try {
            ShortMessage msg = new ShortMessage();
            msg.setMessage(ShortMessage.NOTE_ON, 0, note, velocity);
            return msg;
        } catch (InvalidMidiDataException e) {
            throw new RuntimeException(e);
        }
    }

    private ShortMessage createNoteOffMessage(int note, int velocity) {
        try {
            ShortMessage msg = new ShortMessage();
            msg.setMessage(ShortMessage.NOTE_OFF, 0, note, velocity);
            return msg;
        } catch (InvalidMidiDataException e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    public void testBasicFunctionality() throws Exception {
        List<List<double[]>> result = Answer.parseMidiFile(basicMidiPath.toString());
        assertEquals(1, result.size());
        assertEquals(1, result.get(0).size());

        double[] note = result.get(0).get(0);
        assertEquals(2, note.length);
        assertEquals(440.0, note[0], 1.0);
        assertEquals(500.0, note[1], 20.0);
    }

    @Test
    public void testIncludeSilenceParameter() throws Exception {
        List<List<double[]>> withSilence = Answer.parseMidiFile(silenceMidiPath.toString());
        assertTrue("Should have silence + note", withSilence.get(0).size() >= 1);

        List<List<double[]>> withoutSilence = Answer.parseMidiFile(
            silenceMidiPath.toString(), false, false, 120);
        assertEquals(1, withoutSilence.get(0).size());
    }

    @Test
    public void testIncludeNoteNumberParameter() throws Exception {
        List<List<double[]>> withoutNumbers = Answer.parseMidiFile(basicMidiPath.toString());
        assertEquals(2, withoutNumbers.get(0).get(0).length);

        List<List<double[]>> withNumbers = Answer.parseMidiFile(
            basicMidiPath.toString(), true, true, 120);
        assertEquals(3, withNumbers.get(0).get(0).length);
        assertEquals(69.0, withNumbers.get(0).get(0)[2], 0.001);
    }

    @Test
    public void testMultiTrackHandling() throws Exception {
        List<List<double[]>> result = Answer.parseMidiFile(multiTrackMidiPath.toString());
        assertEquals(2, result.size());
        assertEquals(1, result.get(0).size());
        assertEquals(1, result.get(1).size());
    }

    @Test
    public void testErrorHandling() {
        try {
            Answer.parseMidiFile("nonexistent_file.mid");
            fail("Should have thrown IOException");
        } catch (Exception e) {
            assertTrue(e instanceof IOException);
        }
    }
}
