terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.0"
    }
  }
  required_version = ">= 0.14.9"
}
provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "rg" {
  name     = var.resource_group_name
  location = var.location
}

resource "azurerm_container_registry" "acr" {
    name = var.acr_name
    resource_group_name = azurerm_resource_group.rg.name
    location = azurerm_resource_group.rg.location
    sku = "Basic"
    admin_enabled = true
}

resource "azurerm_container_app_environment" "env" {
    name = "travel-sentiment-env"
    resource_group_name = azurerm_resource_group.rg.name
    location = azurerm_resource_group.rg.location
}

resource "azurerm_container_app" "backend" {
    name                         = "backend-app"
    container_app_environment_id = azurerm_container_app_environment.env.id
    resource_group_name          = azurerm_resource_group.rg.name
    revision_mode                = "Single"

    secret {
        name  = "registry-password"
        value = azurerm_container_registry.acr.admin_password
    }

    registry {
        server               = azurerm_container_registry.acr.login_server
        username             = azurerm_container_registry.acr.admin_username
        password_secret_name = "registry-password"
    }

    template {
        container {
            name   = "python-backend"
            image  = "${azurerm_container_registry.acr.login_server}/espanol-travel-sentiment-backend:latest"
            cpu    = 0.25
            memory = "0.5Gi"
        }
    }

    ingress {
        external_enabled = true
        target_port      = 8000
        traffic_weight {
            percentage      = 100
            latest_revision = true
        }
    }
}

resource "azurerm_container_app" "frontend" {
    name                         = "frontend-app"
    container_app_environment_id = azurerm_container_app_environment.env.id
    resource_group_name          = azurerm_resource_group.rg.name
    revision_mode                = "Single"

    secret {
        name  = "registry-password"
        value = azurerm_container_registry.acr.admin_password
    }

    registry {
        server               = azurerm_container_registry.acr.login_server
        username             = azurerm_container_registry.acr.admin_username
        password_secret_name = "registry-password"
    }

    template {
        container {
            name   = "react-frontend"
            image  = "${azurerm_container_registry.acr.login_server}/frontend:latest"
            cpu    = 0.25
            memory = "0.5Gi"

            env {
                name  = "VITE_BACKEND_API_URL"
                value = "https://${azurerm_container_app.backend.ingress[0].fqdn}"
            }
        }

    }

    ingress {
        external_enabled = true
        target_port      = 5173
        traffic_weight {
            percentage      = 100
            latest_revision = true
        }
    }
}