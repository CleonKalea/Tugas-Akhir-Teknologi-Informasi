from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pandas as pd
import time

def suppress_error():
    import os
    import tensorflow as tf
    from selenium.webdriver.chrome.options import Options

    _chrome_options = Options()
    _chrome_options.add_experimental_option("excludeSwitches", ["enable-logging"])
    os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'  # '3' only shows errors, '2' for warnings, '1' for info

    return _chrome_options

def wait_page(driver):
    _menu_detail = WebDriverWait(driver, 15).until(
        EC.visibility_of_element_located((By.CSS_SELECTOR, '.usual')))
    
    return _menu_detail

def scrap_data_umum(menu_detail):
    _dakwaan_found = False
    _nama_penuntut_list = []
    _tabel_data_umum = menu_detail.find_element(By.XPATH, ".//following::table[1]")
    _rows_data_umum = _tabel_data_umum.find_elements(By.CSS_SELECTOR, "tr:not(tr tr)")

    try:
        for _row_data_umum in _rows_data_umum:
            _contents = _row_data_umum.find_elements(By.TAG_NAME, "td")

            _header_text = _contents[0].text.strip()
            _content_text = _contents[1]

            if _header_text == "Tanggal Pendaftaran":    
                _tanggal_pendaftaran_content = _content_text.text.strip()
                print(_tanggal_pendaftaran_content)
            
            elif _header_text == "Klasifikasi Perkara":
                _klasifikasi_perkara_content = _content_text.text.strip()
                print(_klasifikasi_perkara_content)

            elif _header_text == "Nomor Perkara":
                _nomor_perkara_content = _content_text.text.strip()
                print(_nomor_perkara_content)

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

                print(_nama_penuntut_list)

            elif not _dakwaan_found and _header_text == "Dakwaan":
                if len(_contents) > 1:
                    _dakwaan_content = _contents[1].text.strip()
                    # print(dakwaan_content)
                    _dakwaan_found = True
    except:
        print("error at data umum")
    
    return _tanggal_pendaftaran_content, _klasifikasi_perkara_content, _nomor_perkara_content, _nama_penuntut_list, _dakwaan_content

def scrap_data_penetapan(menu_detail, hakim_list):
    tabel_penetapan = menu_detail.find_element(By.ID, "tabs2")
    rows_penetapan = tabel_penetapan.find_elements(By.CSS_SELECTOR, "tr:not(tr tr)")
    # print("PASS ROWS_PENETAPAN")
    # print("Table HTML:")
    # print(tabel_penetapan.get_attribute('outerHTML'))

    for index_penetapan, row_penetapan in enumerate(rows_penetapan):
        # print(index_penetapan)
        if index_penetapan == 1:
            try:
                tabel_penetapan_hakim = row_penetapan.find_elements(By. TAG_NAME, 'td')
                tabel_penetapan_hakim = tabel_penetapan_hakim[0]

                content_tabel_penetapan_hakim = tabel_penetapan_hakim.find_element(By.XPATH, ".//following::table[1]")
                rows_penetapan_hakim = content_tabel_penetapan_hakim.find_elements(By.CSS_SELECTOR, "tr")
                # print(tabel_penetapan_hakim.get_attribute('outerHTML'))
                # print(rows_penetapan_hakim.text)

                for index_penetapan_hakim, row_penetapan_hakim in enumerate(rows_penetapan_hakim):
                    # print(f" INDEX PENETAPAN HAKIM : {index_penetapan_hakim}")
                    if index_penetapan_hakim == 0:
                        continue

                    try:
                        nama_hakim = row_penetapan_hakim.find_elements(By.TAG_NAME, 'td')[1]
                        posisi_hakim = row_penetapan_hakim.find_elements(By.TAG_NAME, 'td')[2]
                        # print(row_penetapan_hakim.text)

                        nama_hakim = nama_hakim.text.strip()
                        posisi_hakim = posisi_hakim.text.strip()

                        hakim_content = nama_hakim + '~' + posisi_hakim
                        hakim_list.append(hakim_content)
                        
                    except Exception as e:
                        print(f"error at tabel penetapan hakim {e}")

            except Exception as e:
                print(f"error at tabel penetapan {e}")

    print(hakim_list)        

def scrap_data_saksi(menu_detail):
    tabel_saksi = menu_detail.find_element(By.ID, 'tabs26')
    rows_tabel_saksi = tabel_saksi.find_elements(By.CSS_SELECTOR, 'tr')

    jumlah_saksi = len(rows_tabel_saksi) - 1

    print(jumlah_saksi)   

