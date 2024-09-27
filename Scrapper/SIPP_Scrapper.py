from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.remote.webelement import WebElement
from selenium.webdriver.chrome.options import Options
from pymongo import MongoClient
import pandas as pd
import time
import sys
import os
os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"
sys.path.append(os.path.abspath('../Code'))

from credentials import connection_string

def suppress_error():
    _chrome_options = Options()
    _chrome_options.add_experimental_option("excludeSwitches", ["enable-logging"])
    
    return _chrome_options

def upload_to_mongodb(df, error_code):
    database_name = 'Jakarta_Utara'
    collection_name = "Jakarta_Utara_Raw"
    error_catch_collection = f"Jakarta_Utara_Raw_{time.time()}"

    if  error_code == 400:
        try:
            client = MongoClient(connection_string)
            db = client[database_name]
            collection = db[error_catch_collection]

            data_dict = df.to_dict(orient='records')
            collection.insert_many(data_dict)
            print("ERROR CATCH! Data Uploaded to MongoDB")

        except Exception as e:
            print(f"Error Uploading to MongoDB: {e}")
    else:
        try:
            client = MongoClient(connection_string)
            db = client[database_name]
            collection = db[collection_name]
            collection.drop()

            data_dict = df.to_dict(orient='records')
            collection.insert_many(data_dict)
            print("New Data Uploaded to MongoDB")

        except Exception as e:
            print(f"Error Uploading to MongoDB: {e}")

def wait_page(driver: webdriver) -> WebElement:
    _menu_detail = WebDriverWait(driver, 15).until(
        EC.visibility_of_element_located((By.CSS_SELECTOR, '.usual')))
    
    return _menu_detail

def scrap_data_umum(menu_detail:  WebElement) -> tuple[str, str, str, list[str], list[str], str]:

    _dakwaan_found = False
    _nama_penuntut_list = []
    _nama_terdakwa_list = []
    _tabel_data_umum = menu_detail.find_element(By.XPATH, ".//following::table[1]")
    _rows_data_umum = _tabel_data_umum.find_elements(By.CSS_SELECTOR, "tr:not(tr tr)")

    try:
        for _row_data_umum in _rows_data_umum:
            _contents = _row_data_umum.find_elements(By.TAG_NAME, "td")

            _header_text = _contents[0].text.strip()
            _content_text = _contents[1]

            if _header_text == "Tanggal Pendaftaran":    
                _tanggal_pendaftaran_content = _content_text.text.strip()
                # print(_tanggal_pendaftaran_content)
            
            elif _header_text == "Klasifikasi Perkara":
                _klasifikasi_perkara_content = _content_text.text.strip()
                # print(_klasifikasi_perkara_content)

            elif _header_text == "Nomor Perkara":
                _nomor_perkara_content = _content_text.text.strip()
                # print(_nomor_perkara_content)

            elif _header_text == "Penuntut Umum":
                # print(_content_text.get_attribute("outerHTML"))
                _rows_penuntut_umum = _content_text.find_elements(By.TAG_NAME, 'tr')
                # print("ROWS_PENUNTUT_UMUM")

                for index, _row_penuntut_umum in enumerate(_rows_penuntut_umum):
                    if index == 0:
                        continue

                    # print("ROW_PENUNTUT_UMUM")
                    _contents_penuntut_umum = _row_penuntut_umum.find_elements(By.TAG_NAME, 'td')
                    # print("TD FOUND")

                    _nama_penuntut = _contents_penuntut_umum[1].text.strip()
                    _nama_penuntut_list.append(_nama_penuntut) 

                # print(_nama_penuntut_list)

            elif _header_text == "Terdakwa":
                # print(_content_text.get_attribute("outerHTML"))
                _rows_terdakwa = _content_text.find_elements(By.TAG_NAME, 'tr')
                # print("ROWS_terdakwa")

                for index, _row_terdakwa in enumerate(_rows_terdakwa):
                    if index == 0:
                        continue

                    # print("ROW_terdakwa")
                    _contents_terdakwa = _row_terdakwa.find_elements(By.TAG_NAME, 'td')
                    # print("TD FOUND")

                    _nama_terdakwa = _contents_terdakwa[1].text.strip()
                    _nama_terdakwa_list.append(_nama_terdakwa) 

            elif not _dakwaan_found and _header_text == "Dakwaan":
                if len(_contents) > 1:
                    _dakwaan_content = _contents[1].text.strip()
                    # print(dakwaan_content)
                    _dakwaan_found = True
    except:
        print("error at data umum")
    
    return _tanggal_pendaftaran_content, _klasifikasi_perkara_content, _nomor_perkara_content, _nama_penuntut_list, _nama_terdakwa_list, _dakwaan_content

