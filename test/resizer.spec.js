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
    var handle = void 0

    beforeAll(function () {
      handle = Resizer.createHandle('boo')
    })

    it('should be defined', function () {
      expect(Resizer.createHandle).toBeDefined()
    })

    it('should return a div', function () {
      expect(handle.nodeName).toBe('DIV')
    })

    it('should have a cursor of ew-resize', function () {
      expect(handle.style.cursor).toBe('ew-resize')
    })

    it('should have an attribute of data-rz-handle', function () {
      expect(handle.hasAttribute('data-rz-handle')).toBeTruthy()
    })
  })

  describe('createGhost()', function () {
    var ghost = void 0

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
  var rz = void 0
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
    it('should have dragging property', function () {
      var width = 10
      rz = new Resizer('.container', {width: width})
      expect(rz.options.width).toBe(width)
    })
  })
})

function createContainer() {
  var container = document.createElement('div')
  container.className = 'container'

  var item1 = document.createElement('div')
  item1.className = 'item'

  var item2 = document.createElement('div')
  item2.className = 'item'

  container.appendChild(item1)
  container.appendChild(item2)

  document.body.appendChild(container)
}

function removeContainers() {
  document.body.removeChild(document.querySelector('.container'))
}
