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
                            jumlah_data += 1
                            print(f"{jumlah_data} - {nomor_perkara_content} - {tanggal_register_content} - {klasifikasi_perkara_content} - {status_perkara_content}")

                            link_detail_perkara = detail_perkara.find_element(By.TAG_NAME, 'a')
                            link_detail_perkara.click()

                            menu_detail = WebDriverWait(driver, 15).until(
                                EC.visibility_of_element_located((By.CSS_SELECTOR, '.usual')))
                            
                            menu_detail_penetapan = menu_detail.find_element(By.XPATH, ".//a[text()='Penetapan']")
                            menu_detail_penetapan.click()

                            menu_detail = WebDriverWait(driver, 15).until(
                                EC.visibility_of_element_located((By.CSS_SELECTOR, '.usual')))

                            menu_detail_saksi = menu_detail.find_element(By.XPATH, ".//a[text()='Saksi']")
                            menu_detail_saksi.click()      

                            menu_detail = WebDriverWait(driver, 15).until(
                                EC.visibility_of_element_located((By.CSS_SELECTOR, '.usual')))
                                                            
                            menu_detail_putusan = menu_detail.find_element(By.XPATH, ".//a[text()='Putusan']")
                            menu_detail_putusan.click()

                            menu_detail = WebDriverWait(driver, 15).until(
                                EC.visibility_of_element_located((By.CSS_SELECTOR, '.usual')))                        

                            menu_detail_barang_bukti = menu_detail.find_element(By.XPATH, ".//a[text()='Barang Bukti']")
                            menu_detail_barang_bukti.click()

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
