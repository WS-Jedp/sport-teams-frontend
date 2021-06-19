import React from 'react'
import { PersonHeader } from './index'
import { screen, render } from '@testing-library/react'

describe("Tests for the component <PersonHeader />", () => {

    const name = "Test Name"
    const lastName = "Last Name Test"
    const imgUrl = "urlOfImageTest"

    beforeEach(() => {
        render(<PersonHeader name={name} lastName={lastName} img={imgUrl} />)
    })

    test("The component render himself correctly", () => {
        const parent = screen.getByTestId("person-header-container") 
        expect(parent?.tagName.toLowerCase()).toBe('section')
        expect(parent?.childElementCount).toBe(2)

        expect(screen.getByText(name).tagName.toLowerCase()).toBe('h2')
        expect(screen.getByText(name).textContent).toBe(name)
        expect(screen.getByText(lastName).tagName.toLowerCase()).toBe('h2')
        expect(screen.getByText(lastName).textContent).toBe(lastName)

        expect(parent.children[0].children[0].tagName.toLowerCase()).toBe('img')
        expect(parent.children[0].children[0].getAttribute('alt')).toBe(`Picture of ${name}`)
        expect(parent.children[0].children[0].getAttribute('title')).toBe(name)
        expect(parent.children[0].children[0].getAttribute('src')).toBe(imgUrl)
    })

    test("The component have the correct class names", () => {
        const parent = screen.getByTestId("person-header-container") 
        expect(parent?.classList.contains('person-header')).toBeTruthy()
    })

})