import { Injectable } from '@nestjs/common';
import * as he from 'he';
import { EncodingEntry, SUPPORTED_CHARACTERS } from './encoding.table';

@Injectable()
export class EncodingService {
  encodingTable: EncodingEntry[] = this.createEncodingTable();

  /**
   * Creates the encoding table from the list of supported characters.
   * @returns The encodingtable.
   */
  createEncodingTable(): EncodingEntry[] {
    const table: EncodingEntry[] = [];
    for (const character of SUPPORTED_CHARACTERS) {
      table.push({
        utf8: character,
        latin9: escape(character),
      });
    }
    return table;
  }

  /**
   * Encodes the given login credentials using latin-9 encoding.
   * @param input The username or password.
   * @returns The encoded result.
   */
  encodeLoginCredentials(input: string) {
    const result = escape(input);
    return result;
  }

  /**
   * Encodes a text (e.g. a post message or thread title) to latin-9 and html
   * so that it is understood by the forum.
   * @param input The input string.
   * @returns The encoded result.
   */
  encodeText(input: string) {
    let result = input;

    // Encode to latin-9
    result = this.escapeLatin9(result);

    // Escape special characters to HTML
    // result = he.encode(result, { allowUnsafeSymbols: true });
    result = this.escapeHtml(result);

    // Do a final escape
    // result = escape(result);

    // Escape special characters to HTML (e.g. emojis)

    // result = escape(input);

    // [potber]%E4%F6%FC%B2&#x1F981;
    // [potber]&#xE4;&#xF6;&#xFC;&#xB2;&#x1F981;
    // result = he.encode(result, { allowUnsafeSymbols: true });
    return result;
  }

  /**
   * Decodes a text from latin-9 & html to a proper utf-8 string.
   * @param input
   */
  decodeText(input: string) {
    // Decode latin-9
    let result = unescape(input);
    // Decode HTML codes
    result = he.decode(input);
    return result;
  }

  /**
   * Escapes all supported characters to latin-9.
   * @param input The utf-8 string.
   * @returns The escaped result.
   */
  escapeLatin9(input: string) {
    let result = input;
    for (const encodingEntry of this.encodingTable) {
      result = result.replace(encodingEntry.utf8, encodingEntry.latin9);
    }
    return result;
  }

  /**
   * Escapes special characters to their corresponding HTML codes.
   * @param input
   * @returns
   */
  escapeHtml(input: string) {
    const result = [...input]
      .map((char) => {
        const code = char.codePointAt(0);
        return code > 127 ? `%26%23${code}%3B` : char;
      })
      .join('');
    return result;
  }
}
