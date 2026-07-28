/**
 * Calculates the final price after applying a discount to the original price.
 * Both price and discount are expected as strings and should represent valid numbers.
 * The discount should be a percentage value between 0 and 100.
 *
 * @param price The original price as a string.
 * @param discount The discount percentage as a string.
 * @returns The final price after applying the discount, rounded to two decimal places.
 * @throws IllegalArgumentException if price or discount aren't valid numbers or if the discount is out of the expected range.
 */
public class Answer {
    public static double computeFinalPriceAfterDiscount(String price, String discount) {
            if (price == null || discount == null) {
                throw new IllegalArgumentException("Price and discount cannot be null.");
            }

            double priceValue;
            double discountValue;

            try {
                priceValue = Double.parseDouble(price);
                discountValue = Double.parseDouble(discount);
            } catch (NumberFormatException e) {
                throw new IllegalArgumentException("Invalid number format.");
            }

            if (Double.isNaN(priceValue) || Double.isInfinite(priceValue) || priceValue < 0) {
                throw new IllegalArgumentException("Invalid price value.");
            }

            if (Double.isNaN(discountValue) || Double.isInfinite(discountValue) ||
                discountValue < 0 || discountValue > 100) {
                throw new IllegalArgumentException("Discount percentage must be between 0 and 100.");
            }

            double finalPrice = priceValue * (1 - discountValue / 100.0);
            return Math.round(finalPrice * 100.0) / 100.0;
        }
}