def scrap_data_penetapan(menu_detail: WebElement) -> list:
    _hakim_list = []
    _tabel_penetapan = menu_detail.find_element(By.ID, "tabs2")
    _rows_penetapan = _tabel_penetapan.find_elements(By.CSS_SELECTOR, "tr:not(tr tr)")
    # print("PASS ROWS_PENETAPAN")
    # print("Table HTML:")
    # print(tabel_penetapan.get_attribute('outerHTML'))

    for _index_penetapan, _row_penetapan in enumerate(_rows_penetapan):
        # print(index_penetapan)
        if _index_penetapan == 1:
            try:
                _tabel_penetapan_hakim = _row_penetapan.find_elements(By. TAG_NAME, 'td')
                _tabel_penetapan_hakim = _tabel_penetapan_hakim[0]

                _content_tabel_penetapan_hakim = _tabel_penetapan_hakim.find_element(By.XPATH, ".//following::table[1]")
                _rows_penetapan_hakim = _content_tabel_penetapan_hakim.find_elements(By.CSS_SELECTOR, "tr")
                # print(tabel_penetapan_hakim.get_attribute('outerHTML'))
                # print(rows_penetapan_hakim.text)

                for _index_penetapan_hakim, _row_penetapan_hakim in enumerate(_rows_penetapan_hakim):
                    # print(f" INDEX PENETAPAN HAKIM : {index_penetapan_hakim}")
                    if _index_penetapan_hakim == 0:
                        continue

                    try:
                        _nama_hakim = _row_penetapan_hakim.find_elements(By.TAG_NAME, 'td')[1]
                        _posisi_hakim = _row_penetapan_hakim.find_elements(By.TAG_NAME, 'td')[2]
                        _keaktifan_hakim = _row_penetapan_hakim.find_elements(By.TAG_NAME, 'td')[3]
                        # print(row_penetapan_hakim.text)

                        _nama_hakim = _nama_hakim.text.strip()
                        _posisi_hakim = _posisi_hakim.text.strip()
                        _keaktifan_hakim = _keaktifan_hakim.text.strip()

                        _hakim_content = _nama_hakim + '~' + _posisi_hakim + '~' + _keaktifan_hakim
                        _hakim_list.append(_hakim_content)
                        
                    except Exception as e:
                        print(f"error at tabel penetapan hakim {e}")

            except Exception as e:
                print(f"error at tabel penetapan {e}")

    # print(_hakim_list)
    return _hakim_list        

def scrap_data_saksi(menu_detail) -> int:
    _tabel_saksi = menu_detail.find_element(By.ID, 'tabs26')
    _rows_tabel_saksi = _tabel_saksi.find_elements(By.CSS_SELECTOR, 'tr')

    _jumlah_saksi = len(_rows_tabel_saksi) - 1

    # print(_jumlah_saksi)   
    return  _jumlah_saksi

