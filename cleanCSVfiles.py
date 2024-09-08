import pandas as pd
import os

# Define the path to your folder containing CSV files
folder_path = 'test_folder'

# Iterate over all files in the folder
for file_name in os.listdir(folder_path):
    if file_name.endswith('.csv'):
        file_path = os.path.join(folder_path, file_name)
        
        # Load the CSV file
        df = pd.read_csv(file_path)

        # Clean the 'Type' column
        df['Type'] = df['Type'].str.strip("[]'").str.replace("'", "")

        # Save the cleaned CSV file (overwrite the original file)
        df.to_csv(file_path, index=False)

        print(f"Cleaned and saved '{file_name}'.")

print("All files have been cleaned.")
