TEST_CASE("readLog function tests") {
        std::string testFilePath = "dummy_path.json";

    SECTION("reads correctly formatted JSON lines") {
        std::ofstream outFile(testFilePath);
        outFile << "{\"test_acc1\": 88.5, \"train_loss\": 0.75}\n"
                << "{\"test_acc1\": 89.0, \"train_loss\": 0.70}";
        outFile.close();

        auto [trainLossList, testAcc1List] = read_log(testFilePath);
        REQUIRE(trainLossList == std::vector<double>{0.75, 0.70});
        REQUIRE(testAcc1List == std::vector<double>{88.5, 89.0});
    }

    SECTION("reads correctly formatted JSON lines - single entry") {
        std::ofstream outFile(testFilePath);
        outFile << "{\"test_acc1\": 88.5, \"train_loss\": 0.75}";
        outFile.close();

        auto [trainLossList, testAcc1List] = read_log(testFilePath);
        REQUIRE(trainLossList == std::vector<double>{0.75});
        REQUIRE(testAcc1List == std::vector<double>{88.5});
    }

    SECTION("reads an empty file") {
        std::ofstream outFile(testFilePath);
        outFile.close();

        auto [trainLossList, testAcc1List] = read_log(testFilePath);
        REQUIRE(trainLossList.empty());
        REQUIRE(testAcc1List.empty());
    }

    SECTION("handles partial data entries") {
        std::ofstream outFile(testFilePath);
        outFile << "{\"test_acc1\": 88.5, \"train_loss\": 0.75}\n"
                << "{\"test_acc1\": 90.0, \"train_loss\": 0.75, \"f1\": 0.91}";
        outFile.close();

        auto [trainLossList, testAcc1List] = read_log(testFilePath);
        REQUIRE(trainLossList == std::vector<double>{0.75, 0.75});
        REQUIRE(testAcc1List == std::vector<double>{88.5, 90.0});
    }

    SECTION("handles missing metric entries independently") {
        std::ofstream outFile(testFilePath);
        outFile << "{\"train_loss\": 0.55}\n"
                << "{\"test_acc1\": 91.25}\n"
                << "{\"epoch\": 3}";
        outFile.close();

        auto [trainLossList, testAcc1List] = read_log(testFilePath);
        REQUIRE(trainLossList == std::vector<double>{0.55});
        REQUIRE(testAcc1List == std::vector<double>{91.25});
    }
    remove(testFilePath.c_str());
}
