package org.real.temp;

import javax.sound.midi.*;
import java.io.File;
import java.io.IOException;
import java.util.*;

public class Answer {

    /**
     * Converts a MIDI note number to a frequency in Hz.
     */
    public static double midiToFreq(int midiNote) {
        return 440 * Math.pow(2, (midiNote - 69) / 12.0);
    }

    /**
     * Parses a MIDI file and returns track information with note frequencies and durations.
     *
     * @param midiFilePath Path to the MIDI file
     * @param includeSilence Include silence segments as (0, duration_ms) if True
     * @param includeNoteNumber Include original MIDI note number in results if True
     * @param defaultTempo Default tempo in BPM used when no tempo information exists
     * @return List of tracks, each containing note information as arrays
     *         [frequency, duration_ms] or [frequency, duration_ms, note_number]
     * @throws IOException if file cannot be read
     * @throws InvalidMidiDataException if MIDI data is invalid
     */
    public static List<List<double[]>> parseMidiFile(
            String midiFilePath,
            boolean includeSilence,
            boolean includeNoteNumber,
            int defaultTempo) throws IOException, InvalidMidiDataException {

        File midiFile = new File(midiFilePath);
        if (!midiFile.exists()) {
            throw new IOException("MIDI file not found: " + midiFilePath);
        }

        Sequence sequence = MidiSystem.getSequence(midiFile);
        List<List<double[]>> noteTracks = new ArrayList<>();

        // Initialize tracks
        for (int i = 0; i < sequence.getTracks().length; i++) {
            noteTracks.add(new ArrayList<>());
        }

        Track[] tracks = sequence.getTracks();
        int resolution = sequence.getResolution();
        int defaultMicrosecondsPerBeat = 60000000 / defaultTempo;

        for (int trackIdx = 0; trackIdx < tracks.length; trackIdx++) {
            Track track = tracks[trackIdx];
            List<double[]> trackNotes = noteTracks.get(trackIdx);

            Map<Integer, Long> activeNoteStartTimes = new HashMap<>();
            int tempo = defaultMicrosecondsPerBeat;

            // Process events in chronological order
            long previousTick = 0;

            for (int i = 0; i < track.size(); i++) {
                MidiEvent event = track.get(i);
                long currentTick = event.getTick();
                MidiMessage message = event.getMessage();

                if (message instanceof MetaMessage) {
                    MetaMessage metaMessage = (MetaMessage) message;
                    if (metaMessage.getType() == 0x51) { // Set tempo message
                        byte[] data = metaMessage.getData();
                        if (data.length >= 3) {
                            tempo = ((data[0] & 0xFF) << 16) |
                                   ((data[1] & 0xFF) << 8) |
                                   (data[2] & 0xFF);
                        }
                    }
                }

                if (message instanceof ShortMessage) {
                    ShortMessage shortMessage = (ShortMessage) message;
                    int command = shortMessage.getCommand();
                    int note = shortMessage.getData1();
                    int velocity = shortMessage.getData2();

                    if (command == ShortMessage.NOTE_ON && velocity > 0) {
                        // Note on event
                        activeNoteStartTimes.put(note, currentTick);
                    } else if (command == ShortMessage.NOTE_OFF ||
                              (command == ShortMessage.NOTE_ON && velocity == 0)) {
                        // Note off event
                        if (activeNoteStartTimes.containsKey(note)) {
                            long startTick = activeNoteStartTimes.get(note);
                            long noteDurationTicks = currentTick - startTick;

                            // Calculate silence duration before this note if enabled
                            if (includeSilence && startTick > previousTick) {
                                long silenceTicks = startTick - previousTick;
                                double silenceMs = ticksToMilliseconds(silenceTicks, resolution, tempo);
                                trackNotes.add(new double[]{0.0, silenceMs});
                            }

                            // Calculate note duration
                            double noteDurationMs = ticksToMilliseconds(noteDurationTicks, resolution, tempo);
                            double frequency = midiToFreq(note);

                            if (includeNoteNumber) {
                                trackNotes.add(new double[]{frequency, noteDurationMs, (double) note});
                            } else {
                                trackNotes.add(new double[]{frequency, noteDurationMs});
                            }

                            activeNoteStartTimes.remove(note);
                            previousTick = currentTick;
                        }
                    }
                }
            }
        }

        return noteTracks;
    }

    /**
     * Overloaded method with default parameters
     */
    public static List<List<double[]>> parseMidiFile(String midiFilePath)
            throws IOException, InvalidMidiDataException {
        return parseMidiFile(midiFilePath, true, false, 120);
    }

    /**
     * Helper method to convert ticks to milliseconds
     */
    private static double ticksToMilliseconds(long ticks, int resolution, int microsecondsPerBeat) {
        double secondsPerTick = microsecondsPerBeat / (1000000.0 * resolution);
        return ticks * secondsPerTick * 1000;
    }
}
