package org.real.temp;
import java.util.Random;

public class Answer {
    public static int[] randomizeArrayOrder(int[] array) {
        Random random = new Random();
        int currentIndex = array.length;

        while (currentIndex > 0) {
            int randomIndex = random.nextInt(currentIndex);
            currentIndex--;

            // Swap the elements at currentIndex and randomIndex
            int temp = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temp;
        }

        return array;
    }

    public static <T> T[] randomizeArrayOrder(T[] array) {
        java.util.Collections.shuffle(java.util.Arrays.asList(array));
        return array;
    }

    public static void main(String[] args) {
        int[] array = {1, 2, 3, 4, 5};
        int[] shuffledArray = randomizeArrayOrder(array);

        for (int num : shuffledArray) {
            System.out.print(num + " ");
        }
    }
}
