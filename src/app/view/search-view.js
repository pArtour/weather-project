import { elements } from './base'
export const getInputValue = elem => elem.value;
export const focusInput = () => {
    elements.searchInput.focus();
}