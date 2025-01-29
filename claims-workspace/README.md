# Claims Workspace

A modular Angular application built using Micro Frontend architecture with Module Federation.

## Project Structure

This workspace contains multiple applications and a shared library:

host-app: Main container application
mfe1: Micro Frontend 1
mfe2: Micro Frontend 2
shared-data: Shared library containing common functionality

## Prerequisites

Node.js (LTS version recommended)
npm (comes with Node.js)
Angular CLI

## Installation


# Install dependencies
npm install
## Development

### Running Individual Applications
bash
# Start the host application
npm run serve:host

# Start Micro Frontend 1
npm run serve:mfe1

# Start Micro Frontend 2
npm run serve:mfe2
### Running All Applications

To start all applications concurrently:
bash
npm run serve:all
This command will:
1. Build the shared library
2. Start the host application
3. Start both micro frontends

### Building
bash
# Build individual applications
ng build host-app
ng build mfe1
ng build mfe2

# Build shared library
npm run build:shared
## Testing

### Running Tests for Individual Applications
bash
# Test host application
npm run test:host

# Test Micro Frontend 1
npm run test:mfe1

# Test Micro Frontend 2
npm run test:mfe2

# Test shared library
npm run test:shared
### Running All Tests

To run all tests concurrently:
bash
npm run test:all
## Development Server

The development server uses Module Federation for local development. To start the development server with all applications:
bash
npm run run:all
```