import '@testing-library/jest-dom';

Object.defineProperty(window, 'speechSynthesis', {
    value: {
        cancel: jest.fn(),
        speak: jest.fn(),
        pause: jest.fn(),
        resume: jest.fn()
    },
    writable: true,
});
