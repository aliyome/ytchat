import { extractVideoId } from './extract_video_id';

describe('extractVideoId', () => {
  test.each`
    urlOrVideoId                                                                          | expected
    ${'ABC_EFG_IJK'}                                                                      | ${'ABC_EFG_IJK'}
    ${'vid_test_be'}                                                                      | ${'vid_test_be'}
    ${'https://www.youtube.com/watch?v=123_456_789'}                                      | ${'123_456_789'}
    ${'https://www.youtube.com/watch?v=123_456_789&t=123s'}                               | ${'123_456_789'}
    ${'www.youtube.com/watch?v=123_456_789'}                                              | ${'123_456_789'}
    ${'watch?v=123_456_789'}                                                              | ${'123_456_789'}
    ${'youtube.com/watch?v=123_456_789'}                                                  | ${'123_456_789'}
    ${'http://youtu.be/ABC_EFG_IJK'}                                                      | ${'ABC_EFG_IJK'}
    ${'youtu.be/ABC_EFG_IJK'}                                                             | ${'ABC_EFG_IJK'}
    ${'https://www.youtube.com/watch?v=ABC_EFG_IJK&list=XYZ_ABC_12345&start_radio=1&t=1'} | ${'ABC_EFG_IJK'}
    ${'https://www.youtube.com/embed/ABC_EFG_IJK'}                                        | ${'ABC_EFG_IJK'}
    ${'www.youtube.com/embed/ABC_EFG_IJK'}                                                | ${'ABC_EFG_IJK'}
    ${'youtube.com/embed/ABC_EFG_IJK'}                                                    | ${'ABC_EFG_IJK'}
  `('extracts $expected from $urlOrVideoId', ({ urlOrVideoId, expected }) => {
    expect(extractVideoId(urlOrVideoId)).toBe(expected);
  });

  test.each`
    urlOrVideoId
    ${''}
    ${'0123456789'}
    ${'more_than_11_letter_string'}
    ${'https://www.youtube.com/watch?v=more_than_11_letter_string'}
    ${'https://www.youtube.com/channel/123_456_789'}
  `('extracts null from $urlOrVideoId', ({ urlOrVideoId }) => {
    expect(extractVideoId(urlOrVideoId)).toBeNull();
  });
});
