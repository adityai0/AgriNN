import torch
import torch.nn as nn
from torchvision.models import mobilenet_v2, MobileNet_V2_Weights


BREED_TO_ANIMAL_TYPE = {
    "gir": "cattle",
    "holstein": "cattle",
    "jaffarabadi": "buffalo",
    "murrah": "buffalo",
    "sahiwal": "cattle"
}

def get_animal_type(breed_name: str) -> str:
    return BREED_TO_ANIMAL_TYPE.get(breed_name.lower(), "unknown")

class BreedClassifier(nn.Module):
    def __init__(self, num_classes: int):
        super().__init__()
        self.model = mobilenet_v2(weights=MobileNet_V2_Weights.DEFAULT)
        
        for param in self.model.parameters():
            param.requires_grad = False
            
        in_features = self.model.classifier[1].in_features
        self.model.classifier[1] = nn.Sequential(
            nn.Dropout(p=0.2),
            nn.Linear(in_features, num_classes)
        )
        
    def forward(self, x):
        return self.model(x)
