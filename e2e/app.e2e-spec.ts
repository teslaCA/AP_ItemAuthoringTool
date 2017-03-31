import { APItemAuthoringToolPage } from './app.po';

describe('ap-item-authoring-tool App', function() {
  let page: APItemAuthoringToolPage;

  beforeEach(() => {
    page = new APItemAuthoringToolPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
