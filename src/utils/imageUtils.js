// Image utility functions for handling backend image URLs

const BACKEND_BASE_URL = 'https://backend.riddhisiddhiarchitect.in/api/v1/images';

/**
 * Clean and normalize image URLs to ensure they use the correct backend domain
 * @param {string} imageUrl - The image URL from the API response
 * @param {string} imagePath - The image path from the API response
 * @returns {string} - Clean image URL using the correct backend domain
 */
export const getCleanImageUrl = (imageUrl, imagePath) => {
  // Prioritize imagePath as the primary source (confirmed working)
  if (imagePath) {
    // Remove any localhost URLs that might be in the path
    let cleanPath = imagePath;
    
    // Remove common localhost patterns
    cleanPath = cleanPath.replace(/^https?:\/\/localhost:\d+\//, '');
    cleanPath = cleanPath.replace(/^https?:\/\/127\.0\.0\.1:\d+\//, '');
    cleanPath = cleanPath.replace(/^https?:\/\/localhost\//, '');
    cleanPath = cleanPath.replace(/^127\.0\.0\.1\//, '');
    
    // Remove any remaining http:// or https:// if they exist
    cleanPath = cleanPath.replace(/^https?:\/\//, '');
    
    // Remove the backend domain if it's already there
    cleanPath = cleanPath.replace(/^backend\.riddhisiddhiarchitect\.in\//, '');
    
    // Construct the clean URL using the correct base URL
    return `${BACKEND_BASE_URL}/${cleanPath}`;
  }
  
  // Fallback to imageUrl if no imagePath (but this should be rare)
  if (imageUrl && !imageUrl.includes('localhost')) {
    return imageUrl;
  }
  
  // Return placeholder if no valid image data
  return 'https://via.placeholder.com/400x300?text=No+Image';
};

/**
 * Check if an image URL contains localhost
 * @param {string} url - The URL to check
 * @returns {boolean} - True if URL contains localhost
 */
export const containsLocalhost = (url) => {
  return url && (url.includes('localhost') || url.includes('127.0.0.1'));
};

/**
 * Log image URL information for debugging
 * @param {string} imageUrl - The image URL from API
 * @param {string} imagePath - The image path from API
 * @param {string} finalUrl - The final cleaned URL
 */
export const logImageUrlInfo = (imageUrl, imagePath, finalUrl) => {
  console.log('Image URL Debug Info:', {
    originalImageUrl: imageUrl,
    originalImagePath: imagePath,
    containsLocalhost: containsLocalhost(imageUrl) || containsLocalhost(imagePath),
    finalUrl: finalUrl,
    priority: imagePath ? 'imagePath (primary)' : imageUrl ? 'imageUrl (fallback)' : 'placeholder'
  });
};
