package org.real.temp;

import java.io.*;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.file.*;
import java.util.*;

public class Answer {


    public static class ArrayFileException extends Exception {
        public ArrayFileException(String message) {
            super(message);
        }

        public ArrayFileException(String message, Throwable cause) {
            super(message, cause);
        }
    }


    public static class NDArray {
        private final float[] data;
        private final int[] shape;

        public NDArray(float[] data, int[] shape) {
            this.data = data.clone();
            this.shape = shape.clone();
        }

        public int[] getShape() {
            return shape.clone();
        }

        public float[] getData() {
            return data.clone();
        }

        public int getDimensionCount() {
            return shape.length;
        }

        public int getTotalElements() {
            int total = 1;
            for (int dim : shape) {
                total *= dim;
            }
            return total;
        }

        @Override
        public String toString() {
            return "NDArray{shape=" + Arrays.toString(shape) + ", elements=" + getTotalElements() + "}";
        }

        @Override
        public boolean equals(Object obj) {
            if (this == obj) return true;
            if (obj == null || getClass() != obj.getClass()) return false;
            NDArray ndArray = (NDArray) obj;
            return Arrays.equals(data, ndArray.data) && Arrays.equals(shape, ndArray.shape);
        }

        @Override
        public int hashCode() {
            return Arrays.hashCode(data) + Arrays.hashCode(shape);
        }
    }

    /**
     * Read .npy or .cfl format files, supporting custom dimension processing
     * (preserve original dimensions or specify target dimension count)
     *
     * @param name File name (.npy files need extension; .cfl files can have extension
     *             or just filename, automatically matches .hdr)
     * @param targetDims Target dimension count, if null then preserve original dimensions;
     *                   otherwise pad dimensions to specified count (must be ≥ original dimensions)
     * @return Processed array
     * @throws ArrayFileException If file reading fails or parameters are invalid
     */
    public static NDArray readArrayFile(String name, Integer targetDims) throws ArrayFileException {
        Path filePath = Paths.get(name);
        String fileName = filePath.getFileName().toString();
        String suffix = "";

        int lastDotIndex = fileName.lastIndexOf('.');
        if (lastDotIndex > 0) {
            suffix = fileName.substring(lastDotIndex).toLowerCase();
        }

        try {
            NDArray array;
            int[] originalDims;

            // Read .npy file
            if (suffix.equals(".npy")) {
                throw new ArrayFileException("NPY format not implemented in this Java version");
                // This would require implementing NPY format parsing

            // Read .cfl file (requires .hdr header file)
            } else if (suffix.equals(".cfl") || suffix.isEmpty()) {
                Path cflPath = suffix.equals(".cfl") ? filePath : Paths.get(name + ".cfl");
                Path hdrPath = Paths.get(cflPath.toString().replaceAll("\\.cfl$", "") + ".hdr");

                // Verify file existence
                if (!Files.exists(hdrPath)) {
                    throw new ArrayFileException("Missing header file: " + hdrPath.toString());
                }
                if (!Files.exists(cflPath)) {
                    throw new ArrayFileException("Missing data file: " + cflPath.toString());
                }

                // Read dimension information from .hdr
                List<String> hdrLines = Files.readAllLines(hdrPath);
                if (hdrLines.size() < 2) {
                    throw new ArrayFileException("Invalid header file format");
                }

                String dimsLine = hdrLines.get(1).trim();
                String[] dimsStr = dimsLine.split("\\s+");
                originalDims = new int[dimsStr.length];
                for (int i = 0; i < dimsStr.length; i++) {
                    originalDims[i] = Integer.parseInt(dimsStr[i]);
                }

                // Read and reshape data
                int totalElements = 1;
                for (int dim : originalDims) {
                    totalElements *= dim;
                }

                byte[] bytes = Files.readAllBytes(cflPath);
                if (bytes.length != totalElements * 8) {  // complex64 = 2 * float32 = 8 bytes per element
                    throw new ArrayFileException("Data file size mismatch");
                }

                float[] data = new float[totalElements * 2];  // 2 floats per complex number
                ByteBuffer buffer = ByteBuffer.wrap(bytes);
                buffer.order(ByteOrder.LITTLE_ENDIAN);

                for (int i = 0; i < totalElements * 2; i++) {
                    data[i] = buffer.getFloat();
                }

                array = new NDArray(data, originalDims);

            } else {
                throw new ArrayFileException("Only .npy and .cfl format files are supported");
            }

            // Process dimensions (core: support custom dimensions)
            if (targetDims == null) {
                // Preserve original dimensions
                return array;
            } else {
                // Validate target dimension legality
                if (targetDims < array.getDimensionCount()) {
                    throw new ArrayFileException(
                        String.format("Target dimension(%d) is less than original dimension(%d), cannot reduce dimensions",
                                    targetDims, array.getDimensionCount()));
                }
                // Pad dimensions to target count (pad with 1s at the end)
                int[] newDims = Arrays.copyOf(array.getShape(), targetDims);
                for (int i = array.getDimensionCount(); i < targetDims; i++) {
                    newDims[i] = 1;
                }
                return new NDArray(array.getData(), newDims);
            }

        } catch (Exception e) {
            if (e instanceof ArrayFileException) {
                throw (ArrayFileException) e;
            } else {
                throw new ArrayFileException("Failed to read file: " + e.getMessage(), e);
            }
        }
    }

    /**
     * Overloaded method with default target dimensions (12)
     */
    public static NDArray readArrayFile(String name) throws ArrayFileException {
        return readArrayFile(name, 12);
    }
}
