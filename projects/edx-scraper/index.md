---
layout: default
title: edX Institution Course Scraper
---

# edX Institution Course Scraper

A comprehensive Python web scraping tool designed to extract course information from edX institutions using advanced Selenium WebDriver automation.

## 🚀 Project Overview

This sophisticated scraper navigates through edX's "Schools & Partners" page, automatically discovers all listed educational institutions, and intelligently extracts the title of the first course offered by each organization. Built with robust error handling and dynamic content support.

## ✨ Key Features

- **🔄 Dynamic Content Scraping**: Uses Selenium WebDriver to handle JavaScript-loaded content
- **🏫 Institution Discovery**: Automatically extracts profile URLs for all edX schools and partners  
- **📚 Course Identification**: Navigates to each institution's page and finds their first course
- **💾 Incremental CSV Output**: Saves data progressively to prevent loss during long scraping sessions
- **🛡️ Robust Element Selection**: Multiple CSS selectors and fallback mechanisms for reliability
- **🚀 Headless Operation**: Runs efficiently in background without browser UI

## 🛠️ Technology Stack

- **Python 3.x** - Core programming language
- **Selenium WebDriver** - Browser automation and dynamic content handling
- **BeautifulSoup4** - HTML parsing and data extraction
- **Pandas** - CSV data manipulation and export
- **ChromeDriver** - Automated browser control

## 📁 Project Files

- **`edx_course_scrapper.py`** - Main scraper implementation with comprehensive error handling
- **`README.md`** - Complete setup guide and usage documentation  
- **`code-viewer.html`** - Interactive source code viewer with syntax highlighting
- **Documentation** - Detailed technical specifications and examples

## � Quick Start

### Prerequisites
```bash
pip install selenium pandas requests beautifulsoup4
```

### Download ChromeDriver
Visit [ChromeDriver Downloads](https://chromedriver.chromium.org/downloads) and install the version matching your Chrome browser.

### Run the Scraper
```bash
python edx_course_scrapper.py
```

## � Sample Output

The script generates `edx_institution_courses.csv`:

| Institution | First Course Offered |
|-------------|---------------------|
| Harvard University | CS50's Introduction to Computer Science |
| MIT | Introduction to Computer Science and Programming in Python |
| Stanford University | Machine Learning |

## 💻 Interactive Code Viewer

Explore the complete source code with syntax highlighting and easy copying:

<div style="border: 2px solid #e1e5e9; border-radius: 8px; margin: 20px 0; overflow: hidden;">
  <div style="background: #f6f8fa; padding: 15px; border-bottom: 1px solid #e1e5e9;">
    <h4 style="margin: 0; color: #24292e;">📄 edx_course_scrapper.py</h4>
    <p style="margin: 5px 0 0 0; color: #586069; font-size: 0.9em;">259 lines • Complete Python implementation with documentation</p>
  </div>
  <iframe 
    src="code-viewer.html" 
    style="width: 100%; height: 600px; border: none; background: #1e1e1e;"
    title="edX Scraper Source Code Viewer">
  </iframe>
</div>

## ⬇️ Download Options

- **[� Download Python Script](https://raw.githubusercontent.com/UsamaSadiq/usamasadiq.github.io/main/projects/edx-scraper/edx_course_scrapper.py)** - Direct file download
- **[📋 Copy from Viewer](#)** - Use the copy button in the code viewer above
- **[📁 View on GitHub](https://github.com/UsamaSadiq/usamasadiq.github.io/tree/main/projects/edx-scraper)** - Browse project repository

## 🎯 Use Cases

- **� Educational Research**: Analyze course offerings across institutions
- **🔍 Market Analysis**: Track trends in online education
- **🏫 Institutional Comparison**: Compare course portfolios between universities
- **📊 Data Science Projects**: Build educational datasets for analysis

## 🚀 Advanced Features

- **Error Recovery**: Continues scraping even if individual pages fail
- **Rate Limiting**: Respectful delays between requests
- **Multiple Selectors**: Handles different page layouts automatically
- **Headless Mode**: Efficient background operation
- **Progress Tracking**: Real-time status updates during scraping

---

## 📖 Need Help?

Check the **[detailed README](README.md)** for complete setup instructions, troubleshooting tips, and advanced configuration options.
