import cv2
import numpy as np
from ai.config import SCORE_THRESHOLDS

class MorphologyAnalyzer:
    def __init__(self):
        pass

    def calculate_metrics(self, mask: np.ndarray, bbox: list, image_shape: tuple):
        """
        Calculates morphological metrics from the segmentation mask.
        Returns a dictionary of metrics.
        """
        if mask is None or bbox is None:
            return {
                "body_width": 0.0,
                "body_height": 0.0,
                "body_ratio": 0.0,
                "contour_area": 0.0
            }

        # Find contours
        contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        
        if not contours:
            return {
                "body_width": 0.0,
                "body_height": 0.0,
                "body_ratio": 0.0,
                "contour_area": 0.0
            }

        # Take largest contour
        largest_contour = max(contours, key=cv2.contourArea)
        area = cv2.contourArea(largest_contour)
        
        # Get bounding box of the contour (could be slightly different from YOLO bbox)
        x, y, w, h = cv2.boundingRect(largest_contour)

        img_height, img_width = image_shape[:2]

        # Calculate normalized metrics
        norm_width = w / img_width
        norm_height = h / img_height
        
        # Ratio of width to height
        body_ratio = norm_width / norm_height if norm_height > 0 else 0.0
        
        # Normalized area
        norm_area = area / (img_width * img_height)

        return {
            "body_width": round(norm_width, 2),
            "body_height": round(norm_height, 2),
            "body_ratio": round(body_ratio, 2),
            "contour_area": round(norm_area, 2)
        }

    def determine_score(self, metrics: dict) -> str:
        """
        Determines the ATC score based on morphological metrics.
        Uses simple rule-based logic for now.
        """
        ratio = metrics.get("body_ratio", 0.0)
        
        if ratio >= SCORE_THRESHOLDS["A"]:
            return "A"
        elif ratio >= SCORE_THRESHOLDS["B"]:
            return "B"
        else:
            return "C"
