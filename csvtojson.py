import csv
import json

def csv_to_json(csv_file_path, json_file_path):
    # Read the CSV file
    with open(csv_file_path, mode='r', newline='', encoding='utf-8') as csv_file:
        csv_reader = csv.DictReader(csv_file)  # Read CSV data into a dictionary

        # Convert CSV data to a list of dictionaries
        data = [row for row in csv_reader]

    # Write JSON data to a file
    with open(json_file_path, mode='w', encoding='utf-8') as json_file:
        json.dump(data, json_file, indent=4)  # Convert list of dictionaries to JSON and write to file

# Example usage
csv_file_path = 'Afghanistan_AF.csv'
json_file_path = 'data.json'
csv_to_json(csv_file_path, json_file_path)
print("Success")
