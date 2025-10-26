# Is LOW Weight Portfolio for Artist available?

## 1. Introduction

Welcome to my portfolio.

This website started with a simple question: Is it possible to have a low-weight portfolio website for an artist? I aim to keep this site as small as possible, so all images are dithered. If you want to see the original files, just click on them—but if you hover your mouse over a photo, you’ll see its original file size.

My goal is to reduce the carbon footprint caused whenever someone visits my portfolio. In the long run, I hope to even host this website entirely on solar power.

Most art portfolios online are heavy. Artists take high-resolution photos to document their work well, then upload them online so people can see them in detail. I’ve felt a little conflicted about this. The images we see on the web are never the same as experiencing the artwork in real life, and they can only convey part of what the work is.

I’m not sure if this is the “right” choice, but I wanted to give it a try. Art is usually about visual images, and it might feel counterintuitive to sacrifice some of that in a portfolio—but sometimes letting go of perfection can be a meaningful experiment.

## 2. Key Features

*   **Low-Weight by Design**: All images are displayed as dithered, low-filesize versions by default. This increases website loading speed and minimizes the carbon footprint associated with data transfer.
*   **Interactive Original Image Viewing**:
    *   **Lightbox Popup**: Clicking an image displays the high-quality original in a lightbox popup, without the user leaving the page.
    *   **File Size on Hover**: Hovering the mouse over an image reveals the original file's size in a tooltip.
*   **Minimalist Tech Stack**: Built with only pure HTML, CSS, and JavaScript (no frameworks) to ensure a lightweight and fast experience.
*   **Responsive Design**: Provides an optimal viewing experience across a wide range of devices, from desktops to mobile phones.

## 3. How It Works (Technical Details)

The core functionality of this website is handled client-side by a single JavaScript file (`/js/main.js`).

1.  **Image Dithering**: The low-weight, dithered images were processed using a custom shell script. For more information on the script and the process, please visit: [Useful Shell Scripts on Codeberg](https://codeberg.org/Seongjoo_Moon/Useful_Shell_Scripts).
2.  **Image Naming Convention**: The site uses a clear convention: display images (e.g., `image.png`) have a corresponding original version suffixed with `_original` (e.g., `image_original.jpg`).
3.  **Dynamic Original File Discovery**: On page load, the script searches for the original version of each image. It intelligently tests multiple file extensions (`.jpg`, `.jpeg`, `.png`, etc.) to find the correct original file, even if its extension differs from the display version's.
4.  **Efficient File Size Check**: The script uses a `fetch` API call with a `HEAD` request to get only the header information of the original file. This allows it to check the `Content-Length` and display the file size without downloading the entire image, saving bandwidth.
5.  **Dynamic Lightbox Creation**: When an image is clicked, JavaScript dynamically creates the lightbox overlay and image elements and appends them to the `<body>`. The lightbox is removed from the DOM when the dark overlay area is clicked.
6.  **Centralized Styling**: All website styles, including the responsive layout and the lightbox UI, are managed in a single `/css/style.css` file.

## 4. Project Structure

```
/
├── index.html                # Main landing page
├── Readme.md                 # This file
├── assets/
│   ├── images/               # All image files (dithered and original)
│   └── videos/               # Video files
├── css/
│   └── style.css             # Single stylesheet for the entire site
├── js/
│   └── main.js               # Single JavaScript file for all dynamic features
└── pages/
    ├── about.html
    ├── news.html
    ├── works.html
    └── ... (other content pages)
```
