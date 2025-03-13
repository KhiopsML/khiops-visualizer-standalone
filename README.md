# Khiops Visualizer Standalone

Standalone Visualizer for automl.tech.orange

## Development server

To start a local development server, run:

```bash
yarn install
yarn start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building

### From Github Action

build.yml Github Action is automatically launched at each push
Artifact can be found into Upload Build artifact section of:
https://github.com/KhiopsML/khiops-visualizer-standalone/actions/runs/{run-id}/job/{job-id} interface

### Locally

To build the project run:

```bash
yarn build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Updating

To update khiops-visualizion library run:

```bash
yarn add khiops-visualization@latest
```
