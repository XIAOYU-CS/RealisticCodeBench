import csv
import os


def csv_to_sql_insert(csv_file_path):
    table_name = os.path.splitext(os.path.basename(csv_file_path))[0]

    # Open the CSV file and read its contents
    with open(csv_file_path, mode='r', newline='') as file:
        reader = csv.reader(file)

        # Get the header (first row) for column names
        headers = next(reader)

        # Prepare the SQL insert statement
        insert_statements = []

        for row in reader:
            values = []
            for value in row:
                escaped_value = value.replace("'", "''")
                values.append(f"'{escaped_value}'")

            # Join column names and values to form an INSERT statement
            insert_statement = f"INSERT INTO {table_name} ({', '.join(headers)}) VALUES ({', '.join(values)});"
            insert_statements.append(insert_statement)

    # Combine all insert statements into a single output
    return '\n'.join(insert_statements)
