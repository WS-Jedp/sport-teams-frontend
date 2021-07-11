import React from 'react'
import { PersonCard } from './index'
import { screen, render } from '@testing-library/react'

describe("Tests for the component <PersonCard />", () => {

    const name = "Test Name"
    const role = "Test Role"
    const imgUrl = "urlOfImageTest"
    beforeEach(() => {
        render(<PersonCard name={name} role={role} img={imgUrl} />)
    })

    test("The component render himself correctly", () => {
        const parent = screen.getByTestId("person-card-container") 
        expect(parent?.tagName.toLowerCase()).toBe('article')
        expect(parent?.childElementCount).toBe(2)

        expect(screen.getByText(name).tagName.toLowerCase()).toBe('h2')
        expect(screen.getByText(name).textContent).toBe(name)
        expect(screen.getByText(role).tagName.toLowerCase()).toBe('strong')
        expect(screen.getByText(role).textContent).toBe(role)

        expect(parent.children[0].children[0].tagName.toLowerCase()).toBe('img')
        expect(parent.children[0].children[0].getAttribute('alt')).toBe(name)
        expect(parent.children[0].children[0].getAttribute('title')).toBe(name)
        expect(parent.children[0].children[0].getAttribute('src')).toBe(imgUrl)
    })

    test("The component have the correct class names", () => {
        const parent = screen.getByTestId("person-card-container") 
        expect(parent?.classList.contains('person-card')).toBeTruthy()
    })

})