terraform {
  cloud {
    organization = "sskru"
    workspaces {
      tags = ["gcloud"]
    }
  }

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }
}
# Provider Configuration
provider "google" {
  # Specifies the Google Cloud Project ID to manage resources
  project = var.project_id
  # Sets the default region for resource deployment
  region = var.region
}

resource "google_service_account" "github_deployer" {
  # Unique identifier for the service account
  account_id = "github-deployer"
  # Human-readable display name
  display_name = "GitHub Deployment Account"
}