def scrap_data_putusan(menu_detail) -> tuple[list, str]:
    _putusan_hukuman_list = []
    _tabel_putusan = menu_detail.find_element(By.ID, "tabs10")
    _rows_putusan = _tabel_putusan.find_elements(By.CSS_SELECTOR, "tr:not(tr tr)")
    # print(tabel_putusan.get_attribute("outerHTML"))

    try:
        for _row_putusan in _rows_putusan:
            _contents = _row_putusan.find_elements(By.TAG_NAME, "td")

            _header_text = _contents[0].text.strip()
            _content_text = _contents[1]

            # print(f"row_putusan {header_text}")

            if _header_text == "Status Putusan":
                # print(content_text.get_attribute('outerHTML'))
                _tabel_status_putusan = _content_text.find_element(By.XPATH, ".//following::table[1]") #find element opsional
                _rows_status_putusan = _tabel_status_putusan.find_elements(By.CSS_SELECTOR,  "tr")

                for _index, _row_status_putusan in enumerate(_rows_status_putusan):
                    # print(row_status_putusan.get_attribute('outerHTML'))
                    if _index == 0:
                        continue
                    
                    _columns = _row_status_putusan.find_elements(By.CSS_SELECTOR, "td")

                    _nama_terdakwa = _columns[1].text.strip()
                    _putusan_hukuman = _columns[3].text.strip()
                    _hukuman_content = _nama_terdakwa + "~" + _putusan_hukuman
                    _putusan_hukuman_list.append(_hukuman_content)
            
            # Amar Putusan untuk mengambil data barang bukti
            if _header_text == "Amar Putusan":
                _amar_putusan = _content_text.text.strip()
                # print(_amar_putusan)

        # print(_putusan_hukuman_list)       
        return _putusan_hukuman_list, _amar_putusan

    except Exception as e:
        print(f"error at tabel putusan {e}")

