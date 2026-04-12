import os
import cv2
import numpy as np
from ai.config import OUTPUTS_DIR

def load_image(image_path: str) -> np.ndarray:
    """
    Loads an image from the given path.
    Returns the image as a numpy array (BGR format).
    """
    if not os.path.exists(image_path):
        raise FileNotFoundError(f"Image not found at path: {image_path}")
    
    img = cv2.imread(image_path)
    if img is None:
        raise ValueError(f"Failed to read image at path: {image_path}")
        
    return img

def save_image(image: np.ndarray, filename: str) -> str:
    """
    Saves an image to the outputs directory.
    Returns the absolute path to the saved image.
    """
    save_path = os.path.join(OUTPUTS_DIR, filename)
    cv2.imwrite(save_path, image)
    return save_path

def draw_results(image: np.ndarray, bbox: list, mask: np.ndarray, animal_type: str, score: str) -> np.ndarray:
    """
    Draws the bounding box, segmentation mask, and ATC score on the image.
    """
    result_img = image.copy()
    
    # Draw segmentation mask overlay (light green)
    if mask is not None:
        overlay = result_img.copy()
        overlay[mask > 0] = (0, 255, 0)
        cv2.addWeighted(overlay, 0.4, result_img, 0.6, 0, result_img)
        
    # Draw bounding box
    if bbox:
        x1, y1, x2, y2 = map(int, bbox)
        cv2.rectangle(result_img, (x1, y1), (x2, y2), (0, 0, 255), 2)
        
        # Draw label
        label = f"{animal_type.capitalize()} | Score: {score}"
        cv2.putText(result_img, label, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 255), 2)
        
    return result_img
