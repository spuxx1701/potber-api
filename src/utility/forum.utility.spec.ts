import { parseAvatarUrl } from './forum.utility';

describe('parseAvatarUrl', () => {
  it('should properly parse an old avatar URL', () => {
    const input = 'avatare/oldb/shooter.gif';
    const expected = 'https://forum.mods.de/bb/avatare/oldb/shooter.gif';
    expect(parseAvatarUrl(input)).toBe(expected);
  });

  it('should properly parse a new avatar URL', () => {
    const input = './avatare/upload/U3035--e-razor.png';
    const expected =
      'https://forum.mods.de/bb/avatare/upload/U3035--e-razor.png';
    expect(parseAvatarUrl(input)).toBe(expected);
  });
});
