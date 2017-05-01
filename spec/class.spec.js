beforeEach(() => {
  createContainer('test')
})

afterEach(() => {
  removeContainers()
})

describe('constructor()', () => {
  it('should throw an error when not given a first argument', () => {
    expect(() => new Resizer()).toThrowError()
  })

  it('should setup a resizer with the id of test', () => {
    expect(() => new Resizer('.container')).not.toThrowError()
  })
})

describe('createHandle()', () => {

  it('should be defined', () => {
    expect(Resizer.createHandle).toBeDefined()
  })

  it('should create a div element', () => {
    const element = Resizer.createHandle('boo')
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
