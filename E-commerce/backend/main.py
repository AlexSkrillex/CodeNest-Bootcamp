import requests
from rich.console import Console
from rich.panel import Panel
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def get_products():
    products = fetch_sanity_products()
    return {"products": products}


# Sanity.io configuration
DATASET = "production"
PROJECT_ID = "1ihuwax4"
QUERY = """*[_type == 'product']{ name, price, originalPrice, "image": image.asset->url, category, tags }"""
API_URL = f"https://{PROJECT_ID}.api.sanity.io/v1/data/query/{DATASET}"
def fetch_sanity_products():
    try:
        response = requests.get(API_URL, params={"query": QUERY})
        response.raise_for_status()  # Raises an HTTPError for bad responses (4XX, 5XX)
        
        result = response.json()
        products = result.get("result", [])
        
        # Rich console output
        console = Console()
        console.print(Panel(
            f"✅ Successfully fetched {len(products)} products from Sanity",
            style="green",
            border_style="green"
        ))
        
        return products
        
    except requests.exceptions.RequestException as e:
        console = Console()
        console.print(Panel(
            f"❌ Failed to fetch products from Sanity\nError: {str(e)}",
            style="red"
        ))
        return None

if __name__ == "__main__":
    fetch_sanity_products()