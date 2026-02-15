variable "location" {
  type        = string
  default     = "North Central US"
  description = "Location of the resource group"
}

variable "resource_group_name" {
  type    = string
  default = "travel-sentiment-rg"
}

variable "acr_name" {
  default = "andrewkohltravelsentiment"
}