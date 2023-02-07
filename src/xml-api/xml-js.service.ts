import { Injectable } from '@nestjs/common';
import { xml2js, Element as XmlJsElement } from 'xml-js';

// Re-export Element interface for easier access
export type Element = XmlJsElement;

@Injectable()
export class XmlJsService {
  /**
   * Parses an XML text to an XmlJs element.
   * @param text The text.
   * @returns The XmlJs element.
   */
  parseXml(text: string) {
    return xml2js(text, { compact: false }) as Element;
  }

  /**
   * Get a child element by its name.
   * @param elementName The child element's name.
   * @param element The parent element.
   * @returns The child element or undefined.
   */
  getElement(elementName: string, parentElement: Element) {
    if (parentElement.elements) {
      return parentElement.elements.find(
        (element) =>
          element.name === elementName || element.type === elementName,
      );
    }
    return undefined;
  }

  /**
   * Gets a child element by its name and retrievs its CDATA content.
   * @param elementName The child element's name.
   * @param parentElement The parent element.
   * @returns The child element's CDATA content or undefined.
   */
  getElementCdata(elementName: string, parentElement: Element) {
    const element = this.getElement(elementName, parentElement);
    if (element?.elements) {
      const cdataElement = this.getElement('cdata', element);
      if (cdataElement) return cdataElement.cdata;
    }
    return undefined;
  }

  /**
   * Get an element's attribute by its name.
   * @param attributeName The attribute's name.
   * @param element The parent element.
   * @returns The attribute or undefined.
   */
  getAttribute(attributeName: string, element: Element) {
    if (element?.attributes && element.attributes[attributeName]) {
      return element.attributes[attributeName] as string;
    }
    return undefined;
  }
}
