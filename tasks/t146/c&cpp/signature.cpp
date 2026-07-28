/**
 * @brief Parses a cron expression and checks whether it includes any execution times between 2:00 AM and 4:00 AM (inclusive).
 *
 * @note This does not evaluate actual trigger times—only whether the hour field logically includes 2, 3, or 4.
 * @note Assumes the cron expression uses 24-hour format and the hour field represents local time.
 *
 * @param cronExpression The cron expression string to analyze (e.g., "0 2-4 * * *").
 * @return @c true if the cron expression includes hours between 2 AM and 4 AM (inclusive), @c false otherwise.
 */
bool is_cron_between2_and4_am(const std::string& cronExpression);