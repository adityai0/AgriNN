FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    libgl1 libglib2.0-0 && \
    rm -rf /var/lib/apt/lists/*

COPY apps/api/requirements.txt /tmp/api-requirements.txt
COPY ai/requirements.txt /tmp/ai-requirements.txt
RUN pip install --no-cache-dir -r /tmp/api-requirements.txt -r /tmp/ai-requirements.txt

COPY ai/ /app/ai/
COPY apps/api/ /app/

ENV PYTHONPATH=/app

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
