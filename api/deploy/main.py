import re
import mysql.connector
import requests
import sentry_sdk

from bs4 import BeautifulSoup
from datetime import datetime
from sentry_sdk import capture_message
from utils.get_env_var import *


# function to parse and get all garage data
def get_garage_data(page):
    soup = BeautifulSoup(page, "html.parser")

    garages_table = None
    json_data = []

    for table in soup.find_all("table"):
        if "garage" in table.text.lower():
            garages_table = table.find_all("tr")[5:-1]
            break
        else:
            capture_message("Error: Database table not found.")

    for column in garages_table:
        garage_name = column.find_all("td")[0].text.strip().replace("Garage ", "")
        spaces_available = int(column.find_all("td")[1].text.split("/")[0].strip())
        total_capacity = int(column.find_all("td")[1].text.split("/")[1].strip())
        percentage = int(
            re.search("(?<=percent:)(.*)(?=[\n\r])", str(column.find_all("td")[2])).group().strip().replace(",", ""))

        if percentage < 0:
            percentage = 0
        elif percentage > 100:
            percentage = 100

        obj = {
            garage_name: {
                "Spaces Available": spaces_available,
                "Total Capacity": total_capacity,
                "Percent Full": percentage,
            }
        }
        json_data.append(obj)

    return json_data


def main():
    db = None
    sentry_sdk.init(os.environ['SENTRY_URL'], traces_sample_rate=1.0)

    try:
        db = mysql.connector.connect(
            host=os.environ['DB_HOST'],
            port=os.environ['DB_PORT'],
            user=os.environ['DB_USER'],
            password=os.environ['DB_PASS'],
            database=os.environ['DB_NAME']
        )
    except mysql.connector.DatabaseError:
        capture_message("Error: Could not establish connection to database.")

    page = None
    try:
        page = requests.get("https://secure.parking.ucf.edu/GarageCount/").content
    except requests.RequestException or requests.ConnectionError:
        capture_message("Error: Could not connect to the UCF .")

    garage_data = None
    if page:
        garage_data = get_garage_data(page)

    current_date_and_time = datetime.now().strftime("%Y-%m-%d %H:%M")
    cursor = db.cursor()

    # check if table 'ucf_parking' exists, if it doesn't, create one
    cursor.execute("""CREATE TABLE IF NOT EXISTS parking_data (date_and_time DATETIME, 
        garage_a_spaces_available VARCHAR(40), garage_a_total_capacity VARCHAR(40), garage_a_percent_full VARCHAR(40), 
        garage_b_spaces_available VARCHAR(40), garage_b_total_capacity VARCHAR(40),garage_b_percent_full VARCHAR(40),
        garage_c_spaces_available VARCHAR(40), garage_c_total_capacity VARCHAR(40), garage_c_percent_full VARCHAR(40),
        garage_d_spaces_available VARCHAR(40), garage_d_total_capacity VARCHAR(40), garage_d_percent_full VARCHAR(40),
        garage_h_spaces_available VARCHAR(40), garage_h_total_capacity VARCHAR(40), garage_h_percent_full VARCHAR(40),
        garage_i_spaces_available VARCHAR(40), garage_i_total_capacity VARCHAR(40),garage_i_percent_full VARCHAR(40),
        libra_garage_spaces_available VARCHAR(40), libra_garage_total_capacity VARCHAR(40), libra_garage_percent_full VARCHAR(40))""")
    db.commit()



    #Check if table parking data exists in the database. If not, add index on the date_and_time column.
    sql = "SELECT COUNT(*) FROM information_schema.tables  WHERE table_schema = DATABASE() AND table_name = 'parking_data'"
    cursor.execute(sql)
    for data in cursor:
        table_exists = True if data[0] == 1 else False

    if (not table_exists):
        sql = "ALTER TABLE parking_data ADD INDEX (date_and_time)"
        cursor.execute(sql)
        db.commit()


    appendarray = [current_date_and_time]

    for obj in garage_data:
        vals = list(obj.values())[0]
        appendarray.append(vals["Spaces Available"])
        appendarray.append(vals["Total Capacity"])
        appendarray.append(vals["Percent Full"])

    #Insert data into the database table
    sql = "INSERT INTO parking_data VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
    cursor.execute(sql, appendarray)
    db.commit()



    cursor.close()
    db.close()


# Run Program : get garage data and store it in the database
if __name__ == '__main__':
    main()
