import pandas as pd

# Load the CSV file
df = pd.read_csv('Afghanistan_AF.csv')

# Clean the 'Type' column
df['Type'] = df['Type'].str.strip("[]'").str.replace("'", "")

# Save the cleaned CSV file
df.to_csv('cleaned_file.csv', index=False)

print("CSV file cleaned and saved as 'cleaned_file.csv'.")
