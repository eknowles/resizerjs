/**
 * Resizer Element Interface
 * @interface
 * @class Resizer.IResizerElement
 * @classdesc Interface Description
 */
interface IResizerElement extends HTMLElement {

  /**
   * Resizer Object
   * @abstract
   * @member {Resizer} Resizer.IResizerElement#Resizer
   */
  Resizer?: Resizer;
}

/**
 * Resizer Options Interface
 * @interface
 * @class Resizer.IResizerOptions
 * @classdesc Interface Description
 */
interface IResizerOptions {

  /**
   * Width of the handle
   * @abstract
   * @member {number} Resizer.IResizerOptions#width
   */
  width?: number;

  /**
   * Classname for the handle element
   * @abstract
   * @member {string} Resizer.IResizerOptions#className
   */
  className?: string;
}

const defaultOptions: IResizerOptions = {
  width: 8,
};

/**
 * Resizer Class
 */
class Resizer {

  /**
   * Create the Handle HTMLElement
   * @private
   * @static
   * @method Resizer#createHandle
   * @return {HTMLDivElement} handle element
   */
  private static createHandle(): HTMLDivElement {
    const el = document.createElement('div') as HTMLDivElement;
    el.dataset.rzHandle = '';
    el.style.cursor = 'ew-resize';
    return el;
  }

  /**
   * Create the Ghost Element
   * @private
   * @static
   * @method Resizer#createGhost
   * @return {HTMLDivElement} ghost element
   */
  private static createGhost(): HTMLDivElement {
    const el = document.createElement('div') as HTMLDivElement;
    el.style.position = 'absolute';
    el.style.top = '0';
    el.style.bottom = '0';
    el.style.display = 'none';
    return el;
  }

  /**
   * @public
   * @member {IResizerOptions} Resizer#options
   */
  public options: IResizerOptions;

  /**
   * Container Element
   * @private
   * @member {HTMLElement} Resizer#container
   */
  private container: IResizerElement;

  /**
   * Handle Element
   * @public
   * @member {HTMLDivElement} Resizer#handle
   */
  private handle: HTMLDivElement;

  /**
   * Target Element
   * @public
   * @member {HTMLElement} Resizer#target
   */
  private target: HTMLElement;

  /**
   * Offset X value when clicking on handle
   * @public
   * @member {HTMLElement} Resizer#offsetX
   */
  private offsetX: number = 0;

  /**
   * Handle visible when dragging
   * @member {HTMLDivElement} Resizer#ghost
   */
  private ghost: HTMLDivElement;

  /**
   * Current left value for the handle element in relation to it's parent (container)
   * @member {number} Resizer#handleX
   */
  private _handleX: number;

  /**
   * Handle is being dragged
   * @member {boolean} Resizer#dragging
   */
  private _dragging: boolean = false;

  /**
   * Resizer constructor
   * @class Resizer
   * @classdesc This class
   * @param {string | HTMLElement} containerSelector Document selector or element
   * @param {IResizerOptions} resizerOptions
   */
  constructor(
    private containerSelector: string | HTMLElement,
    resizerOptions: IResizerOptions = {},
  ) {
    if (!containerSelector) {
      throw new Error('Missing param containerSelector');
    }

    // setup options
    this.options = Object.assign(defaultOptions, resizerOptions);

    if (typeof containerSelector === 'string') {
      this.container = document.querySelector(containerSelector) as HTMLElement;
    } else {
      this.container = containerSelector;
    }

    if (!this.container) {
      throw new Error(`Can not find element from selector ${containerSelector}`);
    }

    this.target = this.container.firstElementChild as HTMLElement;

    if (this.container.Resizer) {
      this.remove();
    }

    this.setup();

  }

  /**
   * This method reverses the setup and removes the Resizer from the container
   * @public
   * @method Resizer#remove
   */
  public remove() {
    delete this.container.Resizer;
    this.container.style.position = null;
    this.handle.remove();
    this.target.style.flex = null;
  }

  /**
   * @private
   * @method Resizer#setup
   */
  private setup() {
    this.setupDom();

    // Add events
    this.handle.addEventListener('mousedown', (e: MouseEvent) => this.onDown(e));
    this.container.addEventListener('mouseup', (e: MouseEvent) => this.onUp(e));
    this.container.addEventListener('mousemove', (e: MouseEvent) => this.onMove(e));

    this.container.Resizer = this;
  }

  /**
   * This private method sets up the DOM elements required to handle the resizer
   * @private
   * @method Resizer#setupDom
   */
  private setupDom() {

    // Set Container to relative positioning
    this.container.style.position = 'relative';

    // Create Handle
    this.handle = Resizer.createHandle();

    // Create Ghost
    this.ghost = Resizer.createGhost();

    // Add Ghost to Handle
    this.handle.appendChild(this.ghost);

    // Insert Handle after Target
    this.container.insertBefore(this.handle, this.target.nextElementSibling);
  }

  /**
   * Get the dragging value
   * @private
   * @return {boolean}
   */
  private get dragging(): boolean {
    return this._dragging;
  }

  /**
   * Sets the dragging value
   * @private
   * @param value
   */
  private set dragging(value: boolean) {
    if (this.dragging) {
      this.ghost.style.display = 'none';
      this.target.style.flex = `0 0 ${this.handleX}px`;
    } else {
      this.ghost.style.display = 'block';
    }
    this._dragging = value;
  }

  /**
   * Gets the handle X position value
   * @private
   * @return {number}
   */
  private get handleX(): number {
    return this._handleX;
  }

  /**
   * Sets the handle X position value
   * @param {number} value
   */
  private set handleX(value: number) {
    if (value < 0) {
      value = 0;
    }
    if (value > this.container.clientWidth) {
      value = this.container.clientWidth;
    }
    this.ghost.style.left = `${value}px`;
    this._handleX = value;
  }

  /**
   * Handle the mousedown event on the handle element
   * @private
   * @method Resizer#onDown
   * @param {MouseEvent} e
   */
  private onDown(e: MouseEvent) {
    e.preventDefault();
    if (!this.dragging) {
      this.offsetX = e.offsetX;
      this.handleX = e.pageX - this.container.getBoundingClientRect().left - this.offsetX;
      this.dragging = true;
    }
  }

  /**
   * Handle the mouseup event on the container element
   * @private
   * @method Resizer#onUp
   * @param {MouseEvent} e
   */
  private onUp(e: MouseEvent) {
    e.preventDefault();
    if (this.dragging) {
      this.handleX = e.pageX - this.container.getBoundingClientRect().left - this.offsetX;
      this.dragging = false;
    }
  }

  /**
   * Handle the mousemove event on the container element
   * @private
   * @method Resizer#onMove
   * @param {MouseEvent} e
   */
  private onMove(e: MouseEvent) {
    e.preventDefault();
    if (this.dragging) {
      let x = e.pageX - this.container.getBoundingClientRect().left - this.offsetX;
      if (e.shiftKey) {
        x = Math.ceil(x / 20) * 20;
      }
      this.handleX = x;
    }
  }
}
