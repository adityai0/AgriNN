import os
import torch
from torchvision import transforms
import json
from PIL import Image
from ai.classifiers.breed_classifier import BreedClassifier, get_animal_type

class BreedInference:
    def __init__(self):
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        model_dir = os.path.join(os.path.dirname(__file__), "..", "models")
        
        classes_path = os.path.join(model_dir, "classes.json")
        if os.path.exists(classes_path):
            with open(classes_path, "r") as f:
                self.classes = json.load(f)
        else:
            self.classes = []

        self.model = BreedClassifier(num_classes=len(self.classes)).to(self.device) if self.classes else None
        
        model_path = os.path.join(model_dir, "breed_classifier.pth")
        if self.model and os.path.exists(model_path):
            self.model.load_state_dict(torch.load(model_path, map_location=self.device))
        if self.model:
            self.model.eval()
        
        self.transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
        ])
        
    def predict(self, image_path: str):
        if not self.model or not self.classes:
            return {
                "breed": "Unknown",
                "breed_confidence": 0.0,
                "animal_type": "unknown"
            }
            
        try:
            image = Image.open(image_path).convert("RGB")
            input_tensor = self.transform(image).unsqueeze(0).to(self.device)
            
            with torch.no_grad():
                outputs = self.model(input_tensor)
                probabilities = torch.nn.functional.softmax(outputs[0], dim=0)
                confidence, predicted_idx = torch.max(probabilities, 0)
                
            breed_name = self.classes[predicted_idx.item()].capitalize()
            animal_type = get_animal_type(breed_name)
            
            return {
                "breed": breed_name,
                "breed_confidence": round(confidence.item(), 2),
                "animal_type": animal_type
            }
        except Exception:
            return {
                "breed": "Unknown",
                "breed_confidence": 0.0,
                "animal_type": "unknown"
            }