def main_scrapper(chrome_options, url, previous_data):

    if os.path.exists(previous_data):
        df = pd.read_csv(previous_data)

    else:
        df = pd.DataFrame(columns=[
            'status_perkara', 
            'nomor_perkara', 
            'klasifikasi_perkara', 
            'tanggal_pendaftaran', 
            'lama_proses',
            'terdakwa', 
            'penuntut_umum', 
            'hakim', 
            'jumlah_saksi', 
            'putusan_hukuman', 
            'barang_bukti',
            'dakwaan'
        ])

    print(df)

    driver = webdriver.Chrome(options=chrome_options)
    driver.get(url)

    jumlah_data_awal = len(df)
    jumlah_data = jumlah_data_awal
    
    print(jumlah_data)

    menu = WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.CSS_SELECTOR, '.cssmenu'))
    )

    pidana_menu = menu.find_element(By.XPATH, ".//a[text()='Pidana']")
    pidana_menu.click()

    pidana_biasa = WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.XPATH, "//a[text()='Pidana Biasa']"))
    )
    pidana_biasa.click()

    try:
        for page in range(0, 76):
            WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.ID, 'tablePerkaraAll'))
            )

            try:
                driver.implicitly_wait(10)

                tabel_dashboard = driver.find_element(By.ID, 'tablePerkaraAll')
                rows = tabel_dashboard.find_elements(By.TAG_NAME, 'tr')

                for i in range(len(rows)):
                    if i == 0:
                        continue
                    
                    try:
                        WebDriverWait(driver, 10).until(
                            EC.presence_of_element_located((By.ID, 'tablePerkaraAll'))
                        )                

                        tabel_dashboard = driver.find_element(By.ID, 'tablePerkaraAll')
                        row = tabel_dashboard.find_elements(By.TAG_NAME, 'tr')[i]

                        nomor_perkara = row.find_elements(By.TAG_NAME, 'td')[1]
                        nomor_perkara_content = nomor_perkara.text.strip()
                        status_perkara = row.find_elements(By.TAG_NAME, 'td')[5]
                        lama_proses = row.find_elements(By.TAG_NAME, 'td')[6]
                        detail_perkara = row.find_elements(By.TAG_NAME, 'td')[-1]
                        status_perkara_content = status_perkara.text.strip()
                        lama_proses_content = lama_proses.text.strip()
                        
                        if status_perkara_content == "Minutasi" and nomor_perkara_content not in df['nomor_perkara'].astype(str).values:
                            print("\n----------------------------------------------------------------")
                            print(f"{jumlah_data} - {nomor_perkara_content} - {status_perkara_content}")
                            
                            # Page Data Umum
                            link_detail_perkara = WebDriverWait(driver, 60).until(
                                EC.element_to_be_clickable((detail_perkara.find_element(By.TAG_NAME, 'a')))
                            )
                            link_detail_perkara.click()

                            try:
                                menu_detail = wait_page(driver)
                                tanggal_pendaftaran_content, klasifikasi_perkara_content, nomor_perkara_content, nama_penuntut_list, nama_terdakwa_list, dakwaan_content = scrap_data_umum(menu_detail)
                                
                                # Page Penetapan
                                menu_detail_penetapan = menu_detail.find_element(By.XPATH, ".//a[text()='Penetapan']")
                                menu_detail_penetapan.click()

                                menu_detail = wait_page(driver)
                                hakim_list = scrap_data_penetapan(menu_detail)

                                # Page Saksi
                                menu_detail_saksi = menu_detail.find_element(By.XPATH, ".//a[text()='Saksi']")
                                menu_detail_saksi.click()      

                                menu_detail = wait_page(driver)
                                jumlah_saksi = scrap_data_saksi(menu_detail)
                                            
                                # Page Putusan
                                menu_detail_putusan = menu_detail.find_element(By.XPATH, ".//a[text()='Putusan']")
                                menu_detail_putusan.click()

                                menu_detail = wait_page(driver)
                                putusan_hukuman_list, amar_putusan = scrap_data_putusan(menu_detail)
                                
                                new_data = {
                                    'status_perkara': status_perkara_content,
                                    'nomor_perkara': nomor_perkara_content,
                                    'klasifikasi_perkara': klasifikasi_perkara_content,
                                    'tanggal_pendaftaran': tanggal_pendaftaran_content,
                                    'lama_proses': lama_proses_content,
                                    'terdakwa' : nama_terdakwa_list,
                                    'penuntut_umum': nama_penuntut_list,
                                    'hakim': hakim_list,
                                    'jumlah_saksi': jumlah_saksi,
                                    'putusan_hukuman': putusan_hukuman_list,
                                    'barang_bukti': amar_putusan,
                                    'dakwaan': dakwaan_content
                                }

                                new_data_df = pd.DataFrame([new_data])
                                df = pd.concat([df, new_data_df], ignore_index=True)
                                print(df.iloc[-1])

                                jumlah_data += 1

                                print("----------------------------------------------------------------\n")

                                # Back to Dashboard                   
                                driver.back()
                                WebDriverWait(driver, 10).until(
                                    EC.visibility_of_element_located((By.CSS_SELECTOR, '.cssmenu'))
                                )
                                driver.execute_script("window.scrollTo(0, 0);")

                            except Exception as e:
                                print(f"Error scrapping data in {nomor_perkara_content}: {e}")
                                driver.back()
                                WebDriverWait(driver, 10).until(
                                    EC.visibility_of_element_located((By.CSS_SELECTOR, '.cssmenu'))
                                )
                                driver.execute_script("window.scrollTo(0, 0);")
                                continue
                        else:
                            print(f"Skipping {nomor_perkara_content} - {status_perkara_content}")
                            continue

                    except Exception as e:
                        print(f"Error in row {i} Page {page+1}: {nomor_perkara_content} - {e}")
                        continue
                
                if len(df) > jumlah_data_awal:
                    df.to_csv(previous_data, index=False)
                    print("CSV Data Saved!")
                    upload_to_mongodb(df, 0)

                next_button = driver.find_element(By.CSS_SELECTOR, 'a.page-link.next')
                next_button.click()

                time.sleep(2)

            except Exception as e:
                print("Error:", e)

                df.to_csv(f'Data/{SIPP}_Error_Catch_{time.time()}.csv', index=False)
                print("ERROR CATCH! CSV Data Saved!")

                upload_to_mongodb(df, 400)
            
    except Exception as e:
        print("Error:", e)
        
        df.to_csv(f'Data/{SIPP}_ERROR_CATCH!_{time.time()}.csv', index=False)
        print("ERROR CATCH! CSV Data Saved!")
        
        upload_to_mongodb(df, 400)

    finally:
        if len(df) > jumlah_data_awal:
            df.to_csv(previous_data, index=False)
            print("CSV Data Saved!")
            upload_to_mongodb(df, 0)
            print("Scrapping Done!")

        else:
            print("Scrapping Done!")
            print("No New Data!")
        driver.quit()

url = "https://sipp.pn-jakartautara.go.id/"
SIPP = "Jakarta_Utara_Raw"
previous_data = f"Data/{SIPP}.csv"

chrome_options = suppress_error()
main_scrapper(chrome_options, url, previous_data)
