import React from 'react'
import { Content } from './index'
import { screen, render } from '@testing-library/react'

describe("Tests for the component <Content />", () => {

    const title = "Title Test"
    const description = "Description Test"
    beforeEach(() => {
        render(<Content> <h2>{title}</h2> <p>{description}</p></Content>)
    })

    test("The component render himself correctly", () => {
        const parent = screen.getByText(title).parentElement 
        expect(parent?.tagName.toLowerCase()).toBe('section')
        expect(parent?.childElementCount).toBe(2)
    })

    test("The component have the correct class names", () => {
        const parent = screen.getByText(title).parentElement 
        expect(parent?.classList.contains('content')).toBeTruthy()
        expect(parent?.classList.contains('color-primary')).toBeTruthy()
        expect(parent?.classList.contains('color-secondary')).not.toBeTruthy()
        expect(parent?.classList.contains('content-position--start')).toBeTruthy()
        expect(parent?.classList.contains('content-position--end')).not.toBeTruthy()
        expect(parent?.classList.contains('content-size--full')).toBeTruthy()
        expect(parent?.classList.contains('content-size--mid')).not.toBeTruthy()
    })

})