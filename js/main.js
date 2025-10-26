document.addEventListener('DOMContentLoaded', () => {
    const findOriginalImage = async (basePath) => {
        const possibleExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        for (const ext of possibleExtensions) {
            const originalSrc = `${basePath}_original${ext}`;
            try {
                const response = await fetch(originalSrc, { method: 'HEAD' });
                if (response.ok) {
                    return { url: originalSrc, size: response.headers.get('Content-Length') };
                }
            } catch (error) {
                // Continue to the next extension
            }
        }
        return null;
    };

    document.querySelectorAll('img').forEach(img => {
        if (img.closest('a')) {
            return;
        }

        const currentSrc = img.getAttribute('src');
        if (!currentSrc) return;

        const lastDotIndex = currentSrc.lastIndexOf('.');
        if (lastDotIndex === -1) return;

        const basePath = currentSrc.substring(0, lastDotIndex);

        findOriginalImage(basePath).then(originalImage => {
            if (originalImage) {
                if (originalImage.size) {
                    const sizeInMb = (parseInt(originalImage.size, 10) / (1024 * 1024)).toFixed(2);
                    img.title = `original file size: ${sizeInMb}mb.`;
                }
                
                img.style.cursor = 'pointer';

                img.addEventListener('click', () => {
                    // Create the overlay
                    const overlay = document.createElement('div');
                    overlay.className = 'lightbox-overlay';

                    // Create the image element for the lightbox
                    const lightboxImage = document.createElement('img');
                    lightboxImage.className = 'lightbox-image';
                    lightboxImage.src = originalImage.url;

                    // Add the image to the overlay
                    overlay.appendChild(lightboxImage);

                    // Add the overlay to the body
                    document.body.appendChild(overlay);

                    // Add an event listener to close the lightbox when the overlay is clicked
                    overlay.addEventListener('click', () => {
                        document.body.removeChild(overlay);
                    });
                });
            }
        });
    });

    document.querySelector('.hamburger').addEventListener('click', () => {
        document.querySelector('.nav-list').classList.toggle('active');
    });
});