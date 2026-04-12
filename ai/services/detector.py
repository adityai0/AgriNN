import numpy as np
from ultralytics import YOLO
from ai.config import MODEL_PATH, CONFIDENCE_THRESHOLD, TARGET_CLASSES
import cv2

class AnimalDetector:
    def __init__(self):
        """
        Initializes the YOLO model for segmentation.
        """
        try:
            # Load the Ultralytics model (e.g. YOLOv8, YOLO11, YOLO26)
            self.model = YOLO(MODEL_PATH)
        except Exception as e:
            # If model loading fails (e.g., file not found), print warning but don't crash
            # in case we want to test without a valid model file.
            print(f"Warning: Could not load YOLO model from {MODEL_PATH}. Error: {e}")
            self.model = None

    def detect(self, image: np.ndarray):
        """
        Runs inference on the provided image to detect animals.
        Returns:
            bbox: list [x1, y1, x2, y2]
            confidence: float
            mask: np.ndarray (binary mask of the animal)
            animal_type: str ("cattle" or "buffalo")
        """
        if self.model is None:
            return None, 0.0, None, "unknown"

        # Run inference
        results = self.model.predict(
            source=image,
            conf=CONFIDENCE_THRESHOLD,
            classes=TARGET_CLASSES,
            verbose=False
        )

        result = results[0] # Take first result (single image)

        if not result.boxes or len(result.boxes) == 0:
            return None, 0.0, None, "unknown"

        # Take the detection with highest confidence
        best_idx = int(result.boxes.conf.argmax())
        box = result.boxes[best_idx]
        
        # Bounding box
        bbox = box.xyxy[0].cpu().numpy().tolist()
        
        # Confidence
        confidence = float(box.conf[0].cpu().numpy())
        
        # Class id to animal type
        class_id = int(box.cls[0].cpu().numpy())
        # Provide mapping: 19 (COCO Cow) & 0 (Custom Cattle) -> cattle, 1 (Custom Buffalo) -> buffalo
        if class_id in [0, 19]:
            animal_type = "cattle"
        elif class_id == 1:
            animal_type = "buffalo"
        else:
            animal_type = "unknown"

        # Segmentation mask
        mask = None
        if result.masks is not None:
            mask_data = result.masks.data[best_idx].cpu().numpy()
            
            # The mask from ultralytics is scaled to network size, need to resize it back to original image size
            orig_shape = image.shape[:2]
            mask = cv2.resize(mask_data, (orig_shape[1], orig_shape[0]), interpolation=cv2.INTER_NEAREST)
            mask = (mask * 255).astype(np.uint8)

        return bbox, confidence, mask, animal_type
