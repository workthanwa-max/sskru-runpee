# Makefile for Terraform commands

# กำหนดค่า Default Variable
DIR := $(shell pwd)
TF_DIR = $(shell pwd)/infra/terraform
TF_CONFIG_FILE = $(DIR)/secrets/credentials.tfrc.json
TF_CLI_CONFIG_FILE = $(TF_CONFIG_FILE)

# Terraform Commands

terraform-init:
	@echo "Initializing Terraform..."
	TF_CLI_CONFIG_FILE=$(TF_CLI_CONFIG_FILE) terraform -chdir=$(TF_DIR) init

terraform-plan:
	@echo "Planning Terraform..."
	TF_CLI_CONFIG_FILE=$(TF_CLI_CONFIG_FILE) terraform -chdir=$(TF_DIR) plan

terraform-apply:
	@echo "Applying Terraform..."
	TF_CLI_CONFIG_FILE=$(TF_CLI_CONFIG_FILE) terraform -chdir=$(TF_DIR) apply

terraform-destroy:
	@echo "Destroying Terraform..."
	TF_CLI_CONFIG_FILE=$(TF_CLI_CONFIG_FILE) terraform -chdir=$(TF_DIR) destroy

terraform-validate:
	@echo "Validating Terraform configuration..."
	TF_CLI_CONFIG_FILE=$(TF_CLI_CONFIG_FILE) terraform -chdir=$(TF_DIR) validate

terraform-output:
	@echo "Getting Terraform output..."
	TF_CLI_CONFIG_FILE=$(TF_CLI_CONFIG_FILE) terraform -chdir=$(TF_DIR) output

terraform-infracost:
	@echo "Getting Terraform output..."
	infracost breakdown --path=$(TF_DIR)

# Clean
terraform-clean:
	@echo "Cleaning Terraform workspace..."
	rm -rf $(TF_DIR)/.terraform
	rm -f $(TF_DIR)/terraform.tfstate
	rm -f $(TF_DIR)/terraform.tfstate.backup
