import unittest

import numpy as np

k_B_over_keV = 8.617333262145e-5


class TestGetTInLog10Kelvin(unittest.TestCase):

    def test_scalar_input_high_temperature(self):
        T_keV = 100.0
        expected_result = np.log10(T_keV / k_B_over_keV)
        result = convert_kev_to_log10_kelvin(T_keV)
        self.assertAlmostEqual(result, expected_result, places=6)

    def test_scalar_input_low_temperature(self):
        T_keV = 0.01
        expected_result = np.log10(T_keV / k_B_over_keV)
        result = convert_kev_to_log10_kelvin(T_keV)
        self.assertAlmostEqual(result, expected_result, places=6)

    def test_tuple_input_large_range(self):
        T_keV = (0.1, 1.0, 10.0, 100.0, 1000.0)
        expected_results = tuple(np.log10(t / k_B_over_keV) for t in T_keV)
        result = convert_kev_to_log10_kelvin(T_keV)
        self.assertEqual(result, expected_results)

    def test_tuple_input_repeated_values(self):
        T_keV = (1.0, 1.0, 1.0)
        expected_results = tuple(np.log10(t / k_B_over_keV) for t in T_keV)
        result = convert_kev_to_log10_kelvin(T_keV)
        self.assertEqual(result, expected_results)

    def test_scalar_input_non_integer(self):
        T_keV = 2.5
        expected_result = np.log10(T_keV / k_B_over_keV)
        result = convert_kev_to_log10_kelvin(T_keV)
        self.assertAlmostEqual(result, expected_result, places=6)

    def test_tuple_input_floating_point(self):
        T_keV = (1.5, 2.5, 3.5)
        expected_results = tuple(np.log10(t / k_B_over_keV) for t in T_keV)
        result = convert_kev_to_log10_kelvin(T_keV)
        self.assertEqual(result, expected_results)


    def test_large_tuple_input(self):
        T_keV = tuple(np.arange(1, 1001, 1))  # Temperatures from 1 keV to 1000 keV
        expected_results = tuple(np.log10(t / k_B_over_keV) for t in T_keV)
        result = convert_kev_to_log10_kelvin(T_keV)
        self.assertEqual(result, expected_results)
