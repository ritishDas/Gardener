/**
 * @jest-environment jsdom
 */

import { describe, test, expect, beforeEach, jest } from '@jest/globals';
import {
  fetchElement,
  appendElement,
  createElement,
  insertText,
  replaceElement,
  gardener
} from './gardener.js';

describe('fetchElement', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  test('should fetch element by query selector', () => {
    document.body.innerHTML = '<div class="test-class"></div>';
    const element = fetchElement('.test-class');
    expect(element).toBeTruthy();
    expect(element.className).toBe('test-class');
  });

  test('should return null for non-existent element', () => {
    const element = fetchElement('.non-existent');
    expect(element).toBeNull();
  });

  test('should fetch element by id', () => {
    document.body.innerHTML = '<div id="test-id"></div>';
    const element = fetchElement('#test-id');
    expect(element).toBeTruthy();
    expect(element.id).toBe('test-id');
  });
});

describe('appendElement', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  test('should append child to parent element', () => {
    const parent = document.createElement('div');
    const child = document.createElement('span');
    document.body.appendChild(parent);

    appendElement(parent, child);
    expect(parent.children.length).toBe(1);
    expect(parent.firstChild).toBe(child);
  });

  test('should append child using parent selector string', () => {
    document.body.innerHTML = '<div class="parent"></div>';
    const child = document.createElement('span');

    appendElement('.parent', child);
    const parent = document.querySelector('.parent');
    expect(parent.children.length).toBe(1);
    expect(parent.firstChild).toBe(child);
  });

  test('should append multiple children', () => {
    const parent = document.createElement('div');
    const child1 = document.createElement('span');
    const child2 = document.createElement('p');

    appendElement(parent, child1);
    appendElement(parent, child2);

    expect(parent.children.length).toBe(2);
    expect(parent.children[0]).toBe(child1);
    expect(parent.children[1]).toBe(child2);
  });
});

describe('createElement', () => {
  test('should create element with given type', () => {
    const element = createElement('div');
    expect(element.tagName).toBe('DIV');
  });

  test('should create element with single class', () => {
    const element = createElement('div', ['test-class']);
    expect(element.classList.contains('test-class')).toBe(true);
  });

  test('should create element with multiple classes', () => {
    const element = createElement('span', ['class1', 'class2', 'class3']);
    expect(element.classList.contains('class1')).toBe(true);
    expect(element.classList.contains('class2')).toBe(true);
    expect(element.classList.contains('class3')).toBe(true);
  });

  test('should create element without class if not provided', () => {
    const element = createElement('p');
    expect(element.className).toBe('');
  });
});

describe('insertText', () => {
  test('should insert text into element', () => {
    const element = document.createElement('div');
    insertText(element, 'Hello World');
    expect(element.innerText).toBe('Hello World');
  });

  test('should replace existing text', () => {
    const element = document.createElement('div');
    element.innerText = 'Old Text';
    insertText(element, 'New Text');
    expect(element.innerText).toBe('New Text');
  });

  test('should handle empty string', () => {
    const element = document.createElement('div');
    insertText(element, '');
    expect(element.innerText).toBe('');
  });
});

describe('replaceElement', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  test('should replace element with another element', () => {
    const original = document.createElement('div');
    original.id = 'original';
    const replacement = document.createElement('span');
    replacement.id = 'replacement';
    document.body.appendChild(original);

    replaceElement(original, replacement);
    expect(document.getElementById('original')).toBeNull();
    expect(document.getElementById('replacement')).toBeTruthy();
  });

  test('should replace element using selector string', () => {
    document.body.innerHTML = '<div class="original"></div>';
    const replacement = document.createElement('span');
    replacement.className = 'replacement';

    replaceElement('.original', replacement);
    expect(document.querySelector('.original')).toBeNull();
    expect(document.querySelector('.replacement')).toBeTruthy();
  });
});

