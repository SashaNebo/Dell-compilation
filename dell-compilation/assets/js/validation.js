function validation(form) {
  function removeError(input) {
    const parent = input.parentNode

    if (parent.classList.contains('error')) {
      parent.querySelector('.error-label').remove()
      parent.classList.remove('error')
    }
  }
  function createError(input, text) {
    const parent = input.parentNode
    const errorLabel = document.createElement('label')

    errorLabel.classList.add('error-label')
    errorLabel.textContent = text

    parent.classList.add('error')
    parent.append(errorLabel)
  }

  let result = true

  const allInputs = form.querySelectorAll('input')

  for (const input of allInputs) {
    removeError(input)

    if (input.dataset.required == 'true') {
      removeError(input)
      if (input.value == '') {
        createError(input, 'Required field')
        result = false
      }
    }

    if (input.dataset.numLength) {
      removeError(input)
      if (parseInt(input.value.length) !== parseInt(input.dataset.numLength)) {
        createError(input, 'Number is incorrectly')
        result = false
      }
    }

    if (input.dataset.minLength) {
      removeError(input)
      if (parseInt(input.value.length) < parseInt(input.dataset.minLength)) {
        createError(input, 'Min symbol is 20')
        result = false
      }
    }
  }
  return result
}

document
  .getElementById('add-form')
  .addEventListener('submit', function (event) {
    event.preventDefault()
    if (validation(this) === true) {
      const modal = document.querySelector('.contain-modal')
      modal.classList.remove('hidden')
      window.onclick = () => {
        modal.classList.add('hidden')
      }
    }
  })
