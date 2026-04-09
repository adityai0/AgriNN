# AgriNN

**AI-Powered Animal Type Classification for Precision Dairy Farming**

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/adityai0/AgriNN?style=social)](https://github.com/adityai0/AgriNN/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/adityai0/AgriNN?style=social)](https://github.com/adityai0/AgriNN/network/members)
[![GitHub issues](https://img.shields.io/github/issues/adityai0/AgriNN)](https://github.com/adityai0/AgriNN/issues)
[![Frontend: Next.js](https://img.shields.io/badge/Frontend-Next.js-000000?logo=next.js&logoColor=white)](#tech-stack)
[![Backend: FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?logo=fastapi&logoColor=white)](#tech-stack)
[![AI/ML: PyTorch + YOLOv8](https://img.shields.io/badge/AI%2FML-PyTorch%20%2B%20YOLOv8-EE4C2C?logo=pytorch&logoColor=white)](#tech-stack)
[![Database: MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb&logoColor=white)](#tech-stack)

AgriNN is an AI-powered livestock classification system that uses computer vision to analyze images of cattle and buffaloes. It extracts body structure features such as body length, height, and key proportions, then generates standardized classification scores to support Animal Type Classification (ATC).

Repository: https://github.com/adityai0/AgriNN

## Problem Statement

Manual livestock type assessment is time-consuming, subjective, and prone to human bias, which can reduce consistency and accuracy in dairy farming and breeding decisions.

## Solution Overview

AgriNN automates ATC using an end-to-end AI pipeline. Users upload animal images, the system detects whether the subject is cattle or buffalo, extracts structural body features, computes standardized scores, and presents results with visual overlays. Historical records are stored for review and long-term analysis.

## Features

- Upload animal images from a web interface
- Detect cattle or buffalo using AI-based object detection
- Extract body structure features (length, height, proportions)
- Generate standardized classification scores
- Display results with visual overlays for interpretability
- Store and retrieve historical analysis records

## Tech Stack

- **Frontend:** Next.js, Tailwind CSS
- **Backend:** FastAPI (Python)
- **AI/ML:** PyTorch, YOLOv8, OpenCV
- **Database:** MongoDB

## System Architecture

```text
[User]
	|
	v
[Next.js + Tailwind Frontend]
	|
	| HTTP/REST
	v
[FastAPI Backend]
	|            \
	|             \--> [MongoDB: records, metadata, scores]
	v
[Inference Pipeline: YOLOv8 + OpenCV + PyTorch]
	|
	v
[Feature Extraction + ATC Scoring Engine]
	|
	v
[API Response: class, measurements, score, overlays]
```

## Installation

### Prerequisites

- Node.js 18+
- Python 3.10+
- MongoDB (local or cloud)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/adityai0/AgriNN.git
cd AgriNN
```

### 2. Backend Setup (FastAPI)

```bash
# from project root
cd backend
python -m venv .venv

# Windows
.venv\Scripts\activate

# Linux/macOS
source .venv/bin/activate

pip install -r requirements.txt
```

Create a `.env` file in `backend/` with values similar to:

```env
MONGODB_URI=mongodb://localhost:27017
DATABASE_NAME=agrinn
MODEL_PATH=./models/yolov8.pt
```

Start backend:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 3. Frontend Setup (Next.js)

```bash
# from project root
cd frontend
npm install
```

Create a `.env.local` file in `frontend/`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

Start frontend:

```bash
npm run dev
```

Frontend runs at `http://localhost:3000`.

## Usage

1. Open the frontend in your browser.
2. Upload an image of cattle or buffalo.
3. Submit for analysis.
4. Review detected animal type, extracted measurements, and classification score.
5. Inspect visual overlays and save/revisit historical records.

## Future Improvements

- Multi-animal image handling and tracking
- Mobile-first capture flow for on-farm use
- Explainable AI dashboard with confidence decomposition
- Breed-specific calibration of scoring rules
- Role-based access and audit logging
- Model monitoring and auto-retraining workflows

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) for setup, coding standards, and pull request guidelines.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
