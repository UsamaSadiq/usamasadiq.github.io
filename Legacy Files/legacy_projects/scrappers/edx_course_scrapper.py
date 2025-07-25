import requests
from bs4 import BeautifulSoup
import re
import pandas as pd
import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException, WebDriverException
import os # Import the os module to check for file existence

# IMPORTANT: Before running this script, you need to:
# 1. Install Selenium: pip install selenium pandas
# 2. Download the appropriate WebDriver for your browser (e.g., ChromeDriver for Chrome).
#    You can find ChromeDriver here: https://chromedriver.chromium.org/downloads
# 3. Place the WebDriver executable in a directory that's in your system's PATH,
#    or specify its path directly in the Service object (e.g., Service(executable_path='/path/to/chromedriver')).

def initialize_driver():
    """Initializes and returns a headless Chrome WebDriver."""
    options = webdriver.ChromeOptions()
    options.add_argument('--headless')  # Run in headless mode (no browser UI)
    options.add_argument('--disable-gpu') # Required for headless on some systems
    options.add_argument('--no-sandbox') # Bypass OS security model, required for some environments
    options.add_argument('--disable-dev-shm-usage') # Overcome limited resource problems
    options.add_argument('user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36')
    
    # If chromedriver is not in PATH, specify its path here:
    # service = Service(executable_path='/path/to/your/chromedriver')
    # driver = webdriver.Chrome(service=service, options=options)
    
    # If chromedriver is in PATH:
    driver = webdriver.Chrome(options=options)
    return driver

def get_institution_links(base_schools_partners_url="https://www.edx.org/schools-partners"):
    """
    Scrapes the base edX schools-partners page to get the actual links for each institution
    using Selenium to handle dynamically loaded content.
    Returns a dictionary mapping institution names to their full edX profile URLs.
    """
    print(f"Fetching institution links from: {base_schools_partners_url} using Selenium...")
    driver = None
    institution_links = {}
    try:
        driver = initialize_driver()
        driver.get(base_schools_partners_url)

        # Wait for the institution links to be visible.
        # EdX typically loads these dynamically. We'll wait for a common element
        # that contains these links, like a grid or list of cards.
        # Adjust the selector if the page structure changes.
        WebDriverWait(driver, 30).until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, 'a[href*="/school/"], a[href*="/partner/"]'))
        )

        # Regex to match URLs for schools or partners, ensuring it ends correctly
        link_pattern = re.compile(r'/(school|partner)/[a-zA-Z0-9-]+/?$')

        # Find all <a> tags on the page that have an href attribute
        all_a_tags = driver.find_elements(By.TAG_NAME, 'a')

        for element in all_a_tags:
            try:
                relative_url = element.get_attribute('href')
                if relative_url and "edx.org" in relative_url: # Ensure it's an edX internal link
                    # Extract only the path part for regex matching
                    path_part = relative_url.replace("https://www.edx.org", "").split('?')[0].split('#')[0]
                    
                    # Check if the href matches our pattern for school/partner pages
                    if link_pattern.match(path_part):
                        # Try to get the name from the text content of the link
                        name = element.text.strip()
                        
                        # If the direct text is empty, try to find an alt attribute from an image within
                        if not name:
                            try:
                                img_tag = element.find_element(By.TAG_NAME, 'img')
                                name = img_tag.get_attribute('alt').strip()
                            except NoSuchElementException:
                                pass # No image found within the link
                        
                        # Ensure a name was found before adding to the dictionary
                        if name:
                            # Add to dictionary, using the name as key.
                            # We check if the URL is already a value to prevent duplicates
                            # if different names point to the same URL.
                            if relative_url not in institution_links.values():
                                institution_links[name] = relative_url
            except WebDriverException:
                # Element might have become stale or detached
                continue
                    
        print(f"Found {len(institution_links)} unique institution links.")
        return institution_links

    except TimeoutException:
        print("Timeout: Elements not found on the page within the specified time.")
    except WebDriverException as e:
        print(f"WebDriver error occurred while fetching institution links: {e}")
    except Exception as e:
        print(f"An unexpected error occurred while fetching institution links: {e}")
    finally:
        if driver:
            driver.quit() # Always close the driver
    return {}


