import { Injectable } from '@nestjs/common';
import { DOMParser } from 'xmldom';

@Injectable()
export default class XmlTransformerService {
  private domParser = new DOMParser();

  /**
   * Pares an XML text to an XML document.
   * @param text The text.
   * @returns The XML document.
   */
  parseXml(text: string) {
    const xmlDocument = this.domParser.parseFromString(text, 'text/xml');
    return xmlDocument;
  }

  /**
   * Returns the given node from the element or document.
   * @param nodeName The node name.
   * @param element The parent element or document.
   * @returns The node or undefined.
   */
  getNode(
    nodeName: string,
    element: Document | Element | ChildNode | XMLDocument,
  ): any {
    for (let i = 0; i < element.childNodes.length; i++) {
      const node = element.childNodes[i];
      if (node.nodeName === nodeName) {
        return node;
      }
    }
    return undefined;
  }

  /**
   * Returns the given node's textContent from the element.
   * @param nodeName The node name.
   * @param element The parent element.
   * @returns The node's textContent or undefined.
   */
  getNodeTextContent(
    nodeName: string,
    element: Document | Element | ChildNode,
  ) {
    const node = this.getNode(nodeName, element);
    if (node) return node.textContent;
    return undefined;
  }

  /**
   * Looks for the given attribute on the given element and returns its value.
   * @param attributeName The attribute name.
   * @param element The element.
   * @returns The attribute's value or undefined.
   */
  getAttributeValue(attributeName: string, element: Element | ChildNode) {
    if ((element as Element).attributes) {
      for (let i = 0; i < (element as Element).attributes.length; i++) {
        const attribute = (element as Element).attributes[i];
        if (attribute.name === attributeName) return attribute.value;
      }
    }
    return undefined;
  }
}
