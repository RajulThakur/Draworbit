export interface Screen {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Scale {
  x: number;
  y: number;
}

export interface Camera {
  x: number;
  y: number;
  z: number;
}

export interface Container {
  width: number;
  height: number;
}

export interface Pointer {
  x: number;
  y: number;
}

class CanvasStore {
  private static _screen: Screen = {x: 0, y: 0, width: 0, height: 0};
  private static _scale: Scale = {x: 1, y: 1};
  private static _camera: Camera = {x: 0, y: 0, z: 0};
  private static _container: Container = {width: 0, height: 0};
  private static _pointer: Pointer = {x: 0, y: 0};

  static initialize(width: number, height: number) {
    this._container = {width, height};
    this._camera = {x: width / 2, y: height / 2, z: 1000};
    this.updateScreen();
  }

  static get screen(): Screen {
    return this._screen;
  }

  static get scale(): Scale {
    return this._scale;
  }

  static get camera(): Camera {
    return this._camera;
  }

  static get container(): Container {
    return this._container;
  }

  static get pointer(): Pointer {
    return this._pointer;
  }

  static moveCamera(deltaX: number, deltaY: number) {
    this._camera.x += deltaX;
    this._camera.y += deltaY;
    this.updateScreen();
  }

  static zoomCamera(deltaX: number, deltaY: number) {
    const zoomFactor = 1 + deltaY * 0.001;
    this._camera.z *= zoomFactor;
    this.updateScreen();
  }

  static movePointer(x: number, y: number) {
    this._pointer = {x, y};
  }

  private static updateScreen() {
    const {x, y, z} = this._camera;
    const {width, height} = this._container;

    const scale = z / 1000;
    this._scale = {x: scale, y: scale};

    this._screen = {
      x: x - width / 2 / scale,
      y: y - height / 2 / scale,
      width: width / scale,
      height: height / scale,
    };
  }
}

export default CanvasStore;
