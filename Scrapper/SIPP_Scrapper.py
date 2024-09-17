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

def main_scrapper(chrome_options,  url):
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

                        nomor_perkara = row.find_elements(By.TAG_NAME, 'td')[1]
                        tanggal_register = row.find_elements(By.TAG_NAME, 'td')[2]
                        klasifikasi_perkara = row.find_elements(By.TAG_NAME, 'td')[3]
                        status_perkara = row.find_elements(By.TAG_NAME, 'td')[5]
                        lama_proses = row.find_elements(By.TAG_NAME, 'td')[6]
                        detail_perkara = row.find_elements(By.TAG_NAME, 'td')[-1]

                        nomor_perkara_content = nomor_perkara.text.strip()
                        tanggal_register_content = tanggal_register.text.strip()
                        klasifikasi_perkara_content = klasifikasi_perkara.text.strip()
                        status_perkara_content = status_perkara.text.strip()
                        lama_proses_content = lama_proses.text.strip()

                        if status_perkara_content == "Minutasi":
                            dakwaan_found = False
                            jumlah_data += 1
                            print(f"{jumlah_data} - {nomor_perkara_content} - {tanggal_register_content} - {klasifikasi_perkara_content} - {status_perkara_content}")
                            
                            # Page Data Umum
                            link_detail_perkara = detail_perkara.find_element(By.TAG_NAME, 'a')
                            link_detail_perkara.click()

                            menu_detail = WebDriverWait(driver, 15).until(
                                EC.visibility_of_element_located((By.CSS_SELECTOR, '.usual')))
                            
                            tabel_data_umum = menu_detail.find_element(By.XPATH, ".//following::table[1]")
                            rows_data_umum = tabel_data_umum.find_elements(By.CSS_SELECTOR, "tr:not(tr tr)")

                            try:
                                for row_data_umum in rows_data_umum:
                                    contents = row_data_umum.find_elements(By.TAG_NAME, "td")

                                    header_text = contents[0].text.strip()  # Assuming header text is in the first cell
                                    content_text = contents[1].text.strip()  # Assuming content is in the second cell

                                    if header_text == "Tanggal Pendaftaran":    
                                        tanggal_pendaftaran_content = content_text
                                        print(tanggal_pendaftaran_content)
                                    
                                    elif header_text == "Klasifikasi Perkara":
                                        klasifikasi_perkara_content = content_text
                                        print(klasifikasi_perkara_content)

                                    elif header_text == "Nomor Perkara":
                                        nomor_perkara_content = content_text
                                        print(nomor_perkara_content)

                                    # elif header_text == "Penuntut Umum":
                                    # elif header_text == "Terdakwa":

                                    elif not dakwaan_found and header_text == "Dakwaan":
                                        if len(contents) > 1:
                                            dakwaan_content = contents[1].text.strip()
                                            print(dakwaan_content)
                                            dakwaan_found = True
                            except:
                                print("Tidak ada data umum yang ditemukan")
                                continue

                            # Page Penetapan
                            menu_detail_penetapan = menu_detail.find_element(By.XPATH, ".//a[text()='Penetapan']")
                            menu_detail_penetapan.click()

                            menu_detail = WebDriverWait(driver, 15).until(
                                EC.visibility_of_element_located((By.CSS_SELECTOR, '.usual')))
                            
                            # Page Saksi
                            menu_detail_saksi = menu_detail.find_element(By.XPATH, ".//a[text()='Saksi']")
                            menu_detail_saksi.click()      


                            menu_detail = WebDriverWait(driver, 15).until(
                                EC.visibility_of_element_located((By.CSS_SELECTOR, '.usual')))
                                                            
                            # Page Putusan
                            menu_detail_putusan = menu_detail.find_element(By.XPATH, ".//a[text()='Putusan']")
                            menu_detail_putusan.click()

                            menu_detail = WebDriverWait(driver, 15).until(
                                EC.visibility_of_element_located((By.CSS_SELECTOR, '.usual')))                        

                            # Page Barang Bukti
                            menu_detail_barang_bukti = menu_detail.find_element(By.XPATH, ".//a[text()='Barang Bukti']")
                            menu_detail_barang_bukti.click()

                            # Back to Dashboard
                            driver.back()
                            driver.execute_script("window.scrollTo(0, 0);")
                        else:
                            # print(f"{page}-{i}. Bukan Minutasi")
                            continue

                    except Exception as e:
                        print(f"Error in row {i} Page {page}: {e}")
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
