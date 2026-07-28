def is_cron_between_2_and_4_am(cron_expression):
    parts = cron_expression.split(' ')
    hour_part = parts[1]

    for part in hour_part.split(','):
        try:
            hour = int(part)
        except ValueError:
            continue
        if 2 <= hour < 4:
            return True
    return False
