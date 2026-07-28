import unittest
import tempfile
from pathlib import Path
from PIL import Image

class TestProcessAnimationFrames(unittest.TestCase):

    def setUp(self):
        self.temp_dir = Path(tempfile.mkdtemp())
        self.test_gif = self.temp_dir / "test_animation.gif"

        frames = []
        for i in range(3):
            img = Image.new('RGB', (100, 100), color=(i * 50, i * 50, i * 50))
            frames.append(img)

        frames[0].save(
            self.test_gif,
            save_all=True,
            append_images=frames[1:],
            duration=100,
            loop=0
        )

    def tearDown(self):
        import shutil
        if self.temp_dir.exists():
            shutil.rmtree(self.temp_dir)

    def test_basic_frame_processing(self):
        processed_frames, saved_paths = process_animation_frames(
            self.test_gif,
            new_size=(64, 64)
        )
        self.assertEqual(len(processed_frames), 3)
        for frame in processed_frames:
            self.assertEqual(frame.size, (64, 64))
        self.assertEqual(len(saved_paths), 0)

    def test_save_frames_to_files(self):
        output_folder = self.temp_dir / "output"

        processed_frames, saved_paths = process_animation_frames(
            self.test_gif,
            output_folder=output_folder,
            new_size=(32, 32),
            output_format="PNG",
            naming_pattern="test_frame_{:03d}"
        )

        self.assertEqual(len(processed_frames), 3)

        self.assertEqual(len(saved_paths), 3)

        for path in saved_paths:
            self.assertTrue(Path(path).exists())

        expected_filenames = [
            "test_frame_000.png",
            "test_frame_001.png",
            "test_frame_002.png"
        ]
        for i, expected_name in enumerate(expected_filenames):
            self.assertIn(expected_name, saved_paths[i])

    def test_frame_filter_function(self):
        def filter_function(frame, index):
            return index % 2 == 0

        processed_frames, saved_paths = process_animation_frames(
            self.test_gif,
            new_size=(64, 64),
            frame_filter=filter_function
        )

        self.assertEqual(len(processed_frames), 2)

    def test_image_object_input(self):
        img = Image.open(self.test_gif)

        processed_frames, saved_paths = process_animation_frames(
            img,
            new_size=(48, 48)
        )

        self.assertEqual(len(processed_frames), 3)
        for frame in processed_frames:
            self.assertEqual(frame.size, (48, 48))

        self.assertFalse(img.fp.closed if hasattr(img, 'fp') and img.fp else False)

        img.close()

    def test_missing_input_path_raises(self):
        with self.assertRaises(Exception):
            process_animation_frames(self.temp_dir / "missing.gif")
