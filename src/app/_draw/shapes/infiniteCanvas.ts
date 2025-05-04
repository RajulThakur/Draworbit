import {Shape} from './types';

interface Viewport {
  x: number;
  y: number;
  scale: number;
}

export class InfiniteCanvas {
  private shapes: Shape[] = [];
  private viewport: Viewport = {x: 0, y: 0, scale: 1};
  private isDragging = false;
  private lastX = 0;
  private lastY = 0;

  constructor(private canvas: HTMLCanvasElement) {
    this.setupEventListeners();
    this.resizeCanvas();
  }

  private setupEventListeners() {
    // Handle window resize
    window.addEventListener('resize', () => this.resizeCanvas());

    // Handle mouse wheel for zooming
    this.canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      const delta = e.deltaY;
      const zoomIntensity = 0.1;

      // Calculate zoom factor
      const zoom = 1 - delta * zoomIntensity;

      // Calculate mouse position in canvas coordinates
      const mouseX = e.clientX - this.canvas.offsetLeft;
      const mouseY = e.clientY - this.canvas.offsetTop;

      // Calculate mouse position in world coordinates
      const worldX = (mouseX - this.viewport.x) / this.viewport.scale;
      const worldY = (mouseY - this.viewport.y) / this.viewport.scale;

      // Update scale
      this.viewport.scale *= zoom;

      // Adjust viewport position to zoom towards mouse
      this.viewport.x = mouseX - worldX * this.viewport.scale;
      this.viewport.y = mouseY - worldY * this.viewport.scale;

      this.redraw();
    });

    // Handle mouse down for panning
    this.canvas.addEventListener('mousedown', (e) => {
      if (e.button === 1 || e.button === 2) {
        // Middle or right click
        this.isDragging = true;
        this.lastX = e.clientX;
        this.lastY = e.clientY;
      }
    });

    // Handle mouse move for panning
    this.canvas.addEventListener('mousemove', (e) => {
      if (this.isDragging) {
        const dx = e.clientX - this.lastX;
        const dy = e.clientY - this.lastY;

        this.viewport.x += dx;
        this.viewport.y += dy;

        this.lastX = e.clientX;
        this.lastY = e.clientY;

        this.redraw();
      }
    });

    // Handle mouse up
    this.canvas.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    // Prevent context menu on right click
    this.canvas.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
  }

  private resizeCanvas() {
    // Set canvas size to match window size
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.redraw();
  }

  public addShape(shape: Shape) {
    this.shapes.push(shape);
    this.redraw();
  }

  public getShapes(): Shape[] {
    return this.shapes;
  }

  public clear() {
    this.shapes = [];
    this.redraw();
  }

  public redraw() {
    const ctx = this.canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Save current context state
    ctx.save();

    // Apply viewport transformation
    ctx.translate(this.viewport.x, this.viewport.y);
    ctx.scale(this.viewport.scale, this.viewport.scale);

    // Draw all shapes
    this.shapes.forEach((shape) => {
      this.drawShape(ctx, shape);
    });

    // Restore context state
    ctx.restore();
  }

  private drawShape(ctx: CanvasRenderingContext2D, shape: Shape) {
    // Convert world coordinates to canvas coordinates
    const x = shape.x;
    const y = shape.y;
    const width = shape.width;
    const height = shape.height;

    // Draw the shape based on its type
    switch (shape.type) {
      case 'rectangle':
        ctx.strokeRect(x, y, width, height);
        break;
      case 'circle':
        ctx.beginPath();
        ctx.arc(x + width / 2, y + height / 2, width / 2, 0, Math.PI * 2);
        ctx.stroke();
        break;
      // Add other shape types as needed
      default:
        console.warn(`Unknown shape type: ${shape.type}`);
    }
  }

  // Convert screen coordinates to world coordinates
  public screenToWorld(x: number, y: number): {x: number; y: number} {
    return {
      x: (x - this.viewport.x) / this.viewport.scale,
      y: (y - this.viewport.y) / this.viewport.scale,
    };
  }

  // Convert world coordinates to screen coordinates
  public worldToScreen(x: number, y: number): {x: number; y: number} {
    return {
      x: x * this.viewport.scale + this.viewport.x,
      y: y * this.viewport.scale + this.viewport.y,
    };
  }
}
