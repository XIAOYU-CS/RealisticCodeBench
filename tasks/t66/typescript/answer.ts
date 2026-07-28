function parseDurationStringToTimedelta(timeString: string): {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
} {
    const result = { days: 0, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 };
    const pattern = /(\d+)\s*(ms|[dhms])/g;
    let match: RegExpExecArray | null;

    while ((match = pattern.exec(timeString)) !== null) {
        const amount = Number(match[1]);
        const unit = match[2];

        if (unit === 'd') result.days = amount;
        else if (unit === 'h') result.hours = amount;
        else if (unit === 'm') result.minutes = amount;
        else if (unit === 's') result.seconds = amount;
        else result.milliseconds = amount;
    }

    return result;
}
