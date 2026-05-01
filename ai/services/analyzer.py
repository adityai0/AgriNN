import cv2
import numpy as np

class MorphologyAnalyzer:
    def __init__(self):
        pass

    def calculate_metrics(self, mask: np.ndarray, bbox: list, image_shape: tuple):
        """
        Calculates morphological metrics from the segmentation mask.
        Returns a dictionary of raw metrics.
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
        
        x, y, w, h = cv2.boundingRect(largest_contour)
        img_height, img_width = image_shape[:2]

        norm_width = w / img_width
        norm_height = h / img_height
        body_ratio = norm_width / norm_height if norm_height > 0 else 0.0
        norm_area = area / (img_width * img_height)

        return {
            "body_width": round(norm_width, 2),
            "body_height": round(norm_height, 2),
            "body_ratio": round(body_ratio, 2),
            "contour_area": round(norm_area, 2)
        }
        
    def _scale_1_to_9(self, value, min_val, max_val):
        scaled = 1 + 8 * (value - min_val) / (max_val - min_val)
        return max(1, min(9, int(round(scaled))))

    def evaluate_traits(self, metrics: dict) -> dict:
        """
        Approximates ICAR-inspired linear scoring 1-9 scale based on contour metrics.
        """
        w = metrics.get("body_width", 0.0)
        h = metrics.get("body_height", 0.0)
        ratio = metrics.get("body_ratio", 0.0)
        area = metrics.get("contour_area", 0.0)
        
        # Approximate mapping from 2D silhouette to 3D traits
        stature = self._scale_1_to_9(h, 0.4, 0.9)
        body_length = self._scale_1_to_9(w, 0.5, 0.95)
        chest_width = self._scale_1_to_9(area / (w * h) if w*h > 0 else 0, 0.5, 0.8)
        body_depth = self._scale_1_to_9(h / w if w > 0 else 0, 0.4, 0.8)
        
        # Estimations for rear traits based on contour extremities
        rump_width = self._scale_1_to_9(area, 0.2, 0.6)
        rump_angle = 5 # Default neutral estimation for 2D side-profile
        
        angularity = self._scale_1_to_9(ratio, 1.0, 1.8)
        
        # Dairy strength is a composite of depth, width and angularity
        dairy_strength = int(round((body_depth * 0.4) + (chest_width * 0.3) + (angularity * 0.3)))
        
        return {
            "stature": stature,
            "body_length": body_length,
            "chest_width": chest_width,
            "body_depth": body_depth,
            "rump_width": rump_width,
            "rump_angle": rump_angle,
            "angularity": angularity,
            "dairy_strength": dairy_strength
        }

    def compute_composite_score(self, traits: dict) -> tuple:
        """
        Computes the final ATC score out of 100 and assigns a grade.
        """
        weights = {
            "stature": 0.1,
            "body_length": 0.15,
            "chest_width": 0.1,
            "body_depth": 0.15,
            "rump_width": 0.1,
            "rump_angle": 0.05,
            "angularity": 0.1,
            "dairy_strength": 0.25
        }
        
        weighted_sum = sum(traits[k] * w for k, w in weights.items())
        
        # Scale 1-9 to 50-95 standard dairy composite score
        score = int(round(50 + ((weighted_sum - 1) / 8) * 45))
        score = max(50, min(99, score))
        
        if score >= 90:
            grade = "Excellent"
        elif score >= 85:
            grade = "Very Good"
        elif score >= 80:
            grade = "Good"
        else:
            grade = "Average"
            
        return score, grade
