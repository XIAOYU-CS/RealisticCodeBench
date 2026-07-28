import unittest
class TestGeneratePackageName(unittest.TestCase):

    def test_should_generate_package_name_from_normal_game_name(self):
        result = generate_package_name('My Awesome Game')
        self.assertEqual(result, 'com.my.awesome.game')

    def test_should_handle_special_characters_and_various_separators(self):
        result = generate_package_name('My-Game_Test 2023!')
        self.assertEqual(result, 'com.my.game.test.2023')

    def test_should_prepend_app_when_leading_number_is_not_allowed(self):
        result = generate_package_name('123GameAdventure')
        self.assertEqual(result, 'com.app.123gameadventure')

    def test_should_allow_leading_number_when_configured(self):
        result = generate_package_name('123Game', {
            'allowLeadingNumber': True
        })
        self.assertEqual(result, 'com.123game')

    def test_should_use_custom_prefix_and_separator(self):
        result = generate_package_name('My Game App', {
            'prefix': 'org.games.',
            'separator': '_',
            'allowLeadingNumber': True
        })
        self.assertEqual(result, 'org.games.my_game_app')

    def test_should_return_none_for_empty_or_invalid_input(self):
        self.assertIsNone(generate_package_name(''))
        self.assertIsNone(generate_package_name('   '))
        self.assertIsNone(generate_package_name('!@#$%'))
        self.assertIsNone(generate_package_name(None))
        self.assertIsNone(generate_package_name(None))  # undefined equivalent

    def test_additional_edge_cases(self):
        self.assertIsNone(generate_package_name('!@#$%^&*()'))
        result = generate_package_name('MyAwesomeGame')
        self.assertEqual(result, 'com.myawesomegame')
        result = generate_package_name('My---Game___Test')
        self.assertEqual(result, 'com.my.game.test')