def scrap_data_putusan(menu_detail, putusan_hukuman_list):
    tabel_putusan = menu_detail.find_element(By.ID, "tabs10")
    rows_putusan = tabel_putusan.find_elements(By.CSS_SELECTOR, "tr:not(tr tr)")
    # print(tabel_putusan.get_attribute("outerHTML"))

    try:
        for row_putusan in rows_putusan:
            contents = row_putusan.find_elements(By.TAG_NAME, "td")

            header_text = contents[0].text.strip()
            content_text = contents[1]

            # print(f"row_putusan {header_text}")

            if header_text == "Status Putusan":
                # print(content_text.get_attribute('outerHTML'))
                tabel_status_putusan = content_text.find_element(By.XPATH, ".//following::table[1]") #find element opsional
                rows_status_putusan = tabel_status_putusan.find_elements(By.CSS_SELECTOR,  "tr")

                for index, row_status_putusan in enumerate(rows_status_putusan):
                    # print(row_status_putusan.get_attribute('outerHTML'))
                    if index == 0:
                        continue
                    
                    columns = row_status_putusan.find_elements(By.CSS_SELECTOR, "td")

                    nama_terdakwa = columns[1].text.strip()
                    putusan_hukuman = columns[3].text.strip()

                    hukuman_content = nama_terdakwa + "~" + putusan_hukuman

                    putusan_hukuman_list.append(hukuman_content)
            
            #Amar Putusan untuk mengambil data barang bukti
            if header_text == "Amar Putusan":
                amar_putusan = content_text.text.strip()
                print(amar_putusan)

        print(putusan_hukuman_list)       

    except Exception as e:
        print(f"error at tabel putusan {e}")

def main_scrapper(chrome_options, url):

    df = pd.DataFrame()

    driver = webdriver.Chrome(options=chrome_options)
    driver.get(url)

    jumlah_data = 0

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
        for page in range(0, 10):
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

                        # nomor_perkara = row.find_elements(By.TAG_NAME, 'td')[1]
                        # tanggal_register = row.find_elements(By.TAG_NAME, 'td')[2]
                        # klasifikasi_perkara = row.find_elements(By.TAG_NAME, 'td')[3]
                        status_perkara = row.find_elements(By.TAG_NAME, 'td')[5]
                        lama_proses = row.find_elements(By.TAG_NAME, 'td')[6]
                        detail_perkara = row.find_elements(By.TAG_NAME, 'td')[-1]

                        # nomor_perkara_content = nomor_perkara.text.strip()
                        # tanggal_register_content = tanggal_register.text.strip()
                        # klasifikasi_perkara_content = klasifikasi_perkara.text.strip()
                        status_perkara_content = status_perkara.text.strip()
                        lama_proses_content = lama_proses.text.strip()

                        if status_perkara_content == "Minutasi":
                            putusan_hukuman_list = []
                            hakim_list = []
                            jumlah_data += 1
                            
                            print("\n----------------------------------------------------------------")
                            print(f"{jumlah_data} - {nomor_perkara_content} - {tanggal_register_content} - {klasifikasi_perkara_content} - {status_perkara_content}")
                            
                            # Page Data Umum

                            link_detail_perkara = WebDriverWait(driver, 10).until(
                                EC.element_to_be_clickable((detail_perkara.find_element(By.TAG_NAME, 'a')))
                            )
                            link_detail_perkara.click()

                            menu_detail = wait_page(driver)
                            tanggal_pendaftaran_content, klasifikasi_perkara_content, nomor_perkara_content, nama_penuntut_list, dakwaan_content = scrap_data_umum(menu_detail)
                            
                            # Page Penetapan
                            menu_detail_penetapan = menu_detail.find_element(By.XPATH, ".//a[text()='Penetapan']")
                            menu_detail_penetapan.click()

                            menu_detail = wait_page(driver)
                            scrap_data_penetapan(menu_detail, hakim_list)

                            # Page Saksi
                            menu_detail_saksi = menu_detail.find_element(By.XPATH, ".//a[text()='Saksi']")
                            menu_detail_saksi.click()      

                            menu_detail = wait_page(driver)
                            scrap_data_saksi(menu_detail)
                                          
                            # Page Putusan
                            menu_detail_putusan = menu_detail.find_element(By.XPATH, ".//a[text()='Putusan']")
                            menu_detail_putusan.click()

                            menu_detail = wait_page(driver)
                            scrap_data_putusan(menu_detail, putusan_hukuman_list)
                            
                            df['status_perkara'] = status_perkara_content
                            df['nomor_perkara'] = nomor_perkara_content
                            df['klasifikasi_perkara'] = klasifikasi_perkara_content
                            df['tanggal_pendaftaran'] = tanggal_pendaftaran_content
                            df['lama_proses'] = lama_proses_content
                            df['penuntut_umum'] = nama_penuntut_list
                            df['dakwaan'] = dakwaan_content
                            df['hakim'] = hakim_list
                            df['jumlah_saksi'] = jumlah_saksi
                            df['putusan_hukuman'] = putusan_hukuman_list
                            df['barang_bukti'] = amar_putusan

                            # Back to Dashboard                   
                            driver.back()
                            WebDriverWait(driver, 10).until(
                                EC.visibility_of_element_located((By.CSS_SELECTOR, '.cssmenu'))
                            )
                            driver.execute_script("window.scrollTo(0, 0);")

                        else:
                            # print(f"{page}-{i}. Bukan Minutasi")
                            continue

                    except Exception as e:
                        print(f"Error in row {i} Page {page+1}: {nomor_perkara}")
                        # driver.quit()
                        continue

                next_button = driver.find_element(By.CSS_SELECTOR, 'a.page-link.next')
                next_button.click()

                time.sleep(2)

            except Exception as e:
                print("Error:", e)
            
    except Exception as e:
        print("Error:", e)

    finally:
        driver.quit()


url = "https://sipp.pn-jakartautara.go.id/"

chrome_options = suppress_error()
main_scrapper(chrome_options, url)
