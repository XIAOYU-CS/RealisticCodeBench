TEST_CASE("blake2b_hash_with_salt behavior", "[blake2b]") {
    SECTION("string input uses default 16 byte digest and no salt") {
        REQUIRE(blake2b_hash_with_salt(std::string("hello world")) == "6agEsuUn_TYB0v_AuwI81g");
    }

    SECTION("different string salts change the digest") {
        REQUIRE(blake2b_hash_with_salt(std::string("test data"), std::string("salt1"))
                == "-OyCe7uDd6G4DI7d__mjJw");
        REQUIRE(blake2b_hash_with_salt(std::string("test data"), std::string("salt2"))
                == "pHfRx3QwwfwC6AAgBPE4xQ");
        REQUIRE(blake2b_hash_with_salt(std::string("test data"))
                != blake2b_hash_with_salt(std::string("test data"), std::string("salt1")));
    }

    SECTION("byte vector data and salt match Python hashlib output") {
        std::vector<uint8_t> data = {'b', 'i', 'n', 'a', 'r', 'y', ' ', 'd', 'a', 't', 'a'};
        std::vector<uint8_t> salt = {'b', 'i', 'n', 'a', 'r', 'y', ' ', 's', 'a', 'l', 't'};
        REQUIRE(blake2b_hash_with_salt(data, salt) == "wdEDMqhZP5eHk-N5UGTy3A");
    }

    SECTION("different digest sizes are respected") {
        REQUIRE(blake2b_hash_with_salt(std::string("test string"), nullptr, 8) == "zCCuq60pBXM");
        REQUIRE(blake2b_hash_with_salt(std::string("test string"), nullptr, 16) == "yEfk3yQh9IL-qNs1AcvWKg");
        REQUIRE(blake2b_hash_with_salt(std::string("test string"), nullptr, 32)
                == "fBBtQsoX_b-wP2tFuR7_zvLP9hIVo1UtvBq4_UaBdxk");
    }

    SECTION("validation and url-safe output") {
        std::string result = blake2b_hash_with_salt(std::string("test for url safety"));
        REQUIRE(result.find('=') == std::string::npos);
        REQUIRE(result.find_first_not_of("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_")
                == std::string::npos);
        REQUIRE_THROWS_AS(blake2b_hash_with_salt(std::string("test"), nullptr, 0), std::invalid_argument);
        REQUIRE_THROWS_AS(blake2b_hash_with_salt(std::string("test"), nullptr, 65), std::invalid_argument);
        REQUIRE_THROWS_AS(
            blake2b_hash_with_salt(std::string("test"), std::string("1234567890abcdefx")),
            std::invalid_argument
        );
    }
}
