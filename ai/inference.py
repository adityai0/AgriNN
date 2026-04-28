import json
import os
import argparse
from ai.utils.image import load_image, save_image, draw_results
from ai.services.detector import AnimalDetector
from ai.services.analyzer import MorphologyAnalyzer
from ai.classifiers.inference import BreedInference

# Initialize singletons for the services so model is only loaded once if imported
detector = AnimalDetector()
analyzer = MorphologyAnalyzer()
breed_classifier = BreedInference()

def run_inference(image_path: str) -> dict:
    """
    Main entrypoint for the AI pipeline.
    Loads an image, detects the animal, calculates metrics, assigns a score,
    saves the visualization, and returns a JSON-serializable dictionary.
    """
    try:
        # 1. Load image
        img = load_image(image_path)
        
        # 2. Detect animal
        bbox, confidence, mask, yolo_animal_type = detector.detect(img)
        
        if bbox is None:
            return {
                "error": "No animal detected",
                "animal_type": "unknown",
                "breed": "Unknown",
                "breed_confidence": 0.0,
                "confidence": 0.0,
                "metrics": {},
                "score": "N/A"
            }

        # 3. Classify Breed & Get Animal Type
        breed_results = breed_classifier.predict(image_path)
        animal_type = breed_results.get("animal_type")
        if animal_type == "unknown":
            animal_type = yolo_animal_type  # fallback to YOLO if breed failed

        # 4. Calculate metrics & get score
        metrics = analyzer.calculate_metrics(mask, bbox, img.shape)
        score = analyzer.determine_score(metrics)
        
        # 5. Save visualization
        filename = f"out_{os.path.basename(image_path)}"
        result_img = draw_results(img, bbox, mask, animal_type, score)
        save_path = save_image(result_img, filename)
        
        # 6. Return structured response
        return {
            "animal_type": animal_type,
            "breed": breed_results.get("breed", "Unknown"),
            "breed_confidence": breed_results.get("breed_confidence", 0.0),
            "confidence": round(confidence, 2),
            "metrics": metrics,
            "score": score,
            "saved_image_path": save_path
        }

    except Exception as e:
        return {
            "error": str(e),
            "animal_type": "unknown",
            "breed": "Unknown",
            "breed_confidence": 0.0,
            "confidence": 0.0,
            "metrics": {},
            "score": "N/A"
        }

if __name__ == "__main__":
    # Minimal local testing entrypoint
    parser = argparse.ArgumentParser(description="Run AgriNN AI inference.")
    parser.add_argument("image_path", type=str, help="Path to the input image")
    args = parser.parse_args()
    
    result = run_inference(args.image_path)
    
    print(json.dumps(result, indent=2))
