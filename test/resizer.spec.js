'use strict'

describe('constructor', function () {
  beforeEach(function () {
    createContainer()
  })

  afterEach(function () {
    removeContainers()
  })

  it('should throw an error when not given a first argument', function () {
    expect(function () {
      return new Resizer()
    }).toThrowError()
  })

  it('should setup a resizer with the id of test', function () {
    expect(function () {
      return new Resizer('.container')
    }).not.toThrowError()
  })
})

describe('static methods', function () {

  describe('createHandle()', function () {
    let handleElement;

    beforeAll(function () {
      handleElement = Resizer.createHandle('boo')
    })

    it('should be defined', function () {
      expect(Resizer.createHandle).toBeDefined()
    })

    it('should return a div', function () {
      expect(handleElement.nodeName).toBe('DIV')
    })

    it('should have a cursor of ew-resize', function () {
      expect(handleElement.style.cursor).toBe('ew-resize')
    })

    it('should have an attribute of data-rz-handle', function () {
      expect(handleElement.hasAttribute('data-rz-handle')).toBeTruthy()
    })
  })

  describe('createGhost()', function () {
    let ghost;

    beforeAll(function () {
      ghost = Resizer.createGhost()
    })

    it('should be defined', function () {
      expect(Resizer.createGhost).toBeDefined()
    })

    it('should return a div', function () {
      expect(ghost.nodeName).toBe('DIV')
    })

    it('should be absolutely positioned', function () {
      expect(ghost.style.position).toBe('absolute')
    })

    it('should have a top position of 0', function () {
      expect(ghost.style.top).toBe('0px')
    })

    it('should have a bottom position of 0', function () {
      expect(ghost.style.bottom).toBe('0px')
    })

    it('should have a display style of none', function () {
      expect(ghost.style.display).toBe('none')
    })
  })
})

describe('methods', function () {})

describe('properties', function () {
  let rz;
  beforeEach(function () {
    createContainer()
  })

  afterEach(function () {
    removeContainers()
  })

  it('should have offsetX property', function () {
    rz = new Resizer('.container')
    expect(rz.offsetX).toBeDefined()
    expect(rz.offsetX).toBe(0)
  })

  it('should have dragging property', function () {
    rz = new Resizer('.container')
    expect(rz.dragging).toBeDefined()
    expect(rz.dragging).toBeFalsy()
  })

  describe('options', function () {
    it('defaults', function () {
      expect(Resizer.defaultOptions.width).toBeDefined()
      expect(Resizer.defaultOptions.width).toBe(8)
    })

    it('should set the width', function () {
      let width = 10
      rz = new Resizer('.container', {width: width})
      expect(rz.options.width).toBe(width)
    })
  })
})

function createContainer() {
  let container = document.createElement('div')
  container.className = 'container'

  let item1 = document.createElement('div')
  item1.className = 'item'

  let item2 = document.createElement('div')
  item2.className = 'item'

  container.appendChild(item1)
  container.appendChild(item2)

  document.body.appendChild(container)
}

function removeContainers() {
  document.body.removeChild(document.querySelector('.container'))
}
