import openpyxl
import os
import json

def excel_to_array_of_objects(country,file_path):
    workbook = openpyxl.load_workbook(file_path)
    sheet = workbook.active

    # get the header row as a list
    header_row = [cell.value for cell in sheet[1]]

    # iterate over the rows and create a dictionary for each row
    data = []
    for row in sheet.iter_rows(min_row=2, values_only=True):
        obj = {
            "Country" : country,
            "Song Name" : row[0],
            "Tracking Id" : row[1]
        }
        # print(row_data)
        data.append(obj)

    return data

def read_json_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        data = json.load(file)
        return data

def write_json_file(file_path, data):
    with open(file_path, 'w', encoding='utf-8') as file:
        json.dump(data, file, indent=4)

def delete_file(csv_path='output.csv'):
    if os.path.exists(csv_path):
      os.remove(csv_path)

# xl_input_file = 'bangladesh.xlsx'
# country = 1

xl_input_file = 'kolkata.xlsx'
country = 0

xldata = excel_to_array_of_objects(country,xl_input_file)
# print(xldata)
# json_output_file = 'bangladesh_song_features_json.json'
json_output_file = 'kolkata_song_features_json.json'

delete_file(json_output_file)
write_json_file(json_output_file,xldata)

readjson = read_json_file(json_output_file)
print(readjson)
print(len(xldata))