from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

def get_vpn_info():
    """
    打开网页，点击按钮，获取并返回VPN信息。
    """

    # 配置 Chrome 选项 (headless 模式，不显示浏览器窗口)
    chrome_options = Options()
    chrome_options.add_argument("--headless")  # 启用 headless 模式
    chrome_options.add_argument("--disable-gpu")  # 禁用 GPU 加速 (headless 模式下可能需要)
    chrome_options.add_argument("--no-sandbox")  # 在某些环境下需要
    chrome_options.add_argument("--disable-dev-shm-usage") # 解决内存问题

    # 初始化 Chrome WebDriver
    driver = webdriver.Chrome(options=chrome_options)  # 确保 chromedriver 在 PATH 中

    try:
        # 1. 打开网页
        url = "https://www.uplinks.net/zh-Hans/free-vpn"
        driver.get(url)

        # 2. 等待按钮出现并点击 (使用显式等待)
        button_xpath = "/html/body/div[1]/div[1]/main/section[1]/div[1]/div/div[2]/div[1]/button"
        button = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, button_xpath))
        )
        button.click()

        # 3. 等待信息加载 (很重要!  需要等待一段时间，让VPN信息加载出来)
        time.sleep(5)  # 等待 5 秒，可以根据实际情况调整

        # 4. 获取第一个 span 的文本
        span1_xpath = "/html/body/div[1]/div[1]/main/section[1]/div[1]/div/div[2]/div[1]/div/div[1]/span[2]"
        span1 = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, span1_xpath))
        )
        span1_text = span1.text

        # 5. 获取第二个 span 的文本
        span2_xpath = "/html/body/div[1]/div[1]/main/section[1]/div[1]/div/div[2]/div[1]/div/div[2]/span[2]"
        span2 = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, span2_xpath))
        )
        span2_text = span2.text

        return span1_text, span2_text

    except Exception as e:
        print(f"发生错误: {e}")
        return None, None  # 返回 None 表示发生错误

    finally:
        # 6. 关闭浏览器
        driver.quit()


if __name__ == "__main__":
    span1, span2 = get_vpn_info()

    try:
        with open("uplinks.txt", "w", encoding="utf-8") as f:
            if span1 and span2:
                f.write(f"{span1}\n")
                f.write(f"{span2}\n")
                print("VPN 信息已写入 uplink.txt")  # 控制台输出，提示已写入文件
            else:
                f.write("未能成功获取 VPN 信息。\n")
                print("未能成功获取 VPN 信息。") # 控制台输出，提示获取失败
    except Exception as e:
        print(f"写入文件时发生错误: {e}")