def get_first_course(institution_name, institution_url):
    """
    Fetches the edX page for a given institution URL and attempts to extract the title
    of the first listed course using Selenium, targeting the provided HTML structure.
    """
    if not institution_url:
        return "No URL found"

    print(f"Attempting to scrape course from: {institution_url}")
    driver = None
    try:
        driver = initialize_driver()
        driver.get(institution_url)

        # Wait for the main content to load. This is a general wait.
        WebDriverWait(driver, 20).until(
            EC.presence_of_element_located((By.TAG_NAME, 'body'))
        )
        
        # Give a small additional explicit wait for dynamic content to render
        time.sleep(2) 

        # --- Primary selector based on the provided HTML structure ---
        # Target the <a> tag that is the main course block, then find the specific span for the title.
        try:
            # Locate the first course block element
            # This CSS selector looks for an <a> tag that has href containing "/learn/"
            # and specific classes that indicate it's a course card wrapper.
            first_course_block = WebDriverWait(driver, 5).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, 'a[href*="/learn/"][class*="no-underline"][class*="w-full"]'))
            )
            
            # Within this block, find the span containing the course title based on its classes
            title_element = first_course_block.find_element(By.CSS_SELECTOR, 'span.font-bold.text-base.m-0.break-words.line-clamp-3')
            
            if title_element and title_element.text.strip():
                course_title = title_element.text.strip()
                print(f"Found course via specific HTML structure: {course_title}")
                return course_title
        except TimeoutException:
            print("Specific course block selector timed out, trying fallbacks.")
        except NoSuchElementException:
            print("Course title span not found within the specific course block, trying fallbacks.")
            pass # Title element not found in the primary card structure

        # --- Fallback selectors (retained for robustness if the primary fails) ---
        # 1. Look for common program/course cards and their prominent headings
        try:
            first_course_card = WebDriverWait(driver, 5).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, 'article[class*="program-card"], article[class*="course-card"]'))
            )
            title_element = first_course_card.find_element(By.CSS_SELECTOR, 'h2[class*="program-card-title"], h3[class*="course-title"], h3[class*="card-title"], h4[class*="heading"]')
            if title_element and title_element.text.strip():
                print(f"Found course via general card selector: {title_element.text.strip()}")
                return title_element.text.strip()
        except TimeoutException:
            print("General course card selector timed out, trying other fallbacks.")
        except NoSuchElementException:
            print("Title element not found within general course card, trying other fallbacks.")
            pass

        # 2. Look for common list/grid containers and their first prominent heading
        course_listing_divs = driver.find_elements(By.CSS_SELECTOR, '[class*="course-list"], [class*="program-list"], [class*="course-grid"], [class*="course-results"], [data-testid*="course-list"], [data-testid*="program-list"]')
        for div in course_listing_divs:
            try:
                first_heading = div.find_element(By.CSS_SELECTOR, 'h2, h3, h4')
                text = first_heading.text.strip()
                if len(text) > 5 and len(text) < 150 and not re.match(r'^(about|courses|programs|learn more|explore)$', text.lower()):
                    print(f"Found course via fallback (listing div heading): {text}")
                    return text
            except NoSuchElementException:
                continue

        # 3. Last resort: Look for any link with "course" or "program" in its text or href
        all_links = driver.find_elements(By.TAG_NAME, 'a')
        for link in all_links:
            try:
                link_text = link.text.strip()
                link_href = link.get_attribute('href')
                if link_href and ("course" in link_text.lower() or "program" in link_text.lower()) and \
                   ("course" in link_href.lower() or "program" in link_href.lower()) and \
                   len(link_text) > 5 and len(link_text) < 100 and \
                   not re.match(r'^(all courses|view all|explore courses|find a course)$', link_text.lower()):
                    print(f"Found course via last resort link: {link_text}")
                    return link_text
            except WebDriverException:
                continue

        print("No course found after all attempts.")
        return "" # Return empty string if no course is found

    except TimeoutException:
        print("Timeout: Page did not load sufficiently or course elements not found within time.")
        return "Timeout: Page/Course elements not found"
    except WebDriverException as e:
        print(f"WebDriver error for {institution_name} ({institution_url}): {e}")
        return f"WebDriver error: {e}"
    except Exception as e:
        print(f"An unexpected error occurred for {institution_name} ({institution_url}): {e}")
        return f"An unexpected error occurred: {e}"
    finally:
        if driver:
            driver.quit() # Always close the driver

# --- Main execution ---
# Step 1: Get all institution links from the main partners page
institution_urls = get_institution_links()

# Filter the `institutions` list to only include those for which we found a URL
institutions_to_process = list(institution_urls.keys())

# Define the CSV file name
csv_file_name = 'edx_institution_courses.csv'
# Check if the file exists to determine if a header is needed
file_exists = os.path.exists(csv_file_name)

# It's good practice to add a small delay between requests to avoid overwhelming the server
# and to reduce the chance of being blocked.
request_delay_seconds = 1.5 # Increased delay for Selenium to allow pages to fully load

# Open the CSV file in append mode. 'w' if it's new, 'a' otherwise.
# We'll write the header only if the file doesn't exist.
with open(csv_file_name, 'a', newline='', encoding='utf-8') as f:
    # Create a dummy DataFrame to get the header if the file is new
    if not file_exists:
        header_df = pd.DataFrame(columns=['Institution', 'First Course Offered'])
        header_df.to_csv(f, header=True, index=False)

    for i, inst_name in enumerate(institutions_to_process):
        inst_url = institution_urls.get(inst_name, "") # Get the URL for the current institution
        print(f"Processing {i+1}/{len(institutions_to_process)}: {inst_name}")
        course_title = get_first_course(inst_name, inst_url)
        
        # Create a DataFrame for the current row
        current_row_df = pd.DataFrame([[inst_name, course_title]], columns=['Institution', 'First Course Offered'])
        
        # Append the current row to the CSV file without writing the header again
        current_row_df.to_csv(f, header=False, index=False)
        print(f"Appended data for {inst_name} to {csv_file_name}")
        
        time.sleep(request_delay_seconds) # Pause for a short duration

print("\n--- Scraped Data Complete ---")
print(f"All data has been appended to {csv_file_name}")

# You can optionally read and print the full DataFrame after the loop if needed for console output
# df_final = pd.read_csv(csv_file_name)
# print(df_final.to_string(index=False))
