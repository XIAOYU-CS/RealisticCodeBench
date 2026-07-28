import unittest

import numpy as np


class QuadratureRule:
    def __init__(self, x, w):
        self.x = np.array(x)
        self.w = np.array(w)


class TestOrthogonalPolynomial(unittest.TestCase):
    def test_lanczos_basic(self):
        x = [0.0, 0.5, 1.0]
        w = [0.333, 0.333, 0.334]
        quadrature_rule = QuadratureRule(x, w)
        n = 2
        alpha, beta, gamma, _ = lanczos(n, quadrature_rule)

        self.assertEqual(len(alpha), n)
        self.assertEqual(len(beta), n - 1)
        self.assertEqual(len(gamma), n)

    def test_lanczos_weights_nonuniform(self):
        x = [0.0, 0.5, 1.0]
        w = [0.1, 0.4, 0.5]
        quadrature_rule = QuadratureRule(x, w)
        n = 3
        alpha, beta, gamma, _ = lanczos(n, quadrature_rule)

        self.assertEqual(len(alpha), n)
        self.assertEqual(len(beta), n - 1)
        self.assertEqual(len(gamma), n)
        self.assertTrue(np.all(gamma > 0))

    def test_lanczos_single_node(self):
        x = [0.5]
        w = [1.0]
        quadrature_rule = QuadratureRule(x, w)
        n = 1
        alpha, beta, gamma, _ = lanczos(n, quadrature_rule)

        self.assertEqual(len(alpha), n)
        self.assertEqual(len(beta), n - 1)
        self.assertEqual(len(gamma), n)
        self.assertTrue(np.all(gamma > 0))


    def test_lanczos_n_zero(self):
        x = [0.0, 0.5, 1.0]
        w = [0.333, 0.333, 0.334]
        quadrature_rule = QuadratureRule(x, w)
        n = 0
        alpha, beta, gamma, _ = lanczos(n, quadrature_rule)

        self.assertEqual(len(alpha), 0)
        self.assertEqual(len(beta), 0)
        self.assertEqual(len(gamma), 0)

    def test_lanczos_duplicate_nodes(self):
        x = [0.0, 0.0, 1.0]  # duplicate node
        w = [0.25, 0.25, 0.5]
        quadrature_rule = QuadratureRule(x, w)
        n = 2
        alpha, beta, gamma, _ = lanczos(n, quadrature_rule)

        self.assertEqual(len(alpha), n)
        self.assertEqual(len(beta), n - 1)
        self.assertEqual(len(gamma), n)
        self.assertTrue(np.all(gamma >= 0))

    def test_lanczos_large_n_sufficient_nodes(self):
        x = [-1.0, -0.5, 0.0, 0.5, 1.0]
        w = [0.2, 0.2, 0.2, 0.2, 0.2]
        quadrature_rule = QuadratureRule(x, w)
        n = 5
        alpha, beta, gamma, _ = lanczos(n, quadrature_rule)

        self.assertEqual(len(alpha), n)
        self.assertEqual(len(beta), n - 1)  # 4
        self.assertEqual(len(gamma), n)
        self.assertTrue(np.all(gamma > 0))