describe('gardener', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  test('should return DOM element if nodeType is 1', () => {
    const element = document.createElement('div');
    const result = gardener(element);
    expect(result).toBe(element);
  });

  test('should create simple element', () => {
    const dom = { t: 'div' };
    const element = gardener(dom);
    expect(element.tagName).toBe('DIV');
  });

  test('should create element with classes', () => {
    const dom = { t: 'div', cn: ['class1', 'class2'] };
    const element = gardener(dom);
    expect(element.classList.contains('class1')).toBe(true);
    expect(element.classList.contains('class2')).toBe(true);
  });

  test('should create element with text content', () => {
    const dom = { t: 'p', txt: 'Hello World' };
    const element = gardener(dom);
    expect(element.innerText).toBe('Hello World');
  });

  test('should create element with attributes', () => {
    const dom = {
      t: 'input',
      attr: { type: 'text', placeholder: 'Enter text', id: 'test-input' }
    };
    const element = gardener(dom);
    expect(element.getAttribute('type')).toBe('text');
    expect(element.getAttribute('placeholder')).toBe('Enter text');
    expect(element.id).toBe('test-input');
  });

  test('should create element with data attributes', () => {
    const dom = {
      t: 'div',
      attr: { 'data-test': 'value', 'data-id': '123' }
    };
    const element = gardener(dom);
    expect(element.getAttribute('data-test')).toBe('value');
    expect(element.getAttribute('data-id')).toBe('123');
  });

  test('should create element with aria attributes', () => {
    const dom = {
      t: 'button',
      attr: { 'aria-label': 'Close', 'aria-expanded': 'false' }
    };
    const element = gardener(dom);
    expect(element.getAttribute('aria-label')).toBe('Close');
    expect(element.getAttribute('aria-expanded')).toBe('false');
  });

  test('should create element with event listeners', () => {
    const mockHandler = jest.fn();
    const dom = {
      t: 'button',
      events: { click: mockHandler }
    };
    const element = gardener(dom);
    element.click();
    expect(mockHandler).toHaveBeenCalledTimes(1);
  });

  test('should create element with multiple event listeners', () => {
    const clickHandler = jest.fn();
    const mouseoverHandler = jest.fn();
    const dom = {
      t: 'div',
      events: { click: clickHandler, mouseover: mouseoverHandler }
    };
    const element = gardener(dom);

    element.click();
    element.dispatchEvent(new Event('mouseover'));

    expect(clickHandler).toHaveBeenCalledTimes(1);
    expect(mouseoverHandler).toHaveBeenCalledTimes(1);
  });

  test('should create nested elements', () => {
    const dom = {
      t: 'div',
      children: [
        { t: 'span', txt: 'Child 1' },
        { t: 'p', txt: 'Child 2' }
      ]
    };
    const element = gardener(dom);
    expect(element.children.length).toBe(2);
    expect(element.children[0].tagName).toBe('SPAN');
    expect(element.children[0].innerText).toBe('Child 1');
    expect(element.children[1].tagName).toBe('P');
    expect(element.children[1].innerText).toBe('Child 2');
  });

  test('should create deeply nested elements', () => {
    const dom = {
      t: 'div',
      children: [
        {
          t: 'section',
          children: [
            { t: 'h1', txt: 'Title' },
            { t: 'p', txt: 'Content' }
          ]
        }
      ]
    };
    const element = gardener(dom);
    expect(element.children.length).toBe(1);
    expect(element.children[0].tagName).toBe('SECTION');
    expect(element.children[0].children.length).toBe(2);
  });

  test('should create SVG element', () => {
    const dom = { t: 'svg' };
    const element = gardener(dom);
    expect(element.tagName).toBe('svg');
    expect(element.namespaceURI).toBe('http://www.w3.org/2000/svg');
  });

  test('should create SVG path element', () => {
    const dom = {
      t: 'path',
      attr: { d: 'M10 10 H 90 V 90 H 10 Z' }
    };
    const element = gardener(dom);
    expect(element.tagName).toBe('path');
    expect(element.namespaceURI).toBe('http://www.w3.org/2000/svg');
    expect(element.getAttribute('d')).toBe('M10 10 H 90 V 90 H 10 Z');
  });

  test('should create SVG with classes', () => {
    const dom = {
      t: 'circle',
      cn: ['svg-class'],
      attr: { cx: '50', cy: '50', r: '40' }
    };
    const element = gardener(dom);
    expect(element.classList.contains('svg-class')).toBe(true);
    expect(element.getAttribute('cx')).toBe('50');
  });

  test('should create complex SVG structure', () => {
    const dom = {
      t: 'svg',
      attr: { width: '100', height: '100' },
      children: [
        { t: 'circle', attr: { cx: '50', cy: '50', r: '40' } },
        { t: 'rect', attr: { x: '10', y: '10', width: '30', height: '30' } }
      ]
    };
    const element = gardener(dom);
    expect(element.children.length).toBe(2);
    expect(element.children[0].tagName).toBe('circle');
    expect(element.children[1].tagName).toBe('rect');
  });

  test('should handle property attributes like value', () => {
    const dom = {
      t: 'input',
      attr: { value: 'test-value', selectedIndex: '2' }
    };
    const element = gardener(dom);
    expect(element.getAttribute('value')).toBe('test-value');
  });

  test('should handle empty string attribute as boolean', () => {
    const dom = {
      t: 'button',
      attr: { disabled: '' }
    };
    const element = gardener(dom);
    expect(element.disabled).toBe(true);
  });

  test('should create element with all features combined', () => {
    const clickHandler = jest.fn();
    const dom = {
      t: 'div',
      cn: ['container', 'main'],
      txt: 'Container Text',
      attr: { id: 'main-container', 'data-test': 'value' },
      events: { click: clickHandler },
      children: [
        { t: 'h1', txt: 'Title', cn: ['title'] },
        { t: 'p', txt: 'Paragraph' }
      ]
    };

    const element = gardener(dom);

    expect(element.tagName).toBe('DIV');
    expect(element.classList.contains('container')).toBe(true);
    expect(element.classList.contains('main')).toBe(true);
    expect(element.innerText).toContain('Container Text');
    expect(element.id).toBe('main-container');
    expect(element.getAttribute('data-test')).toBe('value');
    expect(element.children.length).toBe(2);

    element.click();
    expect(clickHandler).toHaveBeenCalled();
  });
});
