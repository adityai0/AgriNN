import os

# Base Directories
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODELS_DIR = os.path.join(BASE_DIR, "models")
OUTPUTS_DIR = os.path.join(BASE_DIR, "outputs")

# Ensure directories exist
os.makedirs(MODELS_DIR, exist_ok=True)
os.makedirs(OUTPUTS_DIR, exist_ok=True)

# Model Settings
MODEL_NAME = "yolo26s-seg.pt" # Standard YOLO26 segmentation model
MODEL_PATH = os.path.join(MODELS_DIR, MODEL_NAME)
CONFIDENCE_THRESHOLD = 0.5

# Animal Classes (19=cow/cattle in COCO; 0=cattle, 1=buffalo in custom models)
# Adjust these according to your specific model's classes
TARGET_CLASSES = [0, 1, 19]  

# Morphology Settings
# Simple placeholders for ATC score generation based on body_ratio
SCORE_THRESHOLDS = {
    "A": 1.3,
    "B": 1.1,
    "C": 0.0
}
