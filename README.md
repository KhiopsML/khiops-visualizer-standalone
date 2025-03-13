# Khiops Visualizer Standalone

Standalone Visualizer for automl.tech.orange

<img src="https://raw.githubusercontent.com/KhiopsML/khiops-visualizer-standalone/refs/heads/main/public/demo.png"/>

## Development server

To start a local development server, run:

```bash
yarn install
yarn start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building

### From Github Action

build.yml Github Action is automatically launched at each push.

Artifact can be found into Upload Build artifact section of:
https://github.com/KhiopsML/khiops-visualizer-standalone/actions/runs/{run-id}/job/{job-id} interface:

<img src="https://raw.githubusercontent.com/KhiopsML/khiops-visualizer-standalone/refs/heads/main/public/build.png"/>

### Locally

To build the project locally run:

```bash
yarn build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Configuration

To configure the base url of the application, update index.html base:

```html
<base href="/public/" />
```

**and re-run build**

## Updating

To update khiops-visualizion library to the latest version, run:

```bash
yarn add khiops-visualization@latest
```
Or to a specific version, run:

```bash
yarn add khiops-visualization@11.5.5
```
