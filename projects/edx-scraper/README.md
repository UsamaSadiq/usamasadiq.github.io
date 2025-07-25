# edX Institution Scraper

A Python-based web scraping tool designed to collect comprehensive data about educational institutions and their course offerings from the edX platform.

## Overview

This project demonstrates advanced web scraping techniques using Selenium WebDriver to handle JavaScript-rendered content and extract valuable educational data from the edX platform.

## Features

- **Dynamic Content Scraping**: Uses Selenium WebDriver to handle JavaScript-rendered content
- **Institution Data Collection**: Scrapes partner pages to identify educational institutions  
- **Course Information Extraction**: Collects the first course offered by each institution
- **Incremental Data Writing**: Results are written progressively to CSV files for reliability
- **Robust Error Handling**: Includes retry mechanisms and error recovery

## Technology Stack

- **Language**: Python
- **Web Scraping**: Selenium WebDriver
- **Data Processing**: Pandas, CSV
- **Browser Automation**: ChromeDriver

## Files

- `edx_course_scrapper.py` - Main Python scraping script
- `edx_scrapper.html` - Detailed documentation and usage guide
- `README.md` - This file

## Prerequisites

Before running this script, you need to:

1. **Install Dependencies**:
   ```bash
   pip install selenium pandas beautifulsoup4 requests
   ```

2. **Download ChromeDriver**:
   - Download from [ChromeDriver Downloads](https://chromedriver.chromium.org/downloads)
   - Place in system PATH or specify path directly in script

3. **Setup Environment**:
   - Ensure Chrome browser is installed
   - Verify ChromeDriver version matches Chrome version

## Usage

```python
python edx_course_scrapper.py
```

The script will:
1. Navigate through edX partner pages
2. Extract institution and course data
3. Save results incrementally to CSV files
4. Handle errors gracefully with retry mechanisms

## Technical Implementation

The scraper uses advanced techniques including:
- Dynamic content loading with WebDriverWait
- Element presence verification
- Graceful error handling and recovery
- Progressive data persistence
- Memory-efficient processing

## Use Cases

- Educational market research
- Course catalog analysis  
- Institution partnership mapping
- Academic data collection for research

## Note

This tool is designed for educational and research purposes. Please ensure compliance with edX's terms of service and robots.txt when using this scraper.

## Author

**Usama Sadiq** - Principal Software Engineer & Open edX Core Contributor

For detailed technical documentation and usage examples, see `edx_scrapper.html`.
