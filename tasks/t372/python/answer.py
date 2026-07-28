import sys


def cat(filenames, number_lines=False, show_ends=False, squeeze_blank=False):
    """
    Implement functionality similar to Linux cat command

    Parameters:
        filenames: List of file names
        number_lines: Whether to display line numbers
        show_ends: Whether to show line ending character $
        squeeze_blank: Whether to squeeze blank lines (multiple blank lines displayed as one)
    """
    for filename in filenames:
        try:
            with open(filename, 'r', encoding='utf-8') as file:
                line_num = 1
                last_blank = False

                for line in file:
                    # Handle squeezing blank lines
                    current_blank = line.strip() == ''
                    if squeeze_blank and current_blank and last_blank:
                        continue
                    last_blank = current_blank

                    # Handle line numbering
                    if number_lines:
                        print(f"{line_num:6d}  ", end='')
                        line_num += 1

                    # Handle line ending character
                    if show_ends:
                        print(line.rstrip('\n') + '$')
                    else:
                        print(line, end='')

        except FileNotFoundError:
            print(f"cat: {filename}: No such file or directory", file=sys.stderr)
        except PermissionError:
            print(f"cat: {filename}: Permission denied", file=sys.stderr)
        except IsADirectoryError:
            print(f"cat: {filename}: Is a directory", file=sys.stderr)
        except Exception as e:
            print(f"cat: {filename}: Error occurred - {str(e)}", file=sys.stderr)
