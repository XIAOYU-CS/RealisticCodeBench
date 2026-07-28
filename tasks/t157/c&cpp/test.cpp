TEST_CASE("is_base64_encoded_image_data") {
    SECTION("should return true for a valid PNG Base64 image string") {
        std::string validPng = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA";
        REQUIRE(is_base64_encoded_image_data(validPng) == true);
    }

    SECTION("should return true for a valid JPEG Base64 image string") {
        std::string validJpeg = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAA";
        REQUIRE(is_base64_encoded_image_data(validJpeg) == true);
    }

    SECTION("should return false for a string without the image data prefix") {
        std::string invalidFormat = "data:text/plain;base64,SGVsbG8gd29ybGQ=";
        REQUIRE(is_base64_encoded_image_data(invalidFormat) == false);
    }

    SECTION("should return false for a string with invalid Base64 characters") {
        std::string invalidBase64 = "data:image/png;base64,invalidBase64String@#%";
        REQUIRE(is_base64_encoded_image_data(invalidBase64) == false);
    }

    SECTION("should return false for an empty string") {
        REQUIRE(is_base64_encoded_image_data("") == false);
    }

    SECTION("should return false for a null input") {
        // Since we can't pass nullptr for a std::string, we can check with an empty string or modify the function to handle nullptr
        REQUIRE(is_base64_encoded_image_data("") == false);  // Adjust as necessary for null handling
    }
}