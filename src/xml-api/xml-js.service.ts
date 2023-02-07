import { Injectable } from '@nestjs/common';
import { DOMParser } from 'xmldom';
import { xml2js, Element as XmlJsElement } from 'xml-js';

// Re-export Element interface for easier access
export type Element = XmlJsElement;

@Injectable()
export default class XmlJsService {
  private domParser = new DOMParser();
  /**
   * Parses an XML text to an XmlJs element.
   * @param text The text.
   * @returns The XmlJs element.
   */
  parseXml(text: string) {
    // const xmlDocument = this.domParser.parseFromString(text, 'text/xml');
    return xml2js(text, { compact: false }) as Element;
  }

  /**
   * Get a child element by its name.
   * @param elementName The chlild element's name.
   * @param element The parent element.
   * @returns The child enement or undefined.
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
