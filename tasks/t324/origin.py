## generated with chatgpt lmfaooo
## It works though! use this to make sure your hackapet isn't broken

import board
import digitalio
import time

# Define pins for the buttons
button_pins = [board.BTNL, board.BTNM, board.BTNR]  # Adjust pins if needed

# Create digital input objects for the buttons
buttons = [digitalio.DigitalInOut(pin) for pin in button_pins]
for button in buttons:
    button.switch_to_input(pull=digitalio.Pull.UP)  # Buttons pull-up to high, pressed = LOW

# Main loop
while True:
    for i, button in enumerate(buttons):
        if not button.value:  # Button is pressed (LOW due to pull-up resistor)
            print(f"Button {i + 1} is pressed")
        else:
            print(f"Button {i + 1} is released")
    time.sleep(0.1)  # Delay to avoid spamming the console