# Touch Music Maker (BeatMaker)

A touch-friendly web application for creating, recording, and looping music.

## How to open on your phone

Since this is a web application, you need to "host" it so your phone's browser can access the files. Here are the easiest ways to do it:

### Option 1: Local Network (No internet upload required)

If your phone and computer are on the **same Wi-Fi network**:

1.  **Start a local server on your computer.**
    *   If you have **Python** installed, open a terminal in this folder and run:
        ```bash
        python3 -m http.server 8000
        ```
    *   If you have **Node.js** installed, you can use `npx`:
        ```bash
        npx serve .
        ```
2.  **Find your computer's local IP address.**
    *   On Windows: Run `ipconfig` in the Command Prompt. Look for `IPv4 Address` (e.g., `192.168.1.15`).
    *   On macOS/Linux: Run `ifconfig` or `hostname -I`.
3.  **Open the browser on your phone.**
    *   Type your computer's IP followed by the port: `http://192.168.1.15:8000` (replace with your actual IP).

### Option 2: Cloud Deployment (Easiest for sharing)

You can upload these files to a free hosting service:

*   **GitHub Pages**: Push this code to a GitHub repository and enable "Pages" in the settings.
*   **Netlify / Vercel**: Simply drag and drop this folder onto their "Deploy" area.

## Usage Tips for Mobile

-   **Landscape Mode**: Works best if you rotate your phone sideways.
-   **Add to Home Screen**: In Safari (iOS) or Chrome (Android), you can select "Add to Home Screen" to use it like a real app without the browser bars.
-   **Silent Mode**: Make sure your phone's physical silent switch is OFF, otherwise you might not hear any sound!
