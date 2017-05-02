describe('constructor', () => {
  beforeEach(() => {
    createContainer()
  })

  afterEach(() => {
    removeContainers()
  })

  it('should throw an error when not given a first argument', () => {
    expect(() => new Resizer()).toThrowError()
  })

  it('should setup a resizer with the id of test', () => {
    expect(() => new Resizer('.container')).not.toThrowError()
  })
})

describe('static methods', () => {

  describe('createHandle()', () => {
    let handle

    beforeAll(() => {
      handle = Resizer.createHandle('boo')
    })

    it('should be defined', () => {
      expect(Resizer.createHandle).toBeDefined()
    })

    it('should return a div', () => {
      expect(handle.nodeName).toBe('DIV')
    })

    it('should have a cursor of ew-resize', () => {
      expect(handle.style.cursor).toBe('ew-resize')
    })

    it('should have an attribute of data-rz-handle', () => {
      expect(handle.hasAttribute('data-rz-handle')).toBeTruthy()
    })
  })

  describe('createGhost()', () => {
    let ghost

    beforeAll(() => {
      ghost = Resizer.createGhost()
    })

    it('should be defined', () => {
      expect(Resizer.createGhost).toBeDefined()
    })

    it('should return a div', () => {
      expect(ghost.nodeName).toBe('DIV')
    })

    it('should be absolutely positioned', () => {
      expect(ghost.style.position).toBe('absolute')
    })

    it('should have a top position of 0', () => {
      expect(ghost.style.top).toBe('0px')
    })

    it('should have a bottom position of 0', () => {
      expect(ghost.style.bottom).toBe('0px')
    })

    it('should have a display style of none', () => {
      expect(ghost.style.display).toBe('none')
    })
  })
})

describe('methods', () => {

})

describe('properties', () => {
  let rz
  beforeEach(() => {
    createContainer()
  })

  afterEach(() => {
    removeContainers()
  })

  it('should have offsetX property', () => {
    rz = new Resizer('.container')
    expect(rz.offsetX).toBeDefined()
    expect(rz.offsetX).toBe(0)
  })

  it('should have dragging property', () => {
    rz = new Resizer('.container')
    expect(rz.dragging).toBeDefined()
    expect(rz.dragging).toBeFalsy()
  })

  describe('options', () => {
    it('should have dragging property', () => {
      let width = 10
      rz = new Resizer('.container', {width: width})
      expect(rz.options.width).toBe(width)
    })
  })
})

function createContainer() {
  const container = document.createElement('div')
  container.className = 'container'

  const item1 = document.createElement('div')
  item1.className = 'item'

  const item2 = document.createElement('div')
  item2.className = 'item'

  container.appendChild(item1)
  container.appendChild(item2)

  document.body.appendChild(container)
}

function removeContainers() {
  document.body.removeChild(document.querySelector('.container'))
}
