import unittest
import io
import os


class TestResizeImage(unittest.TestCase):

    def setUp(self):
        self.test_image = Image.new('RGB', (1000, 1000), color='red')
        self.test_image_bytes = self._image_to_bytes(self.test_image)
        self.test_output_path = "test_output.jpg"

    def tearDown(self):
        if os.path.exists(self.test_output_path):
            os.remove(self.test_output_path)

    def _image_to_bytes(self, img):
        buffer = io.BytesIO()
        img.save(buffer, format='JPEG')
        return buffer.getvalue()

    def test_normal_resize(self):
        params = ImageResizeParams(
            quality=80,
            target_size=(500, 500),
            optimize_jpeg=True
        )

        result = resize_image(self.test_image_bytes, params)

        self.assertTrue(len(result) > 0)

        with Image.open(io.BytesIO(result)) as img:
            self.assertEqual(img.size, (500, 500))

    def test_quality_parameter(self):
        params_high = ImageResizeParams(
            quality=95,
            target_size=(500, 500)
        )

        params_low = ImageResizeParams(
            quality=10,
            target_size=(500, 500)
        )

        result_high = resize_image(self.test_image_bytes, params_high)
        result_low = resize_image(self.test_image_bytes, params_low)

        self.assertTrue(len(result_high) > len(result_low))

    def test_progressive_jpeg(self):
        params_progressive = ImageResizeParams(
            quality=80,
            target_size=(500, 500),
            progressive_jpeg=True
        )

        params_standard = ImageResizeParams(
            quality=80,
            target_size=(500, 500),
            progressive_jpeg=False
        )

        result_progressive = resize_image(self.test_image_bytes, params_progressive)
        result_standard = resize_image(self.test_image_bytes, params_standard)

        self.assertNotEqual(result_progressive, result_standard)

    def test_invalid_dimensions(self):
        for target_size in ((0, 500), (500, -1)):
            params = ImageResizeParams(
                quality=80,
                target_size=target_size
            )

            with self.assertRaisesRegex(ValueError, "Target width and height must be positive values"):
                resize_image(self.test_image_bytes, params)

    def test_quality_bounds_and_invalid_quality(self):
        for quality in (1, 100):
            params = ImageResizeParams(
                quality=quality,
                target_size=(100, 100)
            )

            result = resize_image(self.test_image_bytes, params)
            self.assertTrue(len(result) > 0)

        for quality in (0, 101):
            params = ImageResizeParams(
                quality=quality,
                target_size=(500, 500)
            )

            with self.assertRaisesRegex(ValueError, "Image quality must be between 1 and 100"):
                resize_image(self.test_image_bytes, params)
